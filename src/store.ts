import { configureStore } from "@reduxjs/toolkit";
import agenceReducer from "./slices/agenceSlice";
import articleReducer from "./slices/articleSlice";
import categoryReducer from "./slices/categorySlice";
import conditionnementReducer from "./slices/conditionnementSlice";
import personneReducer from "./slices/personneSlice";
import roleReducer from "./slices/roleSlice";
import uniteVenteReducer from "./slices/uniteVenteSlice";

const reducer = {
  personnes: personneReducer,
  roles: roleReducer,
  categories: categoryReducer,
  conditionnements: conditionnementReducer,
  uniteVentes: uniteVenteReducer,
  articles: articleReducer,
  agences: agenceReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export default store;
