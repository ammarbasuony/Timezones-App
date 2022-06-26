import { CHANGE_PAGE_TITLE } from "./types";

export const changePageTitle = (title) => {
  return {
    type: CHANGE_PAGE_TITLE,
    payload: title,
  };
};
