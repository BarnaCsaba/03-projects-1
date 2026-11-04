<script setup>
import { ref } from 'vue'

const isformvisible = ref(false)

function showForm() {
  isformvisible.value = true
}
</script>

<template>
    <button v-show="!isformvisible" @click="showForm">Create new user</button>
  <form action="" v-show="isformvisible">
    <div class="mb-3">
      <label for="edit-firstname" class="form-label">First Name</label>
      <input id="edit-firstname" class="form-control" />
    </div>
    <div class="mb-3">
      <label for="edit-lastname" class="form-label">Last Name</label>
      <input id="edit-lastname" class="form-control" />
    </div>
    <div class="mb-3">
      <label for="edit-email" class="form-label">Email</label>
      <input id="edit-email" type="email" class="form-control" />
    </div>
  </form>
</template>
