import { configureStore } from "@reduxjs/toolkit";
import personneReducer from "./slices/personneSlice";
import roleReducer from "./slices/roleSlice";
import categoryReducer from "./slices/categorySlice";

const reducer = {
  personnes: personneReducer,
  roles: roleReducer,
  category: categoryReducer
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export default store;
