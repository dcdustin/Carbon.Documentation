import { URL_SERVER_LIST } from '../constants'
import { fetchApiCaching } from '../fetch-api'

export interface Server {
  hostname: string
  map: string
  players: number
  maxplayers: number
  tags: string
  ip: string
  port: number
  query_port: number
}

export interface ServerList {
  Servers: Server[]
  Version: number
  PackedTimestamp: number
}

export async function fetchServerList() {
  const url = URL_SERVER_LIST

  const data = await fetchApiCaching<ServerList>(url)

  return data
}
