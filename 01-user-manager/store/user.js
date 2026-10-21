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
        const {id, ... updatedUser} = userData;
        users.value = users.value.map(user => user.id === id ? { ...user, ...updatedUser } : user);
    }

    return {
        users,
        fetchUsers,
        deleteUser,
        editUser
    };
}
