import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const callDiscoverMovie = createAsyncThunk(
  "callDiscoverMovie/callDiscoverMovie",
  async (currentPage = 1) => {
    const discoverMovies = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=d6c392186e19bae2e1addaadb1677274&language=en-US&sort_by=popularity.desc&page=${currentPage}&release_date.gte=&release_date.lte=&vote_average.gte=&vote_average.lte=&with_genres=&with_original_language=`
    );
    return discoverMovies.data;
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
