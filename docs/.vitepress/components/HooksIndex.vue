<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from 'vue'
import { Copy, Database, CheckCircle2, Tag, Loader2, Search, ExternalLink } from 'lucide-vue-next'
import { VPBadge } from 'vitepress/theme'

const hooks = ref([])
const copiedName = ref(null)
const isLoading = ref(true)
const searchQuery = ref('')
const debouncedSearchQuery = ref('')
const pageSize = 50
const currentPage = ref(1)
const loadingMore = ref(false)
const hasMore = ref(true)

const LINK_API = 'https://carbonmod.gg/redist/metadata/carbon/hooks.json'

const getSanitizedAnchor = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/^-+|-+$/g, '') 
}

const filteredHooks = computed(() => {
  if (!hooks.value?.length) return []
  
  let filtered = hooks.value.filter(hook => hook && hook.name && hook.fullName)

  if (debouncedSearchQuery.value) {
    const searchLower = debouncedSearchQuery.value.toLowerCase()
    filtered = filtered.filter(hook => {
      if (!hook) return false
      return (
        (hook.name && hook.name.toLowerCase().includes(searchLower)) ||
        (hook.fullName && hook.fullName.toLowerCase().includes(searchLower)) ||
        (hook.category && hook.category.toLowerCase().includes(searchLower))
      )
    })
  }

  return filtered
})

const paginatedHooks = computed(() => {
  const start = 0
  const end = currentPage.value * pageSize
  return filteredHooks.value.slice(start, end)
})

let debounceTimeout
const updateDebouncedSearch = (value) => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    debouncedSearchQuery.value = value
    currentPage.value = 1 
  }, 300)
}

const copyToClipboard = async (text, name = null) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedName.value = name
    setTimeout(() => copiedName.value = null, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const loadMore = () => {
  if (loadingMore.value || !hasMore.value) return
  
  const totalItems = filteredHooks.value.length
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

watch(debouncedSearchQuery, () => {
  currentPage.value = 1
  hasMore.value = true
})

onMounted(async () => {
  try {    
    isLoading.value = true
    
    const response = await fetch(LINK_API)
    if (!response.ok) {
      throw new Error('Failed to fetch hooks data')
    }
    
    const data = await response.json()
    if (!Array.isArray(data)) {
      throw new Error('Data is not an array')
    }
    
    hooks.value = data.filter(hook => 
      hook && 
      typeof hook.name !== 'undefined' &&
      typeof hook.fullName !== 'undefined'
    )
  } catch (error) {
    console.error('Failed to load hooks:', error)
    hooks.value = []
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
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Carbon Hooks Reference</h1>
    <p class="mb-8">This section contains a comprehensive list of all hooks available in Carbon. Each hook is listed with its name, category, and compatibility information.</p>

    <div class="mb-4">
      <div class="flex items-center gap-2">
        <a :href="LINK_API" target="_blank" class="vp-button medium brand flex items-center gap-2">
          <Database size="16"/>
          Hooks API
          <ExternalLink size="14" class="opacity-80"/>
        </a>
      </div>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-8">
      <Loader2 class="animate-spin" size="24"/>
      <span class="ml-2">Loading hooks...</span>
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
              placeholder="Search hooks..." 
              class="w-[400px] px-4 py-2"
            >
          </div>
        </div>
      </div>

      <div v-if="paginatedHooks && paginatedHooks.length">
        <div class="fixed bottom-4 right-4 z-50">
          <div class="text-sm text-gray-500 dark:text-gray-400 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 border border-gray-200 dark:border-gray-700">
            Showing {{ paginatedHooks.length }} of {{ filteredHooks.length }} hooks
          </div>
        </div>

        <div class="overflow-x-auto">
          <div class="inline-block min-w-full">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <tbody>
                <tr v-for="hook in paginatedHooks" :key="hook.fullName" :id="getSanitizedAnchor(hook.fullName)" class="items-table-row">
                  <td class="whitespace-normal pb-4">
                    <div class="flex flex-col">
                      <div class="flex flex-wrap items-center">
                        <h5 class="text-lg font-medium">
                          <a :href="`/Carbon.Documentation/references/hooks/details?name=${encodeURIComponent(hook.fullName)}`" 
                             class="hover:text-primary inline-flex items-center gap-2">
                            {{ hook.name }}
                            <ExternalLink size="14" class="opacity-60"/>
                          </a>
                        </h5>
                        <button 
                          @click="copyToClipboard(hook.fullName, hook.fullName)" 
                          class="flex items-center px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex-shrink-0 ml-2"
                        >
                          <span class="font-mono">{{ hook.fullName }}</span>
                          <component :is="copiedName === hook.fullName ? CheckCircle2 : Copy" 
                                   class="ml-2" 
                                   size="14"
                          />
                        </button>
                      </div>
                      
                      <div class="flex flex-wrap gap-1.5 mt-2">
                        <VPBadge v-if="hook.category" type="info" :text="hook.category"/>
                        <VPBadge v-if="hook.carbonCompatible" type="success" text="Carbon Compatible"/>
                        <VPBadge v-if="hook.oxideCompatible" type="warning" text="Oxide Compatible"/>
                        <VPBadge v-if="hook.flags" type="tip" :text="`Flags: ${hook.flags}`"/>
                      </div>
                      
                      <div v-if="hook.parameters && hook.parameters.length" class="mt-2">
                        <div class="text-sm font-medium">Parameters:</div>
                        <div class="flex flex-wrap gap-2 mt-1">
                          <div v-for="param in hook.parameters" :key="param.name" class="text-sm">
                            <span class="font-mono">{{ param.name }}</span>
                            <span v-if="param.optional" class="text-gray-500">(optional)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div v-if="hook.returnTypeName" class="mt-2">
                        <div class="text-sm">
                          <span class="font-medium">Returns:</span> 
                          <span class="font-mono">{{ hook.returnTypeName }}</span>
                        </div>
                      </div>
                      
                      <div v-if="hook.methodSource" class="mt-2">
                        <div class="text-sm font-medium">Source:</div>
                        <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 overflow-x-auto">{{ hook.methodSource }}</pre>
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
        <p>No hooks found matching your search</p>
        <p v-if="hooks.value && hooks.value.length === 0" class="mt-2 text-sm">
          Debug: No hooks loaded. Check console for errors.
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




