<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'
import { CheckCircle2, Copy } from 'lucide-vue-next'
import { shallowRef } from 'vue'

const { getTextToCopy, size = 14, text = null } = defineProps<{
  getTextToCopy: () => string
  size?: number
  text?: string
}>()

const isCopiedRecently = shallowRef(false)

const { start: startCopiedTimeout, stop: stopCopiedTimeout } = useTimeoutFn(
  () => {
    isCopiedRecently.value = false
  },
  2000,
  { immediate: false }
)

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    isCopiedRecently.value = true
    stopCopiedTimeout()
    startCopiedTimeout()
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

function handleCopy() {
  const text = getTextToCopy()
  copyToClipboard(text)
}
</script>

<template>
  <button class="contents" title="Copy to clipboard" @click.stop="handleCopy" @keydown.enter.prevent="handleCopy" @keydown.space.prevent="handleCopy">
    <component :is="isCopiedRecently ? CheckCircle2 : Copy" :size="size" />
    <span v-if="text" class="text-xs uppercase text-slate-400">{{ text }}</span>
  </button>
</template>
