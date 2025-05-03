import React, { createContext, ReactNode, useContext, useState } from 'react';
import { UserContextProvider } from "./userAuthContext";
import {SnackbarProvider} from "../utils/snackbar"
interface Props{
  children:ReactNode
}

const AppContextProvider = ({ children }:Props) => {
    return (
      <UserContextProvider>
        <SnackbarProvider>
          {children}
        </SnackbarProvider>
      </UserContextProvider>
    )
};

export default AppContextProvider;
