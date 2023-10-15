import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as CategoryService from "../services/category.service";
import category from "../types/categorie/categorie";
import Istate from "../types/state/state";
import { toast } from "react-toastify";

export interface IcategoryInitialState {
  loadingCreate: boolean;
  loadingRetrieve: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  categories: category[];
  error: string;
}

const initialState: IcategoryInitialState = {
  loadingCreate: false,
  loadingRetrieve: false,
  loadingUpdate: false,
  loadingDelete: false,
  categories: [],
  error: "",
};

export const createCategory = createAsyncThunk(
  "category/create",
  async (catArt: string, { rejectWithValue }) => {
    try {
      const res = await CategoryService.create({ catArt });
      toast.success(`Category ${catArt} created successfully !`, {
        className: "mt-5",
      });
      return res.data;
    } catch (error: any) {
      toast.error(error.response.data, {
        className: "mt-5",
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const retrieveCategory = createAsyncThunk(
  "category/retrieve",
  async (catArt: string, { rejectWithValue }) => {
    try {
      const res = await CategoryService.getAll(catArt);
      return res.data;
    } catch (error: any) {
      toast.warning(error.response.data, {
        className: "mt-5",
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await CategoryService.deleteCat(id);
      toast.info(`Category with id ${id} deleted successfully !`, {
        className: "mt-5",
      });
      return res.data;
    } catch (error: any) {
      toast.error(error.response.data, {
        className: "mt-5",
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async (data: category, { rejectWithValue }) => {
    try {
      const res = await CategoryService.updateCat(data);
      toast.info(`Category ${data.catArt} updated successfully !`, {
        className: "mt-5",
      });
      return res.data;
    } catch (error: any) {
      toast.error(error.response.data, {
        className: "mt-5",
      });
      return rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //create**************************************
    builder.addCase(createCategory.pending, (state) => {
      state.error = "";
      state.loadingCreate = true;
    });

    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.loadingCreate = false;
      state.categories.push(action.payload);
      state.error = "";
    });

    builder.addCase(createCategory.rejected, (state, action) => {
      state.loadingCreate = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });

    //retrive**************************************
    builder.addCase(retrieveCategory.pending, (state) => {
      state.error = "";
      state.loadingRetrieve = true;
    });

    builder.addCase(retrieveCategory.fulfilled, (state, action) => {
      state.loadingRetrieve = false;
      state.categories = action.payload;
      state.error = "";
    });

    builder.addCase(retrieveCategory.rejected, (state, action) => {
      state.loadingRetrieve = false;
      state.categories = [];
      state.error = typeof action.payload === "string" ? action.payload : "";
    });

    //delete**************************************
    builder.addCase(deleteCategory.pending, (state) => {
      state.error = "";
      state.loadingDelete = true;
    });

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      const index: number = state.categories.findIndex(
        (category: category) => category.id === action.payload
      );
      state.loadingDelete = false;
      state.categories.splice(index, 1);
      state.error = "";
    });

    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loadingDelete = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });

    //update**************************************
    builder.addCase(updateCategory.pending, (state) => {
      state.error = "";
      state.loadingUpdate = true;
    });

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const index: number = state.categories.findIndex(
        (category: category) => category.id === action.payload.id
      );
      state.loadingUpdate = false;
      state.categories[index] = action.payload;
      state.error = "";
    });

    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loadingUpdate = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });
  },
});

export const categoryError = (state: Istate): string => state.categories.error;

export const categoryLoadingCreate = (state: Istate): boolean =>
  state.categories.loadingCreate;

export const categoryLoadingRetrieve = (state: Istate): boolean =>
  state.categories.loadingRetrieve;

export const categoryLoadingUpdate = (state: Istate): boolean =>
  state.categories.loadingUpdate;

export const categoryLoadingDelete = (state: Istate): boolean =>
  state.categories.loadingDelete;

export const selectCategories = (state: Istate): category[] =>
  state.categories.categories;

export const { resetError } = categorySlice.actions;

export default categorySlice.reducer;
