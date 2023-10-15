import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as ConditionnementService from "../services/conditionnement.service";
import Istate from "../types/state/state";
import conditionnement from "../types/conditionnement/conditionnement";
import { toast } from "react-toastify";

export interface conditionnementInitialState {
  loadingCreate: boolean;
  loadingRetrieve: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  conditionnements: conditionnement[];
  error: string;
}

const initialState: conditionnementInitialState = {
  loadingCreate: false,
  loadingRetrieve: false,
  loadingUpdate: false,
  loadingDelete: false,
  conditionnements: [],
  error: "",
};

export const createConditionnement = createAsyncThunk(
  "conditionnement/create",
  async (condArt: string, { rejectWithValue }) => {
    try {
      const res = await ConditionnementService.create({ condArt });
      toast.success(`Conditioning ${condArt} created successfully !`, {
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

export const retrieveConditionnement = createAsyncThunk(
  "conditionnement/retrieve",
  async (catArt: string, { rejectWithValue }) => {
    try {
      const res = await ConditionnementService.getAll(catArt);
      return res.data;
    } catch (error: any) {
      toast.warning(error.response.data, {
        className: "mt-5",
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteConditionnement = createAsyncThunk(
  "conditionnement/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await ConditionnementService.deleteCond(id);
      toast.info(`Conditioning with id ${id} deleted successfully !`, {
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

export const updateConditionnement = createAsyncThunk(
  "category/update",
  async (data: conditionnement, { rejectWithValue }) => {
    try {
      const res = await ConditionnementService.updateCond(data);
      toast.info(`Conditioning ${data.condArt} updated successfully !`, {
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

const conditionnementSlice = createSlice({
  name: "conditionnement",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //create**************************************
    builder.addCase(createConditionnement.pending, (state) => {
      state.error = "";
      state.loadingCreate = true;
    });

    builder.addCase(createConditionnement.fulfilled, (state, action) => {
      state.loadingCreate = false;
      state.conditionnements.push(action.payload);
      state.error = "";
    });

    builder.addCase(createConditionnement.rejected, (state, action) => {
      state.loadingCreate = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });

    //retrive**************************************
    builder.addCase(retrieveConditionnement.pending, (state) => {
      state.error = "";
      state.loadingRetrieve = true;
    });

    builder.addCase(retrieveConditionnement.fulfilled, (state, action) => {
      state.loadingRetrieve = false;
      state.conditionnements = action.payload;
      state.error = "";
    });

    builder.addCase(retrieveConditionnement.rejected, (state, action) => {
      state.loadingRetrieve = false;
      state.conditionnements = [];
      state.error = typeof action.payload === "string" ? action.payload : "";
    });

    //delete**************************************
    builder.addCase(deleteConditionnement.pending, (state) => {
      state.error = "";
      state.loadingDelete = true;
    });

    builder.addCase(deleteConditionnement.fulfilled, (state, action) => {
      const index: number = state.conditionnements.findIndex(
        (conditionnement: conditionnement) =>
          conditionnement.id === action.payload
      );
      state.loadingDelete = false;
      state.conditionnements.splice(index, 1);
      state.error = "";
    });

    builder.addCase(deleteConditionnement.rejected, (state, action) => {
      state.loadingDelete = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });

    //update**************************************
    builder.addCase(updateConditionnement.pending, (state) => {
      state.error = "";
      state.loadingUpdate = true;
    });

    builder.addCase(updateConditionnement.fulfilled, (state, action) => {
      const index: number = state.conditionnements.findIndex(
        (category: conditionnement) => category.id === action.payload.id
      );
      state.loadingUpdate = false;
      state.conditionnements[index] = action.payload;
      state.error = "";
    });

    builder.addCase(updateConditionnement.rejected, (state, action) => {
      state.loadingUpdate = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });
  },
});

export const conditionnementError = (state: Istate): string =>
  state.conditionnements.error;

export const conditionnementLoadingCreate = (state: Istate): boolean =>
  state.conditionnements.loadingCreate;

export const conditionnementLoadingRetrieve = (state: Istate): boolean =>
  state.conditionnements.loadingRetrieve;

export const conditionnementLoadingUpdate = (state: Istate): boolean =>
  state.conditionnements.loadingUpdate;

export const conditionnementLoadingDelete = (state: Istate): boolean =>
  state.conditionnements.loadingDelete;

export const selectConditionnements = (state: Istate): conditionnement[] =>
  state.conditionnements.conditionnements;

export const { resetError } = conditionnementSlice.actions;

export default conditionnementSlice.reducer;
