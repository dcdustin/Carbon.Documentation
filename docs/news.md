---
layout: home
title: News
description: A variety of blog posts for Carbon and the docs website, as well as tutorials. Stay tuned for more!
---

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { VPBadge } from 'vitepress/theme'

const news = ref<any | null>(null)
const selectedPost = ref<any | null>(null)
const firstPost = ref<any | null>(null)

function selectPost(news: any) {
  selectedPost.value = news
}

function hidePost() {
    selectedPost.value = null
}

onMounted(async () => {
    news.value = (await Promise.all(
    Object.entries(import.meta.glob('/news/**/*.md')).map(async ([path, loader]) => {
        const mod: any = await loader()
        return {
            path,
            content: mod.default,
            frontmatter: mod.__pageData.frontmatter,
            date: new Date(mod.__pageData.frontmatter.date)
        }
    }))).sort((a: any, b: any) => b.date.getTime() - a.date.getTime())
    firstPost.value = news.value[0]
})
</script>

<div v-if="firstPost">
  <div class="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
    <div class="relative w-full h-[800px] overflow-hidden opacity-30">
      <img
        :src="firstPost.frontmatter.header"
        alt="Header background"
        class="news-hero blur-2xl absolute top-0 left-0 w-full h-full object-cover" />
      <div class="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-b from-transparent to-neutral-900/100"></div>
    </div>
  </div>
  <div class="relative z-10 overflow-y-auto h-full">
    <button class="relative inline-block" @click="selectPost(firstPost)">
    <div class="max-w-screen-lg mx-auto space-y-6 mt-72 flex">
      <div>
        <img class="transition-transform duration-200 transform hover:scale-105 justify-self-center w-[100%]" :src="firstPost.frontmatter.logo"/>
        <div class="block my-3 uppercase">
            <VPBadge type="info">{{ firstPost.date.toDateString() }}</VPBadge>
            <VPBadge v-for="tag in firstPost.frontmatter.tags" type="tip">{{ tag }}</VPBadge>
        </div>
      </div>
      <div>
        <div class="text-5xl text-left mb-5 font-black uppercase">
        <VPBadge class="mb-2" type="danger">LATEST POST</VPBadge><br>
          {{ firstPost.frontmatter.title }}
        </div>
        <div class="text-2xl text-left mb-48 font-normal text-slate-400">
          {{ firstPost.frontmatter.description }}
        </div>
      </div>
    </div>
    </button>
  </div>
</div>

<h1 class="news-text-section">Explore</h1>
<p>A variety of blog posts for Carbon and the docs website, as well as tutorials. Stay tuned for more!</p>

<div class="news-grid my-10 gap-5">
    <div v-for="post in news">
      <button class="relative inline-block" @click="selectPost(post)">
          <div class="transition-transform duration-200 transform hover:scale-105">
            <img class="opacity-25 blur-md" :src="post.frontmatter.header"/>
            <img class="absolute top-0 left-0 w-full h-full object-contain" :src="post.frontmatter.logo"/>
      </div>  
      <div class="mt-5">
          <div class="block mb-3 uppercase">
              <VPBadge type="info">{{ post.date.toDateString() }}</VPBadge>
              <VPBadge v-for="tag in post.frontmatter.tags" type="tip">{{ tag }}</VPBadge>
          </div>
          <span class="text-2xl uppercase font-black text-slate-200 font-sans">{{ post.frontmatter.title }}</span><br>
          <span class="text-sm font-normal text-slate-400">{{ post.frontmatter.description }}</span><br>
      </div>
      </button>
  </div>
</div>

<div v-if="selectedPost" class="fixed inset-0 z-50 bg-neutral-950/100 overflow-hidden" @click="hidePost()">
  <div class="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
    <div class="relative w-full h-[800px] overflow-hidden opacity-60">
      <img
        :src="selectedPost.frontmatter.header"
        alt="Header background"
        class="news-hero absolute top-0 left-0 w-full h-full object-cover" />
      <div class="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-b from-transparent to-neutral-950/100"></div>
    </div>
  </div>
  <div class="relative z-10 overflow-y-auto h-full">
    <div class="max-w-screen-lg mx-auto space-y-6 my-72">
      <div class="text-5xl text-center font-black uppercase" @click.stop>
        <img class="transition-transform duration-200 transform hover:scale-105 justify-self-center w-[60%]" :src="selectedPost.frontmatter.logo"/>
        <div class="block my-3">
            <VPBadge type="info">{{ selectedPost.date.toDateString() }}</VPBadge>
            <VPBadge v-for="tag in selectedPost.frontmatter.tags" type="tip">{{ tag }}</VPBadge>
        </div>
        {{ selectedPost.frontmatter.title }}
      </div>
      <div class="text-2xl mb-48 text-center font-normal text-slate-400" @click.stop>
        {{ selectedPost.frontmatter.description }}
      </div>
      <div class="news-content text-slate-300 opacity-80" @click.stop>
        <component :is="selectedPost.content" />
      </div>
    </div>
  </div>
</div>

<style>
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 50px 15px;
}
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
.news-image:active {
  filter: saturate(1.2);
  transform: scale(1.75);
  position: relative;
  z-index: 2147483647;
}
</style>