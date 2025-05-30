<script setup lang="ts">
import { Server } from '@/api/misc/server-list'

const { server } = defineProps<{
  server: Server
}>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-row gap-2">
      <div class="flex flex-col gap-2">
        <span>{{ server.hostname }}</span>
        <span>{{ server.map }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
