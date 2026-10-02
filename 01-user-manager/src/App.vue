<script setup>
import { ref, onMounted } from 'vue'
import { getUsers } from '../apis/userAPI'

const users = ref([])
const error = ref(null)

onMounted(async () => {
    try {
        users.value = await getUsers()
    } catch (err) {
        error.value = 'Could not load users. Is the backend running (npm run db)?'
        console.error(err)
    }
})
</script>

<template>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <table class="table table-striped">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.firstname }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.emailAddress }}</td>
                <td>
                    <button class="btn btn-primary me-2">Edit</button>
                    <button class="btn btn-danger">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
