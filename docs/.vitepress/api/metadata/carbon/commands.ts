import { CACHE_TIME_ITEM_TTL, URL_METDAT_CARB_COMMANDS } from '@/api/constants'
import { fetchApiCaching } from '@/api/fetch-api'

// fix naming issues with first letter being uppercase
export interface CommandCarbon {
  Name: string
  Help: string
  AuthLevel: number
}

export type CommandsCarbonData = CommandCarbon[]

export async function fetchCommandsCarbon() {
  const url = URL_METDAT_CARB_COMMANDS

  const data = await fetchApiCaching<CommandsCarbonData>(url, CACHE_TIME_ITEM_TTL)

  return data
}
