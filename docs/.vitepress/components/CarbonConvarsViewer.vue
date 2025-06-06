<script setup lang="ts">
import type { ConVarCarbon } from '@/api/metadata/carbon/convars'
import { fetchConVarsCarbon } from '@/api/metadata/carbon/convars'
import AsyncState from '@/components/common/AsyncState.vue'
import CheckBox from '@/components/common/CheckBox.vue'
import InfinitePageScroll from '@/components/common/InfinitePageScroll.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import { store } from '@/stores/carbon-convars-store'
import { Search } from 'lucide-vue-next'
import MiniSearch from 'minisearch'
import { computed, onMounted, shallowRef } from 'vue'
import CarbonConvarCard from './CarbonConvarCard.vue'

const isLoading = shallowRef(true)
const error = shallowRef<string | null>(null)

const convars = shallowRef<ConVarCarbon[]>([])
const miniSearch = shallowRef<MiniSearch | null>(null)

const isShowForcesModded = store.isShowForcesModded
const isShowRegularOnes = store.isShowRegularOnes
const debouncedSearchValue = store.searchValue

const pageSize = 25

const filteredConvars = computed(() => {
  if (!convars.value?.length) {
    return []
  }

  if (!debouncedSearchValue.value && !isShowForcesModded.value && !isShowRegularOnes.value) {
    return convars.value
  }

  // const startTime = performance.now()

  let filtered = convars.value

  if (isShowForcesModded.value != isShowRegularOnes.value) {
    filtered = filtered.filter((convar) => convar.ForceModded == isShowForcesModded.value)
  }

  if (debouncedSearchValue.value && miniSearch.value) {
    const results = miniSearch.value.search(debouncedSearchValue.value)
    const convarMap = new Map(filtered.map((convar) => [convar.Name, convar]))
    filtered = results.map((result) => convarMap.get(result.Name)).filter(Boolean) as ConVarCarbon[]
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
    fields: ['Name', 'DisplayName', 'Help'],
    storeFields: ['Name'],
    searchOptions: {
      prefix: true,
      boost: {
        Name: 3,
        DisplayName: 2,
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
  console.log(`Initialized MiniSearch for Carbon convars in ${endTime - startTime}ms`)
}

async function loadConvars() {
  try {
    isLoading.value = true
    error.value = null

    const data = await fetchConVarsCarbon()

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
    <SearchBar
      v-model="debouncedSearchValue"
      placeholder="Search convars..."
      class="sticky min-[960px]:top-20 top-16 z-10"
    >
      <template #icon>
        <Search class="text-gray-400" :size="20" />
      </template>
      <template #right>
        <div class="flex flex-row items-center gap-2">
          <CheckBox v-model="isShowForcesModded">
            <template #default>
              <span class="text-sm">Forces Modded</span>
            </template>
          </CheckBox>
          <CheckBox v-model="isShowRegularOnes">
            <template #default>
              <span class="text-sm">Regular</span>
            </template>
          </CheckBox>
        </div>
      </template>
    </SearchBar>
    <div v-if="filteredConvars && filteredConvars.length">
      <div class="flex flex-col gap-5 mt-4">
        <InfinitePageScroll :list="filteredConvars" :pageSize="pageSize" v-slot="{ renderedList }">
          <div class="fixed bottom-4 sm:right-4 sm:left-auto left-1/2 z-10">
            <div
              class="text-sm text-gray-500 bg-zinc-100/40 dark:bg-gray-800/40 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              Rendering {{ renderedList.length }} of {{ filteredConvars.length }} filtered convars,
              {{ convars.length }} total convars.
            </div>
          </div>
          <div v-for="convar in renderedList" :key="convar.Name" :id="convar.Name">
            <CarbonConvarCard :convar="convar" />
          </div>
        </InfinitePageScroll>
      </div>
    </div>
    <div v-else class="py-8 flex flex-col items-center justify-center gap-2">
      <p>No convars found matching your search</p>
      <p v-if="convars && convars.length == 0" class="text-sm">
        Debug: No convars loaded. Check console for errors.
      </p>
      <p v-else-if="debouncedSearchValue" class="text-sm">
        Debug: Search query "{{ debouncedSearchValue }}" returned no results.
      </p>
    </div>
  </AsyncState>
</template>
