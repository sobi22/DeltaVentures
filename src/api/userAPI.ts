import { ofsApi } from './controller/controllerApi';
import { UserManagementAPI } from './userManagementAPI';
import { User } from '../types/user';
export const commonApi = UserManagementAPI.injectEndpoints({
  endpoints: (builder) => ({
    GetUserFields: builder.mutation<any, {}>({
      query: () => ({
        url:'userFields',
        method: 'GET',
        redirect: "follow"
      }),
    }),
    GetUsers: builder.mutation<any, { page: number; size: number; searchByName: any }>({
        query: () => ({
        //   url: `client-profile/search-by-criteria?page=${page}&size=${size}`,
          url:'users',
          method: 'GET',
          redirect: "follow"
        }),
      }),
    // CreateUser:builder.mutation({
    //   query: (userCreate) => ({
    //     url: 'http://localhost:3031/users',
    //     method: 'POST',
    //     body: userCreate,
    //   }),
    // }),
    CreateUser: builder.mutation<{ userCreate:User }, { userCreate:User }>({
        query: (userCreate) => ({
          url:'users/',
          method: 'POST',
          headers: 
          {
          Accept: "application/json",
          "Content-Type": "application/json" 
          },
          data:JSON.stringify({
            "firstName": "SobiTTU",
            "lastName": "C",
            "email": "sobi@gmail.com",
            "phoneNumber": 9567777777
          }),
          invalidatesTags: ['User'],
        }),
      }),
    UpdateUser: builder.mutation< { id:any; userUpdate:User},{id:any; userUpdate:User }>({
        query: ({id,userUpdate}) => ({
          url:`users/${id}`,
          method: 'PUT',
          data:userUpdate,
          redirect: "follow"
        }),
      }),
    DeleteUser: builder.mutation<{ id:any }, { id:any }>({
        query: (id) => ({
          url:`users/${id}`,
          method: 'DELETE',
          redirect: "follow"
        }),
    }),

  })
})
export const {
    useGetUserFieldsMutation,
    useGetUsersMutation,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
  } = commonApi;