<script setup lang="ts">
import type { Hook } from '@/api/metadata/carbon/hooks'
import { getHookFlagsText } from '@/shared/constants'
import { inject, ShallowRef, shallowRef } from 'vue'
import type { Highlighter } from 'shiki'
import { useData } from 'vitepress'
import { ExternalLink, CheckCircle2, Copy } from 'lucide-vue-next'
import { VPBadge } from 'vitepress/theme'

const { hook } = defineProps<{
  hook: Hook
}>()

const highlighter = inject<Readonly<ShallowRef<Highlighter | null>>>('highlighter')
const data = useData()

const copiedId = shallowRef<string | null>(null)

const isExampleExpanded = shallowRef<boolean>(false)
const isSourceExpanded = shallowRef<boolean>(false)

function highlightCode(code: string, language = 'csharp'): string {
  if (!highlighter || !highlighter.value) {
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
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex sm:flex-row flex-col sm:items-center items-start gap-2">
      <h5 class="text-lg font-medium">
        <a :href="`/references/hooks#${encodeURIComponent(hook.fullName)}`" class="flex items-center gap-2">
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
      <span v-if="hook.returnTypeName != 'void'">Returning a non-null value cancels default behavior.</span>
      <span v-if="hook.returnTypeName == 'void'">No return behavior.</span>
    </div>
  </div>
  <div class="mt-1 flex gap-2">
    <button
      v-if="getExampleCode(hook, false)"
      class="flex gap-2 items-center text-xs px-2 py-1 text-gray-500 rounded-lg bg-gray-100 dark:bg-gray-800"
      @click="() => (isExampleExpanded = !isExampleExpanded)"
    >
      {{ isExampleExpanded ? 'Hide Example' : 'Show Example' }}
      <span @click.stop="copyToClipboard(getExampleCode(hook, false), 'examplecode' + hook.fullName)">
        <component :is="copiedId == 'examplecode' + hook.fullName ? CheckCircle2 : Copy" :size="14" />
      </span>
    </button>
    <button
      v-if="hook.methodSource"
      class="flex gap-2 items-center text-xs px-2 py-1 text-gray-500 rounded-lg bg-gray-100 dark:bg-gray-800"
      @click="() => (isSourceExpanded = !isSourceExpanded)"
    >
      {{ isSourceExpanded ? 'Hide Source' : 'Show Source' }}
      <span @click.stop="copyToClipboard(hook.methodSource, 'sourcecode' + hook.fullName)">
        <component :is="copiedId == 'sourcecode' + hook.fullName ? CheckCircle2 : Copy" :size="14" />
      </span>
    </button>
    <button v-else disabled class="text-xs px-2 py-1 text-gray-500 rounded-lg bg-gray-100 dark:bg-gray-800">
      No method source
    </button>
  </div>
  <Transition name="expand">
    <div v-if="highlighter && isExampleExpanded">
      <div
        v-html="getExampleCode(hook)"
        class="mt-2 sm:text-sm text-xs bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto p-4"
      ></div>
    </div>
  </Transition>
  <Transition name="expand">
    <div v-if="hook.methodSource && highlighter && isSourceExpanded">
      <div
        v-html="highlightCode(hook.methodSource)"
        class="mt-2 sm:text-sm text-xs bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto p-4"
      ></div>
    </div>
  </Transition>
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
