---
layout: home
---

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { VPBadge } from 'vitepress/theme'
import { X } from 'lucide-vue-next'

const carbonNews = ref<any | null>(null)
const docsNews = ref<any | null>(null)
const selectedPost = ref<any | null>(null)

function selectPost(news: any) {
    selectedPost.value = news
}

function hidePost() {
    selectedPost.value = null
}

onMounted(async () => {
    carbonNews.value = await Promise.all(
    Object.entries(import.meta.glob('/news/carbon/*.md')).map(async ([path, loader]) => {
        const mod: any = await loader()
        return {
            path,
            content: mod.default,
            frontmatter: mod.__pageData.frontmatter,
        }
    }))
    docsNews.value = await Promise.all(
    Object.entries(import.meta.glob('/news/docs/*.md')).map(async ([path, loader]) => {
        const mod: any = await loader()
        console.log(mod.default)
        return {
            path,
            content: mod.default,
            frontmatter: mod.__pageData.frontmatter,
            date: new Date(mod.__pageData.frontmatter.date).toDateString()
        }
    }))
})
</script>

<div class="news-grid gap-5">
    <div v-for="post in docsNews">
        <div class="transition-transform duration-200 transform hover:scale-105">
            <button class="relative inline-block" @click="selectPost(post)">
              <img class="opacity-25 blur-md" :src="post.frontmatter.header"/>
              <img class="absolute top-0 left-0 w-full h-full object-contain" :src="post.frontmatter.logo"/>
            </button>
        </div>  
        <div class="mt-5">
            <div class="block mb-3">
                <VPBadge type="info">{{ post.date }}</VPBadge>
                <VPBadge class="uppercase" v-for="tag in post.frontmatter.tags" type="tip">{{ tag }}</VPBadge>
            </div>
            <span class="text-2xl uppercase font-black text-slate-200 font-sans">{{ post.frontmatter.title }}</span><br>
            <span class="text-sm font-normal text-slate-400">{{ post.frontmatter.description }}</span>   
        </div>
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
            <VPBadge type="info">{{ selectedPost.date }}</VPBadge>
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
</style>