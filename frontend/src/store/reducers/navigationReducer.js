import { CHANGE_PAGE_TITLE } from "../types";

const initialState = {
  pageTitle: "",
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.payload,
      };
    default:
      return state;
  }
};

export default navigationReducer;
