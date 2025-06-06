import { CombinationOperator } from 'minisearch'
import { shallowRef } from 'vue'

export const store = {
  searchType: shallowRef<CombinationOperator>('OR'),
  searchValue: shallowRef(''),
}
