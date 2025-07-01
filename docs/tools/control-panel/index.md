---
layout: page
title: Control Panel
description: A WebRCon-based connection with a vastly detailed control panel for remote admin control.
sidebar: false
---

<script setup lang="ts">
    import ControlPanel from '@/components/control-panel/ControlPanel.vue'
</script>

<ClientOnly>
    <ControlPanel></ControlPanel>
</ClientOnly>
