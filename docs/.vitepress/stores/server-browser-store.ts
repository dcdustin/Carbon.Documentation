import { CompressedTag, RegionTag } from '@/api/misc/server-list'
import MiniSearch from 'minisearch'
import { ref, shallowRef } from 'vue'

export const store = {
  searchValue: shallowRef(''),
  miniSearch: shallowRef<MiniSearch | null>(null),
  useBasicSearch: ref<boolean>(false),
  chosenRegionTags: ref<RegionTag[]>([]),
  chosenCompressedTagsOr: ref<CompressedTag[]>([]),
  chosenCompressedTagsAnd: ref<CompressedTag[]>([]),
  playersRangeMin: ref(0),
  playersRangeMax: ref(-1),
  chosenRustVersions: ref<number[]>([]),
}
