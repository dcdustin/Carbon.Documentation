<script setup lang="ts">
import { fetchServerList, ServerList } from '@/api/misc/server-list'
import { onMounted, shallowRef } from 'vue'

const serverList = shallowRef<ServerList | null>(null)

onMounted(async () => {
  serverList.value = await fetchServerList()
})
</script>

<template>
  <div class="container mx-auto p-14">
    <div v-if="serverList">
      <div v-for="server in serverList.Servers.slice(0, 100)" :key="server.ip">
        <h2>{{ server.hostname }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
