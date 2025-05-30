import { defineLoader } from 'vitepress'
import { fetchServerList, ServerList } from '../api/misc/server-list'

declare const data: ServerList
export { data }

export default defineLoader({
  async load(): Promise<ServerList> {
    const serverList = await fetchServerList()
    serverList.Servers = serverList.Servers.slice(0, 100)
    return serverList
  },
})
