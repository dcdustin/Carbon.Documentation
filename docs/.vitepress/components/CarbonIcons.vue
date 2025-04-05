<template>
    <component
      v-if="icon"
      :is="getIconComponent"
      class="carbon-icons"
    />
</template>
  
  <script setup>
  import {
    ExternalLink,
    Globe,
    Database,
    CloudDownload,
    Download,
    Server,
    List,
    BugOff,
    Play
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
        case 'server':
            return Server
        case 'list':
            return List
        case 'bugoff':
            return BugOff
        case 'play':
            return Play
        default:
            return null
    }
  })
  </script>
  
  <style scoped>
  .carbon-icons {
    display: inline-block;
    vertical-align: -5%;
  }
  </style>