<template>
    <a
      :href="href"
      :target="external ? '_blank' : null"
      class="carbon-button"
    >
      <img
        v-if="icon"
        :src="`https://simpleicons.org/icons/${icon.toLowerCase()}.svg`"
        :alt="icon"
        class="carbon-button-icon"
      />
      {{ text }}
    </a>
  </template>
  
  <script setup>
  defineProps({
    href: String,
    text: String,
    icon: String,
    external: {
      type: Boolean,
      default: false
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
  color: white;
  border: none;
  border-radius: 0;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.carbon-button:hover {
  background-color: var(--c-carbon-2);
  color: white;
}
  
  .carbon-button-icon {
    filter: invert(1);
    width: 16px;
    height: 16px;
  }
  </style>