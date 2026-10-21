<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '../../store/user.js'

const props = defineProps({
  user: { type: Object, default: null }
})

const emit = defineEmits(['close'])

const { editUser } = useUserStore()
const editForm = ref({ id: null, firstname: '', lastName: '', emailAddress: '' })
const error = ref(null)

watch(
  () => props.user,
  (user) => {
    if (!user) return
    editForm.value = {
      id: user.id,
      firstname: user.firstname,
      lastName: user.lastName,
      emailAddress: user.emailAddress
    }
    error.value = null
  },
  { immediate: true }
)

async function saveEdit() {
  try {
    await editUser(editForm.value.id, { ...editForm.value })
    emit('close')
  } catch (err) {
    error.value = 'Could not edit user.'
    console.error(err)
  }
}
</script>

<template>
  <template v-if="user">
    <!-- Modal -->
    <div
      class="modal d-block"
      tabindex="-1"
      aria-labelledby="editUserModalLabel"
      aria-modal="true"
      role="dialog"
      @click.self="emit('close')"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editUserModalLabel">Edit user</h1>
            <button type="button" class="btn-close" aria-label="Close" @click="emit('close')"></button>
          </div>
          <div class="modal-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <div class="mb-3">
              <label for="edit-firstname" class="form-label">First Name</label>
              <input id="edit-firstname" v-model="editForm.firstname" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="edit-lastname" class="form-label">Last Name</label>
              <input id="edit-lastname" v-model="editForm.lastName" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="edit-email" class="form-label">Email</label>
              <input id="edit-email" v-model="editForm.emailAddress" type="email" class="form-control" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="emit('close')">Close</button>
            <button type="button" class="btn btn-primary" @click="saveEdit">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show"></div>
  </template>
</template>
