import { configureStore } from "@reduxjs/toolkit";
import personneReducer from "./slices/personneSlice";
import roleReducer from "./slices/roleSlice";
import categoryReducer from "./slices/categorySlice";
import conditionnementReducer from "./slices/conditionnementSlice";
import uniteVenteReducer from "./slices/uniteVenteSlice";

const reducer = {
  personnes: personneReducer,
  roles: roleReducer,
  categories: categoryReducer,
  conditionnements: conditionnementReducer,
  uniteVentes: uniteVenteReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export default store;
