<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { onMounted, onUnmounted } from 'vue'

const debounceTimeout = 350

const { placeholder } = defineProps<{
  placeholder?: string
}>()

const debouncedSearchValue = defineModel<string>()

const updateDebouncedSearch = (value: string) => {
  debouncedSearchValue.value = value

  if (value) {
    const hash = value.toLowerCase().replace(/\s+/g, '-')
    window.history.replaceState(null, '', `#${encodeURIComponent(hash)}`)
  } else {
    window.history.replaceState(null, '', window.location.pathname)
  }
}

const debounceSearchValue = useDebounceFn(updateDebouncedSearch, debounceTimeout, {
  maxWait: debounceTimeout * 3,
})

const handleUrlSearch = () => {
  const hash = decodeURIComponent(window.location.hash.slice(1))
  if (hash) {
    const searchTerm = hash.replace(/^hook-/, '').replace(/-/g, ' ')
    const cleanTerm = searchTerm
      .replace(/[^\x20-\x7E]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    debouncedSearchValue.value = cleanTerm
  }
}

onMounted(() => {
  handleUrlSearch()
  window.addEventListener('hashchange', handleUrlSearch)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', handleUrlSearch)
})
</script>

<template>
  <div class="bg-zinc-100/40 dark:bg-gray-800/40 backdrop-blur-sm px-4 py-4 rounded-xl">
    <div class="flex sm:flex-row flex-col sm:items-center items-start gap-4">
      <div class="flex items-center flex-1 gap-4">
        <slot name="icon" />
        <input
          class="w-full"
          :placeholder="placeholder ?? 'Search for...'"
          type="text"
          :value="debouncedSearchValue"
          @input="(event) => debounceSearchValue((event.target as HTMLInputElement).value)"
        />
      </div>
      <slot name="right" />
    </div>
  </div>
</template>
