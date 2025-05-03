import React from 'react';

const reachableRoutes = {
    ROOT: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    CATEGORY_MASTER: '/category',
    FAVOURITES: '/favourites'   
  };
  const nonReachableRoutes = {};
  const routesNames = { ...reachableRoutes, ...nonReachableRoutes };

const Userlist = React.lazy(() => import('./view/users'));
interface Route{
   path:string,
   exact:boolean,
   name:string,
   element:any
}

const routes:Route[] = [
    // { path: "/", exact: true, name: "Dashboard", element: Dashboard },
    { path: "/user", exact: true, name: "User", element: Userlist },
]

export type RoutesNames = typeof routesNames;
export default routes;