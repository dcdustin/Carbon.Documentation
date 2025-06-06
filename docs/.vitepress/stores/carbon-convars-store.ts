import { shallowRef } from 'vue'

export const store = {
  isShowForcesModded: shallowRef(true),
  isShowRegularOnes: shallowRef(true),
  searchValue: shallowRef(''),
}
