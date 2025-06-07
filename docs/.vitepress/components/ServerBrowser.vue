<script setup lang="ts">
import { CompressedTag, fetchServerList, RegionTag, Server, ServerList } from '@/api/misc/server-list'
import AsyncState from '@/components/common/AsyncState.vue'
import InfinitePageScroll from '@/components/common/InfinitePageScroll.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import { data as initialData } from '@/data-loaders/server-browser.data'
import { store } from '@/stores/server-browser-store'
import { Search } from 'lucide-vue-next'
import MiniSearch from 'minisearch'
import { computed, onMounted, shallowRef } from 'vue'
import ServerBrowserCard from './ServerBrowserCard.vue'
import OptionSelector from './common/OptionSelector.vue'
import OptionSelectorMany from './common/OptionSelectorMany.vue'

const serverListData = shallowRef<ServerList | null>(initialData)
const miniSearch = shallowRef<MiniSearch | null>(null)

const isFetchedRestData = shallowRef(false)
const error = shallowRef<string | null>(null)

const debouncedSearchValue = store.searchValue
const chosenCompressedTags = store.chosenCompressedTags
const chosenRegionTag = store.chosenRegionTags

const pageSize = 25

const filteredServers = computed(() => {
  if (!serverListData.value || !serverListData.value.Servers.length) {
    return []
  }

  let filtered = serverListData.value.Servers

  if (!isFetchedRestData.value) {
    return filtered
  }

  if (chosenRegionTag.value && chosenRegionTag.value != 'All') {
    filtered = filtered.filter((server) => {
      return server.tags_set.has(chosenRegionTag.value)
    })
  }

  if (chosenCompressedTags.value.length && chosenCompressedTags.value.length > 0) {
    filtered = filtered.filter((server) => {
      return chosenCompressedTags.value.every((tag) => server.tags_set.has(tag))
    })
  }

  if (debouncedSearchValue.value) {
    if (miniSearch.value) {
      const results = miniSearch.value.search(debouncedSearchValue.value)
      const serverMap = new Map(filtered.map((server) => [server.id, server]))
      filtered = results.map((result) => serverMap.get(result.id)).filter(Boolean) as Server[]
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
      boostDocument: (_, _2, storedFields) => {
        // Handle missing/empty servers: 61.6% of servers are empty -> demote
        if (!storedFields?.players || storedFields.players === 0) {
          return 0.9 // Demote empty servers but keep them searchable
        }

        const players = storedFields.players as number

        /* Player Distribution Insights (from diagnostic data):
           totalServers: 13063
           emptyServers: 8046 (61.6%)
           Key percentiles:
             p75: 2 players    (75% of servers have ≤2 players)
             p90: 13 players   (90% have ≤13 players)
             p95: 47 players   (95% have ≤47 players)
             p99: 254 players  (99% have ≤254 players)
             max: 1062 players
           Design Philosophy:
             1. Different population tiers need distinct scaling:
               - Low-pop: Gentle boost to avoid over-ranking common servers
               - Mid-pop: Balanced boost for discoverability
               - High-pop: Significant boost for quality recognition
             2. Use exponential scaling (players^exponent) for natural curve:
               - Lower exponent = flatter curve (for high populations)
               - Higher exponent = steeper curve (for low populations)
             3. Tier thresholds based on actual distribution percentiles
             4. Optimize for computation efficiency (no chained conditionals)
        */

        // ELITE SERVERS (p99+ ≥250 players - top 1%)
        // - Exponent 0.28 creates gradual curve for very high populations
        // - Multiplier 0.82 provides strong baseline recognition
        // - Matches diagnostic data showing high-population clusters
        if (players >= 250) {
          return 1.0 + players ** 0.28 * 0.82
        }

        // POPULAR SERVERS (p95+ ≥47 players - top 5%)
        // - Exponent 0.35 balances growth recognition
        // - Multiplier 0.68 calibrated for 47-250 player range
        // - Avoids over-boosting while maintaining quality signal
        if (players >= 47) {
          return 1.0 + players ** 0.35 * 0.68
        }

        // ACTIVE SERVERS (p90+ ≥13 players - top 10%)
        // - Exponent 0.42 provides steeper initial curve
        // - Multiplier 0.55 prevents over-emphasis of low-mid pop
        // - Recognizes servers above empty/low-pop majority
        if (players >= 13) {
          return 1.0 + players ** 0.42 * 0.55
        }

        // LOW-POPULATION SERVERS (1-12 players)
        // - Exponent 0.5 (square root) for gentlest curve
        // - Multiplier 0.48 provides baseline visibility
        // - Avoids drowning out text relevance for common servers
        return 1.0 + players ** 0.5 * 0.48
      },
    },
    storeFields: ['players'],
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
    <SearchBar v-model="debouncedSearchValue" placeholder="Search servers..." class="sticky top-16 z-10 min-[960px]:top-20">
      <template #right>
        <div class="flex flex-col sm:flex-row gap-4">
          <OptionSelectorMany
            v-model="chosenCompressedTags"
            :option-key-values="Object.keys(CompressedTag).map((tag) => ({ key: CompressedTag[tag as keyof typeof CompressedTag], value: tag }))"
            label="Tags (inclusive)"
          />
          <OptionSelector
            v-model="chosenRegionTag"
            :option-key-values="[
              { key: 'All', value: 'All' },
              ...Object.keys(RegionTag).map((tag) => ({ key: RegionTag[tag as keyof typeof RegionTag], value: tag })),
            ]"
            label="Region:"
          />
        </div>
      </template>
    </SearchBar>
    <div v-if="filteredServers && filteredServers.length">
      <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        <InfinitePageScroll :list="filteredServers" :pageSize="pageSize" v-slot="{ renderedList }">
          <div class="fixed bottom-4 left-1/2 z-10 sm:left-auto sm:right-4">
            <div class="rounded-lg bg-zinc-100/40 px-4 py-2 text-sm text-gray-500 backdrop-blur-sm dark:bg-gray-800/40">
              Rendering {{ renderedList.length }} of {{ filteredServers.length }} filtered servers, {{ serverListData?.Servers.length }} total servers.
            </div>
          </div>
          <!-- TODO: switch to virtual list -->
          <template v-for="server in renderedList" :key="server.id">
            <ServerBrowserCard :server="server" />
          </template>
        </InfinitePageScroll>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center gap-2 py-8">
      <p>No servers found matching your search</p>
      <p v-if="filteredServers && filteredServers.length == 0" class="text-sm">Debug: No servers loaded. Check console for errors.</p>
      <p v-else-if="debouncedSearchValue" class="text-sm">Debug: Search query "{{ debouncedSearchValue }}" returned no results.</p>
    </div>
  </AsyncState>
</template>
