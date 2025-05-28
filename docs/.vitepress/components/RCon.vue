<script lang="ts" setup>
import { Plus, Dot, Wifi, X } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'

const command = ref('')
const logContainer = ref()
let timerSwitch: NodeJS.Timeout = null!

function tryFocusLogs() {
  setTimeout(() => {
    logContainer.value.offsetHeight
    logContainer.value.scrollTop = logContainer.value.scrollHeight
  }, 10)
}

class Server {
  Address = 'localhost:28606'
  Password = ''
  Socket: WebSocket | null = null
  Logs: string[] = []
  IsConnected = false
  ServerInfo: object | null = null
  CarbonInfo: object | null = null

  connect() {
    if(this.Socket != null) {
      this.Socket.onclose(new CloseEvent('close', {
        wasClean: true,
        code: 1000,
        reason: 'Manual close',
      }))
      this.Socket.close()
      this.Socket = null
      return;
    }

    this.Socket = new WebSocket('ws://' + this.Address + '/' + this.Password)

    this.Socket.onopen = () => {
      this.IsConnected = true
      this.Logs.push('Connected to ' + this.Address + ' successfully')
      tryFocusLogs()

      this.sendCommand('serverinfo', 2)
      this.sendCommand('c.version', 3)
    }
    this.Socket.onclose = () => {
      this.IsConnected = false
      this.Logs.push('Disconnected.')
      this.ServerInfo = null
      this.CarbonInfo = null
      tryFocusLogs()
    }
    this.Socket.onerror = (e) => {
      this.Logs.push('Error: ' + e)
      tryFocusLogs()
    }
    this.Socket.onmessage = (event) => {
      const resp: CommandResponse = JSON.parse(event.data)

      try {
        var isJson = false
        var jsonData = null

        try {
          jsonData = JSON.parse(resp.Message)
          isJson = true
        } catch { }

        if(this.onIdentifiedCommand(resp.Identifier, jsonData ?? resp)) {
          return;
        }
      } catch { }

      this.Logs.push(resp.Message)
      command.value = command.value
      tryFocusLogs()
    }
  }

  sendCommand(input: string, id: number = 1) {
    if(!input) {
      return;
    }

    if (this.Socket && this.IsConnected) {
      const packet: CommandSend = {
        Message: input,
        Identifier: id,
      }
      this.Socket.send(JSON.stringify(packet))
    }
    
    if(input == command.value) {
      this.Logs.push('<span style="color: var(--category-misc);"><strong>></strong></span> ' + input)
      command.value = ''
    }
    
    tryFocusLogs()
  }

  onIdentifiedCommand(id: number, data: object) {
    switch(id) {
      case 0: // Rust output
      case 1: // User input
        return false;
      case 2: // serverinfo
        this.ServerInfo = data  
        break;
      case 3: // carboninfo
        this.CarbonInfo = data  
        break;
    }

    return true;
  }
}

const servers = ref<Server[]>([])
const selectedServer = ref()

function createServer(address: string, password: string = '') {
  const server = new Server()
  server.Address = address
  server.Password = password
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
  tryFocusLogs()
}

onMounted(() => {
  const timerCallback = () => {
    timerSwitch = setTimeout(timerCallback, 10000)
    servers.value.forEach(server => {
      if(!server.IsConnected) {
        return;
      }
      server.sendCommand('serverinfo', 2)
    });
  }

  timerSwitch = setTimeout(timerCallback, 10000)
})

onUnmounted(() => {
  clearTimeout(timerSwitch)
})

interface CommandSend {
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
        <Dot size="45px" :style="'margin: -10px; color: ' + (server.IsConnected ? 'green' : 'red') + '; filter: blur(1.5px);'"/>
        <div style="display: grid;">
          <p><strong>{{ server.ServerInfo == null ? 'New Server' : server.ServerInfo.Hostname }}</strong></p>
          <p style="font-size: 12px; color: var(--vp-badge-info-text);">{{ server.Address }}</p>
        </div>
      </button>
      <button class="rcon-server-button" @click="servers.push(createServer('', ''))">
        <Plus/>
      </button>
    </div>

    <div v-if="selectedServer" class="rcon-server-settings" style="margin-top: 15px;">
      <div class="rcon-server-settings-input-group">
        <label class="rcon-server-settings-input-label" style="user-select: none;">Address</label>
        <input v-model="selectedServer.Address" type="text" class="rcon-server-settings-custom-input" placeholder="localhost:28507" />
      </div>
      <div class="rcon-server-settings-input-group">
        <label class="rcon-server-settings-input-label" style="user-select: none;">Password</label>
        <input v-model="selectedServer.Password" type="password" class="rcon-server-settings-custom-input" placeholder="••••••••••" />
      </div>
      <div style="display: flex;">
        <button class="rcon-server-button" @click="selectedServer.connect()" :style="'color: ' + (!selectedServer?.IsConnected ? 'var(--docsearch-footer-background);' : 'var(--c-carbon-3);') + 'font-size: small;'">
          <Wifi size="20px"/> {{ selectedServer?.IsConnected ? 'Disconnect' : 'Connect' }}
        </button>
        <button class="rcon-server-button" @click="deleteServer(selectedServer)" style="color: var(--docsearch-footer-background); font-size: small;">
          <X size="20px"/> Delete
        </button>
      </div>
    </div>

    <div v-if="selectedServer && selectedServer.ServerInfo" style="margin-top: 15px; display: flow;" class="rcon-server-settings">
      <div style="display: flex;">
        <div class="rcon-server-settings-input-group">
          <label class="rcon-server-settings-input-label" style="user-select: none;">Players</label>
          <p type="text" class="rcon-server-settings-custom-input transparent">{{ selectedServer.ServerInfo.Players }} / {{ selectedServer.ServerInfo.MaxPlayers }} — {{ selectedServer.ServerInfo.Queued }} queued, {{ selectedServer.ServerInfo.Joining }} joining</p>
        </div>
        <div class="rcon-server-settings-input-group">
          <label class="rcon-server-settings-input-label" style="user-select: none;">Entities</label>
          <p type="text" class="rcon-server-settings-custom-input transparent">{{ selectedServer.ServerInfo.EntityCount.toLocaleString() }}</p>
        </div>
        <div class="rcon-server-settings-input-group">
          <label class="rcon-server-settings-input-label" style="user-select: none;">Map</label>
          <p type="text" class="rcon-server-settings-custom-input transparent">{{ selectedServer.ServerInfo.Map }}</p>
        </div>
        <div class="rcon-server-settings-input-group">
          <label class="rcon-server-settings-input-label" style="user-select: none;">Version</label>
          <p type="text" class="rcon-server-settings-custom-input transparent">{{ selectedServer.ServerInfo.Protocol }}</p>
        </div>
      </div>
      <div style="display: flex;">
        <div class="rcon-server-settings-input-group">
          <label class="rcon-server-settings-input-label" style="user-select: none;">Carbon</label>
          <p type="text" class="rcon-server-settings-custom-input transparent">{{ selectedServer.CarbonInfo == null ? 'Not found' : selectedServer.CarbonInfo.Message.split(' ').slice(0, 2).join(' ') }}</p>
        </div>
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
        @keyup.enter="selectedServer?.sendCommand(command, 1)"
      />
      <button @click="selectedServer?.sendCommand(command, 1)" class="rcon-send-button"><span style="user-select: none">Send</span></button>
    </div>
    <div v-if="!selectedServer" style="color: var(--category-misc); font-size: small; text-align: center; user-select: none;">
      <p>No server selected</p>
    </div>
  </div>
</template>