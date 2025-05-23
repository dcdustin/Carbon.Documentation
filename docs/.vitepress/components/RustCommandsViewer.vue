<script setup lang="ts">
import type { CommandRust } from '@/api/metadata/rust/commands'
import { fetchCommandsRust } from '@/api/metadata/rust/commands'
import AsyncState from '@/components/common/AsyncState.vue'
import InfinitePageScroll from '@/components/common/InfinitePageScroll.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import { Search } from 'lucide-vue-next'
import MiniSearch from 'minisearch'
import { computed, onMounted, shallowRef } from 'vue'
import RustCommandCard from './RustCommandCard.vue'

const isLoading = shallowRef(true)
const error = shallowRef<string | null>(null)

const commands = shallowRef<CommandRust[]>([])
const miniSearch = shallowRef<MiniSearch | null>(null)

const debouncedSearchValue = shallowRef('')

const pageSize = 25

const filteredCommands = computed(() => {
  if (!commands.value?.length) {
    return []
  }

  if (!debouncedSearchValue.value) {
    return commands.value
  }

  // const startTime = performance.now()

  let filtered = commands.value

  if (debouncedSearchValue.value && miniSearch.value) {
    const results = miniSearch.value.search(debouncedSearchValue.value)
    const commandMap = new Map(filtered.map((command) => [command.Name, command]))
    filtered = results.map((result) => commandMap.get(result.Name)).filter(Boolean) as CommandRust[]
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

  miniSearch.value.addAll(commands.value)

  const endTime = performance.now()
  console.log(`Initialized MiniSearch for Rust commands in ${endTime - startTime}ms`)
}

async function loadCommands() {
  try {
    isLoading.value = true
    error.value = null

    const data = await fetchCommandsRust()

    if (!data) {
      throw new Error('No data received from API')
    }

    commands.value = data

    tryLoadMiniSearch()
  } catch (err) {
    console.error('Failed to load commands:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load commands. Please try again later.'
  } finally {
    isLoading.value = false
  }
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
            <RustCommandCard :command="command" />
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
