<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { Copy, Database, CheckCircle2, Tag, Loader2, Search } from 'lucide-vue-next'
import { getItemFlagText, getItemCategoryText, getItemRarityText, ItemCategory } from '../constants'
import { VPBadge } from 'vitepress/theme'

const items = ref([])
const copiedId = ref(null)
const copiedName = ref(false)
const isLoading = ref(true)
const searchQuery = ref('')
const debouncedSearchQuery = ref('')
const selectedCategory = ref('all')

const LINK_API = 'https://carbonmod.gg/redist/metadata/rust/items.json'
const FALLBACK_API = '/Carbon.Documentation/dev/items.json'
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

let debounceTimeout
const updateDebouncedSearch = (value) => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    debouncedSearchQuery.value = value
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

onMounted(async () => {
  try {
    console.log('Starting to load items...')
    
    const cachedData = getCachedData()
    if (cachedData) {
      console.log('Found cached data:', cachedData.length, 'items')
      items.value = cachedData
      isLoading.value = false
    } else {
      console.log('No cached data found')
    }

    console.log('Fetching from:', API_URL)
    try {
      const response = await fetch(API_URL)
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Data received:', data?.length || 0, 'items')
      
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

      console.log('Filtered data:', filteredData.length, 'items')
      
      setCachedData(filteredData)
      items.value = filteredData
      console.log('Items loaded successfully')
    } catch (fetchError) {
      console.error('Fetch error:', fetchError)
      if (!items.value.length) {
        throw fetchError
      }
    }

    const hash = window.location.hash
    if (hash) {
      await nextTick()
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
  } catch (error) {
    console.error('Failed to load items:', error)
    items.value = []
  } finally {
    isLoading.value = false
  }
})

onMounted(() => {
  window.addEventListener('hashchange', () => {
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
  })
})
</script>

<template>
  <div class="items-container max-w-full">
    <div class="flex items-center mb-4">
      <a :href="LINK_API" class="vp-button medium brand">
        Items API
        <Database class="ml-2" size="18"/>
      </a>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-8">
      <Loader2 class="animate-spin" size="24"/>
      <span class="ml-2">Loading items...</span>
    </div>

    <div v-else>
      <div class="filters mb-4">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <div class="relative">
              <input 
                type="text" 
                v-model="searchQuery" 
                @input="updateDebouncedSearch($event.target.value)"
                placeholder="Search items..." 
                class="w-full px-4 py-2 pl-10 rounded border dark:border-gray-700 bg-transparent"
              >
              <Search class="absolute left-3 top-2.5 text-gray-400" size="18"/>
            </div>
          </div>
          <div class="w-full md:w-48">
            <select 
              v-model="selectedCategory"
              class="w-full px-4 py-2 rounded border dark:border-gray-700 bg-transparent"
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
      </div>

      <div v-if="filteredItems && filteredItems.length" class="overflow-x-auto">
        <table class="items-table">
          <thead>
            <tr>
              <th style="width:150px;">Image</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.Id">
              <td style="width:150px;">
                <div class="relative aspect-square  rounded-lg overflow-hidden" style="width:150px; height:150px;">
                  <img :src="`https://carbonmod.gg/assets/media/items/${item.ShortName}.png`" 
                       @error="$event.target.classList.add('hidden')"
                       class="w-full h-full object-contain p-4">
                  <div class="absolute inset-0 flex items-center justify-center " v-if="!item.ShortName">
                    <Tag size="24" />
                  </div>
                </div>
              </td>
              <td class="align-top">
                <div class="flex items-center justify-between mb-2">
                  <h5 :id="getSanitizedAnchor(item.DisplayName)" class="text-lg font-medium">
                    <a :href="`#${getSanitizedAnchor(item.DisplayName)}`" class="hover:text-primary">
                      <VPBadge type="tip" text="#" class="mr-2"/>
                      {{ item.DisplayName }}
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
                  <VPBadge v-if="item.Category !== undefined" type="info" :text="getItemCategoryText(item.Category)"/>
                  <VPBadge v-if="item.Rarity" type="tip" :text="getItemRarityText(item.Rarity)"/>
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
              </td>
            </tr>
          </tbody>
        </table>
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

<style>
.filters {
  margin: 1rem 0;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Base utility classes */
.max-w-full { max-width: 100%; }
.overflow-x-auto { overflow-x: auto; }
.space-y-3 > * + * { margin-top: 0.75rem; }
.shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.hover\:shadow-md:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
.transition-shadow { transition: box-shadow 0.2s; }
.transition-colors { transition: background-color 0.2s; }

/* Flex and Grid */
.flex { display: flex; }
.grid { display: grid; }
.flex-1 { flex: 1 1 0%; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }

/* Spacing */
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.ml-1 { margin-left: 0.25rem; }
.ml-2 { margin-left: 0.5rem; }
.mr-2 { margin-right: 0.5rem; }
.mt-2 { margin-top: 0.5rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.py-1\.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.pl-10 { padding-left: 2.5rem; }

/* Typography */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.font-medium { font-weight: 500; }
.font-mono { font-family: ui-monospace, monospace; }

/* Colors */
.text-gray-400 { color: var(--vp-c-text-3); }
.text-gray-500 { color: var(--vp-c-text-2); }
.text-gray-600 { color: var(--vp-c-text-2); }
.bg-gray-50 { background-color: var(--vp-c-bg-soft); }
.bg-gray-100 { background-color: var(--vp-c-bg-soft); }
.hover\:bg-gray-200:hover { background-color: var(--vp-c-bg-mute); }

/* Dark mode */
.dark .dark\:bg-gray-800 { background-color: var(--vp-c-bg-soft); }
.dark .dark\:bg-gray-900 { background-color: var(--vp-c-bg); }
.dark .dark\:bg-gray-700 { background-color: var(--vp-c-bg-mute); }
.dark .dark\:hover\:bg-gray-600:hover { background-color: var(--vp-c-bg-alt); }

/* Responsive Grid */
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }

@media (min-width: 768px) {
  .md\:flex-row { flex-direction: row; }
  .md\:w-48 { width: 12rem; }
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1280px) {
  .xl\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.items-table th,
.items-table td {
  padding: 1.5rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
  vertical-align: top;
}

.items-table th {
  font-weight: 600;
  background-color: var(--vp-c-bg-soft);
}
</style> 