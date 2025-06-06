import { shallowRef } from 'vue'

export const store = {
  chosenCategory: shallowRef('All'),
  searchValue: shallowRef(''),
}
