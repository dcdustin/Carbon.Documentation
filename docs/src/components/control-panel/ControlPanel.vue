<script lang="ts" setup>
import { ArrowUpFromDot, CodeXml, Dot, ExternalLink, HardDriveDownload, KeyRound, Plus, RotateCcw, Save, Shield, Trash2, Wifi, X } from 'lucide-vue-next'
import { onMounted, onUnmounted } from 'vue'
import { Slot, activeInventory, activeSlot, beltSlots, handleDrag, handleDrop, hideInventory, mainSlots, toolSlots, wearSlots } from './ControlPanel.Inventory'
import {
  Server,
  addServer,
  createServer,
  deleteServer,
  exportSave,
  importSave,
  isUsingHttps,
  load,
  selectServer,
  selectSubTab,
  selectedServer,
  selectedSubTab,
  servers,
} from './ControlPanel.SaveLoad'
import { selectedEntity, stopEditingEntity } from './ControlPanel.Entities'
import ConsoleTab from './ControlPanel.Tabs.Console.vue'
import ChatTab from './ControlPanel.Tabs.Chat.vue'
import PermissionsTab from './ControlPanel.Tabs.Permissions.vue'
import PlayersTab from './ControlPanel.Tabs.Players.vue'
import EntitiesTab from './ControlPanel.Tabs.Entities.vue'
import CarbonIcons from '../CarbonIcons.vue'

let timerSwitch: ReturnType<typeof setTimeout> = null!

const subTabs = [
  {
    Name: 'Console',
    Description: 'An RCon based console displaying all log output sent by the server and allows sending commands to the server.'
  },
  {
    Name: 'Chat',
    Description: 'All the chatter going on the server.'
  },
  {
    Name: 'Information',
    Description: 'Useful info about the server activity and various other options.'
  },
  {
    Name: 'Players',
    Description: 'A list of players or something like that.',
    ExtraData: (selectedServer: Server) => `(${selectedServer?.PlayerInfo?.length})`,
  },
  {
    Name: 'Permissions',
    Description: "Good ol' permissions."
  },
  {
    Name: 'Entities',
    Description: "Search and inspect any entities on the server."
  }
]

onMounted(() => {
  const timerCallback = () => {
    timerSwitch = setTimeout(timerCallback, 10000)
    servers.value.forEach((server) => {
      if (!server.Password || !server.UserConnected) {
        return
      }
      if (!server.IsConnected) {
        server.connect()
        return
      }
      server.sendCommand('serverinfo', 2)
      server.sendCommand('playerlist', 6)
      server.sendCommand('server.description', 5)
    })
  }

  timerSwitch = setTimeout(timerCallback, 10000)
  load()

  beltSlots.value = []
  mainSlots.value = []
  for (let i = 0; i < 24; i++) {
    const slot = new Slot()
    slot.Position = i
    slot.Container = 0
    mainSlots.value.push(slot)
  }
  for (let i = 0; i < 6; i++) {
    const slot = new Slot()
    slot.Position = i
    slot.Container = 1
    beltSlots.value.push(slot)
  }
  for (let i = 0; i < 7; i++) {
    const slot = new Slot()
    slot.Position = i
    slot.Container = 2
    wearSlots.value.push(slot)
  }

  const dropSlot = new Slot()
  dropSlot.Position = 0
  dropSlot.Container = 10
  toolSlots.value.push(dropSlot)

  const trashSlot = new Slot()
  trashSlot.Position = 1
  trashSlot.Container = 11
  toolSlots.value.push(trashSlot)
})

onUnmounted(() => {
  clearTimeout(timerSwitch)
})
</script>

