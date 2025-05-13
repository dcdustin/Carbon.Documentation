import { URL_METDAT_RUST_COMMANDS } from '@/api/constants'
import { fetchApiCaching } from '@/api/fetch-api'

// fix naming issues with first letter being uppercase

export interface Command {
  Name: string
  Help: string
  ServerUser: boolean
  Client: boolean
  Server: boolean
}

export type CommandsData = Command[]

export async function fetchCommands() {
  const url = URL_METDAT_RUST_COMMANDS

  const data = await fetchApiCaching<CommandsData>(url)

  return data
}
