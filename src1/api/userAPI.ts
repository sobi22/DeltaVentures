import { ofsApi } from './controller/controllerApi';
import { User } from '../types/user';
export const commonApi = ofsApi.injectEndpoints({
  endpoints: (builder) => ({
    GetUsers: builder.mutation<any, { page: number; size: number; searchByName: any }>({
        query: () => ({
        //   url: `client-profile/search-by-criteria?page=${page}&size=${size}`,
          url:'http://localhost:3030/users',
          method: 'GET',
          redirect: "follow"
        }),
      }),
    CreateUser: builder.mutation<{ userCreate:User }, { userCreate:User }>({
        query: (userCreate) => ({
          url:'http://localhost:3030/users',
          method: 'POST',
          data:userCreate,
          redirect: "follow"
        }),
      }),
    UpdateUser: builder.mutation< { id:any; userUpdate:User},{id:any; userUpdate:User }>({
        query: ({id,userUpdate}) => ({
          url:`http://localhost:3030/users/${id}`,
          method: 'PUT',
          data:userUpdate,
          redirect: "follow"
        }),
      }),
    DeleteUser: builder.mutation<{ id:any }, { id:any }>({
        query: (id) => ({
          url:`http://localhost:3030/users/${id}`,
          method: 'DELETE',
          redirect: "follow"
        }),
    }),

  })
})
export const {
    useGetUsersMutation,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
  } = commonApi;