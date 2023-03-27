import apiClient from "./client";

export const useUser = () => {
  const login = (data) => {
    return apiClient.post("users/login/", data);
  };
  return { login };
};
