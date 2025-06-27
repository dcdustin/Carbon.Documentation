import { ref } from 'vue'
import { selectedServer } from './ControlPanel.SaveLoad'

export const searchMaxCount = ref<number>(50)
export const isSearching = ref<boolean>(false)
export const selectedEntity = ref<any | null>(null)
export const searchInput = ref<string>('')
export const searchedData = ref<any | null>(null)
export const currentSearch = ref<string>('')

export function onSearch() {
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

export function editEntity(netId: number) {
  if(netId == 0) {
    return
  }

  // EntityDetails
  selectedServer.value.Rpcs[2650739934] = (data: any) => {
    selectedEntity.value = data.Value
  }
  selectedServer.value.sendRpc(2650739934, netId)
}

export function killEntity(netId: number) {
  if(netId == 0) {
    return
  }

  if(selectedEntity.value.NetId == netId) {
    selectedEntity.value = null
  }

  // EntityKill
  selectedServer.value.sendRpc(223927051, netId)
  searchInput.value = currentSearch.value
  onSearch()
}

export function saveEntity(netId: number) {
  if(netId == 0) {
    return
  }
  
}

export function stopEditingEntity() {
  selectedEntity.value = null
}