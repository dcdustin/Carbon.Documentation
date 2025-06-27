<script lang="ts" setup>
import { Loader2, Pencil, Trash2, CheckCircle2, Copy } from 'lucide-vue-next'
import { ref } from 'vue'
import { selectedServer } from './ControlPanel.SaveLoad'

const searchMaxCount = ref<number>(50)

const isSearching = ref<boolean>(false)
const searchInput = ref<string>('')
const searchedData = ref<any | null>(null)
const currentSearch = ref<string>('')
const copiedId = ref<string | number | null>(null)

function onSearch() {
  currentSearch.value = searchInput.value
  searchInput.value = ''
  isSearching.value = true

  // SearchEntities
  selectedServer.value.Rpcs[1120335884] = (data: any) => {
    isSearching.value = false
    searchedData.value = data.Value
  }
  selectedServer.value.sendRpc(1120335884, searchMaxCount.value, currentSearch.value)
}

function entityKill(netId: number) {
  // EntityKill
  selectedServer.value.sendRpc(223927051, netId)
  searchInput.value = currentSearch.value
  onSearch()
}

const copyToClipboard = async (text: string, id: string | number | null = null) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = id
    setTimeout(() => (copiedId.value = null), 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <div class="r-settings-input-group">
    <input v-model="searchInput" type="text" class="r-settings-custom-input" @keyup.enter="onSearch" placeholder="Search entity (name, type, netID)..." />
    <div v-if="currentSearch && searchedData" class="m-4 text-xs text-red-800">
      <span>Searched '{{ currentSearch }}' and found {{ searchedData.length }} out of {{ searchMaxCount }} max. entities</span>
    </div>
  </div>
  <Loader2 v-if="isSearching" class="flex animate-spin text-xs text-slate-500" :size="20" />
  <table v-if="searchedData && searchedData.length > 0" :class="isSearching ? 'blur-sm' : ''">
    <thead style="border: 1px;">
      <tr>
        <th class="vp-doc th r-table-row"></th>
        <th class="vp-doc th r-table-row">NetID</th>
        <th class="vp-doc th r-table-row">Name</th>
        <th class="vp-doc th r-table-row">Coordinate</th>
      </tr>
    </thead>
    <tr style="border: 1px;" v-for="entity in searchedData">
      <td class="vp-doc td r-table-row">
        <button class="r-send-button" @click=""><span class="text-neutral-400"><Pencil :size="17"/></span></button>
        <button class="r-send-button" @click="entityKill(entity.NetId)"><span class="text-red-500"><Trash2 :size="17"/></span></button>
      </td> 
      <td class="vp-doc td r-table-row">
        <span class="flex">
          <button
              @click="copyToClipboard(entity.NetId, entity.Position.x + entity.Position.y + entity.Position.z + 1)"
              class="flex items-center pr-2 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <component :is="copiedId === entity.Position.x + entity.Position.y + entity.Position.z + 1 ? CheckCircle2 : Copy" class="ml-2" :size="14" />
          </button>
          {{ entity.NetId }}
        </span>
      </td>
      <td class="vp-doc td r-table-row">
        <span class="flex">
          <button
              @click="copyToClipboard(entity.Name, entity.Position.x + entity.Position.y + entity.Position.z + 2)"
              class="flex items-center pr-2 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <component :is="copiedId === entity.Position.x + entity.Position.y + entity.Position.z + 2 ? CheckCircle2 : Copy" class="ml-2" :size="14" />
          </button>
          {{ entity.Name }}
        </span>
      </td>
      <td class="vp-doc td r-table-row">
        <span class="flex">
          <button
              @click="copyToClipboard(`${entity.Position.x} ${entity.Position.y} ${entity.Position.z}`, entity.Position.x + entity.Position.y + entity.Position.z + 3)"
              class="flex items-center pr-2 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <component :is="copiedId === entity.Position.x + entity.Position.y + entity.Position.z + 3 ? CheckCircle2 : Copy" class="ml-2" :size="14" />
          </button>
          {{ entity.Position.x.toLocaleString() }} {{ entity.Position.y.toLocaleString() }} {{ entity.Position.z.toLocaleString() }} 
        </span>
      </td>
    </tr>
  </table>
</template>

<style scoped>
.r-table-row {
  text-align: left;
  padding-right: 15px;
}

.r-settings-input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  flex: 1;
}

.r-settings-custom-input {
  background-color: #1a1a1a00;
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
</style>