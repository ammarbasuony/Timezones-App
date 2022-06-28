import { SAVE_AUTH_DATA, RESET_STATE } from "../types";

const initialState = {
  authData: {},
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_AUTH_DATA:
      return {
        ...state,
        authData: action.payload.data,
        token: action.payload.token,
      };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
