import { authApiClient } from "@/src/apiClients/authApiClient";
import axios from "axios";

export const coreApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const requestToken = async () => {
  // Make body with client_id and client_secret as x-www-form-urlencoded
  const formData = new URLSearchParams();
  formData.append("client_id", "9300db4d230a0b3c344a8a28053603a3");
  formData.append(
    "client_secret",
    "9fc5a7a463b99fe5cd3444dde0c6ce32ad60b8faeab84211",
  );
  formData.append("grant_type", "client_credentials");

  const response = await authApiClient.post("/oauth2/token", formData);
  return response.data.access_token;
};

coreApiClient.interceptors.request.use(async (config) => {
  const accessToken = await requestToken();
  config.headers["Content-Type"] = "application/json";
  if (accessToken) {
    config.headers["access-token"] = accessToken; // <-- Use "access-token" header
    // If Authorization header is present, remove it.
    if ("Authorization" in config.headers) {
      delete config.headers.Authorization;
    }
  }
  return config;
});

coreApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      originalRequest._retry = true;
      try {
        const accessToken = await requestToken();
        originalRequest.headers["access-token"] = accessToken;
        if ("Authorization" in originalRequest.headers) {
          delete originalRequest.headers.Authorization;
        }
        return coreApiClient(originalRequest);
      } catch (tokenError) {
        return Promise.reject(tokenError);
      }
    }
    return Promise.reject(error);
  },
);
