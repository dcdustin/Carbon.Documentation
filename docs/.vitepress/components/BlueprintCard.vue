<script setup lang="ts">
import { URL_ASSETS_ITEMS, URL_ASSETS_MISSING } from '@/api/constants'
import type { Blueprint, Ingredient } from '@/api/metadata/rust/blueprints'
import ButtonIconCopy from '@/components/common/ButtonIconCopy.vue'
import { Clock, ExternalLink, Lock, Scissors, Unlock, Wrench, X } from 'lucide-vue-next'
import { VPBadge } from 'vitepress/theme'
import { Ref, ref } from 'vue'
import { CATEGORY_COLORS, getItemCategoryText, getItemRarityText, RARITY_COLORS } from '../shared/constants'

const { blueprint } = defineProps<{
  blueprint: Blueprint
}>()

const selectedIngredient: Ref<Ingredient | null> = ref(null)
const showIngredientModal = ref(false)
const dlcData: Ref<Map<number, any>> = ref(new Map()) // https://store.steampowered.com/api/appdetails?appids=1174370

function getItemImageUrl(shortName: string) {
  if (!shortName) return URL_ASSETS_MISSING
  return `${URL_ASSETS_ITEMS}/${shortName}.png`
}

async function showItemModal(itemId: number) {
  const ingredient = blueprint.Ingredients?.find((ing) => ing.Item.Id === itemId)

  if (ingredient) {
    selectedIngredient.value = ingredient
    showIngredientModal.value = true

    if (ingredient.Item.SteamDlcItem?.AppId) {
      await fetchDlcData(ingredient.Item.SteamDlcItem.AppId)
    }
  }
}

function closeIngredientModal() {
  showIngredientModal.value = false
  selectedIngredient.value = null
}

