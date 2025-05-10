import { CACHE_TIME_ITEM_TTL, CACHE_TIME_VERSION_FETCH_DELAY, URL_VERSION_DOCS } from '../api/constants'

let _cacheMap: Map<string, any> = new Map()
let _lastTimeFetchedCache: number = 0
let _currentCacheVersion: string = ''
let _versionFetchPromise: Promise<void> | null = null

type CacheItem = {
  versionId: string,
  timestampCreated: number,
  data: any
}

async function tryUpdateCacheVersion() {
  if (Date.now() - _lastTimeFetchedCache <= CACHE_TIME_VERSION_FETCH_DELAY) {
    return
  }
  if (_versionFetchPromise) {
    return _versionFetchPromise
  }

  _versionFetchPromise = (async () => {
    try {
      const resp = await fetch(URL_VERSION_DOCS)
      if (!resp.ok) {
        console.warn(`Error: fetching ${URL_VERSION_DOCS}:`, resp)
        return
      }

      _currentCacheVersion = await resp.text()
      _lastTimeFetchedCache = Date.now()
    } catch (e) {
      console.warn(`Error: fetching ${URL_VERSION_DOCS}:`, e)
    } finally {
      _versionFetchPromise = null
    }
  })()

  return _versionFetchPromise
}

function encodeUrl(url: string): string {
  return btoa(encodeURIComponent(url))
}

export function getFromMemOrStorage(id: string): CacheItem | null {
  const itemFromMemory = _cacheMap.get(id) as CacheItem
  if (itemFromMemory) {
    return itemFromMemory
  }

  const stringFromStorage = localStorage.getItem(id)
  if (stringFromStorage) {
    try {
      const parsed = JSON.parse(stringFromStorage)
      // should reflect `CacheItem` type
      if (parsed && typeof parsed.versionId === 'string' && typeof parsed.timestampCreated === 'number' && parsed.data !== undefined) {
        const cacheItem = parsed as CacheItem
        _cacheMap.set(id, cacheItem)
        return cacheItem
      } else {
        console.warn('Error: parsing item from storage, invalid structure:', parsed)
        localStorage.removeItem(id)
      }
    } catch (e) {
      console.warn('Error: parsing item from storage:', e)
      localStorage.removeItem(id)
    }
  }

  return null
}

function isCacheItemValid(item: CacheItem) {
  if (item.versionId !== _currentCacheVersion) {
    return false
  }

  return Date.now() - item.timestampCreated <= CACHE_TIME_ITEM_TTL
}

export function saveToCache(url: string, data: any) {
  const id = encodeUrl(url)

  const cacheItem: CacheItem = { data: data, timestampCreated: Date.now(), versionId: _currentCacheVersion }

  _cacheMap.set(id, cacheItem)
  try {
    localStorage.setItem(id, JSON.stringify(cacheItem))
  } catch (e) {
    console.warn('Error: saving to localstorage:')
    console.warn(e)
  }
}

export async function getFromCache<T>(url: string): Promise<T | null> {
  await tryUpdateCacheVersion()

  const id = encodeUrl(url)

  const cacheItem = getFromMemOrStorage(id)
  if (cacheItem && isCacheItemValid(cacheItem)) {
    return cacheItem.data as T
  } else {
    _cacheMap.delete(id)
    localStorage.removeItem(id)
  }

  return null
}
