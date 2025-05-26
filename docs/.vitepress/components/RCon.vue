<script lang="ts" setup>
import { ref } from 'vue'

const address = ref('ws://localhost:123')
const password = ref('')

const command = ref('')

const log = ref<string[]>([])
const ws = ref<WebSocket | null>(null)
const connected = ref(false)

function connect() {
  if (ws.value) {
    ws.value.close()
  }

  ws.value = new WebSocket(address.value + '/' + password.value)

  ws.value.onopen = () => {
    connected.value = true
    log.value.push('Connected!')
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
    log.value.push('Server: ' + resp.Message)
  }
}

function sendCommand() {
  if (ws.value && connected.value) {
    const packet: CommandSend = {
      Name: 'RttstRs',
      Message: command.value,
      Identifier: 1,
    }
    ws.value.send(JSON.stringify(packet))
    log.value.push(command.value)
    command.value = ''
  }
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
  <div class="max-w-screen-lg mx-auto px-4 py-8 space-y-4">
    <div class="flex gap-2 items-center">
      <input v-model="address" class="" placeholder="ws://host:port" />
      <input v-model="password" class="" type="password" placeholder="RCON Password" />
      <button class="p-2 ring-1 ring-white rounded-xl" @click="connect" :disabled="connected">Connect</button>
      <span v-if="connected" class="text-green-600">Connected</span>
    </div>
    <div class="flex gap-2">
      <input
        v-model="command"
        class=""
        placeholder="Type command..."
        @keyup.enter="sendCommand"
        :disabled="!connected"
      />
      <button class="p-2 ring-1 ring-white rounded-xl" @click="sendCommand" :disabled="!connected">
        Send
      </button>
    </div>
    <div class="p-4 rounded h-96 overflow-y-auto text-sm font-mono border border-gray-200">
      <div v-for="(line, i) in log" :key="i">{{ line }}</div>
    </div>
  </div>
</template>
