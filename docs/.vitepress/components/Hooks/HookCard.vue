<script setup lang="ts">
import type { Hook } from '@/api/metadata/carbon/hooks'
import { getHookFlagsText } from '@/shared/constants'
import { shallowRef } from 'vue'
import { ExternalLink } from 'lucide-vue-next'
import { VPBadge } from 'vitepress/theme'
import ButtonIconCopy from './ButtonIconCopy.vue'
import CodeBlock from './CodeBlock.vue'

const { hook } = defineProps<{
  hook: Hook
}>()

const isExampleExpanded = shallowRef<boolean>(false)
const isSourceExpanded = shallowRef<boolean>(false)

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

function getExampleCode(hook: Hook): string {
  const code = `private ${hook.ReturnTypeName} ${hook.Name}(${hook.ParametersText})
{
    Puts("${hook.Name} has been called!");${
    hook.ReturnTypeName !== 'void'
      ? `
    return (${hook.ReturnTypeName})default;`
      : ''
  }
}`
  return code
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex sm:flex-row flex-col sm:items-center items-start gap-2">
      <h5 class="text-lg font-medium">
        <a :href="`/references/hooks#${encodeURIComponent(hook.FullName)}`" class="flex items-center gap-2">
          <span>{{ hook.FullName }}</span>
          <ExternalLink :size="14" class="opacity-60" />
        </a>
      </h5>
      <div class="flex flex-wrap gap-1.5">
        <VPBadge v-if="hook.Category" type="info" :text="hook.Category" title="Category" />
        <template v-for="flag in getHookFlagsText(hook.Flags)" class="text-sm">
          <VPBadge
            v-if="hook.Flags"
            type="danger"
            :text="`${flag}`"
            :title="getCorrespondingTitleForHookFlag(flag)"
          />
        </template>
        <VPBadge
          v-if="hook.OxideCompatible"
          type="tip"
          text="Oxide Compatible"
          title="Indicates that this hook is compatible with Oxide"
        />
      </div>
    </div>
    <div class="flex flex-col text-sm text-gray-500">
      <template v-for="(description, index) in hook.Descriptions" :key="index">
        <span class="font-bold">{{ description }}</span>
      </template>
      <span v-if="hook.ReturnTypeName != 'void'">Returning a non-null value cancels default behavior.</span>
      <span v-if="hook.ReturnTypeName == 'void'">No return behavior.</span>
    </div>
  </div>
  <div class="mt-1 flex gap-2">
    <button
      v-if="getExampleCode(hook)"
      class="flex gap-2 items-center text-xs px-2 py-1 text-gray-500 rounded-lg bg-gray-100 dark:bg-gray-800"
      @click="() => (isExampleExpanded = !isExampleExpanded)"
    >
      {{ isExampleExpanded ? 'Hide Example' : 'Show Example' }}
      <ButtonIconCopy :getTextToCopy="() => getExampleCode(hook)" />
    </button>
    <button
      v-if="hook.MethodSource"
      class="flex gap-2 items-center text-xs px-2 py-1 text-gray-500 rounded-lg bg-gray-100 dark:bg-gray-800"
      @click="() => (isSourceExpanded = !isSourceExpanded)"
    >
      {{ isSourceExpanded ? 'Hide Source' : 'Show Source' }}
      <ButtonIconCopy :getTextToCopy="() => hook.MethodSource" />
    </button>
    <button v-else disabled class="text-xs px-2 py-1 text-gray-500 rounded-lg bg-gray-100 dark:bg-gray-800">
      No method source
    </button>
  </div>
  <Transition name="expand">
    <CodeBlock v-if="isExampleExpanded" :code="getExampleCode(hook)" class="mt-2" />
  </Transition>
  <Transition name="expand">
    <CodeBlock v-if="hook.MethodSource && isSourceExpanded" :code="hook.MethodSource" class="mt-2" />
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
