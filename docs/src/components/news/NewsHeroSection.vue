<template>
  <div class="news-section-hero">
    <div class="news-section-hero-media">
      <img :src="props.img" />
      <div class="absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-neutral-950/35 to-neutral-950/100"></div>
    </div>
    <div class="!mx-auto w-[80%] !max-w-screen-xl">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  img: string;
}

const props = defineProps<Props>()
</script>

<style>
.news-section-hero {
  position: relative;
  margin-inline: calc(-1 * (100vw - 100%) / 2);
  padding-top: 0px;
  overflow: hidden;
}

.news-section-hero-media {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.news-section-hero-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  opacity: 100% !important;
}

.news-section-hero-section {
  position: relative;
  z-index: 1; /* ensure it appears above the image */
  padding: 3rem 1rem;
}
</style>
