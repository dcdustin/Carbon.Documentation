<script setup lang="ts">
import { URL_METDAT_RUST_BLUEPRINTS } from '@/api/constants'
import { Database, ExternalLink } from 'lucide-vue-next'
import BlueprintsViewer from './BlueprintsViewer.vue'
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <div class="flex flex-col gap-4 mb-4">
      <h1 class="text-2xl font-bold">Rust Game Blueprints Reference</h1>
      <p>
        This section contains a comprehensive list of all crafting blueprints available in the game. Each
        blueprint shows the item details, crafting requirements, and research costs.
      </p>
      <div class="flex items-center gap-2">
        <a :href="URL_METDAT_RUST_BLUEPRINTS" target="_blank" class="flex items-center gap-2">
          <Database :size="16" />
          Blueprints API
          <ExternalLink :size="14" class="opacity-80" />
        </a>
      </div>
    </div>
    <BlueprintsViewer />
  </div>
</template>

<style scoped>
:deep(.VPBadge) {
  margin-left: 0;
  transform: none;
}
</style>
