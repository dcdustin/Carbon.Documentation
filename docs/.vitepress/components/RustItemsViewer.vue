<script setup lang="ts">
import { fetchItems, type Item } from '@/api/metadata/rust/items'
import AsyncState from '@/components/common/AsyncState.vue'
import InfinitePageScroll from '@/components/common/InfinitePageScroll.vue'
import OptionSelector from '@/components/common/OptionSelector.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import RustItemCard from '@/components/RustItemCard.vue'
import { getItemCategoryNumber, getItemCategoryText } from '@/shared/constants'
import { store } from '@/stores/rust-items-store'
import { Search } from 'lucide-vue-next'
import MiniSearch from 'minisearch'
import { computed, onMounted, shallowRef } from 'vue'

const isLoading = shallowRef(true)
const error = shallowRef<string | null>(null)

const items = shallowRef<Item[]>([])
const miniSearch = shallowRef<MiniSearch | null>(null)

const categories = shallowRef<string[]>([])

const selectedCategory = store.chosenCategory
const debouncedSearchValue = store.searchValue

const pageSize = 10

const filteredItems = computed(() => {
  if (!items.value?.length) {
    return []
  }

  if (!debouncedSearchValue.value && selectedCategory.value == 'All') {
    return items.value
  }

  //   const startTime = performance.now()

  let filtered = items.value

  if (selectedCategory.value != 'All') {
    const categoryNumber = getItemCategoryNumber(selectedCategory.value)
    filtered = filtered.filter((item) => item.Category == categoryNumber)
  }

  const searchAsNumber = Number(debouncedSearchValue.value)
  if (!isNaN(searchAsNumber) && searchAsNumber) {
    const item = filtered.filter((item) => item.Id == searchAsNumber)
    if (item.length > 0) {
      return item
    }
  }

  if (debouncedSearchValue.value && miniSearch.value) {
    const results = miniSearch.value.search(debouncedSearchValue.value)
    const itemMap = new Map(filtered.map((item) => [item.Id, item]))
    filtered = results.map((result) => itemMap.get(result.Id)).filter(Boolean) as Item[]
  }

  //   const endTime = performance.now()
  //   console.log(`Filtered items in ${endTime - startTime}ms - ${debouncedSearchValue.value}`)

  return filtered
})

function tryLoadMiniSearch() {
  const startTime = performance.now()

  // should be extracted and cached...
  miniSearch.value = new MiniSearch({
    idField: 'Id',
    fields: ['ShortName', 'DisplayName', 'Description', 'ItemMods'],
    storeFields: ['Id'],
    searchOptions: {
      prefix: true,
      boost: {
        ShortName: 4,
        DisplayName: 3,
        Description: 2,
        ItemMods: 1,
      },
      fuzzy: (term) => {
        if (term == 'ShortName' || term == 'ItemMods') {
          return 0.1
        }
        return 0.2
      },
    },
    tokenize: (text, fieldName) => {
      const SPACE_OR_PUNCTUATION = /[\n\r\p{Z}\p{P}_]+/u // from minisearch source + underscores
      const processed = text
        .toLowerCase()
        .split(SPACE_OR_PUNCTUATION)
        .filter((token) => token.length > 1)

      if (fieldName == 'ShortName' || fieldName == 'DisplayName' || !fieldName) {
        processed.push(text.toLowerCase())
      }

      if (fieldName == 'ItemMods') {
        const split = text.split(',')
        split.forEach((word) => {
          processed.push(word.toLowerCase())
        })

        split
          .map((mod) => mod.match(/[A-Z]/g)?.join(''))
          .forEach((mod) => {
            if (mod && mod.length > 1) {
              processed.push(mod)
            }
          })
      }

      return [...new Set(processed)]
    },
  })

  miniSearch.value.addAll(items.value)

  const endTime = performance.now()
  console.log(`Initialized MiniSearch for Rust items in ${endTime - startTime}ms`)
}

async function loadItems() {
  try {
    isLoading.value = true
    error.value = null

    const data = await fetchItems()

    if (!data) {
      throw new Error('No data received from API')
    }

    items.value = data

    categories.value = [...[...new Set(data.map((item) => item.Category))].sort((a, b) => a - b).map(getItemCategoryText)]

    tryLoadMiniSearch()
  } catch (err) {
    console.error('Failed to load items:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load items. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  loadItems()
})
</script>

<template>
  <AsyncState :isLoading="isLoading" :error="error" loadingText="Loading items...">
    <SearchBar v-model="debouncedSearchValue" placeholder="Search items..." class="sticky top-16 z-10 min-[960px]:top-20">
      <template #icon>
        <Search class="text-gray-400" :size="20" />
      </template>
      <template #right>
        <OptionSelector v-model="selectedCategory" :options="['All', ...categories]" label="Category:" />
      </template>
    </SearchBar>
    <div v-if="filteredItems && filteredItems.length">
      <div class="mt-4 flex flex-col gap-6">
        <InfinitePageScroll :list="filteredItems" :pageSize="pageSize" v-slot="{ renderedList }">
          <div class="fixed bottom-4 left-1/2 z-10 sm:left-auto sm:right-4">
            <div class="rounded-lg bg-zinc-100/40 px-4 py-2 text-sm text-gray-500 backdrop-blur-sm dark:bg-gray-800/40">
              Rendering {{ renderedList.length }} of {{ filteredItems.length }} filtered items, {{ items.length }} total items.
            </div>
          </div>
          <div v-for="item in renderedList" :key="item.Id" :id="item.ShortName">
            <RustItemCard :item="item" />
          </div>
        </InfinitePageScroll>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center gap-2 py-8">
      <p>No items found matching your search</p>
      <p v-if="items && items.length == 0" class="text-sm">Debug: No items loaded. Check console for errors.</p>
      <p v-else-if="debouncedSearchValue" class="text-sm">Debug: Search query "{{ debouncedSearchValue }}" returned no results.</p>
    </div>
  </AsyncState>
</template>
