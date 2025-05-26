import { CACHE_TIME_ITEM_TTL, CACHE_TIME_VERSION_FETCH_DELAY, URL_VERSION_DOCS } from './constants'
import { isClientSide } from '../shared/utils'

interface CacheItem<T> {
  versionId: string
  timestampCreated: number
  data: T
}

interface IStorageAsync {
  setItem<T>(key: string, value: CacheItem<T>): Promise<void>
  setItemsBatched<T>(items: [key: string, value: CacheItem<T>][]): Promise<void>
  getItem<T>(key: string): Promise<CacheItem<T> | null>
  removeItem(key: string): Promise<void>
}

class DummyStorage implements IStorageAsync {
  async setItem(): Promise<void> {
    return
  }

  async setItemsBatched(): Promise<void> {
    return
  }

  async getItem<T>(): Promise<CacheItem<T> | null> {
    return null
  }

  async removeItem(): Promise<void> {
    return
  }
}

class IndexedDBStorage implements IStorageAsync {
  private dbPromise: Promise<IDBDatabase>
  private objStoreName: string = 'cache'

  constructor(dbName: string, version: number) {
    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, version)

      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains(this.objStoreName)) {
          db.createObjectStore(this.objStoreName)
        }
      }

      request.onsuccess = () => {
        const db = request.result
        db.onversionchange = () => {
          db.close()
          console.warn('Database is outdated, please reload the page.')
        }
        resolve(db)
      }
      request.onerror = () => reject(request.error)
    })
  }

  async setItem<T>(key: string, value: CacheItem<T>): Promise<void> {
    const db = await this.dbPromise
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.objStoreName, 'readwrite')
      tx.objectStore(this.objStoreName).put(value, key)
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }

  async setItemsBatched<T>(items: [key: string, value: CacheItem<T>][]): Promise<void> {
    const db = await this.dbPromise
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.objStoreName, 'readwrite')
      items.forEach(([key, value]) => {
        tx.objectStore(this.objStoreName).put(value, key)
      })
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }

  async getItem<T>(key: string): Promise<CacheItem<T> | null> {
    const db = await this.dbPromise
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.objStoreName)
      const request = tx.objectStore(this.objStoreName).get(key)
      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => reject(request.error)
    })
  }

  async removeItem(key: string): Promise<void> {
    const db = await this.dbPromise
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.objStoreName, 'readwrite')
      tx.objectStore(this.objStoreName).delete(key)
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }
}

class Cache {
  private cacheMap: Map<string, CacheItem<unknown>> = new Map()

  private storage: IStorageAsync
  private pendingStorageWrites: Map<string, CacheItem<unknown>> = new Map()
  private storageWriteTimeout: ReturnType<typeof setTimeout> | null = null

  private versionFetchPromise: Promise<void> | null = null
  private lastTimeFetchedCacheVersion: number = 0
  private currentCacheVersion: string = ''

  private isDoneCleaningUpOldEntries: boolean = false

  constructor(storage: IStorageAsync) {
    this.storage = storage
  }

  private scheduleStorageWrite(): void {
    if (this.storageWriteTimeout) {
      clearTimeout(this.storageWriteTimeout)
    }

    this.storageWriteTimeout = setTimeout(() => {
      this.flushStorageWrites()
    }, 1000)
  }

  private async flushStorageWrites(): Promise<void> {
    await this.storage.setItemsBatched(Array.from(this.pendingStorageWrites.entries()))
    this.pendingStorageWrites.clear()
    this.storageWriteTimeout = null
  }

  private async tryUpdateCacheVersion(): Promise<void> {
    if (Date.now() - this.lastTimeFetchedCacheVersion <= CACHE_TIME_VERSION_FETCH_DELAY) {
      return
    }

    if (this.versionFetchPromise) {
      return this.versionFetchPromise
    }

    this.versionFetchPromise = (async () => {
      try {
        const resp = await fetch(URL_VERSION_DOCS, {
          cache: 'no-cache',
          signal: AbortSignal.timeout(3000),
        })

        if (!resp.ok) {
          throw new Error(`Failed to fetch version: ${resp.status} ${resp.statusText}`)
        }

        this.currentCacheVersion = await resp.text()
        this.lastTimeFetchedCacheVersion = Date.now()
      } catch (e) {
        console.warn(`Error fetching ${URL_VERSION_DOCS}:`, e)
      } finally {
        this.versionFetchPromise = null
      }
    })()

    return this.versionFetchPromise
  }

  private isCacheItemValid<T>(item: CacheItem<T>): boolean {
    return (
      item.versionId === this.currentCacheVersion && Date.now() - item.timestampCreated <= CACHE_TIME_ITEM_TTL
    )
  }

  private async getFromMemOrStorage<T>(id: string): Promise<CacheItem<T> | null> {
    const itemFromMemory = this.cacheMap.get(id) as CacheItem<T>
    if (itemFromMemory) {
      return itemFromMemory
    }

    const itemFromStorage = await this.storage.getItem<T>(id)
    if (itemFromStorage) {
      try {
        if (this.validateCacheItem(itemFromStorage)) {
          this.cacheMap.set(id, itemFromStorage)
          return itemFromStorage
        }
      } catch (e) {
        console.warn('Error parsing item from storage:', e)
      }
      this.storage.removeItem(id)
    }

    return null
  }

  private validateCacheItem<T>(item: unknown): item is CacheItem<T> {
    return (
      typeof item === 'object' &&
      item !== null &&
      'versionId' in item &&
      'timestampCreated' in item &&
      'data' in item &&
      typeof (item as CacheItem<T>).versionId === 'string' &&
      typeof (item as CacheItem<T>).timestampCreated === 'number'
    )
  }

  private cleanUpOldEntries(): void {
    if (this.isDoneCleaningUpOldEntries || !isClientSide()) {
      return
    }
    try {
      const arr: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && (key.startsWith('CST2_') || key.startsWith('carbon_docs_cache_'))) {
          arr.push(key)
        }
      }

      arr.forEach((key) => {
        localStorage.removeItem(key)
      })
    } catch (e) {
      console.warn('Error cleaning up old entries:', e)
    } finally {
      this.isDoneCleaningUpOldEntries = true
    }
  }

  public saveToCache<T>(url: string, data: T): void {
    const id = url
    const cacheItem: CacheItem<T> = {
      data,
      timestampCreated: Date.now(),
      versionId: this.currentCacheVersion,
    }

    this.cacheMap.set(id, cacheItem)

    this.pendingStorageWrites.set(id, cacheItem)
    this.scheduleStorageWrite()
  }

  public async getFromCache<T>(url: string): Promise<T | null> {
    await this.tryUpdateCacheVersion()

    this.cleanUpOldEntries()

    const id = url
    const cacheItem = await this.getFromMemOrStorage<T>(id)

    if (cacheItem && this.isCacheItemValid(cacheItem)) {
      return cacheItem.data
    }

    this.cacheMap.delete(id)
    this.storage.removeItem(id)
    return null
  }
}

export const cache = new Cache(isClientSide() ? new IndexedDBStorage('docsCache', 1) : new DummyStorage())
