import { cache } from './cache'

export async function fetchApiCaching<T, K = unknown>(url: string, itemTtl: number, callbackFormatDataFromRemote?: (data: K) => T): Promise<T> {
  const cached = (await cache.getFromCache(url, itemTtl)) as T | null
  if (cached) {
    return cached
  }
  try {
    const response = await fetch(url)
    let data = await response.json()
    if (callbackFormatDataFromRemote) {
      data = callbackFormatDataFromRemote(data)
    }
    cache.saveToCache(url, data)
    return data
  } catch (error) {
    console.error('Error fetching data from', url, error)
    throw error
  }
}
