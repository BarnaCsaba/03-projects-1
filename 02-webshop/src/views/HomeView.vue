<script setup>
import { onMounted } from 'vue'
import { useGuitarStore } from '../store/guitars.js'
import { useCartStore } from '../store/cart.js'

const { guitars, fetchGuitars } = useGuitarStore()
const { addToCart } = useCartStore()

onMounted(fetchGuitars)
</script>

<template>
  <main>
    <h1>Guitars</h1>
    <p v-if="!guitars.length">No guitars to show.</p>
    <ul v-else class="guitar-list">
      <li v-for="guitar in guitars" :key="guitar.id" class="guitar">
        <h2>{{ guitar.title }}</h2>
        <p>{{ guitar.description }}</p>
        <p>
          <strong>${{ guitar.price }}</strong> · Rating: {{ guitar.rating }}/5 ·
          {{ guitar.stock > 0 ? `${guitar.stock} in stock` : 'Out of stock' }}
        </p>
        <button :disabled="guitar.stock <= 0" @click="addToCart(guitar)">Add to cart</button>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.guitar-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.guitar {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}
</style>
