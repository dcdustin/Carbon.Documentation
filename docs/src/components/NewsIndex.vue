<script lang="ts" setup>
import { VPBadge } from 'vitepress/theme'
import { onMounted, shallowRef } from 'vue'

const news = shallowRef<any | null>(null)
const selectedPost = shallowRef<any | null>(null)
const firstPost = shallowRef<any | null>(null)

function selectPost(news: any) {
  selectedPost.value = news
}

function hidePost() {
  selectedPost.value = null
}

onMounted(async () => {
  news.value = (
    await Promise.all(
      Object.entries(import.meta.glob('/news/docs/*.md')).map(async ([path, loader]) => {
        const mod: any = await loader()
        return {
          path,
          content: mod.default,
          frontmatter: mod.__pageData.frontmatter,
          date: new Date(mod.__pageData.frontmatter.date),
        }
      })
    )
  ).sort((a: any, b: any) => b.date.getTime() - a.date.getTime())
  firstPost.value = news.value[0]
})
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
      <button class="relative inline-block" @click="selectPost(firstPost)">
        <div class="mx-auto mt-72 flex max-w-screen-lg space-y-6">
          <div>
            <img class="w-[100%] transform justify-self-center transition-transform duration-200 hover:scale-105" :src="firstPost.frontmatter.logo" />
            <div class="my-3 block uppercase">
              <VPBadge type="info">{{ firstPost.date.toDateString() }}</VPBadge>
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
      </button>
    </div>
  </div>

  <h1 class="news-text-section">Explore</h1>
  <p>A variety of blog posts for Carbon and the docs website, as well as tutorials. Stay tuned for more!</p>

  <div class="news-grid my-10 gap-5">
    <div v-for="post in news" :key="post.path">
      <button class="relative inline-block" @click="selectPost(post)">
        <div class="transform transition-transform duration-200 hover:scale-105">
          <img class="opacity-25 blur-md" :src="post.frontmatter.header" />
          <img class="absolute left-0 top-0 h-full w-full object-contain" :src="post.frontmatter.logo" />
        </div>
        <div class="mt-5">
          <div class="mb-3 block uppercase">
            <VPBadge type="info">{{ post.date.toDateString() }}</VPBadge>
            <VPBadge v-for="tag in post.frontmatter.tags" :key="tag" type="tip">{{ tag }}</VPBadge>
          </div>
          <span class="font-sans text-2xl font-black uppercase text-slate-200">{{ post.frontmatter.title }}</span
          ><br />
          <span class="text-sm font-normal text-slate-400">{{ post.frontmatter.description }}</span
          ><br />
        </div>
      </button>
    </div>
  </div>

  <div v-if="selectedPost" class="fixed inset-0 z-50 overflow-hidden bg-neutral-950/100" @click="hidePost()">
    <div class="pointer-events-none fixed left-0 top-0 z-0 h-full w-full">
      <div class="relative h-[800px] w-full overflow-hidden opacity-60">
        <img :src="selectedPost.frontmatter.header" alt="Header background" class="news-hero absolute left-0 top-0 h-full w-full object-cover" />
        <div class="absolute bottom-0 left-0 h-96 w-full bg-gradient-to-b from-transparent to-neutral-950/100"></div>
      </div>
    </div>
    <div class="relative z-10 h-full overflow-y-auto">
      <div class="mx-auto my-72 max-w-screen-lg space-y-6">
        <div class="text-center text-5xl font-black uppercase" @click.stop>
          <img class="w-[60%] transform justify-self-center transition-transform duration-200 hover:scale-105" :src="selectedPost.frontmatter.logo" />
          <div class="my-3 block">
            <VPBadge type="info">{{ selectedPost.date.toDateString() }}</VPBadge>
            <VPBadge v-for="tag in selectedPost.frontmatter.tags" :key="tag" type="tip">{{ tag }}</VPBadge>
          </div>
          {{ selectedPost.frontmatter.title }}
        </div>
        <div class="mb-48 text-center text-2xl font-normal text-slate-400" @click.stop>
          {{ selectedPost.frontmatter.description }}
        </div>
        <div class="news-content text-slate-300 opacity-80" @click.stop>
          <component :is="selectedPost.content" />
        </div>
      </div>
    </div>
  </div>
</template>

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
