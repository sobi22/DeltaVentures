import React, { Suspense, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "../routes";
import { Box,Paper } from "@mui/material";
import { PageContainer } from '@toolpad/core/PageContainer';
// import invariant from 'invariant';
import { useActivePage } from '@toolpad/core/useActivePage';
import {useLocation} from 'react-router-dom';

export default function MainPage() {
  // const location = useLocation();

  //const jobOrderId =location.state?location.state.jobOrderId:0;
  interface Routee{
    path:string,
    exact:boolean,
    name:string,
    element:any
 }
 console.log(routes)
 const [routess,setRoutes]=useState<Routee[]>()
 console.log(routess)
 const activePage = useActivePage();
  // invariant(activePage, 'No navigation match');
  
  // const params = useParams<{ id: string }>();
  const title = "Item";
  const path = `${activePage?.path}`;
  // const breadcrumbs = [...activePage.breadcrumbs, { title, path }];
  return (
    // <PageContainer >
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
      {/* <Category/> */}

      <Suspense>
        <Routes>
          {routes?.filter((c:any) => c?.element)?.map((route, idx:number) => <Route key={idx} path={route?.path}  element={<route.element />} />)}
          {/* <Route path="*" element={<Navigate to="notfound" replace />} /> */}
        </Routes>
      </Suspense>
    </Paper>
    // </PageContainer>
   
  );
}
