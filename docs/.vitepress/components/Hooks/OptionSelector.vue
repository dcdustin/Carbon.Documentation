<script setup lang="ts">
const { options, label } = defineProps<{
  options: string[]
  label: string
}>()

const model = defineModel<string>()
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="text-sm font-semibold">{{ label }}</span>
    <select
      v-model="model"
      class="bg-inherit px-3 py-1 cursor-pointer min-w-32 rounded-md text-sm dark:text-gray-100 ring-[1.5px] ring-gray-500 dark:ring-gray-600 focus:ring-2 focus:ring-violet-500"
    >
      <option v-for="(option, index) in options" :key="index" :value="option" class="">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped>
option {
  background-color: var(--vp-c-bg-soft);
}
</style>
