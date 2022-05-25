import { combineReducers } from "redux";
import authReducer from "./authReducers";
import eventReducer from "./eventReducer";

export default combineReducers({
  eventReducer,
  auth: authReducer
})