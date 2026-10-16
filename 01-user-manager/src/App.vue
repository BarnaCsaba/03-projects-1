<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../store/user.js'

const userStore = useUserStore()

const { users } = userStore
const error = ref(null)

onMounted(async () => {
    try {
        await userStore.fetchUsers()
    } catch (err) {
        error.value = 'Could not load users. Is the backend running (npm run db)?'
        console.error(err)
    }
})

async function deleteUser(userId) {
    try {
        const confirmed = window.confirm('Are you sure you want to delete this user?')
        if (!confirmed) return
        await userStore.deleteUser(userId)
    } catch (err) {
        error.value = 'Could not delete user.'
        console.error(err)
    }
}

const editingId = ref(null)
const editForm = ref({ firstname: '', lastName: '', emailAddress: '' })

function startEdit(user) {
    editingId.value = user.id
    editForm.value = {
        firstname: user.firstname,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    }
}

function cancelEdit() {
    editingId.value = null
}

async function saveEdit(userId) {
    try {
        await userStore.editUser(userId, { ...editForm.value })
        editingId.value = null
        error.value = null
    } catch (err) {
        error.value = 'Could not edit user.'
        console.error(err)
    }
}

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
                <template v-if="editingId === user.id">
                    <td><input v-model="editForm.firstname" class="form-control" /></td>
                    <td><input v-model="editForm.lastName" class="form-control" /></td>
                    <td><input v-model="editForm.emailAddress" type="email" class="form-control" /></td>
                    <td>
                        <button class="btn btn-success me-2" @click="saveEdit(user.id)">Save</button>
                        <button class="btn btn-secondary" @click="cancelEdit">Cancel</button>
                    </td>
                </template>
                <template v-else>
                    <td>{{ user.firstname }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.emailAddress }}</td>
                    <td>
                        <button class="btn btn-primary me-2" @click="startEdit(user)">Edit</button>
                        <button class="btn btn-danger" @click="deleteUser(user.id)">Delete</button>
                    </td>
                </template>
            </tr>
        </tbody>
    </table>
</template>
