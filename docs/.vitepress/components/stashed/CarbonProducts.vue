<script setup>
import { onMounted, ref } from 'vue'

const products = ref([])

onMounted(async () => {
  const response = await fetch('https://codefling.com/db/?category=21', {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  products.value = await response.json()
  console.log(products.value)
})

function getStars(rating) {
  const fullStar = '★'
  const halfStar = '⯪'
  const emptyStar = '☆'

  const maxRating = 5
  rating = Math.min(maxRating, rating)

  const thresholdToFull = 0.1
  const thresholdToHalf = 0.15

  const floor = Math.floor(rating)
  const ceil = Math.ceil(rating)

  const shouldAddFullStar = rating < ceil && rating + thresholdToFull >= ceil
  const shouldAddHalfStar = !shouldAddFullStar && rating + thresholdToHalf >= floor + 0.5

  return fullStar.repeat(floor + shouldAddFullStar) +
    halfStar.repeat(shouldAddHalfStar) +
    emptyStar.repeat(maxRating - floor - (shouldAddFullStar || shouldAddHalfStar))
}
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
            <div class="card-price">{{ product.prices == null ? 'Free' : product.prices.USD + ' USD' }}</div>
            <div v-if="product.rating !== 0" class="card-stars">{{ getStars(product.rating) }}</div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
