import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as PersonneService from "../services/personne.service";
import Ipersonne1 from "../types/personne/personne1";

export interface IpersonneInitialState {
  loading: boolean;
  personnes: Ipersonne1[];
  error: string | undefined;
};

const initialState: IpersonneInitialState = {
  loading: false,
  personnes: [],
  error: "",
};

export const retrivePersonnes = createAsyncThunk(
  "personnes/retrieve",
  async (username: string) => {
    const res = await PersonneService.getAll(username);
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
      console.log(action)
      state.loading = false;
      state.personnes = action.payload;
      state.error = "";
    });

    builder.addCase(retrivePersonnes.rejected, (state, action) => {
      state.loading = false;
      state.personnes = [];
      state.error = action.error.message;
    });
  },
});

export default personneSlice.reducer;
