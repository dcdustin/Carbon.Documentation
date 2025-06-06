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
}

function encodeSearchTerm(term: string) {
  return encodeURIComponent(term.trim().replace(/\s+/g, ' '))
}

function decodeSearchTerm(term: string) {
  return decodeURIComponent(term.trim())
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

function updateParams(val: string | undefined) {
  if (val != undefined) {
    params.s = encodeSearchTerm(val)
  }
}

watch(debouncedSearchValue, (newVal) => {
  updateParams(newVal)
})

onMounted(() => {
  if (params.s) {
    handleUrlSearch(params.s.toString())
  }
  updateParams(debouncedSearchValue.value)
})
</script>

<template>
  <div class="rounded-xl bg-zinc-100/40 px-4 py-4 backdrop-blur-sm dark:bg-gray-800/40">
    <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <div class="flex flex-1 items-center gap-4">
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
