import { CompressedTag, RegionTag } from '@/api/misc/server-list'
import { shallowRef } from 'vue'

export const store = {
  searchValue: shallowRef(''),
  chosenRegionTags: shallowRef<RegionTag | 'All'>('All'),
  chosenCompressedTags: shallowRef<CompressedTag[]>([]),
}
