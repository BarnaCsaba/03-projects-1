<script setup>
import { RouterLink} from 'vue-router'
import { useCartStore } from '../store/cart.js'

const { itemCount } = useCartStore()



</script>

<template>
    <nav class="main-navigation">
        <ul>
            <li>
                <RouterLink to="/">Home</RouterLink>
            </li>
            <li>
                <RouterLink to="/about">About</RouterLink>
            </li>
            <li>
                <RouterLink to="/contact">Contact</RouterLink>
            </li>
            <li>
                <RouterLink to="/cart">Cart ({{ itemCount }})</RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
.main-navigation {
    background-color: var(--dark);
}
</style>