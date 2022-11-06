import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TopRatedApi } from "../../api";

export const callTopRated = createAsyncThunk(
  "callTopRated/callTopRated",
  async (currentPage = 1) => {
    const callTopRated = await TopRatedApi.getByPage(currentPage);

    return callTopRated;
  }
);

const callTopRatedSlice = createSlice({
  name: "callTopRated",
  initialState: {
    loading: false,
    callTopRateds: [],
    counter: 1,
  },
  reducers: {
    setCounter(state, action) {
      state.counter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(callTopRated.pending, (state) => {
        state.loading = true;
      })
      .addCase(callTopRated.rejected, (state) => {
        state.loading = false;
      })
      .addCase(callTopRated.fulfilled, (state, action) => {
        state.callTopRateds = action.payload;
        state.loading = false;
      });
  },
});
export const { setCounter } = callTopRatedSlice.actions;
export default callTopRatedSlice.reducer;
