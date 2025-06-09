<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { selectedServer } from './ControlPanel.SaveLoad'

const selectedGroup = ref('')
const selectedHookable = ref()
const groupInfo = ref()
const groupPermInfo = ref<string[]>()

onMounted(() => {
  if(!selectedServer.value) {
    return
  }

  // GetPermissionsMetadata
  selectedServer.value.Rpcs[1317317511] = data => {
    groupInfo.value = data.Value
  }
  // GetGroupPermissions
  selectedServer.value.Rpcs[631493895] = data => {
    groupPermInfo.value = data.Value.Permissions
  }
  selectedServer.value.sendRpc(1317317511)
})

function selectGroup(value: string, forceSelect: boolean = true) {
  if(!forceSelect && selectedGroup.value == value) {
    selectedGroup.value = null
    selectHookable(null)
    return
  }
  selectedGroup.value = value
  selectedServer.value.sendRpc(631493895, value)
}
function selectHookable(value: string) {
  selectedHookable.value = value
}
function groupHasPermission(value: string) : boolean {
  return groupPermInfo.value.includes(value)
}
function togglePermission(value: string) {
  if(value == 'grantall' || value == 'revokeall') { 
    const confirm = window.confirm(`Are you sure?`)
    if (confirm) {
      selectedServer.value.sendRpc(3261363143, selectedGroup.value, value, selectedHookable.value.Plugin?.Name ?? selectedHookable.value.Module?.Name)
      selectGroup(selectedGroup.value)
    } 
    return
  }

  selectedServer.value.sendRpc(3261363143, selectedGroup.value, value, selectedHookable.value.Plugin?.Name ?? selectedHookable.value.Module?.Name)
  selectGroup(selectedGroup.value)
}
</script>

<template>
  <div class="table-stack text-center">
    <table>
      <thead>
        <tr>
          <th class="vp-doc th">Groups</th>
        </tr>
      </thead>
      <tr v-for="group in groupInfo?.Groups">
        <td class="vp-doc td">
          <button class="r-send-button" :class="'r-send-button ' + (group == selectedGroup ? 'toggled' : null)" @click="selectGroup(group, false)"><span class="text-neutral-400">{{group}}</span></button> 
        </td>
      </tr>
    </table>
    <table v-if="selectedGroup">
      <thead>
        <tr>
          <th class="vp-doc th">Plugins</th>
        </tr>
      </thead>
      <tr v-for="plugin in groupInfo?.Plugins">
        <td class="vp-doc td">
          <button class="r-send-button" :class="'r-send-button ' + (plugin == selectedHookable ? 'toggled' : null)" @click="selectHookable(plugin)"><span class="text-neutral-400">{{ plugin.Plugin.Name }}</span></button> 
        </td>
      </tr>
      <tr>
        <th class="vp-doc th pt-5">Modules</th>
      </tr>
      <tr v-for="module in groupInfo?.Modules">
        <td class="vp-doc td">
          <button class="r-send-button" :class="'r-send-button ' + (module == selectedHookable ? 'toggled' : null)" @click="selectHookable(module)"><span class="text-neutral-400">{{ module.Module.Name }}</span></button> 
        </td>
      </tr>
    </table>
    <table v-if="selectedHookable">
      <thead>
        <tr>
          <th class="vp-doc th">Permissions</th>
        </tr>
      </thead>
      <tr>
        <td>
          <span>
            <button class="r-send-button" @click="togglePermission('grantall')"><span class="text-neutral-400">Grant All</span></button>   
            <button class="r-send-button" @click="togglePermission('revokeall')"><span class="text-neutral-400">Revoke All</span></button>   
          </span>   
        </td>
      </tr>
      <tr v-for="permission in selectedHookable.Permissions">
        <td class="vp-doc td content-center">
          <button :class="'r-send-button ' + (groupHasPermission(permission) ? 'toggled' : null)" @click="togglePermission(permission)"><span class="text-neutral-400">{{ permission }}</span></button> 
        </td>
      </tr>
    </table>
  </div>
</template>

<style>
.table-stack {
  display: ruby;
}
</style>