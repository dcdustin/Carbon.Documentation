<script setup lang="ts">
import { URL_METDAT_CARB_CONVARS } from '@/api/constants'
import { Database, ExternalLink } from 'lucide-vue-next'
import CarbonConvarsViewer from './CarbonConvarsViewer.vue'
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <div class="flex flex-col gap-4 mb-4">
      <h1 class="text-2xl font-bold">Carbon Convars Reference</h1>
      <p>
        Here's a full list of all currently available CarbonAuto variables you can use to expand on what Rust
        already provides.
      </p>
      <div class="flex items-center gap-2">
        <a :href="URL_METDAT_CARB_CONVARS" target="_blank" class="flex items-center gap-2">
          <Database :size="16" />
          Carbon ConVars API
          <ExternalLink :size="14" class="opacity-80" />
        </a>
      </div>
    </div>
    <CarbonConvarsViewer />
  </div>
</template>

<style scoped>
:deep(.VPBadge) {
  margin-left: 0;
  transform: none;
}
</style>
