<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import { Copy, CheckCircle2, ArrowLeft, ExternalLink } from 'lucide-vue-next'
import { VPBadge } from 'vitepress/theme'
import Prism from 'prismjs'
import 'prismjs/components/prism-csharp'
import '../theme/custom-prism.css'
import { HookFlags, getHookFlagsText, getGameData, HOOKS_API_URL } from '../shared/constants'

const route = useRoute()
const hook = ref(null)
const isLoading = ref(true)
const error = ref(null)
const copiedId = ref(null)

const getHookName = () => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('name')
}

const loadHookDetails = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const hookName = getHookName()
    if (!hookName) {
      throw new Error('No hook name provided')
    }

    console.log('Loading hook:', hookName) // Debug log

    const data = await getGameData(HOOKS_API_URL)
    if (!data) {
      throw new Error('Failed to load hooks data')
    }

    console.log('API Response:', data) // Debug log

    // Search for the hook in all categories
    let foundHook = null
    let foundCategory = null

    for (const category in data) {
      console.log('Checking category:', category) // Debug log
      if (Array.isArray(data[category])) {
        console.log('Category data:', data[category]) // Debug log
        const hook = data[category].find(h => {
          console.log('Hook data:', h) // Debug log
          console.log('Comparing:', h.name, h.fullName, 'with', hookName) // Debug log
          return h.name === hookName || h.fullName === hookName
        })
        if (hook) {
          foundHook = hook
          foundCategory = category
          break
        }
      }
    }

    if (!foundHook) {
      throw new Error(`Hook "${hookName}" not found`)
    }

    console.log('Found hook:', foundHook) // Debug log

    // Transform the hook data
    hook.value = {
      name: foundHook.name,
      fullName: foundHook.fullName,
      category: foundCategory,
      parameters: foundHook.parameters || [],
      returnTypeName: foundHook.returnTypeName,
      flags: foundHook.flags,
      carbonCompatible: foundHook.carbonCompatible,
      oxideCompatible: foundHook.oxideCompatible,
      descriptions: foundHook.descriptions || [],
      methodSource: foundHook.methodSource
    }

    console.log('Transformed hook:', hook.value) // Debug log

  } catch (err) {
    console.error('Failed to load hook details:', err)
    error.value = err.message
  } finally {
    isLoading.value = false
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

onMounted(() => {
  // Initialize Prism.js for code highlighting
  Prism.highlightAll()

  // Load hook details if name is in URL
  const hookName = getHookName()
  console.log('Initial URL check:', { hookName }) // Debug log
  
  if (hookName) {
    loadHookDetails()
  } else {
    isLoading.value = false
    error.value = 'No hook name provided'
  }
})

// Watch for URL changes
watch(() => window.location.search, () => {
  const hookName = getHookName()
  console.log('URL changed:', { hookName }) // Debug log
  if (hookName) {
    isLoading.value = true
    loadHookDetails()
  } else {
    hook.value = null
    error.value = 'No hook name provided'
    isLoading.value = false
  }
})

// Watch for hook changes to re-highlight code
watch(hook, () => {
  nextTick(() => {
    Prism.highlightAll()
  })
})

// Update page title when hook is loaded
watch(hook, (newHook) => {
  if (newHook) {
    document.title = `${newHook.name} - Carbon Documentation`
  }
}, { immediate: true })
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <div class="mb-6">
      <a href="/Carbon.Documentation/references/hooks/" class="inline-flex items-center gap-2 text-primary hover:text-primary-dark">
        <ArrowLeft size="16"/>
        Back to Hooks
      </a>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <span class="ml-2">Loading hook details...</span>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <div class="text-red-500">{{ error }}</div>
    </div>

    <div v-else-if="hook" class="hook-details">
      <div class="flex items-start justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold mb-2">{{ hook.name }}</h1>
          <div class="flex flex-wrap gap-2">
            <VPBadge v-if="hook.category" type="info" :text="hook.category"/>
            <VPBadge v-if="hook.carbonCompatible" type="success" text="Carbon Compatible"/>
            <VPBadge v-if="hook.oxideCompatible" type="warning" text="Oxide Compatible"/>
            <VPBadge v-if="hook.flags" type="tip" :text="`${getHookFlagsText(hook.flags).join(', ')}`"/>
          </div>
        </div>
        <button 
          @click="copyToClipboard(hook.fullName, 'fullName')" 
          class="flex items-center px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <span class="font-mono">{{ hook.fullName }}</span>
          <component :is="copiedId === 'fullName' ? CheckCircle2 : Copy" 
                   class="ml-2" 
                   size="14"
          />
        </button>
      </div>

      <div v-if="hook.descriptions && hook.descriptions.length" class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Description</h2>
        <div class="prose dark:prose-invert max-w-none">
          <p v-for="(desc, index) in hook.descriptions" :key="index">{{ desc }}</p>
        </div>
      </div>

      <div v-if="hook.parameters && hook.parameters.length" class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Parameters</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left">Name</th>
                <th class="px-4 py-2 text-left">Type</th>
                <th class="px-4 py-2 text-left">Optional</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="param in hook.parameters" :key="param.name" class="border-t border-gray-200 dark:border-gray-700">
                <td class="px-4 py-2 font-mono">{{ param.name }}</td>
                <td class="px-4 py-2 font-mono">{{ param.typeName }}</td>
                <td class="px-4 py-2">{{ param.optional ? 'Yes' : 'No' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="hook.returnTypeName" class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Return Type</h2>
        <div class="font-mono">{{ hook.returnTypeName }}</div>
      </div>

      <div v-if="hook.methodSource" class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Source Code</h2>
        <pre class="text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code class="language-csharp">{{ hook.methodSource }}</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hook-details :deep(pre) {
  margin: 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft) !important;
  border-radius: 0.375rem;
}

.dark .hook-details :deep(pre) {
  background: var(--vp-c-bg-mute) !important;
}

.hook-details :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  background: transparent !important;
}

.hook-details :deep(.language-csharp) {
  color: var(--vp-c-text-1);
}

.dark .hook-details :deep(.language-csharp) {
  color: var(--vp-c-text-1);
}
</style>
