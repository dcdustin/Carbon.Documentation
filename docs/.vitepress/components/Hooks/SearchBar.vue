<script setup lang="ts">
import { useDebounceFn, useUrlSearchParams } from '@vueuse/core'
import { onMounted, watch } from 'vue'

const debounceTimeout = 350

const { placeholder } = defineProps<{
  placeholder?: string
}>()

const debouncedSearchValue = defineModel<string>()

const params = useUrlSearchParams('history', {
  removeFalsyValues: true,
})

function updateDebouncedSearch(value: string) {
  debouncedSearchValue.value = value
  params.s = encodeSearchTerm(value)
}

function encodeSearchTerm(term: string) {
  return term.trim().replace(/\s+/g, '-')
}

function decodeSearchTerm(term: string) {
  return term.replace(/-/g, ' ').trim()
}

const debounceSearchValue = useDebounceFn(updateDebouncedSearch, debounceTimeout, {
  maxWait: debounceTimeout * 3,
})

function handleUrlSearch(val: string) {
  const decoded = decodeSearchTerm(val)
  if (decoded && decoded != debouncedSearchValue.value) {
    updateDebouncedSearch(decoded)
  }
}
watch(
  () => params.s,
  (newVal) => {
    if (newVal) {
      handleUrlSearch(newVal.toString())
    }
  }
)

onMounted(() => {
  if (params.s) {
    handleUrlSearch(params.s.toString())
  }
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
