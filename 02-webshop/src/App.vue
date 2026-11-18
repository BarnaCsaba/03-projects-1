<script setup>
import { RouterView } from 'vue-router'
import MainNavigation from './components/MainNavigation.vue'
</script>

<template>
  <MainNavigation />
  <main>
    <router-view/>
  </main>
</template>
