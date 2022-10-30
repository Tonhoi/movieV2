import { combineReducers, configureStore } from "@reduxjs/toolkit";
import callDiscoverMoviesReducer from "../store/callDiscoverMovie/slice";
import callTvMoviesReducer from "../store/callTvMovie/slice";

const reducer = combineReducers({
  callDiscoverMovies: callDiscoverMoviesReducer,
  callTvMovies: callTvMoviesReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
