<script setup>
import { ref, onMounted } from 'vue'
import { Copy, CheckCircle2, Hammer, Scrap, Workbench } from 'lucide-vue-next'
import { getGameData } from '../shared/constants'

const props = defineProps({
  itemId: {
    type: [String, Number],
    required: true
  }
})

const blueprint = ref(null)
const isLoading = ref(true)
const copiedId = ref(null)

const copyToClipboard = async (text, id = null) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = id
    setTimeout(() => copiedId.value = null, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const loadBlueprint = async () => {
  try {
    const data = await getGameData('redist/metadata/rust/blueprints.json')
    const foundBlueprint = data.find(b => b.Item.Id.toString() === props.itemId.toString())
    if (foundBlueprint) {
      blueprint.value = foundBlueprint
    }
  } catch (error) {
    console.error('Failed to load blueprint:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadBlueprint()
})
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-4 py-8">
    <div v-if="isLoading" class="flex items-center justify-center py-8">
      <span class="animate-spin">Loading blueprint...</span>
    </div>

    <div v-else-if="blueprint" class="space-y-6">
      <!-- Item Info -->
      <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ blueprint.Item.DisplayName }}</h2>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ blueprint.Item.ShortName }}</span>
            <button 
              @click="copyToClipboard(blueprint.Item.ShortName, 'shortname')" 
              class="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <component :is="copiedId === 'shortname' ? CheckCircle2 : Copy" size="14"/>
            </button>
          </div>
        </div>
        <p class="mt-2 text-gray-600 dark:text-gray-400">{{ blueprint.Item.Description }}</p>
      </div>

      <!-- Crafting Requirements -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Crafting Requirements</h3>
        
        <!-- Ingredients -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 class="font-medium mb-2">Ingredients</h4>
            <div class="space-y-2">
              <div v-for="(ingredient, index) in blueprint.Ingredients" :key="index" 
                   class="flex items-center justify-between">
                <span>{{ ingredient.Item.DisplayName }}</span>
                <span class="text-gray-600 dark:text-gray-400">x{{ ingredient.Amount }}</span>
              </div>
            </div>
          </div>

          <!-- Crafting Info -->
          <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 class="font-medium mb-2">Crafting Info</h4>
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <Hammer size="16"/>
                <span>Craft Amount: {{ blueprint.CraftAmount }}</span>
              </div>
              <div v-if="blueprint.ScrapRequired > 0" class="flex items-center gap-2">
                <Scrap size="16"/>
                <span>Scrap Required: {{ blueprint.ScrapRequired }}</span>
              </div>
              <div v-if="blueprint.WorkbenchLevelRequired > 0" class="flex items-center gap-2">
                <Workbench size="16"/>
                <span>Workbench Level: {{ blueprint.WorkbenchLevelRequired }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Special Requirements -->
        <div v-if="blueprint.NeedsSteamItem || blueprint.NeedsSteamDLC" 
             class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h4 class="font-medium mb-2">Special Requirements</h4>
          <ul class="list-disc list-inside">
            <li v-if="blueprint.NeedsSteamItem">Requires Steam Item</li>
            <li v-if="blueprint.NeedsSteamDLC">Requires Steam DLC</li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-500">Blueprint not found</p>
    </div>
  </div>
</template> 