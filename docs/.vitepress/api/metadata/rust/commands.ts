import { CACHE_TIME_ITEM_TTL, URL_METDAT_RUST_COMMANDS } from '@/api/constants'
import { fetchApiCaching } from '@/api/fetch-api'

// fix naming issues with first letter being uppercase
export interface CommandRust {
  Name: string
  Help: string
  ServerUser: boolean
  Client: boolean
  Server: boolean
}

export type CommandsRustData = CommandRust[]

export async function fetchCommandsRust() {
  const url = URL_METDAT_RUST_COMMANDS

  const { data } = await fetchApiCaching<CommandsRustData>(url, CACHE_TIME_ITEM_TTL)

  return data
}
