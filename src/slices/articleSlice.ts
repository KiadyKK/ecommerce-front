import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as ArtcileService from "../services/article.service";
import { showToast } from "../shared/components/toast/Toast";
import { ERROR, INFO } from "../shared/constant/constant";
import article1 from "../types/article/article1";
import articleUpdate from "../types/article/articleUpdate";
import Istate from "../types/state/state";

export interface articleInitialState {
  loadingCreate: boolean;
  loadingRetrieve: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  articles: article1[];
  error: string;
}

const initialState: articleInitialState = {
  loadingCreate: false,
  loadingRetrieve: false,
  loadingUpdate: false,
  loadingDelete: false,
  articles: [],
  error: "",
};

export const retrieveArticle = createAsyncThunk(
  "article/retrieve",
  async (
    {
      catArtFilter,
      condArtFilter,
      utvArtFilter,
      desArtFilter,
    }: {
      catArtFilter: string;
      condArtFilter: string;
      utvArtFilter: string;
      desArtFilter: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await ArtcileService.getAll(
        catArtFilter,
        condArtFilter,
        utvArtFilter,
        desArtFilter
      );
      return res.data;
    } catch (error: any) {
      showToast(ERROR, error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "article/delete",
  async (refArt: string, { rejectWithValue }) => {
    try {
      const res = await ArtcileService.deleteArt(refArt);
      showToast(INFO, `Article with reference ${refArt} deleted successfully !`);
      return res.data;
    } catch (error: any) {
      showToast(ERROR, error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateArticle = createAsyncThunk(
  "article/update",
  async (data: articleUpdate, { rejectWithValue }) => {
    try {
      const res = await ArtcileService.updateArt(data);
      showToast(INFO, `Article ${data.desArt} updated successfully !`);
      return res.data;
    } catch (error: any) {
      showToast(ERROR, error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //retrive**************************************
    builder.addCase(retrieveArticle.pending, (state) => {
      state.error = "";
      state.loadingRetrieve = true;
    });

    builder.addCase(retrieveArticle.fulfilled, (state, action) => {
      state.loadingRetrieve = false;
      state.articles = action.payload;
      state.error = "";
    });

    builder.addCase(retrieveArticle.rejected, (state, action) => {
      state.loadingRetrieve = false;
      state.articles = [];
      state.error = typeof action.payload === "string" ? action.payload : "";
    });

    //delete**************************************
    builder.addCase(deleteArticle.pending, (state) => {
      state.error = "";
      state.loadingDelete = true;
    });

    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      const index: number = state.articles.findIndex(
        (article: article1) => article.refArt == action.payload
      );
      state.loadingDelete = false;
      state.articles.splice(index, 1);
      state.error = "";
    });

    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.loadingDelete = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });

    //update**************************************
    builder.addCase(updateArticle.pending, (state) => {
      state.error = "";
      state.loadingUpdate = true;
    });

    builder.addCase(updateArticle.fulfilled, (state, action) => {
      const index: number = state.articles.findIndex(
        (category: article1) => category.refArt === action.payload.refArt
      );
      state.loadingUpdate = false;
      state.articles[index] = action.payload;
      state.error = "";
    });

    builder.addCase(updateArticle.rejected, (state, action) => {
      state.loadingUpdate = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });
  },
});

export const articleError = (state: Istate): string => state.articles.error;

export const articleLoadingRetrieve = (state: Istate): boolean => state.articles.loadingRetrieve;

export const articleLoadingUpdate = (state: Istate): boolean => state.articles.loadingUpdate;

export const articleLoadingDelete = (state: Istate): boolean => state.articles.loadingDelete;

export const selectArticles = (state: Istate): article1[] => state.articles.articles;

export const { resetError } = articleSlice.actions;

export default articleSlice.reducer;
