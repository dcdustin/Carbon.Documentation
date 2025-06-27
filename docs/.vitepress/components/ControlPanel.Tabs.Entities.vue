<script lang="ts" setup>


</script>

<template>
  <div class="r-settings-input-group">
    <input type="text" class="r-settings-custom-input" placeholder="Search entity (name, type, netID)..." />
  </div>
</template>

<style scoped>
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