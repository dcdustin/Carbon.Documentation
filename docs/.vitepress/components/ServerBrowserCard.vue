<script setup lang="ts">
import { Server } from '@/api/misc/server-list'
import ButtonIconCopy from '@/components/common/ButtonIconCopy.vue'
import { Map as MapIcon } from 'lucide-vue-next'
import { computed } from 'vue'

const { server } = defineProps<{
  server: Server
}>()

interface ColorStop {
  r: number
  g: number
  b: number
}

interface ColorStops {
  [key: number]: ColorStop
}

const playerPercentage = computed(() => {
  return (server.players / server.maxplayers) * 100
})

const COLOR_STOPS: ColorStops = {
  0: { r: 16, g: 185, b: 129 }, // Emerald 500 - Empty
  60: { r: 16, g: 185, b: 129 }, // Emerald 500 - Still Green
  90: { r: 245, g: 158, b: 11 }, // Amber 500  - Getting Full
  100: { r: 245, g: 158, b: 11 }, // Amber 500  - Full but can join
}

const interpolateColor = computed(() => {
  const percentage = playerPercentage.value

  if (percentage <= 0) {
    return ''
  }

  if (percentage > 100) {
    return 'rgb(239, 68, 68)'
  }

  let lower = 0
  let upper = 60
  if (percentage >= 60) {
    lower = 60
    upper = 90
  }
  if (percentage >= 90) {
    lower = 90
    upper = 100
  }

  const range = upper - lower
  const adjustedPercentage = (percentage - lower) / range

  const lowerColor = COLOR_STOPS[lower]
  const upperColor = COLOR_STOPS[upper]
  const r = Math.round(lowerColor.r + (upperColor.r - lowerColor.r) * adjustedPercentage)
  const g = Math.round(lowerColor.g + (upperColor.g - lowerColor.g) * adjustedPercentage)
  const b = Math.round(lowerColor.b + (upperColor.b - lowerColor.b) * adjustedPercentage)

  return `rgb(${r}, ${g}, ${b})`
})

interface TagGroup {
  title: string
  tags: string[]
  type: 'region' | 'wipe' | 'difficulty' | 'feature' | 'mod'
}

const tagToRegion = new Map([
  ['NA', 'North America'],
  ['SA', 'South America'],
  ['EU', 'Europe'],
  ['WA', 'West Asia'],
  ['EA', 'East Asia'],
  ['OC', 'Oceania'],
  ['AF', 'Africa'],
])

const compressedTagToWipe = new Map([
  ['m', 'Monthly'],
  ['b', 'Biweekly'],
  ['w', 'Weekly'],
])

const compressedTagToDifficulty = new Map([
  ['v', 'Vanilla'],
  ['h', 'Hardcore'],
  ['s', 'Softcore'],
])

const compressedTagToFeature = new Map([
  ['p', 'PvE'],
  ['r', 'Roleplay'],
  ['c', 'Creative'],
  ['e', 'Minigame'],
  ['d', 'Combat Training'],
])

const compressedTagToMod = new Map([
  ['o', 'Oxide'],
  ['y', 'Carbon'],
])

const processedTags = computed(() => {
  const tags = server.tags?.split(',') || []
  const result = {
    groups: [] as TagGroup[],
    displayTags: [] as string[],
  }

  const wipeGroup: TagGroup = { title: 'Wipe Schedule', tags: [], type: 'wipe' }
  const difficultyGroup: TagGroup = { title: 'Difficulty', tags: [], type: 'difficulty' }
  const featureGroup: TagGroup = { title: 'Features', tags: [], type: 'feature' }
  const modGroup: TagGroup = { title: 'Mods', tags: [], type: 'mod' }
  let region = ''

  for (const tag of tags) {
    const trimmedTag = tag.trim()

    if (tagToRegion.has(trimmedTag)) {
      region = tagToRegion.get(trimmedTag) || ''
      continue
    }

    if (trimmedTag.startsWith('^')) {
      const compressedTag = trimmedTag.slice(1)
      if (compressedTagToWipe.has(compressedTag)) {
        wipeGroup.tags.push(compressedTagToWipe.get(compressedTag) || '')
      } else if (compressedTagToDifficulty.has(compressedTag)) {
        difficultyGroup.tags.push(compressedTagToDifficulty.get(compressedTag) || '')
      } else if (compressedTagToFeature.has(compressedTag)) {
        featureGroup.tags.push(compressedTagToFeature.get(compressedTag) || '')
      } else if (compressedTagToMod.has(compressedTag)) {
        modGroup.tags.push(compressedTagToMod.get(compressedTag) || '')
      }
      continue
    }

    if (
      !tag.startsWith('mp') &&
      !tag.startsWith('cp') &&
      !tag.startsWith('pt') &&
      !tag.startsWith('qp') &&
      !tag.startsWith('$r') &&
      !tag.startsWith('born') &&
      !tag.startsWith('gm') &&
      !tag.startsWith('cs') &&
      !tag.startsWith('jp') &&
      !tag.startsWith('h') &&
      !tag.startsWith('stok')
    ) {
      result.displayTags.push(trimmedTag)
    }
  }

  if (wipeGroup.tags.length) result.groups.push(wipeGroup)
  if (difficultyGroup.tags.length) result.groups.push(difficultyGroup)
  if (featureGroup.tags.length) result.groups.push(featureGroup)
  if (modGroup.tags.length) result.groups.push(modGroup)

  return {
    ...result,
    region,
  }
})

