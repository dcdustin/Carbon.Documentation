import { CACHE_TIME_ITEM_TTL, URL_METDAT_RUST_CONVARS } from '@/api/constants'
import { fetchApiCaching } from '@/api/fetch-api'

// fix naming issues with first letter being uppercase
export interface ConVarRust {
  Name: string
  Help: string | null
  Type: string
  Saved: boolean
  ServerAdmin: boolean
  ServerUser: boolean
  Clientside: boolean
  Serverside: boolean
  DefaultValue: number
}

export type ConVarsRustData = ConVarRust[]

export async function fetchConVarsRust() {
  const url = URL_METDAT_RUST_CONVARS

  const data = await fetchApiCaching<ConVarsRustData>(url, CACHE_TIME_ITEM_TTL)

  return data
}
