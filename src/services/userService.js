import api from "./api";

export const getAllUsers = async () => {
    try {
        const response = await api.get("users");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (id, password) => {
    try {
        const response = await api.post("login", { id, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signupUser = async (id, password) => {
    try {
        const response = await api.post("signupuser", { id, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const signupAdmin = async (id, password) => {
    try {
        const response = await api.post("signupadmin", { id, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const changeUserType = async (id, newType) => {
    try {
        const response = await api.patch("usertype/" + id, { newType });
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        await api.delete("user/" + id);
    } catch (error) {
        throw error;
    }
}

export const checkIfAdmin = async () => {
    try {
        const response = await api.get("isadmin");
        return response.data;
    } catch (error) {
        throw error;
    }
}