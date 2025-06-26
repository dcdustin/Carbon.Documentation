import { shallowRef } from 'vue'

export const store = {
  chosenCategory: shallowRef('All'),
  showOxideHooks: shallowRef(true),
  showCarbonHooks: shallowRef(true),
  searchValue: shallowRef(''),
  useBasicSearch: shallowRef(false),
}
