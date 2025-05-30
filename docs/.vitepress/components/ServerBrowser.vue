<script setup lang="ts">
import { fetchServerList, ServerList } from '@/api/misc/server-list'
import AsyncState from '@/components/common/AsyncState.vue'
import InfinitePageScroll from '@/components/common/InfinitePageScroll.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import { data as initialServerList } from '@/data-loaders/server-browser.data'
import { store } from '@/stores/server-browser'
import { Search } from 'lucide-vue-next'
import { computed, onMounted, shallowRef } from 'vue'
import ServerBrowserCard from './ServerBrowserCard.vue'

const serverList = shallowRef<ServerList | null>(initialServerList)

const isFetchedRestData = shallowRef(false)
const error = shallowRef<string | null>(null)

const debouncedSearchValue = store.searchValue

const pageSize = 25

const filteredServers = computed(() => {
  if (!serverList.value?.Servers.length) {
    return []
  }

  let filtered = serverList.value?.Servers

  if (debouncedSearchValue.value) {
    const searchLower = debouncedSearchValue.value.toLowerCase()
    filtered = filtered.filter(
      (server) =>
        server.hostname.toLowerCase().includes(searchLower) ||
        server.map?.toLowerCase().includes(searchLower) ||
        server.tags?.toLowerCase().includes(searchLower)
    )
  }

  return filtered
})

async function loadServers() {
  try {
    error.value = null

    const data = await fetchServerList()

    if (!data) {
      throw new Error('No data received from API')
    }

    serverList.value = data

    isFetchedRestData.value = true
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
              Rendering {{ renderedList.length }} of {{ filteredServers.length }} servers
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
