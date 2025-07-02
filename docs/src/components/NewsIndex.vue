<script lang="ts" setup>
import { VPBadge } from 'vitepress/theme'
import { shallowRef } from 'vue'
import { data as initialData, NewsPost } from '../data-loaders/news.data'

const news = shallowRef<NewsPost[] | null>(initialData)
const firstPost = shallowRef<NewsPost | null>(news.value?.[0] ?? null)
</script>

<template>
  <div v-if="firstPost">
    <div class="pointer-events-none fixed left-0 top-0 z-0 h-full w-full">
      <div class="relative h-[800px] w-full overflow-hidden opacity-30">
        <img :src="firstPost.frontmatter.header" alt="Header background" class="news-hero absolute left-0 top-0 h-full w-full object-cover blur-2xl" />
        <div class="absolute bottom-0 left-0 h-96 w-full bg-gradient-to-b from-transparent to-neutral-900/100"></div>
      </div>
    </div>
    <div class="relative z-10 h-full overflow-y-auto">
      <a class="relative inline-block" :href="firstPost.url" target="_blank">
        <div class="mx-auto mt-72 flex max-w-screen-lg md:flex-row flex-col">
          <div class="flex flex-col items-center">
            <img class="w-[100%] transform justify-self-center transition-transform duration-200 hover:scale-105" :src="firstPost.frontmatter.logo" />
            <div class="my-3 block uppercase">
              <VPBadge type="info">{{ firstPost.date.string }}</VPBadge>
              <VPBadge v-for="tag in firstPost.frontmatter.tags" :key="tag" type="tip">{{ tag }}</VPBadge>
            </div>
          </div>
          <div>
            <div class="mb-5 text-left text-5xl font-black uppercase">
              <VPBadge class="mb-2" type="danger">LATEST POST</VPBadge><br />
              {{ firstPost.frontmatter.title }}
            </div>
            <div class="mb-48 text-left text-2xl font-normal text-slate-400">
              {{ firstPost.frontmatter.description }}
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>

  <h1 class="news-text-section">Explore</h1>
  <p>A variety of blog posts for Carbon and the docs website, as well as tutorials. Stay tuned for more!</p>

  <div class="news-grid my-10 gap-5">
    <div v-for="post in news" :key="post.url">
      <a class="relative inline-block font-extrabold" :href="post.url" target="_blank">
        <div class="transform transition-transform duration-200 hover:scale-105">
          <img class="opacity-25 blur-md" :src="post.frontmatter.header" />
          <img class="absolute left-0 top-0 h-full w-full object-contain" :src="post.frontmatter.logo" />
        </div>
        <div class="mt-5">
          <div class="mb-3 block uppercase">
            <VPBadge type="info">{{ post.date.string }}</VPBadge>
            <VPBadge v-for="tag in post.frontmatter.tags" :key="tag" type="tip">{{ tag }}</VPBadge>
          </div>
          <span class="font-sans text-2xl font-black uppercase text-slate-200">{{ post.frontmatter.title }}</span
          ><br />
          <span class="text-sm font-normal text-slate-400">{{ post.frontmatter.description }}</span
          ><br />
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.vp-doc a {
  font-weight: inherit;
  color: inherit;
  text-decoration: inherit;
  text-underline-offset: inherit;
  transition: inherit;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 50px 15px;
}
</style>
