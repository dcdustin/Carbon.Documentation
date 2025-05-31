import { CACHE_TIME_SERVER_LIST_TTL, URL_SERVER_LIST } from '../constants'
import { fetchApiCaching } from '../fetch-api'

interface ServerApi {
  hostname: string
  map: string | null
  players: number
  maxplayers: number
  tags: string | null
  ip: string
  port: number
  query_port: number
}

interface ServerListApi {
  Servers: ServerApi[]
  Version: number
  PackedTimestamp: number
}

export interface Server extends ServerApi {
  id: number
}

export interface ServerList {
  Servers: Server[]
  Version: number
  PackedTimestamp: number
}

export async function fetchServerList() {
  const url = URL_SERVER_LIST

  const data = await fetchApiCaching<ServerList, ServerListApi>(url, CACHE_TIME_SERVER_LIST_TTL, (data) => {
    const serverList: Server[] = data.Servers.map((server, index) => ({ ...server, id: index }))
    const serverListData: ServerList = { ...data, Servers: serverList }
    return serverListData
  })

  return data
}
