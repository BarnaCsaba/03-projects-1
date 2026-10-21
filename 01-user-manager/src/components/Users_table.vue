<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../store/user.js'
import EditUserModal from './editUserModal.vue'

const { users, deleteUser } = useUserStore()
const tableError = ref(null)
const editingUser = ref(null)

async function handleDelete(userId) {
    const confirmed = window.confirm('Are you sure you want to delete this user?')
    if (!confirmed) return
    try {
        await deleteUser(userId)
        tableError.value = null
    } catch (err) {
        tableError.value = 'Could not delete user.'
        console.error(err)
    }
}
</script>

<template>
    <div>
        <div v-if="tableError" class="alert alert-danger">{{ tableError }}</div>

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
                        <button class="btn btn-primary me-2" @click="editingUser = user">Edit</button>
                        <button class="btn btn-danger" @click="handleDelete(user.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <EditUserModal :user="editingUser" @close="editingUser = null" />
    </div>
</template>