async function fetchDlcData(appId: number) {
  if (dlcData.value.has(appId)) return dlcData.value.get(appId)

  try {
    const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`)
    const data = await response.json()
    if (data[appId]?.success) {
      dlcData.value.set(appId, data[appId].data)
      return data[appId].data
    }
  } catch (error) {
    console.error('Failed to fetch DLC data:', error)
  }
  return null
}
</script>

<template>
  <!--     <div class="flex flex-row gap-2 items-center">
      <h3 class="font-mono">{{ command.Name }}</h3>
      <ButtonIconCopy
        :getTextToCopy="() => command.Name"
        :title="`Copy command name: ${command.Name}`"
        class="opacity-60"
      />
      <VPBadge :type="getBadgeType(commandTypeText)" :text="commandTypeText" />
    </div>
    <span v-if="command.Help" class="text-sm text-gray-600 dark:text-gray-400">
      {{ command.Help }}
    </span> -->
  <div class="whitespace-normal py-4">
    <div class="flex gap-8">
      <!-- Left Column: Blueprint Details -->
      <div class="flex-1">
        <div class="flex gap-4">
          <!-- Item Image -->
          <div class="flex-shrink-0">
            <a :href="`/references/blueprints/details?id=${blueprint.Item.Id}`" class="block">
              <div class="relative aspect-square overflow-hidden" style="width: 150px; height: 150px">
                <div
                  class="absolute inset-0 bg-cover bg-center"
                  style="background-image: url('https://cdn.carbonmod.gg/items/blueprintbase.png')"
                ></div>
                <img
                  :src="getItemImageUrl(blueprint.Item.ShortName)"
                  class="w-full h-full object-contain p-4 relative z-10"
                  :alt="blueprint.Item.DisplayName"
                />
              </div>
            </a>
          </div>

          <!-- Item Details -->
          <div class="flex-1">
            <!-- Header -->
            <div class="flex items-center justify-between mb-2">
              <h5 class="text-lg font-medium">
                <a
                  :href="`/references/blueprints/details?id=${blueprint.Item.Id}`"
                  class="hover:text-primary inline-flex items-center gap-2"
                >
                  {{ blueprint.Item.DisplayName }}
                  <ExternalLink :size="14" class="opacity-60" />
                </a>
              </h5>
              <div class="flex items-center gap-2">
                <span class="text-sm font-mono">{{ blueprint.Item.ShortName }}</span>
                <ButtonIconCopy
                  :getTextToCopy="() => blueprint.Item.ShortName"
                  title="Copy shortname"
                  class="opacity-60"
                />
              </div>
            </div>

            <!-- Badges -->
            <div class="flex flex-wrap gap-2 mt-2">
              <VPBadge
                :text="getItemCategoryText(blueprint.Item.Category)"
                class="opacity-75"
                :style="{ backgroundColor: CATEGORY_COLORS[blueprint.Item.Category as keyof typeof CATEGORY_COLORS], color: '#fff' }"
              />
              <VPBadge
                v-if="blueprint.Item.Rarity != 0"
                class="opacity-75"
                :text="getItemRarityText(blueprint.Item.Rarity)"
                :style="{ backgroundColor: RARITY_COLORS[blueprint.Item.Rarity as keyof typeof RARITY_COLORS], color: '#fff' }"
              />
              <VPBadge v-if="blueprint.UserCraftable" type="danger" :text="'Craftable'" />
              <VPBadge
                v-if="blueprint.WorkbenchLevelRequired >= 0"
                type="warning"
                :text="`Tier ${blueprint.WorkbenchLevelRequired}`"
              />
              <VPBadge
                v-if="blueprint.ScrapRequired > 0"
                type="info"
                :text="`${blueprint.ScrapRequired} Scrap`"
              />
              <VPBadge v-if="blueprint.NeedsSteamItem" type="danger" :text="'Steam Item Required'" />
              <VPBadge v-if="blueprint.NeedsSteamDLC" type="danger" :text="'Steam DLC Required'" />
            </div>

            <!-- Description -->
            <p v-if="blueprint.Item.Description" class="text-sm text-gray-600 dark:text-gray-400 mt-3">
              {{ blueprint.Item.Description }}
            </p>

            <!-- Crafting Details -->
            <div class="mt-4 space-y-3">
              <!-- Time -->
              <div class="flex items-center gap-2 text-sm">
                <Clock :size="16" class="text-gray-400" />
                <span>{{ blueprint.Time }} seconds</span>
              </div>

              <!-- Workbench -->
              <div v-if="blueprint.WorkbenchLevelRequired >= 0" class="flex items-center gap-2 text-sm">
                <Wrench :size="16" class="text-gray-400" />
                <span>Requires Workbench Tier {{ blueprint.WorkbenchLevelRequired }}</span>
              </div>

              <!-- Craft Amount -->
              <div v-if="blueprint.CraftAmount > 1" class="flex items-center gap-2 text-sm">
                <Scissors :size="16" class="text-gray-400" />
                <span>Crafts {{ blueprint.CraftAmount }} at once</span>
              </div>

              <!-- Steam Requirements -->
              <div
                v-if="blueprint.NeedsSteamItem || blueprint.NeedsSteamDLC"
                class="flex items-center gap-2 text-sm"
              >
                <Lock :size="16" class="text-gray-400" />
                <span v-if="blueprint.NeedsSteamItem">Requires Steam Item</span>
                <span v-if="blueprint.NeedsSteamItem && blueprint.NeedsSteamDLC"> & </span>
                <span v-if="blueprint.NeedsSteamDLC">
                  Requires Steam DLC:
                  <a
                    v-if="blueprint.Item.SteamDlcItem"
                    :href="`https://store.steampowered.com/app/${blueprint.Item.SteamDlcItem.AppId}`"
                    target="_blank"
                    class="text-primary hover:underline"
                  >
                    {{ blueprint.Item.SteamDlcItem.Name }}
                  </a>
                </span>
              </div>

              <!-- Research Info -->
              <div v-if="blueprint.ScrapRequired > 0 || blueprint.ScrapFromRecycle > 0" class="mt-2">
                <div class="text-sm font-medium mb-1">Research Details:</div>
                <div class="space-y-1">
                  <div v-if="blueprint.ScrapRequired > 0" class="flex items-center gap-2 text-sm">
                    <Lock :size="16" class="text-gray-400" />
                    <span>Research Cost: {{ blueprint.ScrapRequired }} Scrap</span>
                  </div>
                  <div v-if="blueprint.ScrapFromRecycle > 0" class="flex items-center gap-2 text-sm">
                    <Unlock :size="16" class="text-gray-400" />
                    <span>Recycle Value: {{ blueprint.ScrapFromRecycle }} Scrap</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Ingredients -->
      <div v-if="blueprint.Ingredients?.length" class="w-64 flex-shrink-0">
        <div class="sticky top-4">
          <div class="text-sm font-medium mb-2">Required Materials:</div>
          <div class="space-y-2">
            <div
              v-for="ing in blueprint.Ingredients"
              :key="ing.Item.ShortName"
              class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
            >
              <div class="flex items-center gap-2">
                <div class="relative w-8 h-8 flex-shrink-0">
                  <img
                    :src="getItemImageUrl(ing.Item.ShortName)"
                    class="w-full h-full object-contain"
                    :alt="ing.Item.DisplayName"
                  />
                </div>
                <button class="text-sm hover:text-primary" @click="showItemModal(ing.Item.Id)">
                  {{ ing.Item.DisplayName }}
                </button>
              </div>
              <span class="text-sm font-medium">{{ ing.Amount }}x</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="showIngredientModal && selectedIngredient"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click="closeIngredientModal"
  >
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4" @click.stop>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-bold">{{ selectedIngredient.Item.DisplayName }}</h3>
        <button @click="closeIngredientModal" class="text-gray-500 hover:text-gray-700">
          <X :size="20" />
        </button>
      </div>

      <div class="flex gap-4">
        <div class="flex-shrink-0">
          <div class="relative bg-gray-50 dark:bg-gray-700" style="width: 100px; height: 100px">
            <img
              :src="getItemImageUrl(selectedIngredient.Item.ShortName)"
              class="w-full h-full object-contain p-4"
              :alt="selectedIngredient.Item.DisplayName"
            />
          </div>
        </div>

        <div class="flex-1 space-y-2">
          <div class="flex items-center gap-2">
            <span class="font-mono text-sm">{{ selectedIngredient.Item.Id }}</span>
            <ButtonIconCopy
              :getTextToCopy="() => selectedIngredient!.Item.Id.toString()"
              title="Copy item id"
              class="opacity-60"
            />
          </div>

          <div class="flex items-center gap-2">
            <span class="font-mono text-sm">{{ selectedIngredient.Item.ShortName }}</span>
            <ButtonIconCopy
              :getTextToCopy="() => selectedIngredient!.Item.ShortName"
              title="Copy shortname"
              class="opacity-60"
            />
          </div>

          <div class="flex flex-wrap gap-2">
            <VPBadge
              :text="getItemCategoryText(selectedIngredient.Item.Category)"
              :style="{ backgroundColor: CATEGORY_COLORS[selectedIngredient.Item.Category as keyof typeof CATEGORY_COLORS], color: '#fff' }"
            />
            <VPBadge
              v-if="selectedIngredient.Item.Rarity != 0"
              :text="getItemRarityText(selectedIngredient.Item.Rarity)"
              :style="{ backgroundColor: RARITY_COLORS[selectedIngredient.Item.Rarity as keyof typeof RARITY_COLORS], color: '#fff' }"
            />
          </div>

          <p v-if="selectedIngredient.Item.Description" class="text-sm text-gray-600 dark:text-gray-300">
            {{ selectedIngredient.Item.Description }}
          </p>

          <div class="pt-2">
            <a
              :href="`/references/items/details?id=${selectedIngredient.Item.Id}`"
              class="vp-button medium brand flex items-center gap-2"
            >
              View Full Details
              <ExternalLink :size="14" />
            </a>
          </div>
        </div>
      </div>

      <!-- DLC Info -->
      <div v-if="selectedIngredient.Item.SteamDlcItem" class="mt-4 pt-4 border-t">
        <div class="flex items-center gap-2 text-sm font-medium mb-2">
          <Lock :size="16" class="text-gray-400" />
          <span>Steam DLC Required</span>
        </div>
        <a
          :href="`https://store.steampowered.com/app/${selectedIngredient.Item.SteamDlcItem.AppId}`"
          target="_blank"
          class="block group"
        >
          <div
            class="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <img
              v-if="dlcData.get(selectedIngredient.Item.SteamDlcItem.AppId)?.header_image"
              :src="dlcData.get(selectedIngredient.Item.SteamDlcItem.AppId)?.header_image"
              class="w-24 h-12 object-cover rounded"
              :alt="selectedIngredient.Item.SteamDlcItem.Name"
            />
            <div>
              <div class="font-medium group-hover:text-primary">
                {{ selectedIngredient.Item.SteamDlcItem.Name }}
              </div>
              <div
                v-if="dlcData.get(selectedIngredient.Item.SteamDlcItem.AppId)?.price_overview"
                class="text-sm text-gray-600 dark:text-gray-400"
              >
                {{ dlcData.get(selectedIngredient.Item.SteamDlcItem.AppId)?.price_overview.final_formatted }}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
