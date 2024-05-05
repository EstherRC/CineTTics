import { Home } from "../views/Home";
import { Popular } from "../views/Popular";
import { TopRated } from "../views/TopRated";
import { NowPlaying } from "../views/NowPlaying";
import { MyFavorites } from "../views/MyFavorites";
import { Show } from "../views/Show";
import {RouteObject, createBrowserRouter} from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import {ROUTES} from "./constants";

const routes: RouteObject[] = [
    {
        path: '/', element: <PrivateRouter/>,
        children: [
            {path: ROUTES.HOME, element: <Home/>},
            {path: ROUTES.POPULAR, element: <Popular/>},
            {path: ROUTES.TOPRATED, element: <TopRated/>},
            {path: ROUTES.NOWPLAYING, element: <NowPlaying/>},
            {path: ROUTES.MYFAVORITES, element: <MyFavorites/>},
            {path: `${ROUTES.SHOW}:id`, element: <Show/>}
        ]
    },
    {
        path: '/admin', element: <PublicRouter/>,
        children: [
            {path: '/admin', element: <Home/>}
        ]
    }
    
];

export const router = createBrowserRouter(routes);