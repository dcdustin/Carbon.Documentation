<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'

const { renderedLenght, filteredLenght, totalLenght, isFetchedRestData } = defineProps<{
  renderedLenght: number
  filteredLenght: number
  totalLenght: number
  isFetchedRestData: boolean
}>()
</script>
<template>
  <div class="fixed bottom-4 left-1/2 z-10 sm:left-auto sm:right-4">
    <div class="rounded-lg bg-zinc-100/40 px-4 py-2 text-xs text-gray-500 backdrop-blur-sm sm:text-sm dark:bg-gray-800/40">
      Rendering {{ renderedLenght }} of {{ filteredLenght }} filtered servers, {{ isFetchedRestData ? totalLenght : '' }}
      <LoaderCircle v-if="!isFetchedRestData" class="inline animate-spin" :size="16" />
      total servers
    </div>
  </div>
</template>
