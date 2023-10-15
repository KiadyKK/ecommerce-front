import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as UniteVenteService from "../services/uniteVente.service";
import Istate from "../types/state/state";
import uniteVente from "../types/uniteVente/uniteVente";
import { toast } from "react-toastify";

export interface uniteVenteInitialState {
  loadingCreate: boolean;
  loadingRetrieve: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  uniteVentes: uniteVente[];
  error: string;
}

const initialState: uniteVenteInitialState = {
  loadingCreate: false,
  loadingRetrieve: false,
  loadingUpdate: false,
  loadingDelete: false,
  uniteVentes: [],
  error: "",
};

export const createUniteVente = createAsyncThunk(
  "uniteVente/create",
  async (utvArt: string, { rejectWithValue }) => {
    try {
      const res = await UniteVenteService.create({ utvArt });
      toast.success(`Sales unit ${utvArt} created successfully !`, {
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

export const retrieveUniteVente = createAsyncThunk(
  "uniteVente/retrieve",
  async (utvArt: string, { rejectWithValue }) => {
    try {
      const res = await UniteVenteService.getAll(utvArt);
      return res.data;
    } catch (error: any) {
      toast.warning(error.response.data, {
        className: "mt-5",
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUniteVente = createAsyncThunk(
  "uniteVente/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await UniteVenteService.deleteUtv(id);
      toast.info(`Sales unit with id ${id} deleted successfully !`, {
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

export const updateUniteVente = createAsyncThunk(
  "category/update",
  async (data: uniteVente, { rejectWithValue }) => {
    try {
      const res = await UniteVenteService.updateUtv(data);
      toast.info(`Sales unit ${data.utvArt} updated successfully !`, {
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

const uniteVenteSlice = createSlice({
  name: "uniteVente",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //create**************************************
    builder.addCase(createUniteVente.pending, (state) => {
      state.error = "";
      state.loadingCreate = true;
    });

    builder.addCase(createUniteVente.fulfilled, (state, action) => {
      state.loadingCreate = false;
      state.uniteVentes.push(action.payload);
      state.error = "";
    });

    builder.addCase(createUniteVente.rejected, (state, action) => {
      state.loadingCreate = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });

    //retrive**************************************
    builder.addCase(retrieveUniteVente.pending, (state) => {
      state.error = "";
      state.loadingRetrieve = true;
    });

    builder.addCase(retrieveUniteVente.fulfilled, (state, action) => {
      state.loadingRetrieve = false;
      state.uniteVentes = action.payload;
      state.error = "";
    });

    builder.addCase(retrieveUniteVente.rejected, (state, action) => {
      state.loadingRetrieve = false;
      state.uniteVentes = [];
      state.error = typeof action.payload === "string" ? action.payload : "";
    });

    //delete**************************************
    builder.addCase(deleteUniteVente.pending, (state) => {
      state.error = "";
      state.loadingDelete = true;
    });

    builder.addCase(deleteUniteVente.fulfilled, (state, action) => {
      const index: number = state.uniteVentes.findIndex(
        (uniteVente: uniteVente) => uniteVente.id === action.payload
      );
      state.loadingDelete = false;
      state.uniteVentes.splice(index, 1);
      state.error = "";
    });

    builder.addCase(deleteUniteVente.rejected, (state, action) => {
      state.loadingDelete = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });

    //update**************************************
    builder.addCase(updateUniteVente.pending, (state) => {
      state.error = "";
      state.loadingUpdate = true;
    });

    builder.addCase(updateUniteVente.fulfilled, (state, action) => {
      const index: number = state.uniteVentes.findIndex(
        (uniteVente: uniteVente) => uniteVente.id === action.payload.id
      );
      state.loadingUpdate = false;
      state.uniteVentes[index] = action.payload;
      state.error = "";
    });

    builder.addCase(updateUniteVente.rejected, (state, action) => {
      state.loadingUpdate = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });
  },
});

export const uniteVenteError = (state: Istate): string =>
  state.uniteVentes.error;

export const uniteVenteLoadingCreate = (state: Istate): boolean =>
  state.uniteVentes.loadingCreate;

export const uniteVenteLoadingRetrieve = (state: Istate): boolean =>
  state.uniteVentes.loadingRetrieve;

export const uniteVenteLoadingUpdate = (state: Istate): boolean =>
  state.uniteVentes.loadingUpdate;

export const uniteVenteLoadingDelete = (state: Istate): boolean =>
  state.uniteVentes.loadingDelete;

export const selectUniteVentes = (state: Istate): uniteVente[] =>
  state.uniteVentes.uniteVentes;

export const { resetError } = uniteVenteSlice.actions;

export default uniteVenteSlice.reducer;
