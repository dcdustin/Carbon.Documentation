<script setup lang="ts">
import { URL_SERVER_LIST } from '@/api/constants'
import { Database, ExternalLink } from 'lucide-vue-next'
import ServerBrowser from './ServerBrowser.vue'
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <div class="flex flex-col gap-4 mb-4">
      <h1 class="text-2xl font-bold">Carbon Server Browser</h1>
      <div class="flex items-center gap-2">
        <a :href="URL_SERVER_LIST" target="_blank" class="flex items-center gap-2">
          <Database :size="16" />
          Server List API
          <ExternalLink :size="14" class="opacity-80" />
        </a>
      </div>
    </div>
    <ServerBrowser />
  </div>
</template>

<style scoped>
:deep(.VPBadge) {
  margin-left: 0;
  transform: none;
}
</style>
