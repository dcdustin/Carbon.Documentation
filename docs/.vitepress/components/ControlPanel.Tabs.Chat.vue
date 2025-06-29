<script lang="ts" setup>
import { message, chatContainer } from './ControlPanel.Chat'
import { selectedServer } from './ControlPanel.SaveLoad'
</script>

<template>
  <div
    v-if="selectedServer"
    ref="chatContainer"
    class="rounded p-4 font-mono text-sm"
    style="overflow: auto; align-content: end; background-color: var(--vp-code-copy-code-bg); min-height: 300px; max-height: 700px; scrollbar-width: none"
  >
    <p v-for="(line, i) in selectedServer?.Chat" :key="i" v-html="line" style="white-space: pre-wrap; text-wrap-mode: nowrap"></p>
  </div>
  <div v-if="selectedServer" class="flex gap-2" style="align-items: center; background-color: var(--vp-code-copy-code-bg); padding: 10px">
    <div style="color: var(--category-misc); font-family: monospace; user-select: none">SERVER</div>
    <input
      style="font-family: monospace; color: var(--docsearch-muted-color)"
      class="w-full"
      spellcheck="false"
      v-model="message"
      @keyup.enter='selectedServer?.sendMessage(message)'
    />
    <button @click='selectedServer?.sendMessage(message)' class="r-send-button"><span style="user-select: none">Send</span></button>
  </div>

</template>

<style scoped>
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
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 0, 0);
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
