<script setup lang="ts">
import { onClickOutside, useEventListener } from '@vueuse/core'
import { ChevronDown } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

const { options, label } = defineProps<{
  options: string[]
  label: string
}>()

const model = defineModel<string[]>({ default: [] })
const isOpen = ref(false)
const dropdownRef = ref()

const displayText = computed(() => {
  if (model.value.length === 0) return 'Select options...'
  return model.value.join(', ')
})

onClickOutside(dropdownRef, () => {
  isOpen.value = false
})

useEventListener(
  document,
  'scroll',
  (e) => {
    if (!dropdownRef.value?.contains(e.target)) {
      isOpen.value = false
    }
  },
  { passive: true }
)

const toggleOption = (option: string) => {
  const index = model.value.indexOf(option)
  if (index === -1) {
    model.value = [...model.value, option]
  } else {
    model.value = model.value.filter((item) => item !== option)
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    isOpen.value = false
  } else if (e.key === 'Enter' || e.key === ' ') {
    isOpen.value = !isOpen.value
  }
}

watch(
  () => model.value.length,
  (newLength) => {
    if (newLength === options.length) {
      isOpen.value = false
    }
  }
)
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <div class="flex items-center gap-2">
      <span class="shrink-0 text-sm font-semibold">{{ label }}</span>
      <button
        @click="isOpen = !isOpen"
        @keydown="handleKeyDown"
        class="flex w-48 cursor-pointer items-center rounded-md bg-inherit px-3 py-1.5 text-sm ring-[1.5px] ring-gray-500 transition-all duration-200 ease-in-out hover:ring-violet-400 focus:ring-2 focus:ring-violet-500 dark:text-gray-100 dark:ring-gray-600 dark:hover:ring-violet-400"
      >
        <span class="flex-1 truncate text-left" :class="{ 'text-gray-500 dark:text-gray-400': model.length === 0 }">{{ displayText }}</span>
        <ChevronDown class="ml-2 h-4 w-4 shrink-0 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" />
      </button>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="isOpen"
        class="absolute right-0 z-50 mt-1 max-h-60 w-48 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800"
      >
        <div class="py-1">
          <label
            v-for="(option, index) in options"
            :key="index"
            class="flex cursor-pointer items-center px-3 py-2 transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <input
              type="checkbox"
              :checked="model.includes(option)"
              @change="toggleOption(option)"
              class="h-4 w-4 cursor-pointer rounded border-gray-300 text-violet-600 transition-colors duration-150 focus:ring-2 focus:ring-violet-500"
            />
            <span class="ml-3 text-sm">{{ option }}</span>
          </label>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
/* Custom checkbox styles */
input[type='checkbox'] {
  @apply transition-all duration-150;
}

input[type='checkbox']:checked {
  @apply border-violet-500 bg-violet-500;
}

.dark input[type='checkbox'] {
  @apply border-gray-600;
}

.dark input[type='checkbox']:checked {
  @apply border-violet-500 bg-violet-500;
}

/* Scrollbar styles */
.dark *::-webkit-scrollbar {
  @apply w-2;
}

.dark *::-webkit-scrollbar-track {
  @apply bg-gray-800;
}

.dark *::-webkit-scrollbar-thumb {
  @apply rounded bg-gray-600 hover:bg-gray-500;
}

*::-webkit-scrollbar {
  @apply w-2;
}

*::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

*::-webkit-scrollbar-thumb {
  @apply rounded bg-gray-300 hover:bg-gray-400;
}
</style>
