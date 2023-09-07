import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import * as PersonneService from "../services/personne.service";
import Ipersonne1 from "../types/personne/personne1";
import Istate from "../types/state/state";

export interface IpersonneInitialState {
  loading: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  personnes: Ipersonne1[];
  error: string;
}

const initialState: IpersonneInitialState = {
  loading: false,
  loadingUpdate: false,
  loadingDelete: false,
  personnes: [],
  error: "",
};

export const retrivePersonnes = createAsyncThunk(
  "personnes/retrieve",
  async ({
    searchUsername,
    searchRole,
  }: {
    searchUsername: string;
    searchRole: string;
  }) => {
    const res = await PersonneService.getAll(searchUsername, searchRole);
    return res.data;
  }
);

export const updatePending = createAsyncThunk(
  "personnes/updatePending",
  async (id: number) => {
    const res = await PersonneService.updatePending(id);
    return res.data;
  }
);

export const deletePersonne = createAsyncThunk(
  "personnes/deletePersonne",
  async (id: number) => {
    const res = await PersonneService.deletePersonne(id);
    return res.data;
  }
);

const personneSlice = createSlice({
  name: "personne",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //retrive
    builder.addCase(retrivePersonnes.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(retrivePersonnes.fulfilled, (state, action) => {
      state.loading = false;
      state.personnes = action.payload;
      state.error = "";
    });

    builder.addCase(retrivePersonnes.rejected, (state, action) => {
      state.loading = false;
      state.personnes = [];
      state.error = action.error.message!;
    });

    //updatePending
    builder.addCase(updatePending.pending, (state) => {
      state.loadingUpdate = true;
    });

    builder.addCase(updatePending.fulfilled, (state, action) => {
      const index: number = state.personnes.findIndex(
        (personne: Ipersonne1) => personne.id === action.payload
      );
      state.loadingUpdate = false;
      state.personnes[index].pending = false;
      state.error = "";
    });

    builder.addCase(updatePending.rejected, (state, action) => {
      state.loadingUpdate = false;
      state.error = action.error.message!;
    });

    //deletePersonne
    builder.addCase(deletePersonne.pending, (state) => {
      state.loadingDelete = true;
    });

    builder.addCase(deletePersonne.fulfilled, (state, action) => {
      const index: number = state.personnes.findIndex(
        (personne: Ipersonne1) => personne.id === action.payload
      );
      state.loadingDelete = false;
      state.personnes.splice(index, 1);
      state.error = "";
    });

    builder.addCase(deletePersonne.rejected, (state, action) => {
      state.loadingDelete = false;
      state.error = action.error.message!;
    });
  },
});

const selectPersonnes = (state: Istate) => state.personnes.personnes;

export const personnesPending = createSelector(
  [selectPersonnes],
  (personne: Ipersonne1[]) =>
    personne.filter((personne: Ipersonne1) => personne.pending)
);

export const personnesList = createSelector(
  [selectPersonnes],
  (personne: Ipersonne1[]) =>
    personne.filter((personne: Ipersonne1) => !personne.pending)
);

export const personnesLoading = (state: Istate) => state.personnes.loading;

export const personneUpdateLoading = (state: Istate) =>
  state.personnes.loadingUpdate;

export const personneDeleteLoading = (state: Istate) =>
  state.personnes.loadingDelete;

export const personneError = (state: Istate) => state.personnes.error;

export default personneSlice.reducer;
