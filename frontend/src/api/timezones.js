import api from "./index";

export const allTimezones = async () => {
  try {
    const response = await api().get("/timezones");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getTimezone = async (id) => {
  try {
    const response = await api().get(`/timezones/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getTimezoneByUser = async (id) => {
  try {
    const response = await api().get(`/timezones/user/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addTimezone = async (data) => {
  try {
    const response = await api().post("/timezones", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateTimezone = async (id, data) => {
  try {
    const response = await api().put(`/timezones/${id}`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteTimezone = async (id) => {
  try {
    const response = await api().delete(`/timezones/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