<template>
  <div :class="['mx-auto space-y-0', (selectedServer && selectedServer.Expanded ? '!max-w-full p-3' : 'px-4 py-8 md:container lg:px-6 xl:px-8 2xl:px-20')]">
    <div class="r-list">
      <button v-for="server in servers" :key="server.Address" :class="['r-button', { toggled: server == selectedServer }]" @click="selectServer(server)">
        <Dot
          :size="45"
          :style="'color: ' + (server.IsConnecting ? 'yellow' : server.IsConnected ? 'green' : 'red')"
          class="-ms-5 -me-1 -my-2.5 blur-[1.5px]"
        />
        <div class="grid">
          <p>
            <strong>{{ !server.CachedHostname ? 'Unknown' : server.CachedHostname }}</strong>
          </p>
          <p class="text-xs color-badge-info">{{ server.Address }}</p>
        </div>
      </button>
      <button class="r-button" @click="addServer(createServer('', ''), true)">
        <Plus />
      </button>
      <div class="grid gap-y-0 text-xs">
        <button class="r-button" @click="importSave()"><HardDriveDownload :size="14" /> Import Clipboard</button>
        <button class="r-button" @click="exportSave()"><Save :size="14" /> Export Clipboard</button>
      </div>
    </div>

    <div v-if="selectedServer" class="r-settings !mt-4">
      <div :class="['r-settings-input-group', { '!hidden': !selectedServer.ShowCredentials }]">
        <span class="r-settings-input-label user-none">Address</span>
        <input v-model="selectedServer.Address" type="text" class="r-settings-custom-input" placeholder="localhost:28507" />
      </div>

      <div :class="['r-settings-input-group', { '!hidden': !selectedServer.ShowCredentials }]">
        <span class="r-settings-input-label user-none">Password</span>
        <input v-model="selectedServer.Password" type="password" class="r-settings-custom-input" />
      </div>

      <div>
        <button
          :class="['r-button text-xs', (!selectedServer?.IsConnected ? 'color-doc-foot-bg' : 'color-carbon-3')]"
          :disabled="selectedServer.IsConnecting"
          @click="selectedServer.connect()"
        >
          <Wifi :size="20" /> {{ selectedServer?.IsConnected ? 'Disconnect' : 'Connect' }}
        </button>
        <button class="r-button color-doc-foot-bg text-xs" @click="(e) => deleteServer(selectedServer, e)">
          <X :size="20" /> Delete
        </button>
        <button
          class="r-button"
          @click="selectedServer.toggleSecure()"
          :class="['r-button', { toggled: selectedServer.Secure }]"
        >
          <Shield :size="20" /> Secure
        </button>
        <button
          class="r-button color-doc-foot-bg text-xs"
          @click="selectedServer.toggleAutoConnect()"
          :class="['r-button', { toggled: selectedServer.AutoConnect }]"
        >
          <RotateCcw :size="20" /> Auto-Connect
        </button>
        <button
          @click="selectedServer.toggleCredentials()"
          :class="['r-button color-doc-foot-bg text-xs', 'r-button', { toggled: selectedServer.ShowCredentials }]"
        >
          <KeyRound :size="20" /> Credentials
        </button>
        <a
          class="r-button color-doc-foot-bg text-xs"
          href="https://github.com/CarbonCommunity/Carbon.Documentation/blob/main/docs/src/components/control-panel/ControlPanel.vue"
          target="_blank"
        >
          <CodeXml :size="20" /> Source <ExternalLink :size="13" />
      </a>
      </div>
    </div>

    <div v-if="isUsingHttps() && ! selectedServer?.Expanded" class="r-settings text-xs !mt-4 opacity-75">
      <p class="text-center">
        You're currently using Control Panel in HTTPS mode.
        <br />
        To use RCon without the SSL certificate requirement, update the URL to use
        <code><span class="color-cat-fav font-bold">http</span>://</code> instead of <code>https</code>.
        <br />
        This is only necessary if you want to connect to the remote server. If you're using it to connect to your local server (127.0.0.1, localhost, etc.) -
        you can ignore this.
      </p>
    </div>

    <div v-if="selectedServer && selectedServer.ServerInfo" class="r-settings !py-3 !mt-4">
      <div class="mb-5 flex relative">
        <button
          v-for="(tab, index) in subTabs"
          :key="index"
          @click="selectSubTab(index)"
          :class="['r-button color-doc-foot-bg text-xs', { toggled: selectedSubTab == index }]"
        >
          {{ tab.Name }} {{ tab.ExtraData != null ? tab.ExtraData(selectedServer) : null }}
        </button>

        <button
          @click="selectedServer.toggleExpandedView()"
          :class="['r-button absolute end-0 color-doc-foot-bg text-sm']"
        >
          <CarbonIcons :icon="selectedServer?.Expanded ? 'Shrink' : 'Fullscreen'" :size="16" class="!align-middle" /> {{ selectedServer?.Expanded ? 'Unfocus' : 'Focus' }}
        </button>
      </div>

      <div v-if="!selectedServer.Expanded">
        <div v-for="(tab, index) in subTabs" :key="index">
          <div v-if="selectedSubTab == index" class="m-4 text-xs text-slate-500">
            <span>{{ tab.Description }}</span>
          </div>
        </div>
      </div>

      <div v-if="selectedSubTab == 0">
        <ConsoleTab />
      </div>
      <div v-else-if="selectedSubTab == 1" class="overflow-auto">
        <ChatTab />
      </div>
      <div v-else-if="selectedSubTab == 2">
        <div class="r-settings-input-group">
          <span class="r-settings-input-label select-none">Host</span>
          <p type="text" class="r-settings-custom-input transparent">{{ selectedServer.ServerInfo.Hostname }}</p>
        </div>
        <div class="r-settings-input-group">
          <span class="r-settings-input-label select-none">Description</span>
          <div type="text" class="r-settings-custom-input transparent whitespace-break-spaces" v-html="selectedServer.Description"></div>
        </div>
        <div class="flex">
          <div class="r-settings-input-group">
            <span class="r-settings-input-label select-none">Header</span>
            <img v-if="selectedServer.HeaderImage" :src="selectedServer.HeaderImage" width="300" />
            <p v-else class="text-xs text-slate-400">No header available</p>
          </div>
        </div>

        <div class="flex">
          <div class="r-settings-input-group">
            <span class="r-settings-input-label select-none">Players</span>
            <p type="text" class="r-settings-custom-input transparent">
              {{ selectedServer.ServerInfo.Players }} / {{ selectedServer.ServerInfo.MaxPlayers }} — {{ selectedServer.ServerInfo.Queued }} queued,
              {{ selectedServer.ServerInfo.Joining }} joining
            </p>
          </div>
          <div class="r-settings-input-group">
            <span class="r-settings-input-label select-none">Entities</span>
            <p type="text" class="r-settings-custom-input transparent">{{ selectedServer.ServerInfo.EntityCount.toLocaleString() }}</p>
          </div>
          <div class="r-settings-input-group">
            <span class="r-settings-input-label select-none">Map</span>
            <p type="text" class="r-settings-custom-input transparent">{{ selectedServer.ServerInfo.Map }}</p>
          </div>
          <div class="r-settings-input-group">
            <span class="r-settings-input-label select-none">Version</span>
            <p type="text" class="r-settings-custom-input transparent">{{ selectedServer.ServerInfo.Protocol }}</p>
          </div>
        </div>

        <div class="flex">
          <div class="r-settings-input-group">
            <span class="r-settings-input-label select-none">Framerate</span>
            <p type="text" class="r-settings-custom-input transparent">
              {{ selectedServer.ServerInfo.Framerate }} FPS
            </p>
          </div>
          <div class="r-settings-input-group">
            <span class="r-settings-input-label select-none">Memory Usage</span>
            <p type="text" class="r-settings-custom-input transparent">{{ selectedServer.ServerInfo.MemoryUsageSystem }} MB / {{ selectedServer.ServerInfo.Memory }} MB</p>
          </div>
          <div class="r-settings-input-group">
            <span class="r-settings-input-label select-none">Uptime</span>
            <p type="text" class="r-settings-custom-input transparent">{{ (selectedServer.ServerInfo.Uptime / 60).toFixed(2) }} minutes</p>
          </div>
          <div class="r-settings-input-group">
            <span class="r-settings-input-label select-none">Network</span>
            <p type="text" class="r-settings-custom-input transparent">{{ (selectedServer.ServerInfo.NetworkIn / 1024).toFixed(2) }} kb / {{ (selectedServer.ServerInfo.NetworkOut / 1024).toFixed(2) }} kb</p>
          </div>
        </div>

        <div class="flex">
          <div class="r-settings-input-group">
            <span class="r-settings-input-label select-none">Carbon</span>
            <p type="text" class="r-settings-custom-input transparent">
              {{ selectedServer.CarbonInfo == null ? 'Not found' : selectedServer.CarbonInfo.Message.split(' ').slice(0, 2).join(' ') }}
            </p>
          </div>
        </div>
      </div>
      <div v-else-if="selectedSubTab == 3" class="overflow-auto">
        <PlayersTab />
      </div>
      <div v-else-if="selectedSubTab == 4" class="overflow-auto">
        <PermissionsTab />
      </div>
      <div v-else-if="selectedSubTab == 5" class="overflow-auto">
        <EntitiesTab />
      </div>
    </div>
    <div v-if="!selectedServer" class="color-cat-misc text-center text-xs user-select-none">
      <p>No server selected</p>
    </div>
  </div>
