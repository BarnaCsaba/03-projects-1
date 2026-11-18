<template>
    <div>
        <h2>Guitars</h2>
        <ul>
            <li v-for="guitar in guitars" :key="guitar.id">
                <h3>{{ guitar.name }}</h3>
                <p>{{ guitar.description }}</p>
                <p>${{ guitar.price.toFixed(2) }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useGuitarStore } from '../store/guitars.js'
import { onMounted } from 'vue'

const { guitars, fetchGuitars } = useGuitarStore()

onMounted(async () => {
    await fetchGuitars()
})
</script>