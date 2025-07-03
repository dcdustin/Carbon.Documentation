<template>
  <h1 :class="'news-text-section' + (props.author ? ' mb-0' : '')" v-html="renderedText"></h1>
  <div v-if="props.author" :class="'news-text-section-author'">by <a :href="'https://github.com/' + props.author" class="news-text-section-author-name">{{ props.author }}</a></div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it';

interface Props {
  text: string;
  author: string | null;
}

const props = defineProps<Props>()

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false,
})

const renderedText = md.renderInline(props.text)
</script>

<style scoped>
.news-text-section {
  margin-top: 150px;
  font-weight: 900 !important;
  text-transform: uppercase;
  color: white;
}
.news-text-section-author {
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 15px;
}
.news-text-section-author-name {
  color: inherit;
  text-decoration: none;
  transition-duration: 150ms;
  font-weight: 800;
}
.news-text-section-author-name:hover {
  color: var(--c-carbon-3);
  text-decoration: none;
}
</style>
