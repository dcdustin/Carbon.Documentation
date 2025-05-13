import { URL_METDAT_RUST_CONVARS } from '@/api/constants'
import { fetchApiCaching } from '@/api/fetch-api'

// fix naming issues with first letter being uppercase

export interface ConVar {
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

export type ConVarsData = ConVar[]

export async function fetchConVars() {
  const url = URL_METDAT_RUST_CONVARS

  const data = await fetchApiCaching<ConVarsData>(url)

  return data
}
