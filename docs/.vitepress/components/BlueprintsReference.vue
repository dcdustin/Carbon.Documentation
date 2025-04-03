<script setup>
import { ref, onMounted, computed } from 'vue'
import { Copy, Database, CheckCircle2, Search, ExternalLink, Loader2 } from 'lucide-vue-next'
import { 
  getGameData,
  GAME_DATA_FOLDER,
} from '../shared/constants'
import { VPBadge } from 'vitepress/theme'

const blueprints = ref([])
const copiedId = ref(null)
const isLoading = ref(true)
const searchQuery = ref('')
const debouncedSearchQuery = ref('')

const LINK_API = `${GAME_DATA_FOLDER}/blueprints.json`
const API_URL = LINK_API

const CACHE_KEY = 'carbon_blueprints_cache'
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

const filteredBlueprints = computed(() => {
  if (!blueprints.value?.length) return []
  
  let filtered = blueprints.value.filter(bp => bp && bp.Item && bp.Item.DisplayName)

  if (debouncedSearchQuery.value) {
    const searchLower = debouncedSearchQuery.value.toLowerCase()
    filtered = filtered.filter(bp => {
      if (!bp.Item) return false
      return (
        (bp.Item.DisplayName && bp.Item.DisplayName.toLowerCase().includes(searchLower)) ||
        (bp.Item.ShortName && bp.Item.ShortName.toLowerCase().includes(searchLower)) ||
        (bp.Item.Description && bp.Item.Description.toLowerCase().includes(searchLower))
      )
    })
  }

  return filtered
})

let debounceTimeout
const updateDebouncedSearch = (value) => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    debouncedSearchQuery.value = value
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

onMounted(async () => {
  try {
    console.log('Starting to load blueprints...')
    const cachedData = getCachedData()
    if (cachedData) {
      console.log('Found cached data:', cachedData.length, 'blueprints')
      blueprints.value = cachedData
      isLoading.value = false
    }

    console.log('Fetching from:', API_URL)
    const data = await getGameData(API_URL)
    console.log('Data received:', data?.length || 0, 'blueprints')
    
    if (!Array.isArray(data)) {
      throw new Error('Data is not an array')
    }

    setCachedData(data)
    blueprints.value = data
  } catch (error) {
    console.error('Failed to load blueprints:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <div class="mb-4">
      <div class="flex items-center gap-2">
        <a :href="LINK_API" target="_blank" class="vp-button medium brand flex items-center gap-2">
          <Database size="16"/>
          Blueprints API
          <ExternalLink size="14" class="opacity-80"/>
        </a>
      </div>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-8">
      <Loader2 class="animate-spin" size="24"/>
      <span class="ml-2">Loading blueprints...</span>
    </div>

    <div v-else>
      <div class="filters mb-4">
        <div class="flex items-center">
          <Search class="text-gray-400" size="20"/>
          <div class="relative flex-1 flex">
            <input 
              type="text" 
              v-model="searchQuery" 
              @input="updateDebouncedSearch($event.target.value)"
              placeholder="Search blueprints..." 
              class="w-[400px] px-4 py-2"
            >
          </div>
        </div>
      </div>

      <div v-if="filteredBlueprints.length" class="space-y-4">
        <div v-for="bp in filteredBlueprints" :key="bp.Item.Id" 
             class="bg-gray-50 dark:bg-gray-800 p-4 flex">
          <!-- Left Column: Item Info -->
          <div class="flex-1 min-w-0 pr-6">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold truncate">{{ bp.Item.DisplayName }}</h3>
              <button 
                @click="copyToClipboard(bp.Item.ShortName, bp.Item.Id)" 
                class="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 ml-2 flex-shrink-0"
              >
                <component :is="copiedId === bp.Item.Id ? CheckCircle2 : Copy" size="14"/>
              </button>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ bp.Item.Description }}</p>
            <div class="flex flex-wrap gap-2">
              <VPBadge v-if="bp.WorkbenchLevelRequired > 0" 
                      type="info" 
                      :text="`Workbench ${bp.WorkbenchLevelRequired}`"/>
              <VPBadge v-if="bp.ScrapRequired > 0" 
                      type="warning" 
                      :text="`${bp.ScrapRequired} Scrap`"/>
              <VPBadge v-if="bp.NeedsSteamItem" 
                      type="danger" 
                      text="Steam Item"/>
              <VPBadge v-if="bp.NeedsSteamDLC" 
                      type="danger" 
                      text="Steam DLC"/>
            </div>
          </div>

          <!-- Right Column: Ingredients -->
          <div class="w-64 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-6">
            <span class="font-medium text-sm">Ingredients:</span>
            <ul class="mt-2 space-y-1">
              <li v-for="(ing, idx) in bp.Ingredients" :key="idx"
                  class="flex items-center justify-between text-sm">
                <span class="text-gray-700 dark:text-gray-300">{{ ing.Item.DisplayName }}</span>
                <span class="text-gray-500 dark:text-gray-400">x{{ ing.Amount }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-8">
        <p class="text-gray-500">No blueprints found</p>
      </div>
    </div>
  </div>
</template> 