import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./slices/cryptoSlice";
// import localStorageMiddleware from "./middlewares/localStorageMiddleware";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(localStorageMiddleware),
});
