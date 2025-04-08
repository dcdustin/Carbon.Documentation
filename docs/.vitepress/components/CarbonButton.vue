<template>
    <a
      :href="href"
      :target="isExternal ? '_blank' : null"
      class="carbon-button"
    >
      <component
        v-if="icon"
        :is="getIconComponent"
        class="carbon-button-icon"
        size="16"
      />
      {{ text }}
      <ExternalLink
        v-if="isExternal"
        class="carbon-button-icon"
        size="14"
      />
    </a>
  </template>
  
  <script setup>
  import { ExternalLink, Globe, Database, CloudDownload, Download } from 'lucide-vue-next'
  import { computed } from 'vue'

  const props = defineProps({
    href: String,
    text: String,
    icon: {
      type: String,
      default: null
    },
    external: {
      type: [Boolean, String],
      default: false
    }
  })

  const isExternal = computed(() => {
    return props.external === true || props.external === 'true'
  })

  const getIconComponent = computed(() => {
    switch(props.icon?.toLowerCase()) {
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
.carbon-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.3em 1em;
  background-color: var(--c-carbon-1);
  color: white !important;
  border: none;
  border-radius: 0;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.carbon-button:hover {
  background-color: var(--c-carbon-2);
  color: white !important;
}
  
.carbon-button-icon {
  color: white;
}
  </style>