</template>

<style>
.color-cat-misc {
  color: var(--category-misc);
}
.color-carbon-3 {
  color: var(--c-carbon-3);
}
.color-cat-fav {
  color: var(--category-favourite);
}
.color-doc-foot-bg {
  color: var(--docsearch-footer-background);
}
.color-badge-info {
  color: var(--vp-badge-info-text);
}
.color-docsearch-muted {
  color: var(--docsearch-muted-color);
}

.r-list {
  display: flex;
  gap: 10px;
  overflow: scroll;
  flex-flow: wrap;
  scrollbar-width: none;
}

.r-settings {
  background-color: var(--vp-code-copy-code-bg);
  padding: 15px;
  gap: 1rem;
  font-family: monospace;
}

.r-settings-input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  flex: 1;
}

.r-settings-input-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #aaa;
  margin-bottom: 4px;
  font-weight: 500;
  letter-spacing: 0.05em;
}

.r-settings-custom-input {
  background-color: #1a1a1a;
  color: white;
  border-bottom: 1px solid #444;
  border-radius: 4px;
  padding: 5px 7px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease-in-out;
}

.r-settings-custom-input.transparent {
  font-size: small;
  border-radius: 0px;
  background-color: transparent !important;
}

.r-settings-custom-input:focus {
  border-color: #888;
}

.r-button {
  opacity: 50%;
  background-color: var(--vp-code-copy-code-bg);
  padding: 7.5px 15px;
  align-items: flex-start;
  text-align: left;
  display: ruby;
  transition-duration: 0s;
  border-bottom: 2px solid transparent;
}

.r-button:hover {
  opacity: 75%;
  background-color: var(--docsearch-text-color);
}

.r-button.toggled {
  opacity: 100%;
  background-color: var(--vp-button-alt-bg);
  border-bottom: 2px solid #ffffff29;
}

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
