import api from "./index";

export const getCounters = async () => {
  try {
    const response = await api().get("/home");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
