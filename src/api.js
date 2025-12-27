import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // ganti IP backend kalau perlu
console.log("API_URL:", API_URL); // Debug
export const api = axios.create({
  baseURL: API_URL,
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

export default api;