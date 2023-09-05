import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import * as RoleService from "../services/role.service";
import Irole from "../types/role/role";
import Istate from "../types/state/state";

export interface IroleInitialState {
  loading: boolean;
  roles: Irole[];
  error: string | undefined;
}

const initialState: IroleInitialState = {
  loading: false,
  roles: [],
  error: "",
};

export const retriveRoles = createAsyncThunk("role/retrieve", async () => {
  const res = await RoleService.getAll();
  return res.data;
});

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //retrive
    builder.addCase(retriveRoles.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(retriveRoles.fulfilled, (state, action) => {
      state.loading = false;
      state.roles = action.payload;
      state.error = "";
    });

    builder.addCase(retriveRoles.rejected, (state, action) => {
      state.loading = false;
      state.roles = [];
      state.error = action.error.message;
    });
  },
});

const selectRoles = (state: Istate) => state.roles.roles;

export const roles = createSelector([selectRoles], (role: Irole[]) => role);

export const rolesLoading = (state: Istate) => state.roles.loading;

export default roleSlice.reducer;
