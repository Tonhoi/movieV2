import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createSession = createAsyncThunk(
  "createSession/createSession",
  async (auth) => {
    const createSession = await axios.get(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=9568cdb91fe0c79af33b87e59bb90d25&token=${auth.currentUser.accessToken}`
    );
    return createSession.data.request_token;
  }
);

const createSessionSlice = createSlice({
  name: "createSession",
  initialState: {
    createSession: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSession.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.createSession = action.payload;
        state.loading = false;
      });
  },
});
export default createSessionSlice.reducer;
