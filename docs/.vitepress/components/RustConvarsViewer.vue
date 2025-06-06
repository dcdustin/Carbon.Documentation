<script setup lang="ts">
import type { ConVarRust } from '@/api/metadata/rust/convars'
import { fetchConVarsRust } from '@/api/metadata/rust/convars'
import AsyncState from '@/components/common/AsyncState.vue'
import InfinitePageScroll from '@/components/common/InfinitePageScroll.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import { store } from '@/stores/rust-convars-store'
import { Search } from 'lucide-vue-next'
import MiniSearch from 'minisearch'
import { computed, onMounted, shallowRef } from 'vue'
import RustConvarCard from './RustConvarCard.vue'

const isLoading = shallowRef(true)
const error = shallowRef<string | null>(null)

const convars = shallowRef<ConVarRust[]>([])
const miniSearch = shallowRef<MiniSearch | null>(null)

const debouncedSearchValue = store.searchValue

const pageSize = 25

const filteredConvars = computed(() => {
  if (!convars.value?.length) {
    return []
  }

  if (!debouncedSearchValue.value) {
    return convars.value
  }

  // const startTime = performance.now()

  let filtered = convars.value

  if (debouncedSearchValue.value && miniSearch.value) {
    const results = miniSearch.value.search(debouncedSearchValue.value)
    const convarMap = new Map(filtered.map((convar) => [convar.Name, convar]))
    filtered = results.map((result) => convarMap.get(result.Name)).filter(Boolean) as ConVarRust[]
  }

  // const endTime = performance.now()
  // console.log(`Filtered commands in ${endTime - startTime}ms`)

  return filtered
})

function tryLoadMiniSearch() {
  const startTime = performance.now()

  // should be extracted and cached...
  miniSearch.value = new MiniSearch({
    idField: 'Name',
    fields: ['Name', 'Help'],
    storeFields: ['Name'],
    searchOptions: {
      prefix: true,
      boost: {
        Name: 3,
        Help: 1,
      },
      fuzzy: (term) => {
        if (term == 'Name') {
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

      if (fieldName != 'Help') {
        processed.push(text.toLowerCase())
      }

      return [...new Set(processed)]
    },
  })

  miniSearch.value.addAll(convars.value)

  const endTime = performance.now()
  console.log(`Initialized MiniSearch for Rust convars in ${endTime - startTime}ms`)
}

async function loadConvars() {
  try {
    isLoading.value = true
    error.value = null

    const data = await fetchConVarsRust()

    if (!data) {
      throw new Error('No data received from API')
    }

    convars.value = data

    tryLoadMiniSearch()
  } catch (err) {
    console.error('Failed to load convars:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load convars. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  loadConvars()
})
</script>

<template>
  <AsyncState :isLoading="isLoading" :error="error" loadingText="Loading convars...">
    <SearchBar v-model="debouncedSearchValue" placeholder="Search convars..." class="sticky top-16 z-10 min-[960px]:top-20">
      <template #icon>
        <Search class="text-gray-400" :size="20" />
      </template>
    </SearchBar>
    <div v-if="filteredConvars && filteredConvars.length">
      <div class="mt-4 flex flex-col gap-5">
        <InfinitePageScroll :list="filteredConvars" :pageSize="pageSize" v-slot="{ renderedList }">
          <div class="fixed bottom-4 left-1/2 z-10 sm:left-auto sm:right-4">
            <div class="rounded-lg bg-zinc-100/40 px-4 py-2 text-sm text-gray-500 backdrop-blur-sm dark:bg-gray-800/40">
              Rendering {{ renderedList.length }} of {{ filteredConvars.length }} filtered convars, {{ convars.length }} total convars.
            </div>
          </div>
          <div v-for="convar in renderedList" :key="convar.Name" :id="convar.Name">
            <RustConvarCard :convar="convar" />
          </div>
        </InfinitePageScroll>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center gap-2 py-8">
      <p>No convars found matching your search</p>
      <p v-if="convars && convars.length == 0" class="text-sm">Debug: No convars loaded. Check console for errors.</p>
      <p v-else-if="debouncedSearchValue" class="text-sm">Debug: Search query "{{ debouncedSearchValue }}" returned no results.</p>
    </div>
  </AsyncState>
</template>
