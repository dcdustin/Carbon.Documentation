import { cache } from './cache'

export async function fetchApiCaching<T>(url: string): Promise<T> {
  const cached = (await cache.getFromCache(url)) as T | null
  if (cached) {
    return cached
  }
  try {
    const response = await fetch(url)
    const data = await response.json()
    cache.saveToCache(url, data)
    return data
  } catch (error) {
    console.error('Error fetching data from', url, error)
    throw error
  }
}
