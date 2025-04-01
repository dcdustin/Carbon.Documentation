<template>
    <span :class="['carbon-badge', type]">
      <slot>{{ text }}</slot>
    </span>
  </template>
  
  <script setup lang="ts">
  interface Props {
    text?: string
    type: 'new' | 'fixed' | 'updated' | 'misc' | 'removed' | 'date'
  }
  defineProps<Props>()
  </script>
  
  <style scoped>

.badges-left {
  display: flex;
  flex-wrap: wrap;
}

.carbon-badge {
  display: inline-flex;
  font-size: 12px;
  font-weight: 500;
  padding: 0 10px;
  line-height: 22px;
  margin-left: 0.4em;
  border: 1px solid transparent;
  border-radius: 0%;
  color: white;
}

/* Badge types */
.carbon-badge.new     { background-color: var(--c-carbon-release-new);     border-color: var(--c-carbon-release-new); }
.carbon-badge.fixed   { background-color: var(--c-carbon-release-fixed);   border-color: var(--c-carbon-release-fixed); }
.carbon-badge.updated { background-color: var(--c-carbon-release-updated); border-color: var(--c-carbon-release-updated); }
.carbon-badge.misc    { background-color: var(--c-carbon-release-misc);    border-color: var(--c-carbon-release-misc); }
.carbon-badge.removed { background-color: var(--c-carbon-release-removed); border-color: var(--c-carbon-release-removed); }

.carbon-badge.date {
  float: right;
  background-color: var(--vp-badge-info-bg);
  border-color: var(--vp-badge-info-border);
  color: var(--vp-badge-info-text);
}
  </style>
  