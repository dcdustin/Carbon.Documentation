<script setup lang="ts">
import { Blueprint, fetchBlueprints } from '@/api/metadata/rust/blueprints'
import AsyncState from '@/components/common/AsyncState.vue'
import InfinitePageScroll from '@/components/common/InfinitePageScroll.vue'
import OptionSelector from '@/components/common/OptionSelector.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import { getItemCategoryNumber, getItemCategoryText } from '@/shared/constants'
import { store } from '@/stores/blueprints-store'
import { Search } from 'lucide-vue-next'
import MiniSearch from 'minisearch'
import { computed, onMounted, shallowRef } from 'vue'
import BlueprintCard from './BlueprintCard.vue'

const isLoading = shallowRef(true)
const error = shallowRef<string | null>(null)

const blueprints = shallowRef<Blueprint[]>([])
const miniSearch = shallowRef<MiniSearch | null>(null)

const categories = shallowRef<string[]>([])
const selectedCategory = store.chosenCategory

const debouncedSearchValue = shallowRef('')

const pageSize = 10

const filteredBlueprints = computed(() => {
  if (!blueprints.value?.length) {
    return []
  }

  if (!debouncedSearchValue.value && selectedCategory.value == 'All') {
    return blueprints.value
  }

  // const startTime = performance.now()

  let filtered = blueprints.value

  if (selectedCategory.value != 'All') {
    const categoryNumber = getItemCategoryNumber(selectedCategory.value)
    filtered = filtered.filter((blueprint) => blueprint.Item.Category == categoryNumber)
  }

  const searchAsNumber = Number(debouncedSearchValue.value)
  if (!isNaN(searchAsNumber) && searchAsNumber) {
    const blueprint = filtered.filter((blueprint) => blueprint.Item.Id == searchAsNumber)
    if (blueprint.length > 0) {
      return blueprint
    }
  }

  if (debouncedSearchValue.value && miniSearch.value) {
    const results = miniSearch.value.search(debouncedSearchValue.value)
    const blueprintMap = new Map(filtered.map((blueprint) => [blueprint.Item.Id, blueprint]))
    filtered = results.map((result) => blueprintMap.get(result['Item.Id'])).filter(Boolean) as Blueprint[]
  }

  // const endTime = performance.now()
  // console.log(`Filtered commands in ${endTime - startTime}ms`)

  return filtered
})

function tryLoadMiniSearch() {
  const startTime = performance.now()

  // should be extracted and cached...
  miniSearch.value = new MiniSearch({
    idField: 'Item.Id',
    fields: ['Item.ShortName', 'Item.DisplayName', 'Item.Description'],
    storeFields: ['Item.Id'],
    searchOptions: {
      prefix: true,
      boost: {
        'Item.ShortName': 3,
        'Item.DisplayName': 2,
        'Item.Description': 1,
      },
      fuzzy: (term) => {
        if (term == 'Item.ShortName') {
          return 0.1
        }
        return 0.2
      },
    },
    tokenize: (text, fieldName) => {
      const SPACE_OR_PUNCTUATION = /[\n\r\p{Z}\p{P}_]+/u // from minisearch source + underscores
      const processed = text
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .toLowerCase()
        .split(SPACE_OR_PUNCTUATION)
        .filter((token) => token.length > 1)

      if (fieldName == 'Item.ShortName') {
        processed.push(text.toLowerCase())
      }

      return [...new Set(processed)]
    },
    extractField: (obj, fieldName) => {
      switch (fieldName) {
        case 'Item.Id':
          return obj.Item.Id
        case 'Item.ShortName':
          return obj.Item.ShortName
        case 'Item.DisplayName':
          return obj.Item.DisplayName
        case 'Item.Description':
          return obj.Item.Description
        default:
          return obj[fieldName]
      }
    },
  })

  miniSearch.value.addAll(blueprints.value)

  const endTime = performance.now()
  console.log(`Initialized MiniSearch for blueprints in ${endTime - startTime}ms`)
}

async function loadBlueprints() {
  try {
    isLoading.value = true
    error.value = null

    const data = await fetchBlueprints()

    if (!data) {
      throw new Error('No data received from API')
    }

    blueprints.value = data

    categories.value = [
      ...new Set(
        [...new Set(data.map((blueprint) => blueprint.Item.Category).sort((a, b) => a - b))].map((category) =>
          getItemCategoryText(category as number)
        )
      ),
    ]

    tryLoadMiniSearch()
  } catch (err) {
    console.error('Failed to load blueprints:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load blueprints. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  loadBlueprints()
})
</script>

<template>
  <AsyncState :isLoading="isLoading" :error="error" loadingText="Loading blueprints...">
    <SearchBar
      v-model="debouncedSearchValue"
      placeholder="Search blueprints..."
      class="sticky min-[960px]:top-20 top-16 z-10"
    >
      <template #icon>
        <Search class="text-gray-400" :size="20" />
      </template>
      <template #right>
        <OptionSelector v-model="selectedCategory" :options="['All', ...categories]" label="Category:" />
      </template>
    </SearchBar>
    <div v-if="filteredBlueprints && filteredBlueprints.length">
      <div class="flex flex-col gap-5 mt-4">
        <InfinitePageScroll :list="filteredBlueprints" :pageSize="pageSize" v-slot="{ renderedList }">
          <div class="fixed bottom-4 sm:right-4 sm:left-auto left-1/2 z-10">
            <div
              class="text-sm text-gray-500 bg-zinc-100/40 dark:bg-gray-800/40 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              Rendering {{ renderedList.length }} of {{ filteredBlueprints.length }} filtered blueprints,
              {{ blueprints.length }} total blueprints.
            </div>
          </div>
          <div v-for="blueprint in renderedList" :key="blueprint.Item.Id" :id="blueprint.Item.ShortName">
            <BlueprintCard :blueprint="blueprint" />
          </div>
        </InfinitePageScroll>
      </div>
    </div>
    <div v-else class="py-8 flex flex-col items-center justify-center gap-2">
      <p>No blueprints found matching your search</p>
      <p v-if="blueprints && blueprints.length == 0" class="text-sm">
        Debug: No blueprints loaded. Check console for errors.
      </p>
      <p v-else-if="debouncedSearchValue" class="text-sm">
        Debug: Search query "{{ debouncedSearchValue }}" returned no results.
      </p>
    </div>
  </AsyncState>
</template>
