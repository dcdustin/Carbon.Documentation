<script lang="ts" setup>
import { command, consoleContainer } from './ControlPanel.Console'
import { selectedServer } from './ControlPanel.SaveLoad'
</script>

<template>
  <div
    v-if="selectedServer"
    ref="consoleContainer"
    :class="['r-console-tab', { 'overscroll-contain': selectedServer.Expanded, 'expanded': selectedServer.Expanded }]"
  >
    <p v-for="(line, i) in selectedServer?.Logs" :key="i" v-html="line" style="white-space: pre-wrap; text-wrap-mode: nowrap"></p>
  </div>
  <div v-if="selectedServer" class="flex gap-2 items-center color-code-copy-bg p-2.5">
    <div class="text-category-misc font-mono font-extrabold select-none">></div>
    <input
      class="w-full font-mono color-docsearch-muted"
      spellcheck="false"
      v-model="command"
      @keydown.up.prevent="selectedServer?.selectHistory(true)"
      @keydown.down.prevent="selectedServer?.selectHistory(false)"
      @keyup.enter="selectedServer?.sendCommand(command, 1)"
    />
    <button @click="selectedServer?.clearLogs()" class="r-send-button"><span class="select-none">Clear</span></button>
    <button @click="selectedServer?.sendCommand(command, 1)" class="r-send-button"><span class="select-none">Send</span></button>
  </div>
</template>

<style scoped>
  .color-code-copy-bg {
    background-color: var(--vp-code-copy-code-bg);
  }

  .r-console-tab {
    @apply rounded p-4 font-mono text-sm overflow-auto content-end color-code-copy-bg min-h-[300px] max-h-[700px];

    scrollbar-width: none;

    &.expanded {
      max-height: unset;
      height: calc(100vh - var(--vp-nav-height) - 155px);
    }
  }
</style>