import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import DetailMovieApi from "../../api/DetailMovieApi";

export const callDetailMovie = createAsyncThunk(
  "callDetailMovie/callDetailMovie",
  async (params) => {
    console.log(params);
    const [type, id] = params;
    const detailMovie = await DetailMovieApi.getById(type, id);
    return detailMovie;
  }
);

const callDetailMovieSlice = createSlice({
  name: "callDetailMovie",
  initialState: {
    loading: false,
    callDetailMovie: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(callDetailMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(callDetailMovie.rejected, (state) => {
        state.loading = false;
      })
      .addCase(callDetailMovie.fulfilled, (state, action) => {
        state.callDetailMovie = action.payload;
        state.loading = false;
      });
  },
});
export default callDetailMovieSlice.reducer;
