<script setup lang="ts">
import { computed, onMounted, Ref, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { ArrowLeft, CheckCircle2, Copy, Loader2 } from 'lucide-vue-next'
import { VPBadge } from 'vitepress/theme'
import { getSingletonHighlighter } from 'shiki'
import { getGameData, getHookFlagsText, HOOKS_API_URL } from '../shared/constants'
import { fetchHooks, Hook } from '@/api/metadata/rust/hooks'
import type { Highlighter } from 'shiki'
const data = useData()

const hook: Ref<Hook | null> = ref(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const copiedId = ref<string | null>(null)
const highlighter = ref<Highlighter | null>(null)
const isHighlighterReady = ref(false)

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

    // const data = await getGameData(HOOKS_API_URL)
    const data = await fetchHooks()

    if (!data) {
      throw new Error('Failed to load hooks data')
    }

    let foundHook = null
    let foundCategory = null

    /*     for (const category in data) {
      if (Array.isArray(data[category])) {
        const hook = data[category].find(h => {
          return h.name === hookName || h.fullName === hookName
        })
        if (hook) {
          foundHook = hook
          foundCategory = category
          break
        }
      }
    } */
    loop1: for (const [category, hooks] of data) {
      for (const hook of hooks) {
        if (hook.name === hookName) {
          foundHook = hook
          foundCategory = category
          break loop1
        }
      }
    }

    if (!foundHook) {
      throw new Error(`Hook "${hookName}" not found`)
    }

    // Transform the hook data
    hook.value = foundHook
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load hook. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

const copyToClipboard = async (text: string, id: string | null) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = id
    setTimeout(() => (copiedId.value = null), 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

onMounted(async () => {
  try {
    highlighter.value = await getSingletonHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['csharp'],
    })
    isHighlighterReady.value = true
  } catch (err) {
    console.error('Failed to initialize Shiki:', err)
    error.value = 'Failed to initialize code highlighting'
  }

  // Load hook details if name is in URL
  const hookName = getHookName()

  if (hookName) {
    await loadHookDetails()
  } else {
    isLoading.value = false
    error.value = 'No hook name provided'
  }
})

// Watch for URL changes
watch(
  () => window.location.search,
  async () => {
    const hookName = getHookName()
    if (hookName) {
      isLoading.value = true
      await loadHookDetails()
    } else {
      hook.value = null
      error.value = 'No hook name provided'
      isLoading.value = false
    }
  }
)

const highlightCode = (code: string, isDark: boolean, language = 'csharp') => {
  if (!highlighter.value || !isHighlighterReady.value) {
    return code
  }
  try {
    return highlighter.value.codeToHtml(code, {
      lang: language,
      theme: isDark ? 'github-dark' : 'github-light',
    })
  } catch (err) {
    console.error('Failed to highlight code:', err)
    return code
  }
}

const exampleCodeRaw = computed(() => {
  if (!hook.value) {
    return ''
  }
  const code = `private ${hook.value.returnTypeName} ${hook.value.name}(${hook.value.parametersText})
{
    Puts("${hook.value.name} has been called!");${
    hook.value.returnTypeName !== 'void'
      ? `
    return (${hook.value.returnTypeName})default;`
      : ''
  }
}`
  return code
})
const exampleCode = computed(() => {
  if (!hook.value) {
    return ''
  }
  const code = `private ${hook.value.returnTypeName} ${hook.value.name}(${hook.value.parametersText})
{
    Puts("${hook.value.name} has been called!");${
    hook.value.returnTypeName !== 'void'
      ? `
    return (${hook.value.returnTypeName})default;`
      : ''
  }
}`
  return highlightCode(code, data.isDark.value)
})

const sourceCode = computed(() => {
  if (!hook.value?.methodSource) {
    return ''
  }
  return highlightCode(hook.value.methodSource, data.isDark.value)
})

// Update page title when hook is loaded
watch(
  hook,
  (newHook) => {
    if (newHook) {
      document.title = `${newHook.name} - Carbon Documentation`
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <div class="mb-6">
      <a
        href="/references/hooks/"
        class="inline-flex items-center gap-2 text-primary hover:text-primary-dark"
      >
        <ArrowLeft :size="18" />
        Back to Hooks
      </a>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-8">
      <Loader2 class="animate-spin" :size="24" />
      <span class="ml-2">Loading hook..</span>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <div class="text-red-500">{{ error }}</div>
    </div>

    <div v-else-if="hook" class="hook-details">
      <div class="flex items-start justify-left mb-6">
        <div>
          <div class="flex">
            <h1 class="text-3xl font-bold mb-2">{{ hook.name }}</h1>
            <button
              @click="copyToClipboard(hook.id.toString(), 'id')"
              class="flex items-center px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span class="font-mono">{{ hook.id }}</span>
              <component :is="copiedId === 'id' ? CheckCircle2 : Copy" class="ml-2" :size="14" />
            </button>
          </div>

          <div class="flex flex-wrap gap-1">
            <VPBadge v-if="hook.category" type="info" :text="hook.category" />
            <div v-for="flag in getHookFlagsText(hook.flags)" class="text-sm">
              <VPBadge v-if="hook.flags" type="info" :text="`${flag}`" />
            </div>
            <VPBadge v-if="hook.oxideCompatible" type="tip" text="Oxide Compatible" />
          </div>
        </div>
      </div>

      <div v-if="hook.descriptions && hook.descriptions.length" class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Description</h2>
        <div class="prose dark:prose-invert max-w-none">
          <p v-for="(desc, index) in hook.descriptions" :key="index">{{ desc }}</p>
        </div>
      </div>

      <div v-if="hook.returnTypeName" class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Return Type</h2>
        <p v-if="hook.returnTypeName != 'void'">Returning a non-null value cancels default behavior.</p>
        <p v-if="hook.returnTypeName == 'void'">This hook has no return behavior.</p>
      </div>

      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2" style="display: flex">Example <button
              @click="copyToClipboard(exampleCodeRaw, 'examplecode')"
              class="flex items-center px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <component :is="copiedId === 'examplecode' ? CheckCircle2 : Copy" class="ml-2" :size="14" />
            </button></h2>
        <div
          v-if="isHighlighterReady"
          v-html="exampleCode"
          class="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded-lg overflow-x-auto"
        ></div>
        <div v-else class="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded-lg overflow-x-auto">
          <code>{{ exampleCode }}</code>
        </div>
      </div>

      <div v-if="hook.methodSource" class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Source Code</h2>
        <VPBadge type="info" :text="hook.assemblyName" />
        <VPBadge type="danger" :text="hook.targetName" />
        <div
          v-if="isHighlighterReady"
          v-html="sourceCode"
          class="mt-2 text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded-lg overflow-x-auto"
        ></div>
        <pre v-else class="mt-2 text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded-lg overflow-x-auto">
          <code>{{ sourceCode }}</code>
        </pre>
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
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  background: transparent !important;
}
</style>
