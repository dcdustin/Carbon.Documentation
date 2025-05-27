<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const command = ref('')
const logContainer = ref()

class Server {
  Address = 'localhost:28606'
  Password = ''
  Socket: WebSocket | null = null
  Logs: string[] = []
  IsConnected = false

  connect() {
    this.Socket?.close()

    this.Socket = new WebSocket('ws://' + this.Address + '/' + this.Password)

    this.Socket.onopen = () => {
      this.IsConnected = true
      this.Logs.push('Connected to ' + this.Address + ' successfully..')
    }
    this.Socket.onclose = () => {
      this.IsConnected = false
      this.Logs.push('Disconnected.')
    }
    this.Socket.onerror = (e) => {
      this.Logs.push('Error: ' + e)
    }
    this.Socket.onmessage = (event) => {
      const resp: CommandResponse = JSON.parse(event.data)
      this.Logs.push(resp.Message)
      command.value = command.value
      logContainer.value.offsetHeight
      logContainer.value.scrollTop = logContainer.value.scrollHeight
    }
  }

  sendCommand() {
    if(!command.value) {
      return;
    }

    if (this.Socket && this.IsConnected) {
      const packet: CommandSend = {
        Name: 'RttstRs',
        Message: command.value,
        Identifier: 1,
      }
      this.Socket.send(JSON.stringify(packet))
    }
    this.Logs.push('<span style="color: var(--category-misc); user-select: none;"><strong>></strong></span> ' + command.value)
    command.value = ''
    logContainer.value.offsetHeight
    logContainer.value.scrollTop = logContainer.value.scrollHeight
  }
}

const selectedServer = ref()

onMounted(() => {
  selectedServer.value.Logs.push("<strong>Welcome to Carbon Documentation RCon</strong>")
})

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
      <input v-model="selectedServer.Address" v-if="selectedServer" class="" placeholder="Address" />
      <input v-model="selectedServer.Password"v-if="selectedServer" class="" type="password" placeholder="RCON Password" />
      <button class="p-2 ring-1 ring-white rounded-xl" @click="selectedServer.connect()" :disabled="selectedServer?.IsConnected">Connect</button>
      <span v-if="selectedServer?.IsConnected" class="text-green-600">Connected</span>
    </div>
    <div style="height: 15px"></div>
    <div ref="logContainer" class="p-4 rounded text-sm font-mono " style="overflow: auto;  align-content: end; background-color: var(--vp-code-copy-code-bg); min-height: 300px; max-height: 700px; scrollbar-width: none;">
      <p v-for="(line, i) in selectedServer?.Logs" :key="i" v-html="line" style="white-space: pre-wrap; text-wrap-mode: nowrap;"></p>
    </div>
    <div class="flex gap-2" style="align-items: center; background-color: var(--vp-code-copy-code-bg); padding: 10px;">
      <div style="color: var(--category-misc); font-family: monospace; font-weight: 900; user-select: none;">> </div>
      <input
        style="font-family: monospace; color: var(--docsearch-muted-color); width: -webkit-fill-available;"
        spellcheck="false"
        v-model="command"
        @keyup.enter="selectedServer?.sendCommand"
      />
      <button @click="selectedServer?.sendCommand" class="send-button"><span style="user-select: none">Send</span></button>
    </div>
  </div>
</template>

<style scoped>
.send-button {
  font-family: monospace;
  color: var(--category-misc);
  background-color: transparent;
  padding: 6px 12px;
  border-radius: 0px;
  cursor: pointer;
  transition: background-color, color;
}

.send-button:hover {
  background-color: var(--category-misc);
  color: white;
}
</style>