import { ref } from 'vue';
import {createUser as apiCreateUser} from '../apis/userAPI.js';
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

    async function addUser(user) {
        const response = await apiCreateUser(user);
        users.value = [...users.value, response];
    }

    return {
        users,
        fetchUsers,
        deleteUser,
        addUser,
        editUser
    };
}
