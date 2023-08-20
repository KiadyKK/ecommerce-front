import { configureStore } from "@reduxjs/toolkit";
import personneReducer from "./slices/personneSlice";

const reducer = {
  personnes: personneReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch

export default store;
