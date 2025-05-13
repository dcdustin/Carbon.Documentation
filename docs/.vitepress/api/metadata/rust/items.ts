import { URL_METDAT_RUST_ITEMS } from '@/api/constants'
import { fetchApiCaching } from '@/api/fetch-api'

// fix naming issues with first letter being uppercase
export interface SteamDlcItem {
  AppId: number
  Name: string
}

export interface Item {
  Id: number
  DisplayName: string
  ShortName: string
  Description: string
  Stack: number
  Hidden: boolean
  Flags: number
  Category: number
  Rarity: number
  SteamDlcItem: SteamDlcItem | null
}

export type ItemsData = Item[]

export async function fetchItems() {
  const url = URL_METDAT_RUST_ITEMS

  const data = await fetchApiCaching<ItemsData>(url)

  return data
}
