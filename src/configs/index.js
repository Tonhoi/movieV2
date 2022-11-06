export const routes = {
  home: "/",
  movie: "/movie/list/:page",
  tv: "/tv/list/:page",
  topRated: "/top-rated/list/:page",
  detail: "/detailmovie/:type/:id",
  search: "/search",
  watchMovieTv: "/watch/:type/:id/:season/:esp",
  watchMovieMovie: "/watch/:type/:id",
  error: "*",

  login: "/login",
  register: "/register",
};
