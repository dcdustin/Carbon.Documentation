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

  return (
    fullStar.repeat(floor + shouldAddFullStar) +
    halfStar.repeat(shouldAddHalfStar) +
    emptyStar.repeat(maxRating - floor - (shouldAddFullStar || shouldAddHalfStar))
  )
}
</script>

<template>
  <div class="card-container" style="padding-top: 25px">
    <div v-for="product in products">
      <a :href="product.url" style="text-decoration-line: none">
        <div class="card">
          <img :src="product.primaryScreenshot" alt="Car Radio" class="card-img" style="z-index: auto" />
          <div class="card-body">
            <div style="flex-direction: column">
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

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(181px, 1fr)); /* .card width */
  justify-content: center;
  justify-items: center;
  gap: 10px;
}

.card {
  width: 181px;
  background-color: #1c1d2a;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  color: white;
  transition: transform 0.2s ease;
}

.card * {
  position: relative;
  z-index: 1;
}

.card:hover::after {
  position: absolute;
  content: '';
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(44, 199, 115, 0.3);
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  width: 100%;
  height: 100%;
}

.card:hover {
  transform: translateY(-5px);
}

.card-img {
  width: 100%;
  height: 181px;
  object-fit: cover;
}

.card-body {
  gap: 10px;
  padding: 10px 12px;
  display: flex;
  align-items: flex-start;
}

.card-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
  text-align: left;
  display: block;
  line-height: 1.2;
}

.card-author {
  font-size: 12px;
  color: #aaa;
  text-align: left;
  display: block;
  line-height: 1.2;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px 12px;
}

.card-price {
  color: #00ffa3;
  font-size: 14px;
  font-weight: bold;
}

.card-stars {
  font-size: 16px;
  color: #46c1ff;
}
</style>
