import axios from "axios";

const request = axios.create({
    baseURL: "https://blog-api-61qi.onrender.com",
});

export default request;