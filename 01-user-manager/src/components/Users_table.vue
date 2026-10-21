<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../store/user.js'

const { users, deleteUser, editUser } = useUserStore()
const tableError = ref(null)

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
        await editUser(userId, { ...editForm.value })
        editingId.value = null
        tableError.value = null
    } catch (err) {
        tableError.value = 'Could not edit user.'
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
                            <button class="btn btn-danger" @click="handleDelete(user.id)">Delete</button>
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>
