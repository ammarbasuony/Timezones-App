import api from "./index";

export const allUsers = async () => {
  try {
    const response = await api().get("/users");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUser = async (id) => {
  try {
    const response = await api().get(`/users/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const addUser = async (data) => {
  try {
    const response = await api().post("/users", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const updateUser = async (id, data) => {
  try {
    const response = await api().put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const deleteUser = async (id) => {
  try {
    const response = await api().delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
