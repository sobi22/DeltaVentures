import React, { Suspense, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "../routes";
import {Paper } from "@mui/material";

export default function MainPage() {
  interface Routee{
    path:string,
    exact:boolean,
    name:string,
    element:any
 }

 const [routess,setRoutes]=useState<Routee[]>()
 
  return (
       <Paper  sx={(theme) => ({
      p: 1,
      bgcolor: 'grey.50',
      color: 'grey.800',
      border: '1px solid',
      borderColor: 'grey.300',
      borderRadius: 2,
      fontSize: '0.875rem',
      fontWeight: '700',
      paddingTop: 5,
      ml:17,
      mu:30,
      ...theme.applyStyles('dark', {
        bgcolor: '#101010',
        color: 'grey.300',
        borderColor: 'grey.800',
      
      }),
    })}>

      <Suspense>
        <Routes>
          {routes?.filter((c:any) => c?.element)?.map((route, idx:number) => <Route key={idx} path={route?.path}  element={<route.element />} />)}
          {/* <Route path="*" element={<Navigate to="notfound" replace />} /> */}
        </Routes>
      </Suspense>
    </Paper>
   
  );
}
