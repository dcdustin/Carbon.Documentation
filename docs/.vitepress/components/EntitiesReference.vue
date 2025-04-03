<script setup>
import { ref, onMounted, computed, nextTick, watch, onUnmounted } from 'vue'
import { Copy, Database, CheckCircle2, Tag, Loader2, Search, ExternalLink } from 'lucide-vue-next'
import { 
  getGameData,
  GAME_DATA_FOLDER,
} from '../shared/constants'
import { VPBadge } from 'vitepress/theme'

const entities = ref([])
const copiedId = ref(null)
const isLoading = ref(true)
const searchQuery = ref('')
const debouncedSearchQuery = ref('')
const pageSize = 50
const currentPage = ref(1)
const loadingMore = ref(false)
const hasMore = ref(true)

const LINK_API = `${GAME_DATA_FOLDER}/entities.json`
const API_URL = LINK_API

const CACHE_KEY = 'carbon_entities_cache'
const CACHE_EXPIRY = 24 * 60 * 60 * 1000

const getCachedData = () => {
  const cached = localStorage.getItem(CACHE_KEY)
  if (!cached) return null
  
  const { data, timestamp } = JSON.parse(cached)
  if (Date.now() - timestamp > CACHE_EXPIRY) {
    localStorage.removeItem(CACHE_KEY)
    return null
  }
  return data
}

const setCachedData = (data) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data,
    timestamp: Date.now()
  }))
}

const getSanitizedAnchor = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/^-+|-+$/g, '') 
}

const filteredEntities = computed(() => {
  if (!entities.value?.length) return []
  
  let filtered = entities.value.filter(entity => entity && entity.ID && entity.Path)

  if (debouncedSearchQuery.value) {
    const searchLower = debouncedSearchQuery.value.toLowerCase()
    filtered = filtered.filter(entity => {
      if (!entity) return false
      return (
        (entity.Path && entity.Path.toLowerCase().includes(searchLower)) ||
        (entity.ID && entity.ID.toString().includes(searchLower))
      )
    })
  }

  return filtered
})

const paginatedEntities = computed(() => {
  const start = 0
  const end = currentPage.value * pageSize
  return filteredEntities.value.slice(start, end)
})

let debounceTimeout
const updateDebouncedSearch = (value) => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    debouncedSearchQuery.value = value
    currentPage.value = 1 
  }, 300)
}

const copyToClipboard = async (text, id = null) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = id
    setTimeout(() => copiedId.value = null, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const scrollToHash = () => {
  const hash = window.location.hash
  if (hash) {
    const element = document.querySelector(hash)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }
}

const loadMore = () => {
  if (loadingMore.value || !hasMore.value) return
  
  const totalItems = filteredEntities.value.length
  const currentItems = currentPage.value * pageSize
  
  if (currentItems >= totalItems) {
    hasMore.value = false
    return
  }
  
  loadingMore.value = true
  currentPage.value += 1
  loadingMore.value = false
}

const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = document.documentElement.scrollTop
  const clientHeight = document.documentElement.clientHeight
  
  if (scrollHeight - scrollTop <= clientHeight + 100) {
    loadMore()
  }
}


watch(entities, async () => {
  await nextTick()
  scrollToHash()
}, { immediate: true })

watch(debouncedSearchQuery, () => {
  currentPage.value = 1
  hasMore.value = true
})

onMounted(async () => {
  try {    
    const cachedData = getCachedData()
    if (cachedData) {
      entities.value = cachedData
      isLoading.value = false
    }

    try {
      const data = await getGameData(`${GAME_DATA_FOLDER}/entities.json`)
      
      if (!Array.isArray(data)) {
        throw new Error('Data is not an array')
      }

      const filteredData = data.filter(entity => 
        entity && 
        typeof entity.ID !== 'undefined' &&
        typeof entity.Path !== 'undefined'
      )
      
      setCachedData(filteredData)
      entities.value = filteredData
    } catch (fetchError) {
      console.error('Fetch error:', fetchError)
      if (!entities.value.length) {
        throw fetchError
      }
    }
  } catch (error) {
    console.error('Failed to load entities:', error)
    entities.value = []
  } finally {
    isLoading.value = false
  }
})

onMounted(() => {
  window.addEventListener('hashchange', scrollToHash)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Rust Game Entities Reference</h1>
    <p class="mb-8">This section contains a comprehensive list of all entity prefabs available in the game. Each entity is listed with its unique ID, components, and file path.</p>

    <div class="mb-4">
      <div class="flex items-center gap-2">
        <a :href="LINK_API" target="_blank" class="vp-button medium brand flex items-center gap-2">
          <Database size="16"/>
          Entities API
          <ExternalLink size="14" class="opacity-80"/>
        </a>
      </div>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-8">
      <Loader2 class="animate-spin" size="24"/>
      <span class="ml-2">Loading entities...</span>
    </div>

    <div v-else>
      <div class="filters ">
        <div class="flex items-center">
          <Search class="text-gray-400" size="20"/>
          <div class="relative flex-1 flex">
            <input 
              type="text" 
              v-model="searchQuery" 
              @input="updateDebouncedSearch($event.target.value)"
              placeholder="Search entities..." 
              class="w-[400px] "
            >
          </div>
        </div>
      </div>

      <div v-if="paginatedEntities && paginatedEntities.length">
        
        <div class="fixed bottom-4 right-4 z-50">
          <div class="text-sm text-gray-500 dark:text-gray-400 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 border border-gray-200 dark:border-gray-700">
            Showing {{ paginatedEntities.length }} of {{ filteredEntities.length }} entities
          </div>
        </div>


        <div class="overflow-x-auto">
          <div class="inline-block min-w-full  ">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <tbody >
                <tr v-for="entity in paginatedEntities" :key="entity.ID" :id="entity.ID" class="items-table-row">
                  <td class="whitespace-normal pb-4">
                    <div class="flex flex-col ">
                      <div class="flex flex-wrap items-center ">
                        <a :href="`/Carbon.Documentation/references/entities/details?id=${entity.ID}`" class="flex-shrink-0">
                          <VPBadge :id="entity.ID.toString()" type="tip" text="#"/>
                        </a>
                        <button 
                          @click="copyToClipboard(entity.ID, entity.ID)" 
                          class="flex items-center px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex-shrink-0"
                        >
                          <span class="font-mono">{{ entity.ID }}</span>
                          <component :is="copiedId === entity.ID ? CheckCircle2 : Copy" 
                                   class="ml-2" 
                                   size="14"
                          />
                        </button>
                      </div>
                      <div class="flex flex-wrap gap-1.5">
                        <template v-for="component in entity.Components" :key="component">
                          <VPBadge type="info" :text="component"/>
                        </template>
                      </div>
                      <div class="font-mono text-sm text-gray-600 dark:text-gray-400 break-all">
                        {{ entity.Path }}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="loadingMore" class="flex justify-center py-4">
          <Loader2 class="animate-spin" size="24"/>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        <p>No entities found matching your search</p>
        <p v-if="entities.value && entities.value.length === 0" class="mt-2 text-sm">
          Debug: No entities loaded. Check console for errors.
        </p>
        <p v-else-if="debouncedSearchQuery" class="mt-2 text-sm">
          Debug: Search query "{{ debouncedSearchQuery }}" returned no results.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.items-table-row {
  transition: background-color 0.2s ease;
}

.items-table-row:hover {
  background-color: #f3f4f6;
}

.dark .items-table-row:hover {
  background-color: #1f2937;
}
</style> 