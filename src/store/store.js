import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./reducers/formReducer";

const reducer = {
  form: formReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
