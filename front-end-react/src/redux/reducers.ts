import { combineReducers } from "@reduxjs/toolkit";
import surveyReducer from "./slices/surveySlice";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  survey: surveyReducer,
  auth: authReducer,
});

export default rootReducer;
