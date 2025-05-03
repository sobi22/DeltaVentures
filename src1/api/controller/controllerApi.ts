import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../../config';
import { AppState } from '../../store';
// createApi is the core of RTK Query's functionality. It allows you to define a set of "endpoints"
// that describe how to retrieve data from backend APIs and other async sources, including the
// configuration of how to fetch and transform that data
export const ofsApi = createApi({
  reducerPath: 'ofsApi',
  baseQuery: fetchBaseQuery({
       baseUrl: config.api_uri,
    // baseUrl: 'https://demo-appcontrol-center-api.huewine.com/app-control/',
    // baseUrl: 'http://localhost:8092/app-control/',

    prepareHeaders: (headers, { getState }) => {
      // Set headers here
      const state = getState();
      const { accessToken } = (state as AppState)?.user?.data;
      // If we have a token set in state, let's assume that we should be passing it.
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});