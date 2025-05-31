<script setup lang="ts">
import { fetchServerList, Server, ServerList } from '@/api/misc/server-list'
import AsyncState from '@/components/common/AsyncState.vue'
import InfinitePageScroll from '@/components/common/InfinitePageScroll.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import { data as initialData } from '@/data-loaders/server-browser.data'
import { store } from '@/stores/server-browser'
import { Search } from 'lucide-vue-next'
import MiniSearch from 'minisearch'
import { computed, onMounted, shallowRef } from 'vue'
import ServerBrowserCard from './ServerBrowserCard.vue'

const serverListData = shallowRef<ServerList | null>(initialData)
const miniSearch = shallowRef<MiniSearch | null>(null)

const isFetchedRestData = shallowRef(false)
const error = shallowRef<string | null>(null)

const debouncedSearchValue = store.searchValue

const pageSize = 25

const filteredServers = computed(() => {
  if (!serverListData.value || !serverListData.value.Servers.length) {
    return []
  }

  let filtered = serverListData.value.Servers

  if (debouncedSearchValue.value) {
    if (miniSearch.value) {
      const results = miniSearch.value.search(debouncedSearchValue.value)
      const serverMap = new Map(filtered.map((server) => [server.id, server]))
      filtered = results.map((result) => serverMap.get(result.id)).filter(Boolean) as Server[]
    } else {
      const lowerCaseSearchValue = debouncedSearchValue.value.toLowerCase()
      filtered = filtered.filter((server) => {
        return server.hostname.toLowerCase().includes(lowerCaseSearchValue)
      })
    }
  }

  return filtered
})

function tryLoadMiniSearch() {
  const startTime = performance.now()

  miniSearch.value = new MiniSearch({
    idField: 'id',
    fields: ['ip_port', 'hostname', 'tags', 'map'],
    searchOptions: {
      prefix: true,
      boost: {
        ip_port: 4,
        hostname: 3,
        tags: 2,
        map: 1,
      },
      fuzzy: 0.069,
    },
    extractField: (document, fieldName) => {
      if (fieldName == 'ip_port') {
        return `${document.ip}:${document.port}`
      }
      return document[fieldName as keyof Server] as string
    },
    tokenize: (text, fieldName) => {
      const SPACE_OR_PUNCTUATION = /[\n\r\p{Z}\p{P}|]+/u // from minisearch source + pipes
      if (fieldName == 'ip_port') {
        return [text, ...text.split(':')]
      }
      if (fieldName == 'tags') {
        return text.split(',').map((tag) => tag.trim())
      }

      const processed = text
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .toLowerCase()
        .split(SPACE_OR_PUNCTUATION)
        .filter((token) => token.length > 1)

      processed.push(text.toLowerCase())

      return [...new Set(processed)]
    },
  })

  miniSearch.value.addAll(serverListData.value?.Servers ?? [])

  const endTime = performance.now()
  console.log(`Initialized MiniSearch for server list in ${endTime - startTime}ms`)
}

async function loadServers() {
  try {
    error.value = null

    const data = await fetchServerList()

    if (!data) {
      throw new Error('No data received from API')
    }

    serverListData.value = data

    isFetchedRestData.value = true

    tryLoadMiniSearch()
  } catch (err) {
    console.error('Failed to load servers:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load servers. Please try again later.'
  }
}

onMounted(async () => {
  await loadServers()
})
</script>

<template>
  <AsyncState :isLoading="false" :error="error" loadingText="Loading servers...">
    <SearchBar v-model="debouncedSearchValue" placeholder="Search servers..." class="sticky min-[960px]:top-20 top-16 z-10">
      <template #icon>
        <Search class="text-gray-400" :size="20" />
      </template>
      <template #right>
        <div></div>
      </template>
    </SearchBar>
    <div v-if="filteredServers && filteredServers.length">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        <InfinitePageScroll :list="filteredServers" :pageSize="pageSize" v-slot="{ renderedList }">
          <div class="fixed bottom-4 sm:right-4 sm:left-auto left-1/2 z-10">
            <div class="text-sm text-gray-500 bg-zinc-100/40 dark:bg-gray-800/40 backdrop-blur-sm px-4 py-2 rounded-lg">
              Rendering {{ renderedList.length }} of {{ filteredServers.length }} filtered servers, {{ serverListData?.Servers.length }} total servers.
            </div>
          </div>
          <!-- TODO: switch to virtual list -->
          <template v-for="server in renderedList" :key="server.ip + server.port">
            <ServerBrowserCard :server="server" />
          </template>
        </InfinitePageScroll>
      </div>
    </div>
    <div v-else class="py-8 flex flex-col items-center justify-center gap-2">
      <p>No servers found matching your search</p>
      <p v-if="filteredServers && filteredServers.length == 0" class="text-sm">Debug: No servers loaded. Check console for errors.</p>
      <p v-else-if="debouncedSearchValue" class="text-sm">Debug: Search query "{{ debouncedSearchValue }}" returned no results.</p>
    </div>
  </AsyncState>
</template>
