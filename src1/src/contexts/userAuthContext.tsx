import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { USER_ACTION, USER_PERMISSIONS_ACTION } from "../store/actions";
import { useSignInUserMutation,useGetAuthUserDetailsMutation} from '../api/authorizationAPI';
import config from "../config";
import {useAppDispatch} from "../store/hook";
import { updateUser } from '../store/reducers/userSlice';

type AuthUser = {
    name: string;
    email: string;
};

type UserContextType = {
    // user: AuthUser | null;
    handleRefreshUser:()=>void;
    // setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};
// type UserContextType = {
//   handleRefreshUser:React.Dispatch<React.SetStateAction<AuthUser | null>>;
// };

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserContextProviderProps = {
    children: ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const tokenVar = config?.tokenVar;
    const [loading, setLoading] = useState(false);
    const [getAuthUserData] = useGetAuthUserDetailsMutation();
    const dispatch = useAppDispatch();
    // const dispatch = useDispatch

    const handleRefreshUser = async () => {
        try {
            const token = localStorage?.getItem(config?.tokenVar)||'';
            getAuthUserData({ token:token }).then((result: any) => {
            if ('data' in result) {
                console.log(result.data);
              if (result.data.status === 200) {
                // handleToken(result.token)
                const userdetail =result.data.data
                console.log(userdetail.name,userdetail.email,userdetail,"test")
                handleNext(result?.data);
                // setUser({ name: userdetail.name, email: userdetail.email});
              //     const accessToken = result.token;
              //     console.log(accessToken);
              //     // dispatch(
              //     //   updateUserDetails({
              //     //     userId,
              //     //     accessToken,
              //     //   })
              //     // );
              //     // navigate('/dashboard');
                } else {
                  console.error(' Get user detail failed:', result.data);
                }
              } else {
                const error = result.error;
                console.error('Error during get user detail:', error);
              }
            });
          } catch (error) {
            console.error('Error during get user detail:', error);
          }
        // await instance.get(`${config?.api_uri}/auth/whoami`).then((response) => handleNext(response?.data)).catch((_) => handleRedirect());
    }
  const handleNext = (response:any) => {
    if (response?.status != 200) return handleRedirect();
    const permissions = {};
    response?.data?.user_permissions?.map((c_c:any) => {
      const key_ = c_c
        .replace("create", "")
        .replace("view", "")
        .replace("update", "")
        .replace("delete", "")
        .replace("seeAll", "");
      if (
        c_c.includes("view") ||
        c_c.includes("delete") ||
        c_c.includes("create") ||
        c_c.includes("update") ||
        c_c.includes("seeAll")
      ) {
        // if (!permissions[key_]) permissions[key_] = {};
        // if (c_c.includes("view"))
        //   permissions[key_]["view"] = c_c.includes("view");
        // if (c_c.includes("delete"))
        //   permissions[key_]["delete"] = c_c.includes("delete");
        // if (c_c.includes("create"))
        //   permissions[key_]["create"] = c_c.includes("create");
        // if (c_c.includes("update"))
        //   permissions[key_]["update"] = c_c.includes("update");
        // if (c_c.includes("seeAll"))
        //   permissions[key_]["list"] = c_c.includes("seeAll");
      }
    });
    dispatch(updateUser({ type: USER_ACTION, payload: response?.data }));
    // dispatch(updateUser({ type: USER_PERMISSIONS_ACTION, payload: permissions }));
    if (response?.data?.email || response?.data?.id || response?.data?.role || response?.data?.name) setLoading(false)
  };

  const handleRedirect = () => {
    setLoading(false);
    // if (
    //   window.location.pathname == config?.login_uri || window.location.pathname.includes("otpVerification") || window.location.pathname.includes("forgot-password") || loading ||config?.is_testing
    // ) return;
    // sessionStorage.removeItem(tokenVar);
    // localStorage.removeItem(btoa('holiday_popup_status'))
    // window.location.replace(config?.login_uri);
  };
    return (
        // <UserContext.Provider value={{ user, setUser }}>
        //     {children}
        // </UserContext.Provider>
        <UserContext.Provider value={{ handleRefreshUser }}>
            {children}
        </UserContext.Provider>
    );
};
// export default UserContext;

// Custom hook to use the UserContext
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
}
// export const AuthProvider = ({ children }) => {
//   const dispatch = useDispatch();
//   const tokenVar = config?.tokenVar;
//   const [loading, setLoading] = useState(false);








//   useEffect(async () => {
//     const controller = new AbortController();
//     setLoading(true);
//     try {
//       const accessToken = localStorage.getItem(tokenVar);
//       if (accessToken || (accessToken && localStorage.getItem(btoa(config.remeber_me_token)))) {
//         await instance.get(`${config?.api_uri}/auth/whoami`, { signal: controller.signal }).then((response) => handleNext(response?.data)).catch((_) => handleRedirect());
//       } else {
//         handleRedirect();
//       }
//     } catch (error) {
//       console.error("error", error);
//       handleRedirect();
//     }
//     return () => controller.abort();
//   }, []);

//   if (loading) return <Loader />

//   return <AuthContext.Provider value={{ handleRefreshUser }}>{children}</AuthContext.Provider>;
// };
