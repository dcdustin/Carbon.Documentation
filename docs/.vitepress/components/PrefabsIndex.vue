<script setup lang="ts">
import { URL_METDAT_RUST_PREFABS } from '@/api/constants'
import { Database, ExternalLink } from 'lucide-vue-next'
import PrefabsViewer from './PrefabsViewer.vue'
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <div class="flex flex-col gap-4 mb-4">
      <h1 class="text-2xl font-bold">Rust Prefab Reference</h1>
      <p>
        This section contains a comprehensive list of all prefabs available in the game. Each prefab is listed
        with its unique ID, components, and file path.
      </p>
      <div class="flex items-center gap-2">
        <a :href="URL_METDAT_RUST_PREFABS" target="_blank" class="flex items-center gap-2">
          <Database :size="16" />
          Prefabs API
          <ExternalLink :size="14" class="opacity-80" />
        </a>
      </div>
    </div>
    <PrefabsViewer />
  </div>
</template>

<style scoped>
:deep(.VPBadge) {
  margin-left: 0;
  transform: none;
}
</style>
