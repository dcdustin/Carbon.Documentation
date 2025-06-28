<script setup lang="ts">
import { URL_SERVER_LIST } from '@/api/constants'
import { Database, ExternalLink } from 'lucide-vue-next'
import ServerBrowser from './ServerBrowser.vue'
import ApiIndex from './common/ApiIndex.vue'
</script>

<template>
  <ApiIndex>
    <div class="mb-4 flex flex-col gap-4">
      <h1 class="text-2xl font-bold">Carbon Server Browser</h1>
      <p>Browse and find Rust servers</p>
      <div class="flex items-center gap-2">
        <a :href="URL_SERVER_LIST" target="_blank" class="flex items-center gap-2">
          <Database :size="16" />
          Server List API
          <ExternalLink :size="14" class="opacity-80" />
        </a>
      </div>
    </div>
    <ServerBrowser />
  </ApiIndex>
</template>
