import api from "./index";

export const login = async (email, password) => {
  try {
    const response = await api().post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await api().post("/auth/signup", { name, email, password });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserfromToken = async (token) => {
  try {
    const response = await api().post("/auth/get-user", { token });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
