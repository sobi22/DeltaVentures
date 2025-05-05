import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { localUrl1 } from './envURL';
export const UserManagementAPI = createApi({
  reducerPath: 'UserManagementAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${localUrl1}/`,
  }),
  endpoints: () => ({}),
});