function sanitizeText(text: string): string {
  return text.replace(/[<>"'&]/g, (char) => {
    switch (char) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      case "'":
        return '&#39;'
      case '&':
        return '&amp;'
      default:
        return char
    }
  })
}
</script>

<template>
  <div class="server-card bg-zinc-900 rounded-lg overflow-hidden">
    <div class="p-3 flex flex-col h-full gap-2">
      <div class="flex justify-between items-start">
        <h3 class="font-semibold text-gray-200 text-xs leading-tight pr-2 line-clamp-4">
          {{ sanitizeText(server.hostname) }}
        </h3>
        <div class="tabular-nums bg-zinc-800 px-2 py-1 rounded text-xs font-medium" :style="{ color: interpolateColor }">
          {{ server.players }}<span class="text-gray-500">/{{ server.maxplayers }}</span>
        </div>
      </div>

      <div class="flex items-center text-xs text-gray-500 gap-1">
        <MapIcon :size="14" />
        <span class="truncate text-[0.7rem]">{{ server.map || 'Unknown Map' }}</span>
      </div>

      <div class="w-full bg-zinc-800 rounded-full h-1">
        <div class="h-full rounded-full" :style="{ width: Math.min(playerPercentage, 100) + '%', backgroundColor: interpolateColor }"></div>
      </div>

      <div class="flex flex-wrap gap-1 overflow-x-auto">
        <span v-if="processedTags.region" class="tag tag-region">
          {{ processedTags.region }}
        </span>

        <template v-for="group in processedTags.groups" :key="group.title">
          <span v-for="tag in group.tags" :key="tag" :class="['tag', `tag-${group.type}`]">
            {{ tag }}
          </span>
        </template>

        <span v-for="tag in processedTags.displayTags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>

      <div class="flex flex-row flex-wrap justify-between items-center text-[0.7rem] mt-auto">
        <div class="text-gray-500 font-mono truncate flex items-center gap-1">
          <span>{{ server.ip }}:{{ server.port }}</span>
          <ButtonIconCopy :getTextToCopy="() => `${server.ip}:${server.port}`" :size="12" :title="'Copy server address: ' + server.ip + ':' + server.port" />
        </div>
        <div class="text-gray-600 whitespace-nowrap">Query: {{ server.query_port }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.server-card {
  transition: all 0.2s ease;
  border: 1px solid #222222;
}

.server-card:hover {
  border-color: #333333;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.tag {
  @apply text-[0.65rem] px-1.5 py-0.5 rounded-md bg-white/5 border border-white/[0.07];
}

.tag:hover {
  @apply bg-white/10;
}

.tag-region {
  @apply bg-blue-500/10 border-blue-500/20 text-blue-400;
}

.tag-wipe {
  @apply bg-green-500/10 border-green-500/20 text-green-400;
}

.tag-difficulty {
  @apply bg-yellow-500/10 border-yellow-500/20 text-yellow-400;
}

.tag-feature {
  @apply bg-purple-500/10 border-purple-500/20 text-purple-400;
}

.tag-mod {
  @apply bg-red-500/10 border-red-500/20 text-red-400;
}
</style>
