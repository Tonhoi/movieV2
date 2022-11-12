export const routes = {
  home: "/",
  movie: "/movie/list/:page",
  tv: "/tv/list/:page",
  topRated: "/top-rated/list/:page",
  detail: "/detailmovie/:type/:id",
  search: "/search",
  watchMovieTv: "/watch/:type/:id/:season/:esp",
  watchMovieMovie: "/watch/:type/:id",

  account: "/account/:nameUser",
  accountNewList: "/account/:nameUser/list/new",
  accountAdditemList: "/account/:nameuser/:id/edit",
  accountChooseImageList: "/account/:nameuser/:id/chooseimg",
  accountListDetail: "/account/:nameuser/list/:id",

  error: "*",

  login: "/login",
  register: "/register",
};
