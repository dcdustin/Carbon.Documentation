<script setup lang="ts">
import { fetchPrefabs, type Prefab } from '@/api/metadata/rust/prefabs'
import AsyncState from '@/components/common/AsyncState.vue'
import InfinitePageScroll from '@/components/common/InfinitePageScroll.vue'
import OptionSelector from '@/components/common/OptionSelector.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import PrefabCard from '@/components/PrefabCard.vue'
import { store } from '@/stores/prefabs-store'
import { Search } from 'lucide-vue-next'
import MiniSearch, { SearchOptions } from 'minisearch'
import { computed, onMounted, shallowRef } from 'vue'

const isLoading = shallowRef(true)
const isDataFromCache = shallowRef<boolean | null>(null)
const error = shallowRef<string | null>(null)

const prefabs = shallowRef<Prefab[]>([])

const selectedSearchType = store.searchType
const debouncedSearchValue = store.searchValue
const miniSearch = store.miniSearch

const pageSize = 20

function appendSearch(component: string) {
  debouncedSearchValue.value = `${debouncedSearchValue.value.trim()} ${component}`.trim()
}

const filteredPrefabs = computed(() => {
  if (!prefabs.value?.length) {
    return []
  }

  if (!debouncedSearchValue.value) {
    return prefabs.value
  }

  // const startTime = performance.now()

  let filtered = prefabs.value

  const searchAsNumber = Number(debouncedSearchValue.value)
  if (!isNaN(searchAsNumber) && searchAsNumber) {
    const prefab = filtered.filter((prefab) => prefab.ID == searchAsNumber)
    if (prefab.length > 0) {
      return prefab
    }
  }

  if (debouncedSearchValue.value && miniSearch.value) {
    const searchOptions: SearchOptions = { combineWith: selectedSearchType.value }
    if (selectedSearchType.value == 'AND') {
      searchOptions.tokenize = (text: string) => {
        const SPACES = /[\n\r\s]+/u
        const PARENTHESES = /(\(.+\))/g

        const tokens: string[] = []
        const matches = text.match(PARENTHESES)
        if (matches) {
          matches.forEach((match) => {
            tokens.push(match.slice(1, -1))
          })
        }

        const textWithoutParentheses = text.replace(PARENTHESES, '')
        tokens.push(...textWithoutParentheses.split(SPACES))
        const result = [...new Set(tokens.filter((token) => token.length > 1))]
        return result
      }
      searchOptions.fuzzy = 0
    }
    const results = miniSearch.value.search(debouncedSearchValue.value, searchOptions)
    const prefabMap = new Map(filtered.map((prefab) => [prefab.ID, prefab]))
    filtered = results.map((result) => prefabMap.get(result.ID)).filter(Boolean) as Prefab[]
  }

  // const endTime = performance.now()
  // console.log(`Filtered items in ${endTime - startTime}ms - ${debouncedSearchValue.value}`)

  return filtered
})

function tryLoadMiniSearch() {
  if (miniSearch.value && isDataFromCache.value) {
    console.log('Using previous MiniSearch')
    return
  }

  const startTime = performance.now()

  // should be extracted and cached...
  miniSearch.value = new MiniSearch({
    idField: 'ID',
    fields: ['Name', 'Path', 'Components'],
    storeFields: ['ID'],
    searchOptions: {
      prefix: true,
      boost: {
        Name: 4,
        Components: 2,
        Path: 1,
      },
      fuzzy: 0.1,
    },
    tokenize: (text, fieldName) => {
      const SPACE_OR_PUNCTUATION = /[\n\r\p{Z}\p{P}_]+/u // from minisearch source + underscores
      const processed = text
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .toLowerCase()
        .split(SPACE_OR_PUNCTUATION)
        .filter((token) => token.length > 1)

      processed.push(text.toLowerCase())

      if (text && fieldName == 'Components') {
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

  miniSearch.value.addAll(prefabs.value)

  const endTime = performance.now()
  console.log(`Initialized MiniSearch for Rust prefabs in ${endTime - startTime}ms`)
}

async function loadPrefabs() {
  try {
    isLoading.value = true
    error.value = null

    const { data, isFromCache } = await fetchPrefabs()

    if (!data) {
      throw new Error('No data received from API')
    }

    prefabs.value = data

    isDataFromCache.value = isFromCache
  } catch (err) {
    console.error('Failed to load prefabs:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load prefabs. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await loadPrefabs()
  tryLoadMiniSearch()
})
</script>

<template>
  <AsyncState :isLoading="isLoading" :error="error" loadingText="Loading prefabs...">
    <SearchBar v-model="debouncedSearchValue" placeholder="Search prefabs..." class="sticky top-16 z-10 min-[960px]:top-20">
      <template #icon>
        <Search class="text-gray-400" :size="20" />
      </template>
      <template #right>
        <OptionSelector v-model="selectedSearchType" :options="['OR', 'AND']" label="" />
      </template>
    </SearchBar>
    <div v-if="filteredPrefabs && filteredPrefabs.length">
      <div class="mt-4 flex flex-col gap-6">
        <InfinitePageScroll :list="filteredPrefabs" :pageSize="pageSize" v-slot="{ renderedList }">
          <div class="fixed bottom-4 left-1/2 z-10 sm:left-auto sm:right-4">
            <div class="rounded-lg bg-zinc-100/40 px-4 py-2 text-sm text-gray-500 backdrop-blur-sm dark:bg-gray-800/40">
              Rendering {{ renderedList.length }} of {{ filteredPrefabs.length }} filtered prefabs, {{ prefabs.length }} total prefabs.
            </div>
          </div>
          <div v-for="prefab in renderedList" :key="prefab.ID" :id="prefab.ID.toString()">
            <PrefabCard :prefab="prefab" @search-append="appendSearch" />
          </div>
        </InfinitePageScroll>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center gap-2 py-8">
      <p>No prefabs found matching your search</p>
      <p v-if="prefabs && prefabs.length == 0" class="text-sm">Debug: No prefabs loaded. Check console for errors.</p>
      <p v-else-if="debouncedSearchValue" class="text-sm">Debug: Search query "{{ debouncedSearchValue }}" returned no results.</p>
    </div>
  </AsyncState>
</template>
