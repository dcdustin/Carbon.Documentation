<script lang="ts" setup>
import { useData } from 'vitepress'
import { VPBadge, VPHomeContent } from 'vitepress/theme'
import { onMounted, onUnmounted } from 'vue'
import { formatDate } from '../shared/utils'

const { frontmatter } = useData()

function switchTransparentNavBar(flag: boolean) {
  const navBar = document.querySelector('.VPNavBar') as HTMLElement
  if (navBar) {
    navBar.style.backgroundColor = flag ? 'transparent' : ''
    const divider = navBar.querySelector('.divider') as HTMLElement
    divider.style.display = flag ? 'none' : ''
  }
}

onMounted(async () => {
  switchTransparentNavBar(true)
})

onUnmounted(() => {
  switchTransparentNavBar(false)
})
</script>

<template>
  <VPHomeContent>
    <div class="fixed inset-0 overflow-hidden bg-neutral-950/100">
      <div class="pointer-events-none fixed left-0 top-0 z-0 h-full w-full">
        <div class="relative h-[800px] w-full overflow-hidden opacity-60">
          <img :src="frontmatter.header" alt="Header background" class="news-hero absolute left-0 top-0 h-full w-full object-cover" />
          <div class="absolute bottom-0 left-0 h-96 w-full bg-gradient-to-b from-transparent to-neutral-950/100"></div>
        </div>
      </div>
    </div>
    <div class="relative">
      <div class="mx-auto my-40 flex max-w-screen-lg flex-col items-center gap-6 text-balance">
        <img class="mx-auto w-[60%] transform transition-transform duration-200 hover:scale-105" :src="frontmatter.logo" />
        <div class="my-3 flex flex-row gap-2 uppercase">
          <VPBadge class="text-sm" type="info">posted <span v-if="frontmatter.author"> by {{ frontmatter.author }}</span> on {{ formatDate(frontmatter.date).string }}</VPBadge>
          <VPBadge class="text-sm" v-for="tag in frontmatter.tags" :key="tag" type="tip">{{ tag }}</VPBadge>
        </div>
        <div class="text-center text-5xl font-black uppercase" @click.stop>
          {{ frontmatter.title }}
        </div>
        <div class="mb-48 text-center text-2xl font-normal text-slate-400" @click.stop>
          {{ frontmatter.description }}
        </div>
        <div class="news-content text-wrap text-slate-300 opacity-80" @click.stop>
          <Content />
        </div>
      </div>
    </div>
  </VPHomeContent>
</template>

<style>
.news-hero {
  opacity: 0.5;
}

.news-text-section {
  margin-top: 150px;
  margin-bottom: 15px;
  font-weight: 900 !important;
  text-transform: uppercase;
  color: white;
}
.news-text-section-author {
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 15px;
}
.news-section {
  padding: 25px !important;
  background-color: #131313d0;
}

.news-image {
  filter: saturate(0);
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}
.news-image:hover {
  filter: saturate(1.2);
}
.news-image:active {
  filter: saturate(1.2);
  transform: scale(1.75);
  position: relative;
  z-index: 99999;
}
</style>
