<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../store/user.js'
import Users_table from './components/Users_table.vue'
import createUserForm from './components/createUserForm.vue'

const userStore = useUserStore()
const error = ref(null)

onMounted(async () => {
    try {
        await userStore.fetchUsers()
    } catch (err) {
        error.value = 'Could not load users. Is the backend running (npm run db)?'
        console.error(err)
    }
})
</script>

<template>
    <div class="container">
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <createUserForm />
        <Users_table />

    </div>
</template>
