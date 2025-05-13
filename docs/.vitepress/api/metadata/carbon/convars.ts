import { URL_METDAT_CARB_CONVARS } from '@/api/constants'
import { fetchApiCaching } from '@/api/fetch-api'

export type ConVarsData = ConVar[]

export interface ConVar {
  Name: string
  DisplayName: string
  Help: string
  ForceModded: boolean
  Protected: boolean
}

export async function fetchConVars() {
  const url = URL_METDAT_CARB_CONVARS

  const data = await fetchApiCaching<ConVarsData>(url)

  return data
}
