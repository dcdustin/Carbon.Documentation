<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { Database, ExternalLink, Loader2, Search, CheckCircle2, Copy } from 'lucide-vue-next'
import { VPBadge } from 'vitepress/theme'
import { getHookFlagsText } from '@/shared/constants'
import { URL_METDAT_CARB_HOOKS } from '@/api/constants'
import '../theme/style.css'
import { fetchHooks } from '@/api/metadata/carbon/hooks'
import type { Hook } from '@/api/metadata/carbon/hooks'
import { getSingletonHighlighter } from 'shiki'
import type { Highlighter } from 'shiki'
import { useData } from 'vitepress'
import SearchBar from './Hooks/SearchBar.vue'
import CheckBox from './Hooks/CheckBox.vue'
import OptionSelector from './Hooks/OptionSelector.vue'
import InfinitePageScroll from './Hooks/InfinitePageScroll.vue'

const data = useData()

const isLoading = shallowRef(true)
const error = shallowRef<string | null>(null)

const highlighter = shallowRef<Highlighter | null>(null)

const hooks = shallowRef<Hook[]>([])

const categories = shallowRef<string[]>([])
const selectedCategory = shallowRef('All')
const showOxideHooks = shallowRef(true)
const showCarbonHooks = shallowRef(true)

const debouncedSearchValue = shallowRef('')

const pageSize = 25

const expandedHookSources = ref<Set<string>>(new Set())
const expandedHookExamples = ref<Set<string>>(new Set())

const copiedId = shallowRef<string | null>(null)

const filteredHooks = computed(() => {
  if (!hooks.value?.length) {
    return []
  }

  let filtered = hooks.value

  if (selectedCategory.value && selectedCategory.value != 'All') {
    filtered = filtered.filter((hook) => hook.category == selectedCategory.value)
  }

  if (showOxideHooks.value != showCarbonHooks.value) {
    filtered = filtered.filter(
      (hook) => hook.oxideCompatible == showOxideHooks.value && hook.oxideCompatible != showCarbonHooks.value
    )
  } else if (!showOxideHooks.value && !showCarbonHooks.value) {
    filtered = []
  }

  // TODO: use minisearch instead

  if (debouncedSearchValue.value) {
    const searchLower = debouncedSearchValue.value.toLowerCase()
    const searchNumber = Number(searchLower)
    filtered = filtered.filter((hook) => {
      return (
        (hook.name && hook.name.toLowerCase().includes(searchLower)) ||
        (hook.descriptions && hook.descriptions.some((desc) => desc.toLowerCase().includes(searchLower))) ||
        hook.id == searchNumber
      )
    })
  }

  return filtered
})

