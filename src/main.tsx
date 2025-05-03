import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux';
import { StyledEngineProvider} from '@mui/material/styles';
import AppContextProvider from './contexts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <AppContextProvider>
      <BrowserRouter>
        <App/>
    </BrowserRouter>
      </AppContextProvider>
    </StyledEngineProvider>
  </Provider>
)
