<script setup>
import { ref, onMounted, computed, nextTick, watch, onUnmounted } from 'vue'
import { Copy, Database, CheckCircle2, Tag, Loader2, Search, ExternalLink } from 'lucide-vue-next'
import { 
  getItemFlagText, 
  getItemCategoryText, 
  getItemRarityText, 
  ItemCategory,
  RARITY_COLORS,
  CATEGORY_COLORS,
  getGameData,
  GAME_DATA_FOLDER,
  ITEM_IMAGE_SERVER,
  MISSING_IMAGE_URL,
  getImage
} from '../shared/constants'
import { VPBadge } from 'vitepress/theme'

const items = ref([])
const copiedId = ref(null)
const copiedName = ref(false)
const isLoading = ref(true)
const searchQuery = ref('')
const debouncedSearchQuery = ref('')
const selectedCategory = ref('all')
const pageSize = 50
const currentPage = ref(1)
const loadingMore = ref(false)
const hasMore = ref(true)

const LINK_API = `${GAME_DATA_FOLDER}/items.json`
const API_URL = LINK_API

const CACHE_KEY = 'carbon_items_cache'
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

const toString = (value) => value?.toString() || ''

const getSanitizedAnchor = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/^-+|-+$/g, '') 
}

const getFlags = (flags) => {
  if (!flags) return []
  return getItemFlagText(flags)
}

const categories = computed(() => {
  if (!items.value?.length) return []
  const uniqueCategories = [...new Set(items.value.map(item => item?.Category))]
    .filter(cat => cat !== undefined)
    .sort((a, b) => a - b)
  return ['all', ...uniqueCategories]
})

const filteredItems = computed(() => {
  if (!items.value?.length) return []
  
  let filtered = items.value.filter(item => item && item.DisplayName && item.Id)

  if (selectedCategory.value !== 'all') {
    const categoryNum = parseInt(selectedCategory.value)
    filtered = filtered.filter(item => item?.Category === categoryNum)
  }

  if (debouncedSearchQuery.value) {
    const searchLower = debouncedSearchQuery.value.toLowerCase()
    filtered = filtered.filter(item => {
      if (!item) return false
      return (
        (item.DisplayName && item.DisplayName.toLowerCase().includes(searchLower)) ||
        (item.ShortName && item.ShortName.toLowerCase().includes(searchLower)) ||
        (item.Description && item.Description.toLowerCase().includes(searchLower))
      )
    })
  }

  return filtered
})

const paginatedItems = computed(() => {
  const start = 0
  const end = currentPage.value * pageSize
  return filteredItems.value.slice(start, end)
})

let debounceTimeout
const updateDebouncedSearch = (value) => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    debouncedSearchQuery.value = value
    currentPage.value = 1
  }, 300)
}

