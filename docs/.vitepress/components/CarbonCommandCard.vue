<script setup lang="ts">
import type { CommandCarbon } from '@/api/metadata/carbon/commands'
import ButtonIconCopy from '@/components/common/ButtonIconCopy.vue'
import { VPBadge } from 'vitepress/theme'

const { command } = defineProps<{
  command: CommandCarbon
}>()

function getCommandType(command: CommandCarbon) {
  if (command.AuthLevel <= 0) {
    return 'info'
  }
  if (command.AuthLevel == 1) {
    return 'info'
  }
  return 'danger'
}

function getCommandTypeText(command: CommandCarbon) {
  if (command.AuthLevel <= 0) {
    return 'User'
  }
  if (command.AuthLevel == 1) {
    return 'Moderator'
  }
  return 'Admin'
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex flex-row gap-2 items-center">
      <h1 class="font-mono">{{ command.Name }}</h1>
      <ButtonIconCopy
        :getTextToCopy="() => command.Name"
        :title="`Copy command name: ${command.Name}`"
        class="opacity-60"
      />
      <VPBadge :type="getCommandType(command)" :text="getCommandTypeText(command)" />
    </div>
    <span v-if="command.Help" class="text-sm text-gray-600 dark:text-gray-400">
      {{ command.Help }}
    </span>
  </div>
</template>
