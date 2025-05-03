// import { UserRole } from 'src/types/userRole';
import { Login } from '../types/login';
// import { UserRole } from 'types/userRole';
import { ofsApi } from './controller/controllerApi';
// import { User } from 'types/registeration-model';
// import { addParamsToUrl, getUserDetails } from 'utils';

export const registerApi = ofsApi.injectEndpoints({
  endpoints: (builder) => ({
    // saveUserRoleDetails: builder.mutation<{ userRole: UserRole }, { userRole: UserRole }>({
    //   query: ({ userRole }) => ({
    //     url: `user/add`,
    //     method: 'POST',
    //     body: userRole,
    //   }),
    // }),
    signInUser: builder.mutation<{ code: number; userLogin: any; Login: Login }, { Login: Login }>({
      query: ({ Login }) => ({
        // url: `auth/checkin/`,
        url: `login_user`,
        method: 'POST',
        body: Login,
      }),
    }),
    // getUserRoleDetails: builder.query<{ userRoleDTOList: UserRole[] }, {}>({
    //   query: () => {
    //     const { userId } = getUserDetails();
    //     // let apiUrl = addParamsToUrl(`user/privilege`, {
    //     //   current_user_id: userId,
    //     // });
    //     let apiUrl = 'user/privilege';
    //     return apiUrl;
    //   },
    // }),
    getAuthUserDetails: builder.mutation<{ token:string }, {token:string}>({
      query: ({token}) => ({
        // const { userId } = getUserDetails();
        
      // url: 'auth/whoami',
      url: '/whoami/',
      method: 'GET',
      headers: {
        Authorization: token,
      },
      }),
    }),
  }),
});
export const {
  // useSaveUserRoleDetailsMutation,
  useSignInUserMutation,
  // useGetUserRoleDetailsQuery,
  // useLazyGetUserRoleDetailsQuery,
  useGetAuthUserDetailsMutation,
} = registerApi;
