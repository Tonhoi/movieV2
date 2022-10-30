import LayoutOnlyContent from "../layouts/LayoutOnlyContent";

import { routes } from "../configs";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Movie } from "../pages/Movie";
import { Tv } from "../pages/TV";
import { Detail } from "../pages/Detail";
import { Register } from "../pages/Register";
import { Search } from "../pages/Search";
import { WatchMovie } from "../pages/WatchMovie";

const privateRouters = [];

const publicRouters = [
  { path: routes.home, element: Home },
  { path: routes.movie, element: Movie },
  { path: routes.tv, element: Tv },
  { path: routes.detail, element: Detail },
  { path: routes.search, element: Search },
  { path: routes.watchMovieTv, element: WatchMovie },
  { path: routes.watchMovieMovie, element: WatchMovie },

  { path: routes.login, element: Login, layout: LayoutOnlyContent },
  { path: routes.register, element: Register, layout: LayoutOnlyContent },
];

export { privateRouters, publicRouters };
