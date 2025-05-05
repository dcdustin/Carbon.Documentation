<script setup>
import { onMounted, ref } from 'vue'

const products = ref([])

onMounted(async () => {
  const response = await fetch('https://codefling.com/db/?category=21', {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  products.value = await response.json()
  console.log(products.value)
})
</script>

<template>
  <div class="card-container" style="padding-top: 25px;">
    <div v-for="product in products">
      <a :href="product.url" style="text-decoration-line: none;">
        <div class="card">
          <img :src="product.primaryScreenshot" alt="Car Radio" class="card-img" style="z-index: auto;">
          <div class="card-body">
            <div style="flex-direction: column;">
              <div class="card-title">
                {{ product.title }}
              </div>
              <div class="card-author">
                {{ product.author }}
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="price">{{ product.prices == null ? 'Free' : product.prices.USD + ' USD' }}</div>
            <div class="stars">★★★★☆</div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
