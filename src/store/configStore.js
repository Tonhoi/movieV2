import { combineReducers, configureStore } from "@reduxjs/toolkit";
import callDiscoverMoviesReducer from "../store/callDiscoverMovie/slice";
import callTvMoviesReducer from "../store/callTvMovie/slice";
import callPopularMovieReducer from "../store/CallPopularMovie/slice";
import callTopRatedReducer from "../store/callTopRated/slice";
import callDetailMovieReducer from "../store/CallDetailMovie/slice";
import createSessionReducer from "../store/CreateSession/slice";

import CommonReducer from "../store/Common/slice";
import AuthReducer from "../store/Auth/slice";

const reducer = combineReducers({
  callDiscoverMovies: callDiscoverMoviesReducer,
  callTvMovies: callTvMoviesReducer,
  callPopularMovie: callPopularMovieReducer,
  callTopRated: callTopRatedReducer,
  callDetailMovie: callDetailMovieReducer,

  // create
  createSession: createSessionReducer,

  auth: AuthReducer,
  common: CommonReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
