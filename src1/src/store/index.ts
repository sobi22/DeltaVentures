import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer, { UserState } from './reducers/userSlice';
import globalReducer,{GlobalState} from './reducers/globalSlice';
import alertsReducer, { AlertsState } from './reducers/alertsSlice';
import { ofsApi } from '../api/controller/controllerApi';
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
    globalState:globalReducer,
    alerts: alertsReducer,
    [ofsApi.reducerPath]: ofsApi.reducer,
  }),
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware()
    .concat(ofsApi.middleware)
})

export interface StoreState {
  user: UserState;
  alerts: AlertsState;
}
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type AppState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppState = StoreState;