const copyToClipboard = async (text, type, id = null) => {
  try {
    await navigator.clipboard.writeText(text)
    if (type === 'id') {
      copiedId.value = id
      setTimeout(() => copiedId.value = null, 2000)
    } else {
      copiedName.value = true
      setTimeout(() => copiedName.value = false, 2000)
    }
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const getItemImageUrl = (shortName) => {
  if (!shortName) return MISSING_IMAGE_URL
  return `${ITEM_IMAGE_SERVER}/${shortName}.png`
}

const handleImageError = (event) => {
  event.target.src = MISSING_IMAGE_URL
  console.warn(`Failed to load image for item: ${event.target.src}`)
}

const loadMore = () => {
  if (loadingMore.value || !hasMore.value) return
  
  const totalItems = filteredItems.value.length
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

onMounted(async () => {
  try {
    const cachedData = getCachedData()
    if (cachedData) {
      items.value = cachedData
      isLoading.value = false
    }

    try {
      const data = await getGameData(`${GAME_DATA_FOLDER}/items.json`)
      
      if (!Array.isArray(data)) {
        throw new Error('Data is not an array')
      }

      const filteredData = data.filter(item => 
        item && 
        typeof item.Category !== 'undefined' &&
        typeof item.Id !== 'undefined' &&
        typeof item.DisplayName !== 'undefined' &&
        typeof item.ShortName !== 'undefined'
      )
      
      setCachedData(filteredData)
      items.value = filteredData
    } catch (fetchError) {
      console.error('Fetch error:', fetchError)
      if (!items.value.length) {
        throw fetchError
      }
    }
  } catch (error) {
    console.error('Failed to load items:', error)
    items.value = []
  } finally {
    isLoading.value = false
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(debouncedSearchQuery, () => {
  currentPage.value = 1
  hasMore.value = true
})

watch(selectedCategory, () => {
  currentPage.value = 1
  hasMore.value = true
})
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Rust Game Items Reference</h1>
    <p class="mb-8">This section contains a comprehensive list of all items available in the game. Each item is listed with its unique ID, components, and file path.</p>

    <div class="mb-4">
      <div class="flex items-center gap-2">
        <a :href="LINK_API" target="_blank" class="vp-button medium brand flex items-center gap-2">
          <Database size="16"/>
          Items API
          <ExternalLink size="14" class="opacity-80"/>
        </a>
      </div>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-8">
      <Loader2 class="animate-spin" size="24"/>
      <span class="ml-2">Loading items...</span>
    </div>

    <div v-else>
      <div class="filters mb-4">
        <div class="flex items-center gap-4">
          <div class="flex items-center flex-1">
            <Search class="text-gray-400" size="20"/>
            <input 
              type="text" 
              v-model="searchQuery" 
              @input="updateDebouncedSearch($event.target.value)"
              placeholder="Search items..." 
              class="w-[400px] px-4 py-2"
            >
          </div>
          <select 
            v-model="selectedCategory"
            class="px-4 py-2 min-w-[140px]"
          >
            <option value="all">All Categories</option>
            <option 
              v-for="category in categories.filter(c => c !== 'all')" 
              :key="category" 
              :value="category"
            >
              {{ getItemCategoryText(category) }}
            </option>
          </select>
        </div>
      </div>

      <div v-if="paginatedItems && paginatedItems.length">
        <div class="fixed bottom-4 right-4 z-50">
          <div class="text-sm text-gray-500 dark:text-gray-400 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 border border-gray-200 dark:border-gray-700">
            Showing {{ paginatedItems.length }} of {{ filteredItems.length }} items
          </div>
        </div>

        <div class="overflow-x-auto">
          <div class="inline-block min-w-full">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <tbody>
                <tr v-for="item in paginatedItems" :key="item.Id" :id="item.Id" class="items-table-row">
                  <td class="whitespace-normal pb-4">
                    <div class="flex gap-4">
                      <div class="flex-shrink-0">
                        <a :href="`/Carbon.Documentation/references/items/details?id=${item.Id}`" class="block">
                          <div class="relative aspect-square overflow-hidden" style="width:150px; height:150px;">
                            <img 
                              :src="getItemImageUrl(item.ShortName)" 
                              @error="handleImageError"
                              class="w-full h-full object-contain p-4"
                              :alt="item.DisplayName"
                            >
                            <div class="absolute inset-0 flex items-center justify-center" v-if="!item.ShortName">
                              <Tag size="24" />
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="flex-1">
                        <div class="flex items-center justify-between mb-2">
                          <h5 :id="getSanitizedAnchor(item.DisplayName)" class="text-lg font-medium">
                            <a :href="`/Carbon.Documentation/references/items/details?id=${item.Id}`" 
                               class="hover:text-primary inline-flex items-center gap-2">
                              {{ item.DisplayName }}
                              <ExternalLink size="14" class="opacity-60"/>
                            </a>
                          </h5>
                          <div v-if="item.Hidden">
                            <VPBadge type="danger" text="Hidden"/>
                          </div>
                        </div>
                        
                        <div class="flex flex-wrap gap-2 mt-2">
                          <template v-for="flag in getFlags(item.Flags)" :key="flag">
                            <VPBadge type="warning" :text="flag"/>
                          </template>
                          <VPBadge v-if="item.Category !== undefined" 
                                  :text="getItemCategoryText(item.Category)"
                                  :style="{ backgroundColor: CATEGORY_COLORS[item.Category], color: '#fff' }"/>
                          <VPBadge v-if="item.Rarity !== undefined" 
                                  :text="getItemRarityText(item.Rarity)"
                                  :style="{ backgroundColor: RARITY_COLORS[item.Rarity], color: '#fff' }"/>
                        </div>

                        <div class="flex flex-wrap gap-2 mt-3">
                          <button 
                            v-if="item.Id"
                            @click="copyToClipboard(item.Id, 'id', item.Id)" 
                            class="flex items-center px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <span class="font-mono">ID: {{ item.Id }}</span>
                            <component :is="copiedId === item.Id ? CheckCircle2 : Copy" 
                                     class="ml-2" 
                                     size="14"
                            />
                          </button>
                          <button 
                            v-if="item.ShortName"
                            @click="copyToClipboard(item.ShortName, 'name')" 
                            class="flex items-center px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <span class="font-mono">{{ item.ShortName }}</span>
                            <component :is="copiedName ? CheckCircle2 : Copy" 
                                     class="ml-2" 
                                     size="14"
                            />
                          </button>
                        </div>

                        <p v-if="item.Description" class="text-sm text-gray-600 dark:text-gray-400 mt-3">
                          {{ item.Description }}
                        </p>
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
        <p>No items found matching your search</p>
        <p v-if="items.value && items.value.length === 0" class="mt-2 text-sm">
          Debug: No items loaded. Check console for errors.
        </p>
        <p v-else-if="debouncedSearchQuery" class="mt-2 text-sm">
          Debug: Search query "{{ debouncedSearchQuery }}" returned no results.
        </p>
        <p v-else-if="selectedCategory !== 'all'" class="mt-2 text-sm">
          Debug: Category filter "{{ selectedCategory }}" returned no results.
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
