<template>
  <component
    v-if="icon"
    :is="getIconComponent"
    class="carbon-icons"
  />
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: null,
  },
})

const getNamedIconComponent = (iconName) => {
  iconName = iconName?.toLowerCase()
  const matchedKey = Object.keys(icons).find(key => key.toString().toLowerCase() === iconName)
  return matchedKey ? icons[matchedKey] : undefined
}
const getIconComponent = computed(() => getNamedIconComponent(props.icon))
</script>

<style scoped>
.carbon-icons {
  display: inline-block;
  vertical-align: -5%;
}
</style>
