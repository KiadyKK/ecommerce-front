import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as AgenceService from "../services/agence.service";
import { showToast } from "../shared/components/toast/Toast";
import { ERROR, INFO, SUCCESS, AGENCY } from "../shared/constant/constant";
import Istate from "../types/state/state";
import agence from "../types/agence/agence";

export interface agenceInitialState {
  loadingCreate: boolean;
  loadingRetrieve: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  agences: agence[];
  error: string;
}

const initialState: agenceInitialState = {
  loadingCreate: false,
  loadingRetrieve: false,
  loadingUpdate: false,
  loadingDelete: false,
  agences: [],
  error: "",
};

export const createAgence = createAsyncThunk(
  "agence/create",
  async (agence: agence, { rejectWithValue }) => {
    try {
      const res = await AgenceService.create(agence);
      showToast(SUCCESS, `${AGENCY + " " + agence.agc} created successfully !`);
      return res.data;
    } catch (error: any) {
      showToast(ERROR, error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const retrieveAgences = createAsyncThunk(
  "agence/retrieve",
  async (agc: string, { rejectWithValue }) => {
    try {
      const res = await AgenceService.getAll(agc);
      return res.data;
    } catch (error: any) {
      showToast(ERROR, error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAgence = createAsyncThunk(
  "agence/delete",
  async (abrAgc: string, { rejectWithValue }) => {
    try {
      const res = await AgenceService.remove(abrAgc);
      showToast(INFO, `${AGENCY} with id ${abrAgc} deleted successfully !`);
      return res.data;
    } catch (error: any) {
      showToast(ERROR, error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAgency = createAsyncThunk(
  "agence/update",
  async (agence: agence, { rejectWithValue }) => {
    try {
      const res = await AgenceService.update(agence);
      showToast(INFO, `${AGENCY + " " + agence.agc} updated successfully !`);
      return res.data;
    } catch (error: any) {
      showToast(ERROR, error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const agenceSlice = createSlice({
  name: AGENCY,
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //create**************************************
    builder.addCase(createAgence.pending, (state) => {
      state.error = "";
      state.loadingCreate = true;
    });

    builder.addCase(createAgence.fulfilled, (state, action) => {
      state.loadingCreate = false;
      state.agences.push(action.payload);
      state.error = "";
    });

    builder.addCase(createAgence.rejected, (state, action) => {
      state.loadingCreate = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });

    //retrive**************************************
    builder.addCase(retrieveAgences.pending, (state) => {
      state.error = "";
      state.loadingRetrieve = true;
    });

    builder.addCase(retrieveAgences.fulfilled, (state, action) => {
      state.loadingRetrieve = false;
      state.agences = action.payload;
      state.error = "";
    });

    builder.addCase(retrieveAgences.rejected, (state, action) => {
      state.loadingRetrieve = false;
      state.agences = [];
      state.error = typeof action.payload === "string" ? action.payload : "";
    });

    //delete**************************************
    builder.addCase(deleteAgence.pending, (state) => {
      state.error = "";
      state.loadingDelete = true;
    });

    builder.addCase(deleteAgence.fulfilled, (state, action) => {
      const index: number = state.agences.findIndex(
        (agence: agence) => agence.abrAgc === action.payload
      );
      state.loadingDelete = false;
      state.agences.splice(index, 1);
      state.error = "";
    });

    builder.addCase(deleteAgence.rejected, (state, action) => {
      state.loadingDelete = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });

    //update**************************************
    builder.addCase(updateAgency.pending, (state) => {
      state.error = "";
      state.loadingUpdate = true;
    });

    builder.addCase(updateAgency.fulfilled, (state, action) => {
      const index: number = state.agences.findIndex(
        (agence: agence) => agence.abrAgc === action.payload.abrAgc
      );
      state.loadingUpdate = false;
      state.agences[index] = action.payload;
      state.error = "";
    });

    builder.addCase(updateAgency.rejected, (state, action) => {
      state.loadingUpdate = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });
  },
});

export const agenceError = (state: Istate): string => state.agences.error;

export const agenceLoadingCreate = (state: Istate): boolean => state.agences.loadingCreate;

export const agenceLoadingRetrieve = (state: Istate): boolean => state.agences.loadingRetrieve;

export const agenceLoadingUpdate = (state: Istate): boolean => state.agences.loadingUpdate;

export const agenceLoadingDelete = (state: Istate): boolean => state.agences.loadingDelete;

export const selectAgences = (state: Istate): agence[] => state.agences.agences;

export const { resetError } = agenceSlice.actions;

export default agenceSlice.reducer;
