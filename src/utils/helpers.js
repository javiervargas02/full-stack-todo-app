import axios from "axios";

export function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function deleteUser() {
  localStorage.removeItem("user");
}

export const API_URL = "http://127.0.0.1:8000";

export function initAxiosInterceptors() {
  const user = getUser();
  if (!user) return;
  axios.interceptors.request.use((config) => {
    if (user && user.access_token && user.user) {
      config.headers.Authorization = `Bearer ${user.access_token}`;
    }

    return config;
  });
}
