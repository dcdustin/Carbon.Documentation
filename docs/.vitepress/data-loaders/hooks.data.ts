import { defineLoader } from 'vitepress'
import { fetchHooks, Hook } from '../api/metadata/carbon/hooks'

declare const data: Hook[]
export { data }

export default defineLoader({
  async load(): Promise<Hook[]> {
    const hooks = await fetchHooks()
    return (
      hooks
        .values()
        .flatMap((hooks) => hooks)
        .take(25)
        .toArray() ?? []
    )
  },
})
