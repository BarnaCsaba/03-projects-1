<script setup>
import { RouterLink} from 'vue-router'



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
        </ul>
    </nav>
</template>

<style scoped>
.main-navigation {
    background-color: var(--dark);
}
</style>