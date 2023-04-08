import axios from "axios";

const authRequest = axios.create({
   baseURL: "http://localhost:3000/api",
   withCredentials: true,
});

export default authRequest;
