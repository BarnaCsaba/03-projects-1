<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '../../store/user.js'

const { addUser } = useUserStore()
const userFormData = reactive({
  firstname: '',
  lastName: '',
  emailAddress: ''
})
const isformvisible = ref(false)
const error = ref(null)

function showForm() {
  isformvisible.value = true
}

function resetForm() {
  userFormData.firstname = ''
  userFormData.lastName = ''
  userFormData.emailAddress = ''
  error.value = null
}

function hideForm() {
  resetForm()
  isformvisible.value = false
}

async function handleSaveClick() {
  try {
    await addUser({ ...userFormData })
    hideForm()
  } catch (err) {
    error.value = 'Could not create user.'
    alert(err.message)
  }
}
</script>

<template>
  <div>
    <button v-show="!isformvisible" class="btn btn-success my-3" @click="showForm">Create new user</button>
  </div>
  <form v-show="isformvisible" @submit.prevent="handleSaveClick">
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div class="mb-3">
      <label for="create-firstname" class="form-label">First Name</label>
      <input id="create-firstname" v-model="userFormData.firstname" class="form-control" required />
    </div>
    <div class="mb-3">
      <label for="create-lastname" class="form-label">Last Name</label>
      <input id="create-lastname" v-model="userFormData.lastName" class="form-control" required />
    </div>
    <div class="mb-3">
      <label for="create-email" class="form-label">Email</label>
      <input id="create-email" v-model="userFormData.emailAddress" type="email" class="form-control" required />
    </div>
    <div class="mb-3">
      <button type="submit" class="btn btn-primary me-2">Create</button>
      <button type="button" class="btn btn-secondary" @click="hideForm">Cancel</button>
    </div>
  </form>
</template>
