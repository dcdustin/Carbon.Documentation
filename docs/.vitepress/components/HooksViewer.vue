<script setup lang="ts">
import type { Hook } from '@/api/metadata/carbon/hooks'
import { fetchHooks } from '@/api/metadata/carbon/hooks'
import AsyncState from '@/components/common/AsyncState.vue'
import CheckBox from '@/components/common/CheckBox.vue'
import InfinitePageScroll from '@/components/common/InfinitePageScroll.vue'
import OptionSelector from '@/components/common/OptionSelector.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import { store } from '@/stores/hooks-store'
import { Search } from 'lucide-vue-next'
import MiniSearch from 'minisearch'
import type { Highlighter } from 'shiki'
import { getSingletonHighlighter } from 'shiki'
import { computed, onMounted, provide, readonly, shallowRef } from 'vue'
import HookCard from './HookCard.vue'

const isLoading = shallowRef(true)
const error = shallowRef<string | null>(null)

const highlighter = shallowRef<Highlighter | null>(null)
provide('highlighter', readonly(highlighter))

const hooks = shallowRef<Hook[]>([])
const miniSearch = shallowRef<MiniSearch | null>(null)

const categories = shallowRef<string[]>([])
const selectedCategory = store.chosenCategory
const showOxideHooks = store.showOxideHooks
const showCarbonHooks = store.showCarbonHooks

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
    filtered = filtered.filter((hook) => hook.OxideCompatible == showOxideHooks.value)
  }

  const searchAsNumber = Number(debouncedSearchValue.value)
  if (!isNaN(searchAsNumber) && searchAsNumber) {
    const hook = filtered.filter((hook) => hook.Id == searchAsNumber)
    if (hook.length > 0) {
      return hook
    }
  }

  if (debouncedSearchValue.value && miniSearch.value) {
    const results = miniSearch.value.search(debouncedSearchValue.value)
    const hookMap = new Map(filtered.map((hook) => [hook.FullName, hook]))
    filtered = results.map((result) => hookMap.get(result.FullName)).filter(Boolean) as Hook[]
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

function tryLoadMiniSearch() {
  const startTime = performance.now()

  // should be extracted and cached...
  miniSearch.value = new MiniSearch({
    idField: 'FullName',
    fields: ['Name', 'FullName', 'joinedDescriptions', 'MethodName', 'TargetName', 'AssemblyName'],
    storeFields: ['FullName'],
    searchOptions: {
      prefix: true,
      boost: {
        Name: 4,
        FullName: 3.5,
        joinedDescriptions: 2.5,
        MethodName: 1.5,
        TargetName: 1.3,
        AssemblyName: 1,
      },
      fuzzy: (term) => {
        if (term == 'Name' || term == 'FullName' || term == 'joinedDescriptions') {
          return 0.1
        }
        return 0.2
      },
    },
    tokenize: (text, fieldName) => {
      const SPACE_OR_PUNCTUATION = /[\n\r\p{Z}\p{P}]+/u // from minisearch source
      const processed = text
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .toLowerCase()
        .split(SPACE_OR_PUNCTUATION)
        .filter((token) => token.length > 1)

      if (
        fieldName == 'Name' ||
        fieldName == 'FullName' ||
        fieldName == 'MethodName' ||
        fieldName == 'TargetName'
      ) {
        processed.push(text.toLowerCase())
      }

      if (fieldName == 'Name') {
        const uppercase = text.match(/[A-Z]/g)
        if (uppercase) {
          processed.push(uppercase.join(''))
        }
      }

      return [...new Set(processed)]
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

    tryLoadMiniSearch()
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
