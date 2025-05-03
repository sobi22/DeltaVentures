import React, { createContext, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface SnackbarContextType {
  openSnackbar: (message: string, severity: AlertProps['severity']) => void;
}
interface propsdata {
  children: any;
}
const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<propsdata> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertProps['severity']>('info');

  const openSnackbar = (msg: string, severity: AlertProps['severity']) => {
    setMessage(msg);
    setSeverity(severity);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  const contextValue: SnackbarContextType = {
    openSnackbar: openSnackbar,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MuiAlert elevation={6} variant="filled" onClose={closeSnackbar} severity={severity}>
          {message}
        </MuiAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
