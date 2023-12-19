import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

// =============================================================>

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "survey"], //reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// infer rootState type from redux store
export type RootState = ReturnType<typeof store.getState>;

// infer AppDispatch types from redux store
export type AppDispatch = typeof store.dispatch;

// ==============================================================
export default store;
