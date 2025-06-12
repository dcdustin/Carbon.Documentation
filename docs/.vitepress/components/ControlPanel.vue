<script lang="ts" setup>
import ConsoleTab from './ControlPanel.Tabs.Console.vue'
import PlayersTab from './ControlPanel.Tabs.Players.vue'
import PermissionsTab from './ControlPanel.Tabs.Permissions.vue'
import { Server, addServer, createServer, deleteServer, selectServer, geoFlagCache, load, servers, selectedServer, selectedSubTab, enforceSecure, selectSubTab } from './ControlPanel.SaveLoad'
import { Slot, activeSlot, activeInventory, showInventory, hideInventory, handleDrag, handleDrop, mainSlots, beltSlots, wearSlots, toolSlots, draggedSlot } from './ControlPanel.Inventory'
import { Plus, Dot, Wifi, X, RotateCcw, Shield, CodeXml, ExternalLink, ArrowUpFromDot, Trash2 } from 'lucide-vue-next'
import { onMounted, onUnmounted } from 'vue'

let timerSwitch: ReturnType<typeof setTimeout> = null!

const subTabs = [{
  Name: 'Console',
  Description: 'An RCon based console displaying all log output sent by the server and allows sending commands to the server.',
  Content: `<ConsoleTab />`
}, {
  Name: 'Information',
  Description: 'Useful info about the server activity and various other options.'
}, {
  Name: 'Players',
  Description: 'A list of players or something like that.',
  ExtraData: (selectedServer: Server) => `(${selectedServer?.PlayerInfo?.length})`
}, {
  Name: 'Permissions',
  Description: 'Good ol\' permissions.'
}]
 
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
  <div class="md:container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-20 py-8 space-y-0">
    <div class="r-list">
      <button v-for="server in servers" :key="server.Address" :class="['r-button', { toggled: server == selectedServer }]" @click="selectServer(server)">
        <Dot
          :size="45"
          :style="'margin: -10px; color: ' + (server.IsConnecting ? 'yellow' : server.IsConnected ? 'green' : 'red') + '; filter: blur(1.5px);'"
        />
        <div style="display: grid">
          <p>
            <strong>{{ !server.CachedHostname ? 'Undefined' : server.CachedHostname }}</strong>
          </p>
          <p style="font-size: 12px; color: var(--vp-badge-info-text)">{{ server.Address }}</p>
        </div>
      </button>
      <button class="r-button" @click="addServer(createServer('', ''), true)">
        <Plus />
      </button>
    </div>

    <div v-if="selectedServer" class="r-settings" style="margin-top: 15px">
      <div class="r-settings-input-group">
        <span class="r-settings-input-label" style="user-select: none">Address</span>
        <input v-model="selectedServer.Address" type="text" class="r-settings-custom-input" placeholder="localhost:28507" />
      </div>
      <div class="r-settings-input-group">
        <span class="r-settings-input-label" style="user-select: none">Password</span>
        <input v-model="selectedServer.Password" type="password" class="r-settings-custom-input" />
      </div>
      <div class="flex">
        <button
          class="r-button"
          :disabled="selectedServer.IsConnecting"
          @click="selectedServer.connect()"
          :style="'color: ' + (!selectedServer?.IsConnected ? 'var(--docsearch-footer-background);' : 'var(--c-carbon-3);') + 'font-size: small;'"
        >
          <Wifi :size="20" /> {{ selectedServer?.IsConnected ? 'Disconnect' : 'Connect' }}
        </button>
        <button class="r-button" @click="deleteServer(selectedServer)" style="color: var(--docsearch-footer-background); font-size: small">
          <X :size="20" /> Delete
        </button>
        <button
          class="r-button"
          @click="selectedServer.toggleSecure()"
          :class="['r-button', { toggled: selectedServer.Secure }]"
          style="color: var(--docsearch-footer-background); font-size: small"
        >
          <Shield :size="20" /> Secure
        </button>
        <button
          class="r-button"
          @click="selectedServer.toggleAutoConnect()"
          :class="['r-button', { toggled: selectedServer.AutoConnect }]"
          style="color: var(--docsearch-footer-background); font-size: small"
        >
          <RotateCcw :size="20" /> Auto-Connect
        </button>
        <a
          class="r-button"
          href="https://github.com/CarbonCommunity/Carbon.Documentation/blob/main/docs/.vitepress/components/RCon.vue"
          target="_blank"
          style="color: var(--docsearch-footer-background); font-size: small"
        >
          <CodeXml :size="20" /> Source <ExternalLink :size="13" />
        </a>
      </div>
    </div>

    <div v-if="enforceSecure()" class="r-settings" style="margin-top: 15px; font-size: small; opacity: 75%">
      <p style="text-align: center">
        You're currently using Carbon Documentation in HTTPS mode. <br />
        To use RCon without the SSL certificate requirement, update the URL to use
        <code><span style="color: var(--category-favourite); font-weight: bolder">http</span>://</code> instead of <code>https</code>.
      </p>
    </div>

    <div v-if="selectedServer && selectedServer.ServerInfo" style="margin-top: 15px; display: flow" class="r-settings">
      <div class="mb-5 flex">
        <button v-for="(tab, index) in subTabs" class="r-button" @click="selectSubTab(index)" :class="['r-button', { toggled: selectedSubTab == index }]" style="color: var(--docsearch-footer-background); font-size: small">
          {{ tab.Name }} {{ tab.ExtraData != null ? tab.ExtraData(selectedServer) : null }}
        </button>
      </div>

      <div v-for="(tab, index) in subTabs">
        <div v-if="selectedSubTab == index" class="text-slate-500 text-xs m-4">
          <span >{{ tab.Description }}</span>
        </div>
      </div>

      <div v-if="selectedSubTab == 0">
        <ConsoleTab />
      </div>
      <div v-else-if="selectedSubTab == 1">
        <div class="r-settings-input-group">
          <span class="r-settings-input-label" style="user-select: none">Host</span>
          <p type="text" class="r-settings-custom-input transparent">{{ selectedServer.ServerInfo.Hostname }}</p>
        </div>
        <div class="r-settings-input-group">
          <span class="r-settings-input-label" style="user-select: none">Description</span>
          <div type="text" class="r-settings-custom-input transparent" style="white-space: break-spaces" v-html="selectedServer.Description"></div>
        </div>
        <div style="display: flex">
          <div class="r-settings-input-group">
            <span class="r-settings-input-label" style="user-select: none">Header</span>
            <img v-if="selectedServer.HeaderImage" :src="selectedServer.HeaderImage" width="300" />
            <p v-else class="text-xs text-slate-400">No header available</p>
          </div>
        </div>
        <div style="display: flex">
          <div class="r-settings-input-group">
            <span class="r-settings-input-label" style="user-select: none">Players</span>
            <p type="text" class="r-settings-custom-input transparent">
              {{ selectedServer.ServerInfo.Players }} / {{ selectedServer.ServerInfo.MaxPlayers }} — {{ selectedServer.ServerInfo.Queued }} queued,
              {{ selectedServer.ServerInfo.Joining }} joining
            </p>
          </div>
          <div class="r-settings-input-group">
            <span class="r-settings-input-label" style="user-select: none">Entities</span>
            <p type="text" class="r-settings-custom-input transparent">{{ selectedServer.ServerInfo.EntityCount.toLocaleString() }}</p>
          </div>
          <div class="r-settings-input-group">
            <span class="r-settings-input-label" style="user-select: none">Map</span>
            <p type="text" class="r-settings-custom-input transparent">{{ selectedServer.ServerInfo.Map }}</p>
          </div>
          <div class="r-settings-input-group">
            <span class="r-settings-input-label" style="user-select: none">Version</span>
            <p type="text" class="r-settings-custom-input transparent">{{ selectedServer.ServerInfo.Protocol }}</p>
          </div>
        </div>
        <div style="display: flex">
          <div class="r-settings-input-group">
            <span class="r-settings-input-label" style="user-select: none">Carbon</span>
            <p type="text" class="r-settings-custom-input transparent">
              {{ selectedServer.CarbonInfo == null ? 'Not found' : selectedServer.CarbonInfo.Message.split(' ').slice(0, 2).join(' ') }}
            </p>
          </div>
        </div>
      </div>
      <div v-else-if="selectedSubTab == 2" style="overflow: auto;">
        <PlayersTab />
      </div>
      <div v-else-if="selectedSubTab == 3" style="overflow: auto;">
        <PermissionsTab />
      </div>
    </div>
    <div v-if="!selectedServer" style="color: var(--category-misc); font-size: small; text-align: center; user-select: none">
      <p>No server selected</p>
    </div>
  </div>

  <div v-if="activeInventory" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="hideInventory()">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4" @click.stop>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-bold"></h3>
        <button @click="hideInventory()" class="text-gray-500 hover:text-gray-700">
          <X :size="20" />
        </button>
      </div>
      <div class="items-center" style="justify-items: center;">      
        <div class="inventory-grid">
          <div v-for="slot in mainSlots" :key="slot.Position" class="slot" @dragover.prevent @drop="handleDrop(slot)">
            <img v-if="slot.hasItem()" class="slot-img" :src="`https://cdn.carbonmod.gg/items/${slot.ShortName}.png`" draggable="true" @dragstart="handleDrag(slot)"/>
            <span v-if="slot.hasItem() && slot.Amount > 1" class="slot-amount">x{{ slot.Amount }}</span>
            <div v-if="slot.hasItem() && slot.HasCondition" class="slot-condition" :style="'height: ' + (slot.ConditionNormalized * 100) + '%;'"></div>
          </div>
        </div>
        <div class="inventory-grid-clothing mt-5">
          <div v-for="slot in wearSlots" :key="slot.Position" class="slot" @dragover.prevent @drop="handleDrop(slot)">
            <img v-if="slot.hasItem()" class="slot-img" :src="`https://cdn.carbonmod.gg/items/${slot.ShortName}.png`" draggable="true" @dragstart="handleDrag(slot)"/>
            <span v-if="slot.hasItem() && slot.Amount > 1" class="slot-amount">x{{ slot.Amount }}</span>
            <div v-if="slot.hasItem() && slot.HasCondition" class="slot-condition" :style="'height: ' + (slot.ConditionNormalized * 100) + '%;'"></div>
          </div>
        </div>
        <div class="inventory-grid mt-5">
          <div v-for="slot in beltSlots" :key="slot.Position" class="slot" @dragover.prevent @drop="handleDrop(slot)">
            <div v-if="activeSlot == slot.Position" class="slot-active"></div>
            <img v-if="slot.hasItem()" class="slot-img" :src="`https://cdn.carbonmod.gg/items/${slot.ShortName}.png`" draggable="true" @dragstart="handleDrag(slot)"/>
            <span v-if="slot.hasItem() && slot.Amount > 1" class="slot-amount">x{{ slot.Amount }}</span>
            <div v-if="slot.hasItem() && slot.HasCondition" class="slot-condition" :style="'height: ' + (slot.ConditionNormalized * 100) + '%;'"></div>
          </div>
        </div>
        <div class="inventory-grid-tools mt-5">
          <div v-for="slot in toolSlots" :key="slot.Position" class="slot-tool opacity-50 items-center justify-center " @dragover.prevent @drop="handleDrop(slot)">
            <span v-if="slot.Container == 10" class="opacity-50 select-none justify-items-center text-xs"><ArrowUpFromDot /> Drop</span>
            <span v-if="slot.Container == 11" class="opacity-50 select-none justify-items-center text-xs"><Trash2 /> Discard</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inventory-grid {
  display: grid;
  grid-template-columns: repeat(6, 64px);
  grid-gap: 6px;
}

.inventory-grid-clothing {
  display: grid;
  grid-template-columns: repeat(7, 64px);
  grid-gap: 6px;
}
.inventory-grid-tools {
  display: grid;
  grid-template-columns: repeat(2, 64px);
  grid-gap: 6px;
}

.slot {
  width: 64px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.075);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slot-tool {
  width: 64px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.075);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slot-tool:hover {
  opacity: 100%;
}

.slot-active {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  position: absolute;
  background-color: #1b5c8b;
}

.slot-img {
  width: 80%;
  height: 80%;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  object-fit: contain;
}

.slot-amount {
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  position: absolute;
  bottom: 2px;
  right: 4px;
  font-size: 12px;
  padding: 0 2px;
  user-select: none;
}

.slot-condition {
  background-color: #5d8b30;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 12px;
  padding: 0 2px;
  user-select: none;
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
</style>
