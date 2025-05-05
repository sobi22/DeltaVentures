import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer, { UserState } from './reducers/userSlice';
import { ofsApi } from '../api/controller/controllerApi';
import { UserManagementAPI } from '../api/userManagementAPI';
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
    [ofsApi.reducerPath]: ofsApi.reducer,
    [UserManagementAPI.reducerPath]: UserManagementAPI.reducer,
  }),
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware()
    .concat(ofsApi.middleware)
    .concat(UserManagementAPI.middleware)
})

export interface StoreState {
  user: UserState;
}
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type AppState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppState = StoreState;
