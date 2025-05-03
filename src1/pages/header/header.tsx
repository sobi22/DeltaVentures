import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Grid, IconButton, Toolbar, Tooltip, alpha, styled } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import { useGetUserDetailsQuery } from '../../api/authorizationAPI';
import FlexBox from '../../utils/flexBox';
import ThemeModeToggle from './themeToggle';
import config from '../../config';
// import Profile from './Profile';
import { LogoutOutlined } from '@mui/icons-material';
// import { useAppDispatch } from 'store/hooks';
// import { deleteUserDetails } from 'providers/User/userSlice';
import { useNavigate } from 'react-router-dom';
// import { useSignInUserMutation,useGetAuthUserDetailsMutation} from '../../api/authorizationAPI';
import { useEffect } from 'react';
import { useUserContext } from '../../contexts/userAuthContext';
import { useSelector } from "react-redux";
import {AppState} from "../../store"

interface AppBarProps extends MuiAppBarProps {
  open: boolean;
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
}

const drawerWidth = 80;

const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#FFFFFF',
  borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
  boxShadow: 'none',
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(0),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: `calc(100% - 60px)`,
  }),
}));

const Header = ({ open, handleDrawerClose, handleDrawerOpen, ...muiAppBarProps }: AppBarProps) => {
  // const { data, isSuccess, isLoading, isError } = useGetUserDetailsQuery({});
  // const dispatch = useAppDispatch();
  const { handleRefreshUser } = useUserContext();
  
  const navigate = useNavigate();
  //  const { user, setUser } = useUserContext();
  //  const [getAuthUserData] = useGetAuthUserDetailsMutation();
  const signOut = () => {
    // dispatch(deleteUserDetails());
    setTimeout(function () {
      navigate('/login');
      window.location.reload();
    });
  };
  useEffect(() => {
       console.log("test")
      handleRefreshUser();
  }, []);
  const user = useSelector((state: AppState) => state.user.data);
  console.log(user);
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'b' && open) {
        handleDrawerClose();
      }
      if (event.ctrlKey && event.key.toLowerCase() === 'b' && !open) {
        handleDrawerOpen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDrawerClose, handleDrawerOpen]);
   useEffect(() => {
       console.log("test header")
      //  const token= getuserdetail(localStorage.getItem(config?.tokenVar));
    }, []);
    // const getuserdetail =async(token:any)=>{
    //   try {
    //     getAuthUserData({ token:token }).then((result: any) => {
    //     if ('data' in result) {
    //         console.log(result.data);
    //       if (result.data.status === 200) {
    //         // handleToken(result.token)
    //         const userdetail =result.data.data
    //         console.log(userdetail.name,userdetail.email,userdetail,"test")
    //         // setUser({ name: userdetail.name, email: userdetail.email});
    //       //     const accessToken = result.token;
    //       //     console.log(accessToken);
    //       //     // dispatch(
    //       //     //   updateUserDetails({
    //       //     //     userId,
    //       //     //     accessToken,
    //       //     //   })
    //       //     // );
    //       //     // navigate('/dashboard');
    //         } else {
    //           console.error(' Get user detail failed:', result.data);
    //         }
    //       } else {
    //         const error = result.error;
    //         console.error('Error during get user detail:', error);
    //       }
    //     });
    //   } catch (error) {
    //     console.error('Error during get user detail:', error);
    //   }
    // }
  return (
    <CustomAppBar
      handleDrawerClose={function (): void {
        throw new Error('Function not implemented.');
      }}
      handleDrawerOpen={function (): void {
        throw new Error('Function not implemented.');
      }}
      color="default"
      open={open}
      {...muiAppBarProps}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <FlexBox alignItems="center">
          {/* <Tooltip title={'(CTRL + B)'}>
            <IconButton
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              color="inherit"
              aria-label={open ? 'Close drawer' : 'Open drawer'}
              edge="start"
            >
              {open ? <MenuFoldOutlined style={{ fontSize: '15px' }} /> : <MenuUnfoldOutlined style={{ fontSize: '15px' }} />}
            </IconButton>
          </Tooltip> */}
        </FlexBox>
        <FlexBox alignItems="center">
          {/* <ThemeModeToggle /> */}
          <div style={{ height: '24px', width: '1px', backgroundColor: '#ccc', margin: '0 16px' }} /> {/* Vertical Divider */}
            <p>User: {user ?user.name : 'No user logged in'}</p>
        </FlexBox>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Header;
