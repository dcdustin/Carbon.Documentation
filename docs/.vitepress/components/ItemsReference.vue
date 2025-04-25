<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from 'vue'
import { Copy, Database, CheckCircle2, Tag, Loader2, Search, ExternalLink, Image, Clock, Wrench, Scissors, Lock, Unlock, X } from 'lucide-vue-next'
import { 
  getGameData,
  ITEMS_API_URL,
  getItemCategoryText,
  getItemRarityText,
  CATEGORY_COLORS,
  RARITY_COLORS,
  ITEM_IMAGE_SERVER,
  MISSING_IMAGE_URL,
  CACHE_VERSION_API_URL
} from '../shared/constants'
import { VPBadge } from 'vitepress/theme'
import '../theme/style.css'

const items = ref([])
const copiedId = ref(null)
const isLoading = ref(true)
const searchQuery = ref('')
const debouncedSearchQuery = ref('')
const selectedCategory = ref('all')
const pageSize = 50
const currentPage = ref(1)
const loadingMore = ref(false)
const hasMore = ref(true)
const imageErrors = ref(new Map())
const error = ref(null)

const LINK_API = ITEMS_API_URL

const getItemImageUrl = (shortName) => {
  if (!shortName) return MISSING_IMAGE_URL
  return `${ITEM_IMAGE_SERVER}/${shortName}.png`
}

const handleImageError = (event, itemId) => {
  imageErrors.value.set(itemId, true)
  console.log(event);
  console.warn(`Failed to load image for item: ${event.target.src}`)
}

const getFlags = (flags) => {
  if (!flags) return []
  const flagList = []
  if (flags & 1) flagList.push('No Condition')
  if (flags & 2) flagList.push('No Durability')
  if (flags & 4) flagList.push('No Wear')
  if (flags & 8) flagList.push('Is Shield')
  return flagList
}

const getSanitizedAnchor = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/^-+|-+$/g, '') 
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
  
  let filtered = items.value.filter(item => item && item.DisplayName)

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
    // Clean up search input to handle special characters
    const cleanValue = value.replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g, ' ').trim()
    debouncedSearchQuery.value = cleanValue
    currentPage.value = 1

    // Update URL with cleaned value
    if (cleanValue) {
      const hash = cleanValue.toLowerCase().replace(/\s+/g, '-')
      window.history.replaceState(null, '', `#${hash}`)
    } else {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, 300)
}

const handleUrlSearch = () => {
  const hash = window.location.hash.slice(1) 
  if (hash) {
    const searchTerm = decodeURIComponent(hash).replace(/^item-/, '').replace(/-/g, ' ')
    const cleanTerm = searchTerm.replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g, ' ').trim()
    searchQuery.value = cleanTerm
    updateDebouncedSearch(cleanTerm)
  }
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

const loadItems = async () => {
  try {

    //  need to clear the items array before loading new items
    items.value = []
    isLoading.value = true
    error.value = null
    const data = await getGameData(LINK_API)
    items.value = data

    // Handle URL anchor for search
    const hash = window.location.hash.slice(1) // Remove the # symbol
    if (hash) {
      // Convert anchor to search query by replacing dashes with spaces
      const searchTerm = decodeURIComponent(hash).replace(/-/g, ' ')
      searchQuery.value = searchTerm
      updateDebouncedSearch(searchTerm)
    }
  } catch (err) {
    console.error('Failed to load items:', err)
    error.value = 'Failed to load items. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

const loadMore = async () => {
  if (loadingMore.value || !hasMore.value) return
  
  loadingMore.value = true
  currentPage.value++
  hasMore.value = currentPage.value * pageSize < filteredItems.value.length
  loadingMore.value = false
}

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
    loadMore()
  }
}

// Update URL hash when search changes
watch(debouncedSearchQuery, (newQuery) => {
  if (newQuery) {
    // Convert search query to URL-friendly format
    const hash = newQuery.toLowerCase().replace(/\s+/g, '-')
    window.history.replaceState(null, '', `#${hash}`)
  } else {
    // Remove hash if search is cleared
    window.history.replaceState(null, '', window.location.pathname)
  }
})

onMounted(async () => {
  await loadItems()
  window.addEventListener('scroll', handleScroll)
  handleUrlSearch()

    // Listen for hash changes, not really needed but fuck it
    window.addEventListener('hashchange', () => {
    const newHash = decodeURIComponent(window.location.hash.slice(1))
    if (newHash) {
      searchQuery.value = newHash
      updateDebouncedSearch(newHash)
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Watch for version changes
let versionCheckInterval
onMounted(() => {
  versionCheckInterval = setInterval(async () => {
    try {
      const response = await fetch(CACHE_VERSION_API_URL)
      if (!response.ok) return
      const version = await response.text()
      const cachedVersion = localStorage.getItem('carbon_docs_cache_version')
      
      if (cachedVersion !== version) {
        // Reload data if version changed
        await loadItems()
      }
    } catch (error) {
      console.warn('Error checking version:', error)
    }
  }, 60000) // Check every minute
})

onUnmounted(() => {
  if (versionCheckInterval) {
    clearInterval(versionCheckInterval)
  }
})
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Rust Game Items Reference</h1>
    <p class="mb-8">This section contains a comprehensive list of all items available in the game. Each item is listed with its unique ID, components, and file path.</p>

    <div class="mb-4">
      <div class="flex items-center gap-2">
        <a :href="ITEMS_API_URL" target="_blank" class="vp-button medium brand flex items-center gap-2">
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
            <option value="all">All Items</option>
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
          <div class="text-sm text-gray-500 dark:text-gray-400 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2">
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
                            <template v-if="!imageErrors.get(item.Id)">
                              <img 
                                :src="getItemImageUrl(item.ShortName)" 
                                @error="(e) => handleImageError(e, item.Id)"
                                class="w-full h-full object-contain p-4"
                                :alt="item.DisplayName"
                              >
                            </template>
                            <div v-else class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                              <div class="w-16 h-16 mb-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <Image size="48" class="text-gray-400"/>
                              </div>
                              <span class="text-sm text-gray-500 dark:text-gray-400">No image available</span>
                              <span class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ item.ShortName }}</span>
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
                              <div class="flex flex-wrap gap-2 mt-3">
                          <button v-if="item.Id" @click="copyToClipboard(item.Id, 'id', item.Id)" class="flex items-center px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <span class="font-mono">ID: {{ item.Id }}</span>
                            <component :is="copiedId === item.Id ? CheckCircle2 : Copy" class="ml-2" size="14"/>
                          </button>
                          <button v-if="item.ShortName" @click="copyToClipboard(item.ShortName, item.ShortName)" class="flex items-center px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <span class="font-mono">{{ item.ShortName }}</span>
                            <component :is="copiedId === item.ShortName ? CheckCircle2 : Copy" class="ml-2" size="14"/>
                          </button>
                        </div>

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
                          <VPBadge v-if="item.Category !== 0" 
                            :text="getItemCategoryText(item.Category)"/>
                          <VPBadge v-if="item.Rarity !== 0" 
                            :text="getItemRarityText(item.Rarity)"/>
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
