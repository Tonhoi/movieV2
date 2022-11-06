import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DiscoverMovieApi } from "../../api";

export const callDiscoverMovie = createAsyncThunk(
  "callDiscoverMovie/callDiscoverMovie",
  async (currentPage = 1) => {
    const discoverMovies = await DiscoverMovieApi.getByPage(currentPage);
    return discoverMovies;
  }
);

const callDiscoverMovieSlice = createSlice({
  name: "callDiscoverMovie",
  initialState: {
    loading: false,
    callDiscoverMovie: [],
    counter: 1,
  },
  reducers: {
    setCounter(state, action) {
      state.counter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(callDiscoverMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(callDiscoverMovie.rejected, (state) => {
        state.loading = false;
      })
      .addCase(callDiscoverMovie.fulfilled, (state, action) => {
        state.callDiscoverMovie = action.payload;
        state.loading = false;
      });
  },
});
export const { setCounter } = callDiscoverMovieSlice.actions;
export default callDiscoverMovieSlice.reducer;
