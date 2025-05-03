import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import { use, useState } from "react";
import { Link } from "react-router-dom";
import * as Components from './auththemecomponents';
import './style.css';
import { useNavigate } from 'react-router-dom';
// import { useAppDispatch } from 'store/hooks';
import { Login } from '../../types/login';
import { useSignInUserMutation,useGetAuthUserDetailsMutation} from '../../api/authorizationAPI';
import config from '../../config';

const defaultTheme = createTheme();

const SiginIn = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logIn, toggle] = useState(true);
  const [emailError,setEmailError]= useState("");
  const [passwordError,setPassordError]= useState("");
  const [signin] = useSignInUserMutation();
  const [getAuthUserData] = useGetAuthUserDetailsMutation();
  const handleLogin = async (event: any) => {
    event.preventDefault();
    setEmailError('');
    setPassordError('');

    if (!email.trim()) {
      setEmailError('Please enter your username.');
      return;
    } else if (!password.trim()) {
      setPassordError('Please enter your password.');
      return;
    } else {
      // const loginData: Login = {
      //   email:  btoa(email?.trim()),
      //   password: btoa(password?.trim())
      // };
      const loginData: Login = {
        email:  email?.trim(),
        password: password?.trim()
      };
      // navigate('/dashboard');
      try {
        signin({ Login: loginData }).then((result: any) => {
        // handleNext(result);
        if ('data' in result) {
            console.log(result);
            handleToken(result.data.token)
            navigate('/dashboard');
          if (result.data.token && result.data.success == 'true') {
              handleToken(result.data.token)
              navigate('/dashboard');
            } else {
              console.error('Login failed:', result.data);
              setEmailError('Login Failed. Something went wrong');
            }
          } else {
            const error = result.error;
            setEmailError('Login Failed. Something went wrong');
            console.error('Error during login:', error);
          }
        });
      } catch (error) {
        setEmailError('Login Failed. Something went wrong');
        console.error('Error during login:', error);
      }
    }
  };
  const handleToken = (token: string) => {
    if (!token) return
    localStorage.setItem(config?.tokenVar, btoa(token))
    getuserdetail(token);
    console.log(localStorage.getItem(config?.tokenVar));
    
  }
  const getuserdetail =async(token:any)=>{
    try {
      getAuthUserData({ token:token }).then((result: any) => {
      handleNext(result);
      if ('data' in result) {
          console.log(result);
        if (result.token && result.status === 200) {
          // handleToken(result.token)
          console.log(result,"test")
        //     const accessToken = result.token;
        //     console.log(accessToken);
        //     // dispatch(
        //     //   updateUserDetails({
        //     //     userId,
        //     //     accessToken,
        //     //   })
        //     // );
        //     // navigate('/dashboard');
          } else {
            console.error(' Get user detail failed:', result.data);
          }
        } else {
          const error = result.error;
          console.error('Error during get user detail:', error);
        }
      });
    } catch (error) {
      console.error('Error during get user detail:', error);
    }
  }

  const handleNext = (response:any) => {
    const errors_:any = {}
    handleToken(response?.token)
    // switch (response?.status) {
    //   case 200: return window.location.replace(`/`) // 2f2a disabled
    //   case 205: return window.location.replace(`/forgot-password/`) // force_password_reset
    //   case 206: return window.location.replace(`/otpVerification/${btoa(values?.email)}/${response?.data?.customer_id}`) // 2f2a enabled
    //   default: errors_['autherror'] = response?.data?.messages
    // }
    // setErrors(errors_)
  }
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} className="loginpage" sx={{ height: '100%', width: '100%' }}>
        <Components.Container>
          {/* <Components.SignInContainer signinIn={logIn}> */}
            <CssBaseline />
            <Box
            sx={{
              mt: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>

              <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                <LockOutlined />
              </Avatar>
              <Typography variant="h5">Login</Typography>
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  variant="standard"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  variant="standard"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Grid container justifyContent={"flex-end"}>
                  <Grid>
                    <Link to="/register">Don't have an account? Register</Link>

                  </Grid>
                </Grid>
              </Box>
            </Box>
            {/* </Components.SignInContainer> */}
          </Components.Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SiginIn;