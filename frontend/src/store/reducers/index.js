import { combineReducers } from "redux";

// Reducers
import navigationReducer from "./navigationReducer";

const rootReducer = combineReducers({
  navigationReducer,
});

export default rootReducer;
