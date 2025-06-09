<script lang="ts" setup>
import { consoleContainer, command } from './ControlPanel.Console'
import { selectedServer } from './ControlPanel.SaveLoad'
</script>

<template>
  <div
    v-if="selectedServer"
    ref="consoleContainer"
    class="p-4 rounded text-sm font-mono"
    style="overflow: auto; align-content: end; background-color: var(--vp-code-copy-code-bg); min-height: 300px; max-height: 700px; scrollbar-width: none"
  >
    <p v-for="(line, i) in selectedServer?.Logs" :key="i" v-html="line" style="white-space: pre-wrap; text-wrap-mode: nowrap"></p>
  </div>
  <div v-if="selectedServer" class="flex gap-2" style="align-items: center; background-color: var(--vp-code-copy-code-bg); padding: 10px">
    <div style="color: var(--category-misc); font-family: monospace; font-weight: 900; user-select: none">></div>
    <input
      style="font-family: monospace; color: var(--docsearch-muted-color)"
      class="w-full"
      spellcheck="false"
      v-model="command"
      @keydown.up.prevent="selectedServer?.selectHistory(true)"
      @keydown.down.prevent="selectedServer?.selectHistory(false)"
      @keyup.enter="selectedServer?.sendCommand(command, 1)"
    />
    <button @click="selectedServer?.clearLogs()" class="r-send-button"><span style="user-select: none">Clear</span></button>
    <button @click="selectedServer?.sendCommand(command, 1)" class="r-send-button"><span style="user-select: none">Send</span></button>
  </div>
</template>

<style>

.r-send-button {
  text-decoration: auto;
  font-family: monospace;
  color: var(--category-misc);
  background-color: transparent;
  padding: 6px 12px;
  border-radius: 0px;
  cursor: pointer;
  transition: background-color, color;
  border-color: transparent;
  border: transparent 1px;
  transition-duration: .5s;
  transition-timing-function: cubic-bezier(0, 1, 0, 0)
}

.r-send-button.toggled {
  font-weight: bolder;
  text-decoration: underline;
  text-underline-position: under;
}

.r-send-button:hover {
  background-color: var(--category-misc);
  color: white;
}
</style>