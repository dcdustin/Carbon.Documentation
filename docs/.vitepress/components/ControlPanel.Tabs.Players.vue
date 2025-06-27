<script lang="ts" setup>
import { ExternalLink, ArrowUpFromDot, Trash2 } from 'lucide-vue-next'
import { showInventory, hideInventory, activeInventory, handleDrop, handleDrag, activeSlot, mainSlots, wearSlots, beltSlots, toolSlots } from './ControlPanel.Inventory'
import { geoFlagCache, selectedServer } from './ControlPanel.SaveLoad'

function formatDuration(seconds: number) {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  const parts = []
  if (hrs > 0) parts.push(`${hrs}h`)
  if (mins > 0) parts.push(`${mins}m`)
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`)

  return parts.join(' ')
}
</script>

<template>
  <table tabindex="0" class="vp-doc table">
    <thead>
      <tr>
        <th class="vp-doc th"></th>
        <th class="vp-doc th">Player</th>
        <th class="vp-doc th text-center">Health</th>
        <th class="vp-doc th">Connected</th>
        <th class="vp-doc th"></th>
      </tr>
    </thead>
    <tr v-for="player in selectedServer.PlayerInfo" :key="player.SteamID">
      <td class="vp-doc td">
        <span style="display: flex; gap: 5px" class="ml-2 text-xs text-slate-400"
          ><img :src="geoFlagCache[player.Address]" class="size-4" /> {{ player.Ping }}ms</span
        >
      </td>
      <td class="vp-doc td">
        <strong>{{ player.DisplayName }}</strong>
        <span class="text-xs text-slate-400"
          >[<a style="color: inherit; display: inline-flex" :href="'http://steamcommunity.com/profiles/' + player.SteamID" target="_blank"
            >{{ player.SteamID }} <ExternalLink class="mx-1" :size="12" /> </a
          >]</span
        >
      </td>
      <td style="position: relative">
        <div :style="'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #41642da6; width: ' + player.Health + '%'"></div>
        <div style="opacity: 50%; font-size: smaller">{{ player.Health.toFixed(1) }}</div>
      </td>
      <td class="vp-doc td">
        <span class="text-xs text-slate-400">{{ formatDuration(player.ConnectedSeconds) }}</span>
      </td>
      <td class="vp-doc td">
        <button class="r-send-button" @click="showInventory(player.SteamID)">Inventory</button>
      </td>
    </tr>
  </table>

  <div v-if="activeInventory" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="hideInventory()">
    <div class="mx-4 w-full max-w-lg rounded-lg bg-white p-6 dark:bg-gray-800" @click.stop>
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-xl font-bold"></h3>
        <button @click="hideInventory()" class="text-gray-500 hover:text-gray-700">
          <X :size="20" />
        </button>
      </div>
      <div class="items-center" style="justify-items: center">
        <div class="inventory-grid">
          <div v-for="slot in mainSlots" :key="slot.Position" class="slot" @dragover.prevent @drop="handleDrop(slot)">
            <img
              v-if="slot.hasItem()"
              class="slot-img"
              :src="`https://cdn.carbonmod.gg/items/${slot.ShortName}.png`"
              draggable="true"
              @dragstart="handleDrag(slot)"
            />
            <span v-if="slot.hasItem() && slot.Amount > 1" class="slot-amount">x{{ slot.Amount }}</span>
            <div v-if="slot.hasItem() && slot.HasCondition" class="slot-condition" :style="'height: ' + slot.ConditionNormalized * 100 + '%;'"></div>
          </div>
        </div>
        <div class="inventory-grid-clothing mt-5">
          <div v-for="slot in wearSlots" :key="slot.Position" class="slot" @dragover.prevent @drop="handleDrop(slot)">
            <img
              v-if="slot.hasItem()"
              class="slot-img"
              :src="`https://cdn.carbonmod.gg/items/${slot.ShortName}.png`"
              draggable="true"
              @dragstart="handleDrag(slot)"
            />
            <span v-if="slot.hasItem() && slot.Amount > 1" class="slot-amount">x{{ slot.Amount }}</span>
            <div v-if="slot.hasItem() && slot.HasCondition" class="slot-condition" :style="'height: ' + slot.ConditionNormalized * 100 + '%;'"></div>
          </div>
        </div>
        <div class="inventory-grid mt-5">
          <div v-for="slot in beltSlots" :key="slot.Position" class="slot" @dragover.prevent @drop="handleDrop(slot)">
            <div v-if="activeSlot == slot.Position" class="slot-active"></div>
            <img
              v-if="slot.hasItem()"
              class="slot-img"
              :src="`https://cdn.carbonmod.gg/items/${slot.ShortName}.png`"
              draggable="true"
              @dragstart="handleDrag(slot)"
            />
            <span v-if="slot.hasItem() && slot.Amount > 1" class="slot-amount">x{{ slot.Amount }}</span>
            <div v-if="slot.hasItem() && slot.HasCondition" class="slot-condition" :style="'height: ' + slot.ConditionNormalized * 100 + '%;'"></div>
          </div>
        </div>
        <div class="inventory-grid-tools mt-5">
          <div
            v-for="slot in toolSlots"
            :key="slot.Position"
            class="slot-tool items-center justify-center opacity-50"
            @dragover.prevent
            @drop="handleDrop(slot)"
          >
            <span v-if="slot.Container == 10" class="select-none justify-items-center text-xs opacity-50"><ArrowUpFromDot /> Drop</span>
            <span v-if="slot.Container == 11" class="select-none justify-items-center text-xs opacity-50"><Trash2 /> Discard</span>
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
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
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
</style>