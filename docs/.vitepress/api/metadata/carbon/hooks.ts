import { URL_METDAT_CARB_HOOKS } from '@/api/constants'
import { fetchApiCaching } from '@/api/fetch-api'

export interface Hook {
  id: number
  name: string
  fullName: string
  category: string
  parameters: Parameter[]
  flags: number
  descriptions: string[]
  carbonCompatible: boolean
  oxideCompatible: boolean
  methodSource: string
  parametersText: string
  targetName: string
  methodName: string
  assemblyName: string
  returnTypeName: string
}

export interface Parameter {
  name: string
  optional: boolean
  typeName: string
  typeFriendly: string
}

export type HooksData = Map<string, Hook[]>

export async function fetchHooks() {
  const url = URL_METDAT_CARB_HOOKS

  const data = await fetchApiCaching<{ [key: string]: Hook[] }>(url)

  const actualMap: HooksData = new Map()

  Object.keys(data).forEach((key) => {
    actualMap.set(key, data[key])
  })

  return actualMap
}
