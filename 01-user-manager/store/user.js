import { ref } from 'vue';
import { getUsers, deleteUser as apiDeleteUser, editUser as apiEditUser } from '../apis/userAPI.js';

const users = ref([]);

export function useUserStore() {
    async function fetchUsers() {
        users.value = await getUsers();
    }

    async function deleteUser(userId) {
        await apiDeleteUser(userId);
        users.value = users.value.filter(user => user.id !== userId);
    }

    async function editUser(userId, userData) {
        await apiEditUser(userId, userData);
        const index = users.value.findIndex(user => user.id === userId);
        if (index !== -1) {
            users.value[index] = { ...users.value[index], ...userData };
        }
    }

    return {
        users,
        fetchUsers,
        deleteUser,
        editUser
    };
}
