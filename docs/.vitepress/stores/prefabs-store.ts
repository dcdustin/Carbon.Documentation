import MiniSearch, { CombinationOperator } from 'minisearch'
import { shallowRef } from 'vue'

export const store = {
  searchType: shallowRef<CombinationOperator>('OR'),
  searchValue: shallowRef(''),
  miniSearch: shallowRef<MiniSearch | null>(null),
}
