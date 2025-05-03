import React from 'react';
const reachableRoutes = {
    ROOT: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    USER:'/user',
    CATEGORY_MASTER: '/category',
    FAVOURITES: '/favourites'   
  };
  //const Categorylist = React.lazy(() => import('./view/category'));
  const nonReachableRoutes = {};
  const routes = { ...reachableRoutes, ...nonReachableRoutes };
  // export const rootBaseName = 'test/';
  export const getRouteName = <K extends RouteNames>(path: Routes[K]): RouteNames | null => {
    const route = Object.entries(routes).find(
      /* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars */
      ([routeName, routeUrl]) => routeUrl === path
    );     
    if (route) {
      return route[0] as RouteNames;
    }
    return null;
  };
  export type Routes = typeof routes;
  export type RouteNames = keyof Routes;
  export type ReachableRoutes = typeof reachableRoutes;
  export type ReachableRouteNames = keyof ReachableRoutes;
  export default routes;
  