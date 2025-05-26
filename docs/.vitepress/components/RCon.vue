<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  linkify: true,
  typographer: false,
  breaks: true
})

const address = ref('localhost:123')
const password = ref('')

const command = ref('')

const logContainer = ref()
const log = ref<string[]>([])
const ws = ref<WebSocket | null>(null)
const connected = ref(false)

onMounted(() => {
  log.value.push("<strong>Welcome to Carbon Documentation RCon</strong>")
})

function connect() {
  if (ws.value) {
    ws.value.close()
  }

  ws.value = new WebSocket('ws://' + address.value + '/' + password.value)

  ws.value.onopen = () => {
    connected.value = true
    log.value.push('Connected to ' + address.value + ' successfully..')
  }
  ws.value.onclose = () => {
    connected.value = false
    log.value.push('Disconnected.')
  }
  ws.value.onerror = (e) => {
    log.value.push('Error: ' + e)
  }
  ws.value.onmessage = (event) => {
    const resp: CommandResponse = JSON.parse(event.data)
    log.value.push(resp.Message)
    command.value = command.value
    logContainer.value.offsetHeight
    logContainer.value.scrollTop = logContainer.value.scrollHeight
  }
}

function sendCommand() {
  if(!command.value) {
    return;
  }

  if (ws.value && connected.value) {
    const packet: CommandSend = {
      Name: 'RttstRs',
      Message: command.value,
      Identifier: 1,
    }
    ws.value.send(JSON.stringify(packet))
  }
  log.value.push('<span style="color: var(--category-misc);"><strong>></strong></span> ' + command.value)
  command.value = ''
  logContainer.value.offsetHeight
  logContainer.value.scrollTop = logContainer.value.scrollHeight
}

interface CommandSend {
  Name: string
  Message: string
  Identifier: number
}

interface CommandResponse {
  Message: string
  Identifier: number
  Type: LogType
  Stacktrace: string
}

enum LogType {
  Generic = 0,
  Error = 1,
  Warning = 2,
  Chat = 3,
  Report = 4,
  ClientPerf = 5,
  Subscription = 6,
}
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8 space-y-0">
    <div class="flex gap-2 items-center">
      <input v-text="'test'" v-model="address" class="" placeholder="ws://host:port" />
      <input v-model="password" class="" type="password" placeholder="RCON Password" />
      <button class="p-2 ring-1 ring-white rounded-xl" @click="connect" :disabled="connected">Connect</button>
      <span v-if="connected" class="text-green-600">Connected</span>
    </div>
    <div style="height: 15px"></div>
    <div ref="logContainer" class="p-4 rounded text-sm font-mono " style="overflow: auto;  align-content: end; background-color: var(--vp-code-copy-code-bg); min-height: 300px; max-height: 700px; scrollbar-width: none;">
      <p v-for="(line, i) in log" :key="i" v-html="line" style="white-space: pre-wrap; text-wrap-mode: nowrap;"></p>
    </div>
    <div class="flex gap-2" style="align-items: center; background-color: var(--vp-code-copy-code-bg); padding: 10px;">
      <div style="color: var(--category-misc); font-family: monospace; font-weight: 900; user-select: none;">> </div>
      <input
        style="font-family: monospace; color: var(--docsearch-muted-color); width: -webkit-fill-available;"
        spellcheck="false"
        v-model="command"
        @keyup.enter="sendCommand"
      />
    </div>
  </div>
</template>