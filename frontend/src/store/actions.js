import {
  SAVE_AUTH_DATA,
  SAVE_DASHBOARD_DATA,
  SAVE_USERS_DATA,
  SAVE_TIMEZONES_DATA,
  RESET_STATE,
} from "./types";

export const saveAuthData = (authData) => ({
  type: SAVE_AUTH_DATA,
  payload: authData,
});

export const saveDashboardData = (dashboardData) => ({
  type: SAVE_DASHBOARD_DATA,
  payload: dashboardData,
});

export const saveUsersData = (usersData) => ({
  type: SAVE_USERS_DATA,
  payload: usersData,
});

export const saveTimezonesData = (timezonesData) => ({
  type: SAVE_TIMEZONES_DATA,
  payload: timezonesData,
});

export const resetState = () => ({
  type: RESET_STATE,
});
