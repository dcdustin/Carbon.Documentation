import { URL_METDAT_CARB_SWITCHES } from '@/api/constants'
import { fetchApiCaching } from '@/api/fetch-api'

export type SwitchesData = Switch[]

export interface Switch {
  // fix naming issues with first letter being uppercase
  Name: string
  Help: string
}

export async function fetchSwitches() {
  const url = URL_METDAT_CARB_SWITCHES

  const data = await fetchApiCaching<SwitchesData>(url)

  return data
}
