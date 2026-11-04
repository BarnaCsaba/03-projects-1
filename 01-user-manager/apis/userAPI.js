import apiClient from "../utils/apiClients";

const urlFragment = "users";

export async function getUsers() {
    const response = await apiClient.get(urlFragment);
    return response.data;
}

export async function deleteUser(userId) {
    const response = await apiClient.delete(`${urlFragment}/${userId}`);
    return response.data;
}

export async function editUser(userId, userData) {
    const response = await apiClient.put(`${urlFragment}/${userId}`, userData);
    return response.data;
}

export async function createUser(user){
    const response = await apiClient.post(urlFragment, user);
    return response.data;
}


