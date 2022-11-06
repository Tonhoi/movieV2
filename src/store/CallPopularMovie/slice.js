import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PopularMovieApi from "../../api/PopularMovieApi";

export const callPopularMovie = createAsyncThunk(
  "callPopularMovie/callPopularMovie",
  async (currentPage = 1) => {
    const popularMovie = await PopularMovieApi.getByPage(currentPage);
    return popularMovie;
  }
);

const callPopularMovieSlice = createSlice({
  name: "callPopularMovie",
  initialState: {
    loading: false,
    callPopularMovie: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(callPopularMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(callPopularMovie.rejected, (state) => {
        state.loading = false;
      })
      .addCase(callPopularMovie.fulfilled, (state, action) => {
        state.callPopularMovie = action.payload;
        state.loading = false;
      });
  },
});

export default callPopularMovieSlice.reducer;
