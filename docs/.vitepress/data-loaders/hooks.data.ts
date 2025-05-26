import { defineLoader } from 'vitepress'
import { fetchHooks, Hook } from '../api/metadata/carbon/hooks'

declare const data: Hook[]
export { data }

export default defineLoader({
  async load(): Promise<Hook[]> {
    const hooks = await fetchHooks()
    return hooks.values().next().value?.slice(0, 20) ?? []
  },
})
