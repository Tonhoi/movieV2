import { combineReducers, configureStore } from "@reduxjs/toolkit";
import callDiscoverMoviesReducer from "../store/callDiscoverMovie/slice";
import callTvMoviesReducer from "../store/callTvMovie/slice";
import callPopularMovieReducer from "../store/CallPopularMovie/slice";
import callTopRatedReducer from "../store/callTopRated/slice";
import CommonReducer from "../store/Common/slice";

const reducer = combineReducers({
  callDiscoverMovies: callDiscoverMoviesReducer,
  callTvMovies: callTvMoviesReducer,
  callPopularMovie: callPopularMovieReducer,
  callTopRated: callTopRatedReducer,
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
