---
title: All Items
---
## All Items
Full list of all <Badge type="danger" :text="filteredItems?.length || 0"/> items.

## API
<div class="flex items-center">
  <CarbonButton href="/Carbon.Documentation/rust/items.json" text="Items API" external="true"/>
  <Database class="ml-2" size="18"/>
</div>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Copy, Database, CheckCircle2, Tag, Loader2, Search } from 'lucide-vue-next'
import { 
  ItemFlag, 
  ItemCategory, 
  ItemRarity, 
  getItemFlagText, 
  getItemCategoryText, 
  getItemRarityText,
  RARITY_COLORS,
  CATEGORY_COLORS 
} from '../../.vitepress/theme/constants'

const items = ref([])
const copiedId = ref(null)
const copiedName = ref(false)
const isLoading = ref(true)
const searchQuery = ref('')
const debouncedSearchQuery = ref('')
const selectedCategory = ref('all')

let debounceTimeout
const updateDebouncedSearch = (value) => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    debouncedSearchQuery.value = value.toLowerCase()
  }, 300)
}

const onSearchInput = (event) => {
  searchQuery.value = event.target.value
  updateDebouncedSearch(event.target.value)
}

// Prepare search terms once for each item
const itemSearchTerms = computed(() => {
  if (!items.value?.length) return []
  return items.value.map(item => ({
    ...item,
    searchTerms: (
      item.DisplayName.toLowerCase() + ' ' +
      item.ShortName.toLowerCase() + ' ' +
      item.Description.toLowerCase() + ' ' +
      item.Id.toString()
    )
  }))
})

// Get all unique categories
const categories = computed(() => {
  if (!items.value?.length) return []
  const uniqueCategories = [...new Set(items.value.map(item => item.Category))]
  return ['all', ...uniqueCategories.sort((a, b) => a - b)]
})

// Filter items based on search and category
const filteredItems = computed(() => {
  if (!itemSearchTerms.value?.length) return []
  
  const categoryFilter = selectedCategory.value === 'all' ? null : parseInt(selectedCategory.value)
  const searchFilter = debouncedSearchQuery.value

  if (!searchFilter && !categoryFilter) return items.value
  
  return itemSearchTerms.value.filter(item => {
    if (categoryFilter && item.Category !== categoryFilter) return false
    if (!searchFilter) return true
    return item.searchTerms.includes(searchFilter)
  })
})

onMounted(async () => {
  try {
    const response = await fetch('/Carbon.Documentation/rust/items.json')
    const data = await response.json()
    // Ensure all items have required properties
    items.value = data.filter(item => 
      item && 
      typeof item.Category !== 'undefined' &&
      typeof item.Id !== 'undefined' &&
      typeof item.DisplayName !== 'undefined' &&
      typeof item.ShortName !== 'undefined'
    )
  } catch (error) {
    console.error('Failed to load items:', error)
    items.value = []
  } finally {
    isLoading.value = false
  }
})

const copyToClipboard = async (text, type, id = null) => {
  await navigator.clipboard.writeText(text)
  if (type === 'id') {
    copiedId.value = id
    setTimeout(() => copiedId.value = null, 2000)
  } else {
    copiedName.value = id
    setTimeout(() => copiedName.value = null, 2000)
  }
}

const getFlags = (flags) => {
  return getItemFlagText(flags)
}

const getRarityBadgeType = (rarity) => {
  switch(rarity) {
    case ItemRarity.Common: return 'info'
    case ItemRarity.Uncommon: return 'tip'
    case ItemRarity.Rare: return 'warning'
    case ItemRarity.VeryRare: return 'danger'
    default: return 'info'
  }
}

const getCategoryBadgeType = (category) => {
  const color = CATEGORY_COLORS[category]
  switch(color) {
    case 'red': return 'danger'
    case 'green': return 'tip'
    case 'blue': return 'info'
    case 'orange': 
    case 'yellow': return 'warning'
    default: return 'info'
  }
}
</script>

## Items List

