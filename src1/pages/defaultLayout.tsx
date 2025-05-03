import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { Header,Sidebar,MainPage} from './index';

const DefaultLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const unfoldable=true;
  // const [{ unfoldable }] = useSelector((state) => [
  //   state.globalState,
  // ]);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return (
    <>
      <Sidebar drawerOpen ={unfoldable}
          handleDrawerClose= {handleDrawerClose}
          handleDrawerOpen= {handleDrawerOpen}/>
        <div className={`wrapper d-flex flex-column min-vh-100 bg-light ${unfoldable ? 'm-bg' : ''}`}>
          <Header open ={unfoldable}
            handleDrawerClose= {handleDrawerClose}
            handleDrawerOpen= {handleDrawerOpen}/>
            <div>
              <MainPage />
            </div>
        </div>
    </>
  )
}

export default DefaultLayout
