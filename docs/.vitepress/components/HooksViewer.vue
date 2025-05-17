<script setup lang="ts">
import { computed, onMounted, provide, readonly, shallowRef } from 'vue'
import { Search } from 'lucide-vue-next'

import { fetchHooks } from '@/api/metadata/carbon/hooks'
import type { Hook } from '@/api/metadata/carbon/hooks'
import { getSingletonHighlighter } from 'shiki'
import type { Highlighter } from 'shiki'
import SearchBar from './Hooks/SearchBar.vue'
import CheckBox from './Hooks/CheckBox.vue'
import OptionSelector from './Hooks/OptionSelector.vue'
import InfinitePageScroll from './Hooks/InfinitePageScroll.vue'
import HookCard from './Hooks/HookCard.vue'
import AsyncState from './Hooks/AsyncState.vue'
import MiniSearch from 'minisearch'

const isLoading = shallowRef(true)
const error = shallowRef<string | null>(null)

const highlighter = shallowRef<Highlighter | null>(null)
provide('highlighter', readonly(highlighter))

const hooks = shallowRef<Hook[]>([])
const miniSearch = shallowRef<MiniSearch | null>(null)

const categories = shallowRef<string[]>([])
const selectedCategory = shallowRef('All')
const showOxideHooks = shallowRef(true)
const showCarbonHooks = shallowRef(true)

const debouncedSearchValue = shallowRef('')

const pageSize = 25

const filteredHooks = computed(() => {
  if (!hooks.value?.length) {
    return []
  }
  if (!showOxideHooks.value && !showCarbonHooks.value) {
    return []
  }

  if (
    !debouncedSearchValue.value &&
    selectedCategory.value == 'All' &&
    showOxideHooks.value == showCarbonHooks.value
  ) {
    return hooks.value
  }

  // const startTime = performance.now()

  let filtered = hooks.value

  if (selectedCategory.value != 'All') {
    filtered = filtered.filter((hook) => hook.Category == selectedCategory.value)
  }

  if (showOxideHooks.value != showCarbonHooks.value) {
    filtered = filtered.filter(
      (hook) => hook.OxideCompatible == showOxideHooks.value && hook.OxideCompatible != showCarbonHooks.value
    )
  }

  if (debouncedSearchValue.value && miniSearch.value) {
    const results = miniSearch.value.search(debouncedSearchValue.value)
    const hookMap = new Map(filtered.map((hook) => [hook.FullName, hook]))
    filtered = results.map((result) => hookMap.get(result.FullName)) as Hook[]
  }

  // const endTime = performance.now()
  // console.log(`Filtered hooks in ${endTime - startTime}ms`)

  return filtered
})

function getSanitizedAnchor(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function tryLoadMiniSearch() {
  const startTime = performance.now()
  miniSearch.value = new MiniSearch({
    idField: 'FullName',
    fields: ['Id', 'Name', 'FullName', 'Descriptions', 'MethodName', 'TargetName', 'AssemblyName'],
    storeFields: ['FullName'],
    searchOptions: {
      boost: {
        Id: 4,
        FullName: 3,
        Name: 2.5,
        Descriptions: 2,
        MethodName: 1.4,
        TargetName: 1.2,
        AssemblyName: 1,
      },
      fuzzy: 0.2,
      prefix: true,
    },
  })
  miniSearch.value.addAll(hooks.value)
  const endTime = performance.now()
  console.log(`Initialized MiniSearch in ${endTime - startTime}ms`)
}

async function loadHooks() {
  try {
    isLoading.value = true
    error.value = null

    const data = await fetchHooks()

    if (!data) {
      throw new Error('No data received from API')
    }

    const flatHooks: Hook[] = []
    data.forEach((hooks) => {
      flatHooks.push(...hooks)
    })

    if (!flatHooks) {
      throw new Error('No hooks found in the data')
    }

    categories.value = Array.from(data.keys())
    hooks.value = flatHooks

    await tryLoadMiniSearch()
  } catch (err) {
    console.error('Failed to load hooks:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load hooks. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

async function tryLoadHighlighter() {
  try {
    highlighter.value = await getSingletonHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['csharp'],
    })
  } catch (err) {
    console.error('Failed to load highlighter:', err)
  }
}

onMounted(async () => {
  await Promise.all([loadHooks(), tryLoadHighlighter()])
})
</script>

<template>
  <AsyncState :isLoading="isLoading" :error="error" loadingText="Loading hooks...">
    <SearchBar
      v-model="debouncedSearchValue"
      placeholder="Search hooks..."
      class="sticky min-[960px]:top-20 top-16 z-10"
    >
      <template #icon>
        <Search class="text-gray-400" :size="20" />
      </template>
      <template #right>
        <div class="flex flex-row gap-4">
          <OptionSelector v-model="selectedCategory" :options="['All', ...categories]" label="Category:" />
          <div class="flex flex-row items-center gap-2">
            <CheckBox v-model="showOxideHooks">
              <template #default>
                <span class="text-sm">Oxide</span>
              </template>
            </CheckBox>
            <CheckBox v-model="showCarbonHooks">
              <template #default>
                <span class="text-sm">Carbon</span>
              </template>
            </CheckBox>
          </div>
        </div>
      </template>
    </SearchBar>
    <div v-if="filteredHooks && filteredHooks.length">
      <div class="flex flex-col gap-5 mt-4">
        <InfinitePageScroll :list="filteredHooks" :pageSize="pageSize" v-slot="{ renderedList }">
          <div class="fixed bottom-4 sm:right-4 sm:left-auto left-1/2 z-10">
            <div
              class="text-sm text-gray-500 bg-zinc-100/40 dark:bg-gray-800/40 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              Rendering {{ renderedList.length }} of {{ filteredHooks.length }} filtered hooks,
              {{ hooks.length }} total hooks.
            </div>
          </div>
          <div v-for="hook in renderedList" :key="hook.FullName" :id="getSanitizedAnchor(hook.FullName)">
            <HookCard :hook="hook" />
          </div>
        </InfinitePageScroll>
      </div>
    </div>
    <div v-else class="py-8 flex flex-col items-center justify-center gap-2">
      <p>No hooks found matching your search</p>
      <p v-if="hooks && hooks.length == 0" class="text-sm">
        Debug: No hooks loaded. Check console for errors.
      </p>
      <p v-else-if="debouncedSearchValue" class="text-sm">
        Debug: Search query "{{ debouncedSearchValue }}" returned no results.
      </p>
    </div>
  </AsyncState>
</template>
