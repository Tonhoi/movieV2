import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const callTvMovie = createAsyncThunk(
  "callTvMovie/callTvMovie",
  async (currentPage = 1) => {
    const tvMovies = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=d6c392186e19bae2e1addaadb1677274&language=en-US&sort_by=popularity.desc&page=${currentPage}&release_date.gte=&release_date.lte=&vote_average.gte=&vote_average.lte=&with_genres=&with_original_language=`
    );
    return tvMovies.data;
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
