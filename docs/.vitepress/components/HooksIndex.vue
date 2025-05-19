<script setup lang="ts">
import { URL_METDAT_CARB_HOOKS } from '@/api/constants'
import { Database, ExternalLink } from 'lucide-vue-next'
import { VPBadge } from 'vitepress/theme'
import HooksViewer from './HooksViewer.vue'
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <div class="flex flex-col gap-4 mb-4">
      <h1 class="text-2xl font-bold">Carbon Hooks Reference</h1>
      <p>
        This section contains a comprehensive list of all hooks available in Carbon. Each hook is listed with
        its name, category, and compatibility information.
      </p>
      <p>
        By default, if hooks are not <VPBadge type="danger" text="Static" /> or
        <VPBadge type="danger" text="Patch" />, they're dynamically applied upon plugin subscription,
        otherwise inactive.
      </p>
      <div class="flex items-center gap-2">
        <a :href="URL_METDAT_CARB_HOOKS" target="_blank" class="flex items-center gap-2">
          <Database :size="16" />
          Hooks API
          <ExternalLink :size="14" class="opacity-80" />
        </a>
      </div>
    </div>
    <HooksViewer />
  </div>
</template>

<style scoped>
:deep(.VPBadge) {
  margin-left: 0;
  transform: none;
}
</style>
