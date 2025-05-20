<script setup lang="ts">
import { URL_ASSETS_ITEMS, URL_ASSETS_MISSING } from '@/api/constants'
import type { Item } from '@/api/metadata/rust/items'
import ButtonIconCopy from '@/components/common/ButtonIconCopy.vue'
import { getItemCategoryText, getItemRarityText } from '@/shared/constants'
import { ExternalLink } from 'lucide-vue-next'
import { VPBadge } from 'vitepress/theme'

const { item } = defineProps<{
  item: Item
}>()

function getItemImageUrl(shortName: string) {
  if (!shortName) return URL_ASSETS_MISSING
  return `${URL_ASSETS_ITEMS}/${shortName}.png`
}

function getFlags(flags: number) {
  if (!flags) return []
  const flagList = []
  if (flags & 1) flagList.push('No Condition')
  if (flags & 2) flagList.push('No Durability')
  if (flags & 4) flagList.push('No Wear')
  if (flags & 8) flagList.push('Is Shield')
  return flagList
}
</script>

<template>
  <div class="flex gap-4 items-center">
    <div class="flex-shrink-0">
      <a :href="`details?id=${item.Id}`" class="block">
        <div class="relative aspect-square overflow-hidden" style="width: 150px; height: 150px">
          <img
            class="w-full h-full object-contain p-4"
            :src="getItemImageUrl(item.ShortName)"
            :alt="item.DisplayName"
          />
        </div>
      </a>
    </div>
    <div class="flex flex-col sm:gap-3 gap-2">
      <div class="flex flex-col gap-2">
        <a :href="`details?id=${item.Id}`" class="flex items-center gap-2">
          <h3 class="text-lg font-medium">{{ item.DisplayName }}</h3>
          <ExternalLink :size="14" class="opacity-60" />
        </a>
        <div class="flex flex-col sm:flex-row sm:gap-4 gap-2">
          <div class="flex items-center gap-2">
            <span class="font-mono text-sm">{{ item.Id }}</span>
            <ButtonIconCopy
              :getTextToCopy="() => item.Id.toString()"
              title="Copy item ID"
              class="opacity-60"
            />
          </div>
          <div class="flex items-center gap-2">
            <span class="font-mono text-sm">{{ item.ShortName }}</span>
            <ButtonIconCopy
              :getTextToCopy="() => item.ShortName"
              title="Copy item short name"
              class="opacity-60"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <div v-if="item.Hidden">
          <VPBadge type="danger" text="Hidden" />
        </div>
        <template v-for="flag in getFlags(item.Flags)" :key="flag">
          <VPBadge type="warning" :text="flag" />
        </template>
        <VPBadge v-if="item.Category != 0" :text="getItemCategoryText(item.Category)" />
        <VPBadge v-if="item.Rarity != 0" :text="getItemRarityText(item.Rarity)" />
      </div>
      <p v-if="item.Description" class="text-sm text-gray-600 dark:text-gray-400">
        {{ item.Description }}
      </p>
    </div>
  </div>
</template>
