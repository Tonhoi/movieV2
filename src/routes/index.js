import LayoutOnlyContent from "../layouts/LayoutOnlyContent";

import { routes } from "../configs";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Movie } from "../pages/Movie";
import { Tv } from "../pages/TV";
import { Detail } from "../pages/Detail";
import { Register } from "../pages/Register";
import { Search } from "../pages/Search";
import { Watch } from "../pages/Watch";
import { Error } from "../pages/404";
import { TopRated } from "../pages/TopRated";
import { Account } from "../pages/Account";
import { ListNew } from "../pages/Account/Components/Wrapper/ListNew";
import { AddItem } from "../pages/Account/Components/Wrapper/AddItem";
import { ChooseItemImg } from "../pages/Account/Components/Wrapper/ChooseItemImg";
import { ListDetail } from "../pages/Account/Components/ListDetail";

const privateRouters = [];

const publicRouters = [
  { path: routes.home, element: Home },
  { path: routes.movie, element: Movie },
  { path: routes.tv, element: Tv },
  { path: routes.topRated, element: TopRated },

  { path: routes.detail, element: Detail },
  { path: routes.search, element: Search },
  { path: routes.watchMovieTv, element: Watch },
  { path: routes.watchMovieMovie, element: Watch },

  { path: routes.account, element: Account },
  { path: routes.accountNewList, element: ListNew },
  { path: routes.accountAdditemList, element: AddItem },
  { path: routes.accountChooseImageList, element: ChooseItemImg },
  { path: routes.accountListDetail, element: ListDetail },

  { path: routes.error, element: Error, layout: LayoutOnlyContent },

  { path: routes.login, element: Login, layout: LayoutOnlyContent },
  { path: routes.register, element: Register, layout: LayoutOnlyContent },
];

export { privateRouters, publicRouters };
