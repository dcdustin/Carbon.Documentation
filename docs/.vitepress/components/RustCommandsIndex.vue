<script setup lang="ts">
import { URL_METDAT_RUST_COMMANDS } from '@/api/constants'
import { Database, ExternalLink } from 'lucide-vue-next'
import RustCommandsViewer from './RustCommandsViewer.vue'
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <div class="flex flex-col gap-4 mb-4">
      <h1 class="text-2xl font-bold">Rust Commands Reference</h1>
      <p>Up to date list of all pre-built-in Rust commands.</p>
      <div class="flex items-center gap-2">
        <a :href="URL_METDAT_RUST_COMMANDS" target="_blank" class="flex items-center gap-2">
          <Database :size="16" />
          Rust Commands API
          <ExternalLink :size="14" class="opacity-80" />
        </a>
      </div>
    </div>
    <RustCommandsViewer />
  </div>
</template>

<style scoped>
:deep(.VPBadge) {
  margin-left: 0;
  transform: none;
}
</style>
