import CloseIcon from '@mui/icons-material/Close'; //Close icon
import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import  Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { User} from '../../../types/user';
import { validatePhoneNumber,validateEmail } from './validateData';
import ColorButton from '../../../utils/styledButton';// Custom style button
import {useSnackbar} from '../../../utils/snackbar';
import {  
  useCreateUserMutation,
  useUpdateUserMutation,
  } from '../../../api/userAPI';
 
interface CreateUserProps {
  updateUserData: User;
  handleClose: () => void;
}

const CustomerTextField: React.FC<CreateUserProps> = ({ handleClose, updateUserData }: CreateUserProps) => {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const {openSnackbar} =useSnackbar();
  const [CreateUser] = useCreateUserMutation();
  const [UpdateUser] = useUpdateUserMutation();
  const [duplicateData, setDuplicateData] = useState<boolean>(false);
  const isEmpty = (obj: object): boolean => Object.keys(obj).length === 0;
  const [userData, setUserData] = useState<User>({
    id:0,
    firstName: '',
    lastName:'',
    phoneNumber: 0,
    email: '',
  });
  const [validationData, setValidationData] = useState<any>({
    firstName:'',
    lastName: '',
    phoneNumber: '',
    email:'',
  });

  useEffect(() => {
    if (updateUserData) {
      setUserData(updateUserData);
    }
  }, [updateUserData]);

  
  const handleField = (fieldName: keyof User, value: string) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [fieldName]: value,
    }));
    setValidationData((prev: any) => ({
      ...prev,
      [fieldName]: false,
    }));
  };

  const handleSubmit = async () => {
    setLoadingScreen(true);
    const errors_:any = {};
    errors_["firstName"] = !userData?.firstName ? 'The fied is required' : "";
    errors_["lastName"] = !userData?.lastName ? 'The fied is required' : "";
    errors_["phoneNumber"] = !userData?.phoneNumber ? 'The fied is required' : !validatePhoneNumber(userData?.phoneNumber) ? "Please enter a valid phone number" : "";
    errors_["email"] = !userData?.email ? 'The fied is required' : !validateEmail(userData?.email) ? "please Enter email in correct format" : "";
    setValidationData(errors_);
    let errorStatusData =(Object.values(errors_).find((_) => _)) ? true : false;
    console.log(errorStatusData,"errorStatusData");
    try {
      if (errorStatusData == false) {
        if (isEmpty(updateUserData)) {
           const response = await CreateUser({
             userCreate: userData,
           });
           if ('data' in response) {
             openSnackbar('User created successfully', 'success');
            handleClose();
          } else {
            const errorData = response.error as any;
               if (errorData.data && typeof errorData.data === 'object') {
              const errorMessage = errorData.data.message;
              openSnackbar(errorMessage ?? 'An error occurred', 'error');
            } else {
              openSnackbar('An error occurred', 'error');
            }
          }
        } else {
          const response = await UpdateUser({
            userUpdate: userData,
            id:userData.id
          });

          if ('data' in response) {
            openSnackbar('User detail updated successfully', 'success');
            handleClose();
          } else {
            const errorData = response.error as any;
            if (errorData.data && typeof errorData.data === 'object') {
              const errorMessage = errorData.data.message;
              openSnackbar(errorMessage ?? 'An error occurred', 'error');
            } else {
              openSnackbar('An error occurred', 'error');
            }
          }
        }
      }
    } finally {
      setLoadingScreen(false);
    }
  };

  let trigerClose = () => {
    setUserData({
        id:0,
        firstName:'',
        lastName:'',
        phoneNumber:0,
        email: '',
    });
    handleClose();
  };

  const validationPhoneNumber = () => {
    return validationData.mobileNumber && !userData.phoneNumber ? 'phone  number is required' : 'phone number length must between 8 to 15';
  };
  return (
   <Box  sx={{ height: '100%',width: '97%',position:'relative', top:0,p: 2 ,overflow:"auto",backgroundColor: 'rgba(255, 255, 255, 0.93)',}} >
      <Backdrop sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })} open={loadingScreen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={5}
          position={'sticky'}
          top='20px'
          zIndex={99}
        >
          <Typography variant="h5" sx={{ fontWeight: '700' }}>
            {isEmpty(updateUserData)? 'Create User' :'Edit User'}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={trigerClose}
            sx={{
              padding:0,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>
          <Card variant="outlined" sx={{ display: 'flex' }} >
              <Grid container spacing={3} sx={{ p: 4 }}>
             <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField
                   id="outlined-basic"
                   label="First Name *"
                   variant="outlined"
                   fullWidth
                   size="small"
                   value={userData.firstName}
                   onChange={(e) => handleField('firstName', e.target.value)}
                   error={validationData.firstName ? true : false}
                   helperText={validationData.firstName}
                 />
               </Grid>
               <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField
                   id="outlined-basic"
                   label="Last Name *"
                   variant="outlined"
                   fullWidth
                   size="small"
                   value={userData.lastName}
                   onChange={(e) => handleField('lastName', e.target.value)}
                   error={validationData?.lastName? true :false}
                   helperText={validationData?.lastName}
                 />
               </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3}>
               <TextField
                   id="outlined-basic"
                  label="Phone Number *"
                   variant="outlined"
                  fullWidth
                   size="small"
                   type="number"
                  className="no-spinner"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
                   value={userData.phoneNumber || ''}
                   onChange={(e) => {
                     const value = e.target.value;

                      //  if (/^\d*$/.test(value) && value.length <= 15) {
                        handleField('phoneNumber', value);
                    //  }
                   }}
                    error={validationData?.phoneNumber? true:false}
                    helperText={validationData.phoneNumber}
                  />
               </Grid>
               <Grid item xs={12} sm={6} md={3} lg={3}>
               <TextField
                   id="outlined-basic"
                  label="Email Address *"
                   variant="outlined"
                  fullWidth
                   size="small"
                   type="text"
                  className="no-spinner"
                   value={userData.email || ''}
                   onChange={(e) => handleField('email', e.target.value)}
                    error={validationData?.email ? true:false}
                    helperText={validationData?.email}
                  />
               </Grid>
             </Grid>
           </Card>

        </Box>
        <Box display={'flex'} gap={4}  sx={{justifyContent:"end", p:2}}>
            <ColorButton onClick={() => handleSubmit()} disabled={duplicateData} variant="contained" color="primary">
                {isEmpty(updateUserData) ? 'Submit' : 'Update'}
            </ColorButton>
        </Box> 
    </Box>
  );
};

export default CustomerTextField;
