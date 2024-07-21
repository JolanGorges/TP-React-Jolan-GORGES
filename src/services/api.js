import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4555/",
    headers: {
        "Content-type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
        config.headers.Authorization = "Bearer " + user.accessToken;
    }
    return config;
});

export default api;