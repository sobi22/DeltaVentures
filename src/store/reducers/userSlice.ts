import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { USER_ACTION, USER_PERMISSIONS_ACTION } from "../actions";
import { ReactNode } from "react";

export type UserState = {
  data: {
    userId: number | null;
    name: string |null;
    email:string | null;
    image:string | null;
  };
  user_permissions:any;
  title: string | ReactNode;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};
export type User ={
  userId: number | null;
  name: string |null;
  email:string | null;
  image:string | null;
}

const initialState: UserState = {
  data: {
    // user:{
      userId: 0,
      name: "Admin",
      email: "",
      image:"",
    // },
  },
  user_permissions:[],
  title: "",
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (
      state,
      action: PayloadAction<{
        type:string;
        payload:any;
      }>
    ) => {
      // console.log("test user reducer",action)
      switch (action.payload.type) {
        case USER_ACTION: {
          const userdet=action.payload.payload;
          return {
            ...state,
            data:{
              name:userdet.name,
              userId: userdet.id,
              email: userdet.email,
              image:"",
            },
          };

        }
        case USER_PERMISSIONS_ACTION: {
          return {
            ...state,
            user_permissions: action.payload,
          };
        }
    
        default: {
          return {
            ...state,
          };
        }
      }
      
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
   
 
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
