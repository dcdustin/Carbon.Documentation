<script setup lang="ts">
import type { Hook } from '@/api/metadata/carbon/hooks'
import { fetchHooks } from '@/api/metadata/carbon/hooks'
import CheckBox from '@/components/common/CheckBox.vue'
import InfinitePageScroll from '@/components/common/InfinitePageScroll.vue'
import OptionSelector from '@/components/common/OptionSelector.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import { data as initialHooks } from '@/data-loaders/hooks.data'
import { store } from '@/stores/hooks-store'
import { useKeyModifier } from '@vueuse/core'
import { Loader2, Search, SearchSlash } from 'lucide-vue-next'
import MiniSearch from 'minisearch'
import type { Highlighter } from 'shiki'
import { getSingletonHighlighter } from 'shiki'
import { computed, onMounted, provide, readonly, shallowRef } from 'vue'
import HookCard from './HookCard.vue'
import SwitchSearchIcon from './common/SwitchSearchIcon.vue'

const isFetchedRestData = shallowRef(false)
const error = shallowRef<string | null>(null)

const highlighter = shallowRef<Highlighter | null>(null)
provide('highlighter', readonly(highlighter))

const hooks = shallowRef<Hook[]>(initialHooks)
const miniSearch = shallowRef<MiniSearch | null>(null)

const categories = shallowRef<string[]>([])

const selectedCategory = store.chosenCategory
const showOxideHooks = store.showOxideHooks
const showCarbonHooks = store.showCarbonHooks
const debouncedSearchValue = store.searchValue
const useBasicSearch = store.useBasicSearch

const isCtrlPressed = useKeyModifier<boolean>('Control', { initial: false })

const pageSize = 25

const filteredHooks = computed(() => {
  if (!hooks.value?.length) {
    return []
  }
  if (!showOxideHooks.value && !showCarbonHooks.value) {
    return []
  }

  if (!debouncedSearchValue.value && selectedCategory.value == 'All' && showOxideHooks.value == showCarbonHooks.value) {
    return hooks.value
  }

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

  if (debouncedSearchValue.value) {
    if (!miniSearch.value || useBasicSearch.value) {
      const lowerCaseSearchValue = debouncedSearchValue.value.toLowerCase()
      filtered = filtered.filter(
        (hook) =>
          hook.FullName.toLowerCase().includes(lowerCaseSearchValue) ||
          hook.Descriptions?.flatMap((description) => description.toLowerCase()).includes(lowerCaseSearchValue) ||
          hook.MethodName?.toLowerCase().includes(lowerCaseSearchValue) ||
          hook.TargetName?.toLowerCase().includes(lowerCaseSearchValue) ||
          hook.AssemblyName?.toLowerCase().includes(lowerCaseSearchValue)
      )
    } else {
      const results = miniSearch.value.search(debouncedSearchValue.value)
      const hookMap = new Map(filtered.map((hook) => [hook.FullName, hook]))
      filtered = results.map((result) => hookMap.get(result.FullName)).filter(Boolean) as Hook[]
    }
  }

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
    fields: ['FullName', 'Descriptions', 'MethodName', 'TargetName', 'AssemblyName'],
    storeFields: ['FullName'],
    searchOptions: {
      prefix: true,
      boost: {
        FullName: 3.5,
        MethodName: 2,
        TargetName: 1.5,
        AssemblyName: 1.2,
        Descriptions: 1,
      },
      fuzzy: 0.1,
    },
    tokenize: (text, fieldName) => {
      const SPACE_OR_PUNCTUATION = /[\n\r\p{Z}\p{P}]+/u // from minisearch source
      const processed = text
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .toLowerCase()
        .split(SPACE_OR_PUNCTUATION)
        .filter((token) => token.length > 1)

      if (fieldName != 'Descriptions') {
        processed.push(text.toLowerCase())
      }

      if (fieldName == 'FullName') {
        const uppercase = text.split(' ').map((word) => word.match(/[A-Z]/g))
        uppercase.forEach((word) => {
          if (word && word.length > 1) {
            processed.push(word.join(''))
          }
        })
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

    isFetchedRestData.value = true
  } catch (err) {
    console.error('Failed to load hooks:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load hooks. Please try again later.'
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
  tryLoadMiniSearch()
})
</script>

<template>
  <div v-if="error" class="flex flex-col items-center justify-center py-8 text-center">
    <div class="mb-4 text-red-500">{{ error }}</div>
  </div>
  <template v-else>
    <SearchBar v-model="debouncedSearchValue" placeholder="Search hooks..." class="sticky top-16 z-10 min-[960px]:top-20">
      <template #icon>
        <SwitchSearchIcon v-model:useBasicSearch="useBasicSearch" />
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
      <div class="mt-4">
        <InfinitePageScroll :list="filteredHooks" :pageSize="pageSize" v-slot="{ renderedList }">
          <div class="fixed bottom-4 left-1/2 z-10 sm:left-auto sm:right-4">
            <div class="rounded-lg bg-zinc-100/40 px-4 py-2 text-sm text-gray-500 backdrop-blur-sm dark:bg-gray-800/40">
              Rendering {{ renderedList.length }} of {{ filteredHooks.length }} filtered hooks, {{ isFetchedRestData ? hooks.length : '' }}
              <Loader2 v-if="!isFetchedRestData" class="inline animate-spin" :size="16" />
              total hooks
            </div>
          </div>
          <div class="flex flex-col gap-5">
            <template v-for="hook in renderedList" :key="hook.FullName">
              <HookCard :hook="hook" :isCtrlPressed="isCtrlPressed" :id="getSanitizedAnchor(hook.FullName)" />
            </template>
          </div>
          <img
            v-if="isFetchedRestData && renderedList.length == hooks.length && hooks.length > 0"
            src="/misc/cat-d.gif"
            alt="evs"
            class="mx-auto h-10 w-10 animate-bounce"
          />
        </InfinitePageScroll>
      </div>
    </div>
    <div v-else-if="isFetchedRestData && miniSearch" class="flex flex-col items-center justify-center gap-2 py-8">
      <p>No hooks found matching your search</p>
      <p v-if="!hooks || hooks.length == 0" class="text-sm">Debug: No hooks loaded. Check console for errors.</p>
      <p v-else-if="debouncedSearchValue" class="text-sm">Debug: Search query "{{ debouncedSearchValue }}" returned no results.</p>
    </div>
    <div class="mt-8 flex flex-col gap-8 font-semibold">
      <div v-if="!isFetchedRestData" class="flex items-center justify-center gap-2">
        <Loader2 class="animate-spin" :size="24" />
        <span>Loading em...</span>
      </div>
      <div v-if="!miniSearch" class="flex items-center justify-center gap-2">
        <Loader2 class="animate-spin" :size="24" />
        <span>Loading minisearch...</span>
      </div>
    </div>
  </template>
</template>
