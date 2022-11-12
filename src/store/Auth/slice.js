import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    infoUser: [],
  },
  reducers: {
    setInfoUser: (state, action) => {
      state.infoUser = action.payload;
    },
  },
});

export const { setInfoUser } = AuthSlice.actions;
export default AuthSlice.reducer;
