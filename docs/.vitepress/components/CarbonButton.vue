<template>
  <a :href="href" :target="isExternal ? '_blank' : undefined" class="carbon-button">
    <component v-if="icon" :is="getIconComponent as any" class="carbon-button-icon" size="18" />
    {{ text }}
    <component v-if="isExternal" :is="getNamedIconComponent('externallink') as any" class="carbon-button-icon" size="14" />
  </a>
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import { computed } from 'vue'

const getNamedIconComponent = (iconName: string | undefined) => {
  iconName = iconName?.toLowerCase()
  const matchedKey = Object.keys(icons).find((key) => key.toString().toLowerCase() === iconName)
  return matchedKey ? icons[matchedKey as keyof typeof icons] : undefined
}
const getIconComponent = computed(() => getNamedIconComponent(props.icon))

const props = defineProps({
  href: String,
  text: String,
  icon: {
    type: String,
    default: null,
  },
  external: {
    type: [Boolean, String],
    default: false,
  },
})

const isExternal = computed(() => {
  return props.external === true || props.external === 'true'
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
