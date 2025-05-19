<script setup lang="ts">
import { URL_METDAT_CARB_COMMANDS } from '@/api/constants'
import { Database, ExternalLink } from 'lucide-vue-next'
import CarbonCommandsViewer from './CarbonCommandsViewer.vue'
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <div class="flex flex-col gap-4 mb-4">
      <h1 class="text-2xl font-bold">Carbon Command Reference</h1>
      <p>Here's a full list of all currently available Carbon commands you can use.</p>
      <div class="flex items-center gap-2">
        <a :href="URL_METDAT_CARB_COMMANDS" target="_blank" class="flex items-center gap-2">
          <Database :size="16" />
          Carbon Commands API
          <ExternalLink :size="14" class="opacity-80" />
        </a>
      </div>
    </div>
    <CarbonCommandsViewer />
  </div>
</template>

<style scoped>
:deep(.VPBadge) {
  margin-left: 0;
  transform: none;
}
</style>
