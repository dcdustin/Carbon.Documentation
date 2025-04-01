<template>
    <div class="carbon-change">
      <CarbonBadge :type="type">{{ type.toUpperCase() }}</CarbonBadge>
  
      <div class="carbon-change-text">{{ text }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import CarbonBadge from './CarbonBadge.vue';
  
  interface Props {
    type: 'add' | 'fix' | 'update' | 'misc' | 'remove' | 'date'
    text: string;
  }
  
  defineProps<Props>()
  </script>
  
  <style scoped>
  .carbon-change {
    display: flex;
    align-items: flex-start;
    gap: 5px;
    flex-wrap: wrap;
    margin-top: 0.5em;
  }
  
  .carbon-change-text {
    max-width: 90%;
  }
  </style>