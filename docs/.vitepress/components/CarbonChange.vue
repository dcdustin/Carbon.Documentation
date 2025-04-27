<template>
  <div class="carbon-change">
    <CarbonBadge :variant="variant">{{ variant.toUpperCase() }}</CarbonBadge>

    <div class="carbon-change-text" v-html="renderedText"></div>
  </div>
</template>

<script setup lang="ts">
import CarbonBadge from './CarbonBadge.vue';
import MarkdownIt from 'markdown-it';

interface Props {
  variant: 'add' | 'fix' | 'update' | 'misc' | 'remove' | 'date'
  text: string;
}

const props = defineProps<Props>();

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  breaks: false
});

const renderedText = md.renderInline(props.text);
</script>

<style scoped>
.carbon-change {
  display: flex;
  align-items: flex-start;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 0.5em;
  font-size: 15px;
}

.carbon-change-text {
  max-width: 90%;
  font-size: 15px;
}
</style>
