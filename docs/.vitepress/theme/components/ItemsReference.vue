<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { Copy, Database, CheckCircle2, Tag, Loader2, Search, ExternalLink } from 'lucide-vue-next'
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
  <div class="">
    <div class=" mb-4">
    <div class=" flex items-center gap-2 ">
      <a :href="LINK_API" target="_blank" class="vp-button medium brand flex items-center gap-2 ">
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
        <div class="flex  items-center">
          <Search class="text-gray-400" size="20"/>
          <div class="relative flex-1 flex ">
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
