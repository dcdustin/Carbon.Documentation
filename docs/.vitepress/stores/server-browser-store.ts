import { CompressedTag, RegionTag } from '@/api/misc/server-list'
import { ref, shallowRef } from 'vue'

export const store = {
  searchValue: shallowRef(''),
  chosenRegionTags: shallowRef<RegionTag | 'All'>('All'),
  chosenCompressedTags: ref<CompressedTag[]>([]),
}
