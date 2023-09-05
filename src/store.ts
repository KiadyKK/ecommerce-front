import { configureStore } from "@reduxjs/toolkit";
import personneReducer from "./slices/personneSlice";
import roleReducer from "./slices/roleSlice";

const reducer = {
  personnes: personneReducer,
  roles: roleReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export default store;
