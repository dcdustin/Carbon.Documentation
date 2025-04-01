<template>
    <span :class="['carbon-badge', type]">
      <slot>{{ text }}</slot>
    </span>
  </template>
  
  <script setup lang="ts">
  interface Props {
    text?: string
    type: 'add' | 'fix' | 'update' | 'misc' | 'remove' | 'date'
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
  font-size: 11px;
  font-weight: 500;
  padding: 0 5px;
  line-height: 22px;
  margin-left: 0.4em;
  border: 2px solid transparent;
  border-radius: 0%;
  color: white;
}

/* Badge types */
.carbon-badge.add   { background-color: var(--c-carbon-release-add);   border-color: var(--c-carbon-release-add); }
.carbon-badge.fix   { background-color: var(--c-carbon-release-fix);   border-color: var(--c-carbon-release-fix); }
.carbon-badge.update { background-color: var(--c-carbon-release-update); border-color: var(--c-carbon-release-update); }
.carbon-badge.misc    { background-color: var(--c-carbon-release-misc);    border-color: var(--c-carbon-release-misc); }
.carbon-badge.remove { background-color: var(--c-carbon-release-remove); border-color: var(--c-carbon-release-remove); }

.carbon-badge.date {
  float: right;
  background-color: var(--vp-badge-info-bg);
  border-color: var(--vp-badge-info-border);
  color: var(--vp-badge-info-text);
}
  </style>
  