<script setup lang="ts">
import { computed, onMounted, provide, readonly, shallowRef } from 'vue'
import { Database, ExternalLink, Loader2, Search } from 'lucide-vue-next'
import { VPBadge } from 'vitepress/theme'

import { URL_METDAT_CARB_HOOKS } from '@/api/constants'
import '../theme/style.css'
import { fetchHooks } from '@/api/metadata/carbon/hooks'
import type { Hook } from '@/api/metadata/carbon/hooks'
import { getSingletonHighlighter } from 'shiki'
import type { Highlighter } from 'shiki'
import SearchBar from './Hooks/SearchBar.vue'
import CheckBox from './Hooks/CheckBox.vue'
import OptionSelector from './Hooks/OptionSelector.vue'
import InfinitePageScroll from './Hooks/InfinitePageScroll.vue'
import HookCard from './Hooks/HookCard.vue'

const isLoading = shallowRef(true)
const error = shallowRef<string | null>(null)

const highlighter = shallowRef<Highlighter | null>(null)
provide('highlighter', readonly(highlighter))

const hooks = shallowRef<Hook[]>([])

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

  let filtered = hooks.value

  if (selectedCategory.value && selectedCategory.value != 'All') {
    filtered = filtered.filter((hook) => hook.Category == selectedCategory.value)
  }

  if (showOxideHooks.value != showCarbonHooks.value) {
    filtered = filtered.filter(
      (hook) => hook.OxideCompatible == showOxideHooks.value && hook.OxideCompatible != showCarbonHooks.value
    )
  } else if (!showOxideHooks.value && !showCarbonHooks.value) {
    filtered = []
  }

  // TODO: use minisearch instead

  if (debouncedSearchValue.value) {
    const searchLower = debouncedSearchValue.value.toLowerCase()
    const searchNumber = Number(searchLower)
    filtered = filtered.filter((hook) => {
      return (
        (hook.Name && hook.Name.toLowerCase().includes(searchLower)) ||
        (hook.Descriptions && hook.Descriptions.some((desc) => desc.toLowerCase().includes(searchLower))) ||
        hook.Id == searchNumber
      )
    })
  }

  return filtered
})

const loadHooks = async () => {
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

    if (flatHooks.length == 0) {
      throw new Error('No hooks found in the data')
    }

    hooks.value = flatHooks
    categories.value = Array.from(data.keys())
  } catch (err) {
    console.error('Failed to load hooks:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load hooks. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

const getSanitizedAnchor = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

onMounted(async () => {
  loadHooks()
  try {
    highlighter.value = await getSingletonHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['csharp'],
    })
  } catch (err) {
    console.error('Failed to load highlighter:', err)
  }
})
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <div class="flex flex-col gap-4 mb-4">
      <h1 class="text-2xl font-bold">Carbon Hooks Reference</h1>
      <p>
        This section contains a comprehensive list of all hooks available in Carbon. Each hook is listed with
        its name, category, and compatibility information.
      </p>
      <p>
        By default, if hooks are not <VPBadge type="danger" text="Static" /> or
        <VPBadge type="danger" text="Patch" />, they're dynamically applied upon plugin subscription,
        otherwise inactive.
      </p>
      <div class="flex items-center gap-2">
        <a :href="URL_METDAT_CARB_HOOKS" target="_blank" class="flex items-center gap-2">
          <Database :size="16" />
          Hooks API
          <ExternalLink :size="14" class="opacity-80" />
        </a>
      </div>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-8 gap-2">
      <Loader2 class="animate-spin" :size="24" />
      <span>Loading hooks...</span>
    </div>

    <div v-else-if="error" class="flex flex-col items-center justify-center py-8 text-center">
      <div class="text-red-500 mb-4">{{ error }}</div>
    </div>

    <div v-else>
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
    </div>
  </div>
</template>

<style scoped>
.VPBadge {
  margin-left: 0;
  transform: none;
}
</style>
