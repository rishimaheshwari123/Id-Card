import axios from "axios";

const instance = axios.create({
    // baseURL: "https://api.eagleart.in",
    baseURL: "http://localhost:4010",
    // baseURL: "https://testid.mahitechnocrafts.in",
    // baseURL: "https://id-card-y8ui.onrender.com",
    withCredentials: true,
});

export default instance;

