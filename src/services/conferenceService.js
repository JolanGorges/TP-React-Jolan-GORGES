import api from "./api";

export const createConference = async (conference) => {
    try {
        const response = await api.post("conference", conference);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteConference = async (id) => {
    try {
        await api.delete("conference/" + id);
    } catch (error) {
        throw error;
    }
}

export const getAllConferences = async () => {
    try {
        const response = await api.get("conferences");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getConference = async (id) => {
    try {
        const response = await api.get("conference/" + id);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateConference = async (id, conference) => {
    try {
        const response = await api.patch("conference/" + id, conference);
        return response.data;
    } catch (error) {
        throw error;
    }
}