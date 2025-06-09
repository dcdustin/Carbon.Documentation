<script lang="ts" setup>
import { geoFlagCache, selectedServer } from './ControlPanel.SaveLoad'
import { showInventory } from './ControlPanel.Inventory'

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
    <tr v-for="player in selectedServer.PlayerInfo">
      <td class="vp-doc td">
        <span style="display: flex; gap: 5px;" class="ml-2 text-xs text-slate-400"><img :src="geoFlagCache[player.Address]" class="size-4"/> {{ player.Ping }}ms</span>
      </td>
      <td class="vp-doc td">
        <strong>{{player.DisplayName}}</strong> <span class="text-xs text-slate-400">[<a style="color: inherit; display: inline-flex;" :href="'http://steamcommunity.com/profiles/' + player.SteamID" target="_blank">{{ player.SteamID }} <ExternalLink class="mx-1" :size="12"/> </a>]</span>
      </td>
      <td style="position: relative;">
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
</template>