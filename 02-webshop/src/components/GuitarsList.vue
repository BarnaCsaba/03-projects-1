<script setup>
import GuitarItem from './GuitarItem.vue'

defineProps({
  guitars: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <p v-if="!guitars.length">No guitars to show.</p>
  <ul v-else class="guitar-list">
    <GuitarItem v-for="guitar in guitars" :key="guitar.id" :guitar="guitar" />
  </ul>
</template>

<style scoped>
.guitar-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1rem;
}
</style>