<div v-if="isLoading" class="flex justify-center items-center py-12">
  <Loader2 class="animate-spin" size="32"/>
</div>

<template v-else>
  <div class="filters mb-4">
    <div class="flex gap-4 items-center">
      <div class="search-container flex-1 relative">
        <input 
          :value="searchQuery"
          @input="onSearchInput"
          type="text"
          placeholder="Search items..."
          class="w-full px-4 py-2 pr-10 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <Search class="absolute right-3 top-2.5 text-gray-400" size="20"/>
      </div>
      <select 
        v-model="selectedCategory"
        class="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
      >
        <option value="all">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category === 'all' ? 'All Categories' : getItemCategoryText(category) }}
        </option>
      </select>
    </div>
  </div>

  <div v-if="filteredItems?.length">
    <table>
      <template v-for="item in filteredItems" :key="item?.Id">
        <tr v-if="item">
          <td style="width:15%;">
            <img :src="`https://carbonmod.gg/assets/media/items/${item.ShortName}.png`" 
                 :onerror="'this.src = \'https://carbonmod.gg/assets/media/missing.jpg\''">
          </td>
          <td>
            <h5 :id="item.ShortName">
              <a :href="`#${item.ShortName}`"><Badge type="tip" text="#"/></a> 
              {{ item.DisplayName }}
              <Badge v-if="item.Hidden" type="danger" text="Hidden"/>
              <template v-for="flag in getFlags(item.Flags)" :key="flag">
                <Badge type="warning" :text="flag"/>
              </template>
            </h5>
            <Badge type="info" :text="item.Id"/> 
            <button @click="copyToClipboard(item.Id.toString(), 'id', item.Id)" 
                    class="inline-flex items-center ml-1 p-1 hover:bg-gray-200 rounded">
              <Copy v-if="copiedId !== item.Id" size="14"/>
              <CheckCircle2 v-else size="14" class="text-green-500"/>
            </button>
            <Badge type="info" :text="item.ShortName"/> 
            <button @click="copyToClipboard(item.ShortName, 'name', item.Id)" 
                    class="inline-flex items-center ml-1 p-1 hover:bg-gray-200 rounded">
              <Copy v-if="copiedName !== item.Id" size="14"/>
              <CheckCircle2 v-else size="14" class="text-green-500"/>
            </button>
            <Badge type="warning" :text="`x${item.Stack}`"/>
            <Badge :type="getRarityBadgeType(item.Rarity)" :text="getItemRarityText(item.Rarity)"/>
            <Badge :type="getCategoryBadgeType(item.Category)" :text="getItemCategoryText(item.Category)"/><br>
            {{ item.Description }}
          </td>
        </tr>
      </template>
    </table>
  </div>

  <div v-else class="text-center py-12 text-gray-500">
    No items found matching your search
  </div>
</template>

<style>
.flex {
  display: flex;
}
.flex-1 {
  flex: 1 1 0%;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-center: center;
}
.gap-4 {
  gap: 1rem;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.right-3 {
  right: 0.75rem;
}
.top-2\.5 {
  top: 0.625rem;
}
.w-full {
  width: 100%;
}
.mb-4 {
  margin-bottom: 1rem;
}
.ml-1 {
  margin-left: 0.25rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
.p-1 {
  padding: 0.25rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.pr-10 {
  padding-right: 2.5rem;
}
.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.hover\:bg-gray-200:hover {
  background-color: #e5e7eb;
}
.rounded {
  border-radius: 0.25rem;
}
.border {
  border-width: 1px;
}
.border-gray-300 {
  border-color: #d1d5db;
}
.focus\:border-blue-500:focus {
  border-color: #3b82f6;
}
.focus\:outline-none:focus {
  outline: none;
}
.inline-flex {
  display: inline-flex;
}
.text-green-500 {
  color: #10b981;
}
.text-gray-400 {
  color: #9ca3af;
}
.text-gray-500 {
  color: #6b7280;
}
.text-center {
  text-align: center;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
