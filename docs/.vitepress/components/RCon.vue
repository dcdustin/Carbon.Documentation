<script lang="ts" setup>
import { Plus, Dot, Wifi, X } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'

const command = ref('')
const logContainer = ref()

function tryFocusLogs() {
  logContainer.value.offsetHeight
  logContainer.value.scrollTop = logContainer.value.scrollHeight
}

class Server {
  Address = 'localhost:28606'
  Password = ''
  Hostname = 'My Server'
  Socket: WebSocket | null = null
  Logs: string[] = []
  IsConnected = false

  connect() {
    if(this.Socket != null) {
      this.Socket.close()
      this.Socket = null;
      this.IsConnected = false;
      return;
    }
    

    this.Socket = new WebSocket('ws://' + this.Address + '/' + this.Password)

    this.Socket.onopen = () => {
      this.IsConnected = true
      this.Logs.push('Connected to ' + this.Address + ' successfully..')
      tryFocusLogs()
    }
    this.Socket.onclose = () => {
      this.IsConnected = false
      this.Logs.push('Disconnected.')
      tryFocusLogs()
    }
    this.Socket.onerror = (e) => {
      this.Logs.push('Error: ' + e)
      tryFocusLogs()
    }
    this.Socket.onmessage = (event) => {
      const resp: CommandResponse = JSON.parse(event.data)
      this.Logs.push(resp.Message)
      command.value = command.value
      tryFocusLogs()
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
    this.Logs.push('<span style="color: var(--category-misc);"><strong>></strong> ' + command.value + '</span>')
    command.value = ''
    tryFocusLogs()
  }
}

const servers = ref<Server[]>([])
const selectedServer = ref()

function createServer(address: string, password: string = '', hostname: string = '') {
  const server = new Server()
  server.Address = address
  server.Password = password
  server.Hostname = hostname
  return server
}

function addServer(server: Server) {
  servers.value.push(server)
}

function deleteServer(server: Server) { 
  const confirmDelete = window.confirm(`Are you sure you want to delete server "${server.Address}"?`)
  if (confirmDelete) {
    servers.value.splice(servers.value.indexOf(server), 1)
    if(selectedServer.value == server) {
      selectedServer.value = null
    }
  }
}

function selectServer(server: Server) {
  selectedServer.value = selectedServer.value == server ? null : server
}

onMounted(() => {
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
    <div class="rcon-server-list">
      <button v-for="server in servers" :class="['rcon-server-button', { toggled: server == selectedServer }]" @click="selectServer(server)">
        <Dot :style="'color: ' + (server.IsConnected ? 'green' : 'red') + '; filter: blur(1.5px);'"/>
        <div style="display: grid;">
          <p><strong>{{ server.Hostname }}</strong></p>
          <p style="font-size: 12px; color: var(--vp-badge-info-text);">{{ server.Address }}</p>
        </div>
      </button>
      <button class="rcon-server-button" @click="servers.push(createServer('', '', 'New Server'))">
        <Plus/>
      </button>
    </div>

    <div style="margin: 15px;"></div>
    <div v-if="selectedServer" class="rcon-server-settings">
      <div class="rcon-server-settings-input-group">
        <label class="rcon-server-settings-input-label">Address</label>
        <input v-model="selectedServer.Address" type="text" class="rcon-server-settings-custom-input" placeholder="localhost:28507" />
      </div>
      <div class="rcon-server-settings-input-group">
        <label class="rcon-server-settings-input-label">Password</label>
        <input v-model="selectedServer.Password" type="password" class="rcon-server-settings-custom-input" placeholder="••••••••••" />
      </div>
      <div style="display: inline-grid;">
        <button class="rcon-server-button" @click="selectedServer.connect()" :style="'color: ' + (selectedServer?.IsConnected ? 'var(--c-carbon-release-fix);' : 'var(--category-ammunition);') + 'font-size: small;'">
          <Wifi size="20px"/> {{ selectedServer?.IsConnected ? 'Disconnect' : 'Connect' }}
        </button>
        <button class="rcon-server-button" @click="deleteServer(selectedServer)" style="color: var(--category-common); font-size: small;">
          <X size="20px"/> Delete
        </button>
      </div>
    </div>

    <div style="height: 15px"></div>
    <div v-if="selectedServer" ref="logContainer" class="p-4 rounded text-sm font-mono " style="overflow: auto;  align-content: end; background-color: var(--vp-code-copy-code-bg); min-height: 300px; max-height: 700px; scrollbar-width: none;">
      <p v-for="(line, i) in selectedServer?.Logs" :key="i" v-html="line" style="white-space: pre-wrap; text-wrap-mode: nowrap;"></p>
    </div>
    <div v-if="selectedServer" class="flex gap-2" style="align-items: center; background-color: var(--vp-code-copy-code-bg); padding: 10px;">
      <div style="color: var(--category-misc); font-family: monospace; font-weight: 900; user-select: none;">> </div>
      <input
        style="font-family: monospace; color: var(--docsearch-muted-color); width: -webkit-fill-available;"
        spellcheck="false"
        v-model="command"
        @keyup.enter="selectedServer?.sendCommand"
      />
      <button @click="selectedServer?.sendCommand" class="rcon-send-button"><span style="user-select: none">Send</span></button>
    </div>
    <div v-if="!selectedServer" style="color: var(--category-misc); font-size: small; text-align: center; user-select: none;">
      <p>No server selected</p>
    </div>
  </div>
</template>