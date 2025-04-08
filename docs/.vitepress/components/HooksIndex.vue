<script setup>
import { ref, onMounted, computed, watch, onUnmounted, nextTick } from 'vue'
import { Copy, Database, CheckCircle2, Tag, Loader2, Search, ExternalLink, Image, Clock, Wrench, Scissors, Lock, Unlock, X, RefreshCw } from 'lucide-vue-next'
import { VPBadge } from 'vitepress/theme'
import Prism from 'prismjs'
import 'prismjs/components/prism-csharp'
import '../theme/custom-prism.css'
import { HookFlags, getHookFlagsText, getGameData, HOOKS_API_URL, CACHE_VERSION_API_URL } from '../shared/constants'
import '../theme/style.css'

const hooks = ref([])
const copiedId = ref(null)
const isLoading = ref(true)
const error = ref(null)
const retryCount = ref(0)
const maxRetries = 3
const searchQuery = ref('')
const debouncedSearchQuery = ref('')
const pageSize = 50
const currentPage = ref(1)
const loadingMore = ref(false)
const hasMore = ref(true)
const categories = ref([])
const selectedCategory = ref('')
const showOxideOnly = ref(false)

const LINK_API = HOOKS_API_URL

const getSanitizedAnchor = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/^-+|-+$/g, '') 
}

const filteredHooks = computed(() => {
  if (!hooks.value?.length) return []
  
  let filtered = hooks.value.filter(hook => hook && hook.name)

  if (selectedCategory.value) {
    filtered = filtered.filter(hook => hook?.category === selectedCategory.value)
  }

  if (showOxideOnly.value) {
    filtered = filtered.filter(hook => hook.oxideCompatible)
  }

  if (debouncedSearchQuery.value) {
    const searchLower = debouncedSearchQuery.value.toLowerCase()
    filtered = filtered.filter(hook => {
      if (!hook) return false
      return (
        (hook.name && hook.name.toLowerCase().includes(searchLower)) ||
        (hook.descriptions && hook.descriptions.some(desc => desc.toLowerCase().includes(searchLower)))
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

const copyToClipboard = async (text, id = null) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = id
    setTimeout(() => copiedId.value = null, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const loadHooks = async () => {
  try {
    isLoading.value = true
    error.value = null
    const data = await getGameData(LINK_API)
    console.log('Raw hooks data:', data) // Debug log
    
    if (!data) {
      throw new Error('No data received from API')
    }

    // Transform the categorized data into a flat array
    const flatHooks = []
    for (const category in data) {
      if (Array.isArray(data[category])) {
        data[category].forEach(hook => {
          if (hook && hook.name) {
            flatHooks.push({
              ...hook,
              category: category,
              name: hook.name,
              fullName: hook.fullName || hook.name,
              parameters: hook.parameters || [],
              returnTypeName: hook.returnTypeName,
              flags: hook.flags,
              carbonCompatible: hook.carbonCompatible,
              oxideCompatible: hook.oxideCompatible,
              descriptions: hook.descriptions || []
            })
          }
        })
      }
    }
    console.log('Transformed hooks:', flatHooks) // Debug log
    
    if (flatHooks.length === 0) {
      throw new Error('No hooks found in the data')
    }

    hooks.value = flatHooks
    categories.value = ['all', ...new Set(flatHooks.map(hook => hook.category))]
  } catch (err) {
    console.error('Failed to load hooks:', err)
    error.value = err.message || 'Failed to load hooks. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

const loadMore = async () => {
  if (loadingMore.value || !hasMore.value) return
  
  loadingMore.value = true
  currentPage.value++
  hasMore.value = currentPage.value * pageSize < filteredHooks.value.length
  loadingMore.value = false
}

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
    loadMore()
  }
}

onMounted(async () => {
  await loadHooks()
  window.addEventListener('scroll', handleScroll)
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Initialize Prism.js for dynamic content
  Prism.highlightAll()
})

// Add a watch to re-highlight when hooks change
watch(() => hooks.value, () => {
  nextTick(() => {
    Prism.highlightAll()
  })
}, { deep: true })

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
        await loadHooks()
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

// Add retry function
const retryFetch = () => {
  if (retryCount.value < maxRetries) {
    retryCount.value++
    loadHooks()
  } else {
    error.value = 'Maximum retry attempts reached. Please refresh the page.'
  }
}
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

    <div v-else-if="error" class="flex flex-col items-center justify-center py-8 text-center">
      <div class="text-red-500 mb-4">{{ error }}</div>
      <button 
        @click="retryFetch"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
      >
        <RefreshCw size="16"/>
        Retry
      </button>
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
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium">Category:</span>
            <select 
              v-model="selectedCategory" 
              class="px-3 py-2  bg-inherit"
            >
              <option value="all">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <input 
              type="checkbox" 
              v-model="showOxideOnly"
              class="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary"
            >
            <span class="text-sm">Oxide Compatible</span>
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
                          <component :is="copiedId === hook.fullName ? CheckCircle2 : Copy" 
                                   class="ml-2" 
                                   size="14"
                          />
                        </button>
                      </div>
                      
                      <div class="flex flex-wrap gap-1.5 mt-2">
                        <VPBadge v-if="hook.category" type="info" :text="hook.category"/>
                        <VPBadge v-if="hook.carbonCompatible" type="success" text="Carbon Compatible"/>
                        <VPBadge v-if="hook.oxideCompatible" type="warning" text="Oxide Compatible"/>
                        <VPBadge v-if="hook.flags" type="tip" :text="`${getHookFlagsText(hook.flags).join(', ')}`"/>
                      </div>
                      
                      <div v-if="hook.parameters && hook.parameters.length" class="mt-2">
                        <div class="text-sm font-medium">Parameters:</div>
                        <div class="flex flex-wrap gap-2 mt-1">
                          <div v-for="param in hook.parameters" :key="param.name" class="text-sm">
                            <span class="font-mono">{{ param.name }}</span>
                            <span v-if="param.optional" class="text-gray-500">(optional)</span>
                            <span v-if="param.typeName" class="text-gray-500">: {{ param.typeName }}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div v-if="hook.returnTypeName" class="mt-2">
                        <div class="text-sm">
                          <span class="font-medium">Returns:</span> 
                          <span class="font-mono">{{ hook.returnTypeName }}</span>
                        </div>
                      </div>

                      <!--
                      <div v-if="hook.methodSource" class="mt-2">
                        <div class="text-sm font-medium">Source:</div>
                        <pre class="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 overflow-x-auto"><code class="language-csharp">{{ hook.methodSource }}</code></pre>
                      </div>
                      -->
                    
                    
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

:deep(pre) {
  margin: 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft) !important;
  border-radius: 0.375rem;
}

.dark :deep(pre) {
  background: var(--vp-c-bg-mute) !important;
}

:deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  background: transparent !important;
}

:deep(.language-csharp) {
  color: var(--vp-c-text-1);
}

.dark :deep(.language-csharp) {
  color: var(--vp-c-text-1);
}
</style>




