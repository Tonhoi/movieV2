import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TvMovieApi from "../../api/TvMovieApi";

export const callTvMovie = createAsyncThunk(
  "callTvMovie/callTvMovie",
  async (currentPage = 1) => {
    const tvMovies = await TvMovieApi.getByPage(currentPage);
    return tvMovies;
  }
);

const callTvMovieSlice = createSlice({
  name: "callTvMovie",
  initialState: {
    loading: false,
    callTvMovie: [],
    counter: 1,
  },
  reducers: {
    setCounter(state, action) {
      state.counter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(callTvMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(callTvMovie.rejected, (state) => {
        state.loading = false;
      })
      .addCase(callTvMovie.fulfilled, (state, action) => {
        state.callTvMovie = action.payload;
        state.loading = false;
      });
  },
});

export const { setCounter } = callTvMovieSlice.actions;
export default callTvMovieSlice.reducer;
