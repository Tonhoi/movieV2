import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    theme: JSON.parse(localStorage.getItem("theme")),
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = commonSlice.actions;
export default commonSlice.reducer;
