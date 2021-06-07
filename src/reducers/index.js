import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import DataReducer from "./DataReducer";

export default combineReducers({
  Auth: AuthReducer,
  Data: DataReducer,
});