const loadHooks = async () => {
  try {
    isLoading.value = true
    error.value = null

    const data = await fetchHooks()

    if (!data) {
      throw new Error('No data received from API')
    }

    const flatHooks: Hook[] = []

    data.forEach((hooks) => {
      flatHooks.push(...hooks)
    })

    if (flatHooks.length == 0) {
      throw new Error('No hooks found in the data')
    }

    hooks.value = flatHooks
    categories.value = Array.from(data.keys())
  } catch (err) {
    console.error('Failed to load hooks:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load hooks. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

const getSanitizedAnchor = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getCorrespondingTitleForHookFlag(flag: string): string {
  switch (flag) {
    case 'Static':
      return 'Permanently active if loaded once'
    case 'Patch':
      return "Permanently active Patch which don't necessarily execute hooks (modify game code)"
    case 'IgnoreChecksum':
      return 'Dynamically patched regardless of version '
    default:
      return ''
  }
}

function highlightCode(code: string, language = 'csharp'): string {
  if (!highlighter.value) {
    return code
  }
  const isDark = data.isDark.value
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

function getExampleCode(hook: Hook, highlight = true): string {
  const code = `private ${hook.returnTypeName} ${hook.name}(${hook.parametersText})
{
    Puts("${hook.name} has been called!");${
    hook.returnTypeName !== 'void'
      ? `
    return (${hook.returnTypeName})default;`
      : ''
  }
}`
  return highlight ? highlightCode(code) : code
}

const copyToClipboard = async (text: string, id: string | null) => {
  try {
    navigator.clipboard.writeText(text)
    copiedId.value = id
    setTimeout(() => (copiedId.value = null), 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

onMounted(async () => {
  loadHooks()
  try {
    highlighter.value = await getSingletonHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['csharp'],
    })
  } catch (err) {
    console.error('Failed to load highlighter:', err)
  }
})
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <div class="flex flex-col gap-4 mb-4">
      <h1 class="text-2xl font-bold">Carbon Hooks Reference</h1>
      <p>
        This section contains a comprehensive list of all hooks available in Carbon. Each hook is listed with
        its name, category, and compatibility information.
      </p>
      <p>
        By default, if hooks are not <VPBadge type="danger" text="Static" /> or
        <VPBadge type="danger" text="Patch" />, they're dynamically applied upon plugin subscription,
        otherwise inactive.
      </p>
      <div class="flex items-center gap-2">
        <a :href="URL_METDAT_CARB_HOOKS" target="_blank" class="flex items-center gap-2">
          <Database :size="16" />
          Hooks API
          <ExternalLink :size="14" class="opacity-80" />
        </a>
      </div>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-8 gap-2">
      <Loader2 class="animate-spin" :size="24" />
      <span>Loading hooks...</span>
    </div>

    <div v-else-if="error" class="flex flex-col items-center justify-center py-8 text-center">
      <div class="text-red-500 mb-4">{{ error }}</div>
    </div>

    <div v-else>
      <SearchBar
        v-model="debouncedSearchValue"
        placeholder="Search hooks..."
        class="mb-4 sticky min-[960px]:top-20 top-16 z-10"
      >
        <template #icon>
          <Search class="text-gray-400" :size="20" />
        </template>
        <template #right>
          <div class="flex flex-row gap-4">
            <OptionSelector v-model="selectedCategory" :options="['All', ...categories]" label="Category:" />
            <div class="flex flex-row items-center gap-2">
              <CheckBox v-model="showOxideHooks">
                <template #default>
                  <span class="text-sm">Oxide</span>
                </template>
              </CheckBox>
              <CheckBox v-model="showCarbonHooks">
                <template #default>
                  <span class="text-sm">Carbon</span>
                </template>
              </CheckBox>
            </div>
          </div>
        </template>
      </SearchBar>
      <div v-if="filteredHooks && filteredHooks.length">
        <div class="flex flex-col gap-5 mt-4">
          <InfinitePageScroll :list="filteredHooks" :pageSize="pageSize" v-slot="{ renderedList }">
            <div class="fixed bottom-4 sm:right-4 sm:left-auto left-1/2 z-10">
              <div
                class="text-sm text-gray-500 bg-zinc-100/40 dark:bg-gray-800/40 backdrop-blur-sm px-4 py-2 rounded-lg"
              >
                Rendering {{ renderedList.length }} of {{ filteredHooks.length }} filtered hooks,
                {{ hooks.length }} total hooks.
              </div>
            </div>
            <div v-for="hook in renderedList" :key="hook.fullName" :id="getSanitizedAnchor(hook.fullName)">
              <div>
                <div class="flex flex-col gap-1">
                  <div class="flex sm:flex-row flex-col sm:items-center items-start gap-2">
                    <h5 class="text-lg font-medium">
                      <a
                        :href="`/references/hooks#${encodeURIComponent(hook.fullName)}`"
                        class="flex items-center gap-2"
                      >
                        <span>{{ hook.fullName }}</span>
                        <ExternalLink :size="14" class="opacity-60" />
                      </a>
                    </h5>
                    <div class="flex flex-wrap gap-1.5">
                      <VPBadge v-if="hook.category" type="info" :text="hook.category" title="Category" />
                      <template v-for="flag in getHookFlagsText(hook.flags)" class="text-sm">
                        <VPBadge
                          v-if="hook.flags"
                          type="danger"
                          :text="`${flag}`"
                          :title="getCorrespondingTitleForHookFlag(flag)"
                        />
                      </template>
                      <VPBadge
                        v-if="hook.oxideCompatible"
                        type="tip"
                        text="Oxide Compatible"
                        title="Indicates that this hook is compatible with Oxide"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col text-sm text-gray-500">
                    <template v-for="(description, index) in hook.descriptions" :key="index">
                      <span class="font-bold">{{ description }}</span>
                    </template>
                    <span v-if="hook.returnTypeName != 'void'"
                      >Returning a non-null value cancels default behavior.</span
                    >
                    <span v-if="hook.returnTypeName == 'void'">No return behavior.</span>
                  </div>
                </div>
                <div class="mt-1 flex gap-2">
                  <button
                    v-if="getExampleCode(hook, false)"
                    class="flex gap-2 items-center text-xs px-2 py-1 text-gray-500 rounded-lg bg-gray-100 dark:bg-gray-800"
                    @click="
                      expandedHookExamples.has(hook.fullName)
                        ? expandedHookExamples.delete(hook.fullName)
                        : expandedHookExamples.add(hook.fullName)
                    "
                  >
                    {{ expandedHookExamples.has(hook.fullName) ? 'Hide Example' : 'Show Example' }}
                    <span
                      @click.stop="
                        copyToClipboard(getExampleCode(hook, false), 'examplecode' + hook.fullName)
                      "
                    >
                      <component
                        :is="copiedId == 'examplecode' + hook.fullName ? CheckCircle2 : Copy"
                        :size="14"
                      />
                    </span>
                  </button>
                  <button
                    v-if="hook.methodSource"
                    class="flex gap-2 items-center text-xs px-2 py-1 text-gray-500 rounded-lg bg-gray-100 dark:bg-gray-800"
                    @click="
                      expandedHookSources.has(hook.fullName)
                        ? expandedHookSources.delete(hook.fullName)
                        : expandedHookSources.add(hook.fullName)
                    "
                  >
                    {{ expandedHookSources.has(hook.fullName) ? 'Hide Source' : 'Show Source' }}
                    <span @click.stop="copyToClipboard(hook.methodSource, 'sourcecode' + hook.fullName)">
                      <component
                        :is="copiedId == 'sourcecode' + hook.fullName ? CheckCircle2 : Copy"
                        :size="14"
                      />
                    </span>
                  </button>
                  <button
                    v-else
                    disabled
                    class="text-xs px-2 py-1 text-gray-500 rounded-lg bg-gray-100 dark:bg-gray-800"
                  >
                    No method source
                  </button>
                </div>
                <Transition name="expand">
                  <div v-if="highlighter && expandedHookExamples.has(hook.fullName)">
                    <div
                      v-html="getExampleCode(hook)"
                      class="mt-2 sm:text-sm text-xs bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto p-4"
                    ></div>
                  </div>
                </Transition>
                <Transition name="expand">
                  <div v-if="hook.methodSource && highlighter && expandedHookSources.has(hook.fullName)">
                    <div
                      v-html="highlightCode(hook.methodSource)"
                      class="mt-2 sm:text-sm text-xs bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto p-4"
                    ></div>
                  </div>
                </Transition>
              </div>
            </div>
          </InfinitePageScroll>
        </div>
      </div>
      <div v-else class="py-8 flex flex-col items-center justify-center gap-2">
        <p>No hooks found matching your search</p>
        <p v-if="hooks && hooks.length == 0" class="text-sm">
          Debug: No hooks loaded. Check console for errors.
        </p>
        <p v-else-if="debouncedSearchValue" class="text-sm">
          Debug: Search query "{{ debouncedSearchValue }}" returned no results.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPBadge {
  margin-left: 0;
  transform: none;
}

:deep(pre) {
  background: var(--vp-c-bg-soft) !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
  line-height: 1.5;
}

:deep(code .line.highlight) {
  background: var(--vp-c-bg) !important;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s cubic-bezier(0.44, 1.1, 0.91, 0.94);
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.expand-enter-active {
  transition-duration: 0.25s;
}

.expand-leave-active {
  transition-duration: 0.2s;
}
</style>
