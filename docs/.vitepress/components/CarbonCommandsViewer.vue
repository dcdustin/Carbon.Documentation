<script setup lang="ts">
import type { CommandCarbon } from '@/api/metadata/carbon/commands'
import { fetchCommandsCarbon } from '@/api/metadata/carbon/commands'
import AsyncState from '@/components/common/AsyncState.vue'
import InfinitePageScroll from '@/components/common/InfinitePageScroll.vue'
import OptionSelector from '@/components/common/OptionSelector.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import { store } from '@/stores/carbon-commands-store'
import { Search } from 'lucide-vue-next'
import MiniSearch from 'minisearch'
import { computed, onMounted, shallowRef } from 'vue'
import CommandCard from './CarbonCommandCard.vue'

const isLoading = shallowRef(true)
const error = shallowRef<string | null>(null)

const commands = shallowRef<CommandCarbon[]>([])
const miniSearch = shallowRef<MiniSearch | null>(null)

const categories = shallowRef<string[]>([])
const selectedCategory = store.chosenCategory

const debouncedSearchValue = shallowRef('')

const pageSize = 25

const filteredCommands = computed(() => {
  if (!commands.value?.length) {
    return []
  }

  if (!debouncedSearchValue.value && selectedCategory.value == 'All') {
    return commands.value
  }

  // const startTime = performance.now()

  let filtered = commands.value

  if (selectedCategory.value != 'All') {
    filtered = filtered.filter((command) => getCommandTypeText(command.AuthLevel) == selectedCategory.value)
  }

  if (debouncedSearchValue.value && miniSearch.value) {
    const results = miniSearch.value.search(debouncedSearchValue.value)
    const commandMap = new Map(filtered.map((command) => [command.Name, command]))
    filtered = results.map((result) => commandMap.get(result.Name)).filter(Boolean) as CommandCarbon[]
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
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .toLowerCase()
        .split(SPACE_OR_PUNCTUATION)
        .filter((token) => token.length > 1)

      if (fieldName == 'Name') {
        processed.push(text.toLowerCase())
      }

      return [...new Set(processed)]
    },
  })

  miniSearch.value.addAll(commands.value)

  const endTime = performance.now()
  console.log(`Initialized MiniSearch for Carbon commands in ${endTime - startTime}ms`)
}

async function loadCommands() {
  try {
    isLoading.value = true
    error.value = null

    const data = await fetchCommandsCarbon()

    if (!data) {
      throw new Error('No data received from API')
    }

    commands.value = data

    categories.value = [
      ...new Set([...new Set(data.map((command) => command.AuthLevel))].map(getCommandTypeText)),
    ]

    tryLoadMiniSearch()
  } catch (err) {
    console.error('Failed to load commands:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load commands. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

function getCommandTypeText(authLevel: number) {
  if (authLevel <= 0) {
    return 'User'
  }
  if (authLevel == 1) {
    return 'Moderator'
  }
  return 'Admin'
}

onMounted(async () => {
  loadCommands()
})
</script>

<template>
  <AsyncState :isLoading="isLoading" :error="error" loadingText="Loading commands...">
    <SearchBar
      v-model="debouncedSearchValue"
      placeholder="Search commands..."
      class="sticky min-[960px]:top-20 top-16 z-10"
    >
      <template #icon>
        <Search class="text-gray-400" :size="20" />
      </template>
      <template #right>
        <OptionSelector v-model="selectedCategory" :options="['All', ...categories]" label="Category:" />
      </template>
    </SearchBar>
    <div v-if="filteredCommands && filteredCommands.length">
      <div class="flex flex-col gap-5 mt-4">
        <InfinitePageScroll :list="filteredCommands" :pageSize="pageSize" v-slot="{ renderedList }">
          <div class="fixed bottom-4 sm:right-4 sm:left-auto left-1/2 z-10">
            <div
              class="text-sm text-gray-500 bg-zinc-100/40 dark:bg-gray-800/40 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              Rendering {{ renderedList.length }} of {{ filteredCommands.length }} filtered commands,
              {{ commands.length }} total commands.
            </div>
          </div>
          <div v-for="command in renderedList" :key="command.Name" :id="command.Name">
            <CommandCard :command="command" :commandTypeText="getCommandTypeText(command.AuthLevel)" />
          </div>
        </InfinitePageScroll>
      </div>
    </div>
    <div v-else class="py-8 flex flex-col items-center justify-center gap-2">
      <p>No commands found matching your search</p>
      <p v-if="commands && commands.length == 0" class="text-sm">
        Debug: No commands loaded. Check console for errors.
      </p>
      <p v-else-if="debouncedSearchValue" class="text-sm">
        Debug: Search query "{{ debouncedSearchValue }}" returned no results.
      </p>
    </div>
  </AsyncState>
</template>
