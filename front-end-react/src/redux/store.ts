import { configureStore } from "@reduxjs/toolkit";
import surveyReducer from "./slices/survey";

// =============================================================

const store = configureStore({
  reducer: {
    survey: surveyReducer,
  },
});

// infer rootState type from redux store
export type RootState = ReturnType<typeof store.getState>;

// infer AppDispatch types from redux store
export type AppDispatch = typeof store.dispatch;

// ==============================================================
export default store;
