<template>
    <component
      v-if="icon"
      :is="getIconComponent"
      class="carbon-icons"
      size="16"
    />
</template>
  
  <script setup>
  import {
    ExternalLink,
    Globe,
    Database,
    CloudDownload,
    Download
  } from 'lucide-vue-next'
  import { computed } from 'vue'
  
  const props = defineProps({
    icon: {
      type: String,
      default: null
    }
  })
  
  const getIconComponent = computed(() => {
    switch (props.icon?.toLowerCase()) {
      case 'database':
        return Database
      case 'globe':
        return Globe
      case 'externallink':
        return ExternalLink
      case 'clouddownload':
        return CloudDownload
      case 'download':
        return Download
      default:
        return null
    }
  })
  </script>
  
  <style scoped>
  .carbon-icons {
    display: inline-block;
    vertical-align: middle;
  }
  </style>