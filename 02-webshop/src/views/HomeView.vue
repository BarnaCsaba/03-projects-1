<script setup>
import { onMounted } from 'vue'
import { useGuitarStore } from '../store/guitars.js'
import GuitarsList from '../components/GuitarsList.vue'

const { guitars, fetchGuitars } = useGuitarStore()

onMounted(fetchGuitars)
</script>

<template>
  <h1>Guitars</h1>
  <GuitarsList :guitars="guitars" />
</template>
