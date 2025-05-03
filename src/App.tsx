import React, { useEffect } from 'react';
import { CssBaseline, PaletteMode } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Login from './view/authentication/login.tsx'
import DefaultLayout from "./pages/defaultLayout.tsx";

export const ThemeContext = React.createContext({
  switchTheme: (mode: PaletteMode) => {},
  theme: '',
});
function App() {

  return (
  <>
    <Routes>

      {/* <Route path='/Login' element={<Login/>}> </Route> */}
      <Route path="*" element={<DefaultLayout />} />
    </Routes>
  </>
  )
}

export default App
