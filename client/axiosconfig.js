import axios from "axios";

const instance = axios.create({
    // baseURL: "https://api.eagleart.in",
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

export default instance;

