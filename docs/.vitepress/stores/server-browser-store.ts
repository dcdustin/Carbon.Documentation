import { CompressedTag, RegionTag } from '@/api/misc/server-list'
import { ref, shallowRef } from 'vue'

export const store = {
  searchValue: shallowRef(''),
  useBasicSearch: ref<boolean>(false),
  chosenRegionTags: shallowRef<RegionTag | 'All'>('All'),
  chosenCompressedTagsOr: ref<CompressedTag[]>([]),
  chosenCompressedTagsAnd: ref<CompressedTag[]>([]),
  playersRangeMin: ref(0),
  playersRangeMax: ref(-1),
  chosenRustVersions: ref<number[]>([]),
}
