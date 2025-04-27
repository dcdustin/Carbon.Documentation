<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from 'vue'
import { Copy, Database, CheckCircle2, Tag, Loader2, Search, ExternalLink, Image, Clock, Wrench, Scissors, Lock, Unlock, X } from 'lucide-vue-next'
import { 
  getGameData,
  SWITCHES_API_URL,
  getSpawnTypeText,
  SpawnType,
  CACHE_VERSION_API_URL
} from '../shared/constants'
import { VPBadge } from 'vitepress/theme'
import '../theme/style.css'

const switches = ref([])
const copiedId = ref(null)
const isLoading = ref(true)
const searchQuery = ref('')
const debouncedSearchQuery = ref('')
const pageSize = 50
const currentPage = ref(1)
const loadingMore = ref(false)
const hasMore = ref(true)
const error = ref(null)

const LINK_API = SWITCHES_API_URL

const filteredSwitches = computed(() => {
  if (!switches.value?.length) return []
  
  let filtered = switches.value.filter(switchValue => switchValue && switchValue.Name)

  if (debouncedSearchQuery.value) {
    const searchLower = debouncedSearchQuery.value.toLowerCase()
    filtered = filtered.filter(switchValue => {
      if (!switchValue) return false
      return (
        (switchValue.Name && switchValue.Name.toLowerCase().includes(searchLower)) ||
        (switchValue.Help && switchValue.Help.toLowerCase().includes(searchLower))
      )
    })
  }

  return filtered
})

const paginatedSwitches = computed(() => {
  const start = 0
  const end = currentPage.value * pageSize
  return filteredSwitches.value.slice(start, end)
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

const loadSwitches = async () => {
  try {
    isLoading.value = true
    error.value = null
    const data = await getGameData(LINK_API)
    switches.value = data
  } catch (err) {
    console.error('Failed to load switches:', err)
    error.value = 'Failed to load switches. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

const loadMore = async () => {
  if (loadingMore.value || !hasMore.value) return
  
  loadingMore.value = true
  currentPage.value++
  hasMore.value = currentPage.value * pageSize < filteredSwitches.value.length
  loadingMore.value = false
}

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
    loadMore()
  }
}

onMounted(async () => {
  await loadSwitches()
  window.addEventListener('scroll', handleScroll)
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
        await loadSwitches()
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
    <h1 class="text-2xl font-bold mb-4">Carbon Switches Reference</h1>
    <p class="mb-8">Here's a full list of all currently available Carbon switches you can use.</p>

    <div class="mb-4">
      <div class="flex items-center gap-2">
        <a :href="LINK_API" target="_blank" class="vp-button medium brand flex items-center gap-2">
          <Database size="16"/>
          Switches API
          <ExternalLink size="14" class="opacity-80"/>
        </a>
      </div>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-8">
      <Loader2 class="animate-spin" size="24"/>
      <span class="ml-2">Loading switches...</span>
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
              placeholder="Search switches..." 
              class="w-[400px] px-4 py-2"
            >
          </div>
        </div>
      </div>

      <div v-if="paginatedSwitches && paginatedSwitches.length">
        
        <div class="fixed bottom-4 right-4 z-50">
          <div class="text-sm text-gray-500 dark:text-gray-400 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2">
            Showing {{ paginatedSwitches.length }} of {{ filteredSwitches.length }} switches
          </div>
        </div>


        <div class="overflow-x-auto">
          <div class="inline-block min-w-full  ">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <tbody >
                <tr v-for="switchValue in paginatedSwitches" :key="switchValue.Name" :id="switchValue.Name" class="items-table-row">
                  <td class="whitespace-normal pb-4">
                    <div class="flex flex-col ">
                      <h1 class="font-mono">{{ switchValue.Name }}</h1> 
                      <p v-if="switchValue.Help" class="text-sm text-gray-600 dark:text-gray-400 mt-3">
                          {{ switchValue.Help }}
                        </p>
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
        <p>No switches found matching your search</p>
        <p v-if="switches.value && switches.value.length === 0" class="mt-2 text-sm">
          Debug: No switches loaded. Check console for errors.
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