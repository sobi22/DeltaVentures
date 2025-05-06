import CloseIcon from '@mui/icons-material/Close'; //Close icon
import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  IconButton,
  Typography,
  FormControl, 
  InputLabel, 
  Select,
  MenuItem
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
  useGetUserFieldsMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  } from '../../../api/userAPI';
import { Preview } from '@mui/icons-material';
 
interface CreateUserProps {
  updateUserData: User;
  handleClose: () => void;
}

const CustomerTextField: React.FC<CreateUserProps> = ({ handleClose, updateUserData }: CreateUserProps) => {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const[formFields,setformFields]=useState<any>([]);
  const[additionalFormFields,setadditionalFormFields]=useState<any>([]);
  const {openSnackbar} =useSnackbar();
  const [getFormFields] = useGetUserFieldsMutation();
  const [CreateUser] = useCreateUserMutation();
  const [UpdateUser] = useUpdateUserMutation();
  const [selectedAdditionalField,setSelectedAdditionalField] =useState<number>(0);
  const isEmpty = (obj: object): boolean => Object.keys(obj).length === 0;
  const [userData, setUserData] = useState<any>({
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
  const fetchFormFields =async ()=>{
    setformFields([ {
      "id": "1",
      "fieldName": "firstName",
      "fieldType": "string",
      "condition": "required",
      "status": "display"
    },
    {
      "id": "2",
      "fieldName": "lastName",
      "fieldType": "string",
      "condition": "required",
      "status": "display"
    },
    {
      "id": "3",
      "fieldName": "phoneNumber",
      "fieldType": "number",
      "condition": "required",
      "status": "display"
    },
    {
      "id": "4",
      "fieldName": "email",
      "fieldType": "string",
      "condition": "required",
      "status": "display"
    },
    {
      "id": "5",
      "fieldName": "DateOfBirth",
      "fieldType": "string",
      "condition": "required",
      "status": "hide"
    },
    {
      "id": "6",
      "fieldName": "Address",
      "fieldType": "string",
      "condition": "required",
      "status": "hide"
    }])
    const response: any = await getFormFields({});
    console.log(response);
    let formfieldss=response?.data;
    if ('data' in response) {
      setformFields(formfieldss);
    } else {
      console.error('Error fetching data:', response.error);
    }
  }
  useEffect(()=>{
    fetchFormFields();
  },[])

  useEffect(() => {
    if (updateUserData) {
      setUserData(updateUserData);
    }
  }, [updateUserData]);

  
  const handleField = (fieldName: any, value: string) => {
    console.log(userData,fieldName,value);
    setUserData((prevUserData:any) => ({
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

    try {
      if (errorStatusData == false) {
        if (isEmpty(updateUserData)) {
          console.log(userData,"userData");
          const response=fetch("http://localhost:3030/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          })
          .then(response=>{
            console.log(response.status)
            if (response.status==201) {
              openSnackbar('User created successfully', 'success');
             handleClose();
           } else {
             openSnackbar('An error occurred', 'error');
           }
          })
          //   const response = await CreateUser({
          //    userCreate: userData,
          //  });
        } else {
          console.log("update")
          // const response = await UpdateUser({
          //   userUpdate: userData,
          //   id:userData.id
          // });
          const response=fetch(`http://localhost:3030/users/${userData?.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }).then((response)=>{
            console.log(response.status)
            if (response.status==200) {
              openSnackbar('User detail updated successfully', 'success');
              handleClose();
            } else {
              openSnackbar('An error occurred', 'error');
            }
          })
          
        }
      }
    }finally {
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

  const showAdditionalField=(value:any)=>{
    console.log(value);
    const updateFormFields= formFields.map((field:any,index:number)=>{
      if(field.id==value){
        return {
          ...field,
          status:'display'
        } 
      }else {
        return {
          ...field
        }
      }
    })
    setformFields(updateFormFields);
    // setformFields((prev:any)=>{prev.id!=value ? prev : prev['status']='display'})
  }
  // const getFieldValue =(fieldName:string)=>{
  //     return userData[fieldName];
  // }
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
             {formFields && formFields.filter((fields:any)=>(fields.status=='display')).map((field:any,index:number)=> (
                <Grid  item xs={12} sm={6} md={3} lg={3}>
                <TextField
                   key={index}
                   id="outlined-basic"
                   label={`${field?.fieldName}*`}
                   variant="outlined"
                   fullWidth
                   size="small"
                   value={ userData[field?.fieldName]}
                   onChange={(e) => handleField(field?.fieldName, e.target.value)}
                   error={validationData[field?.fieldName] ? true : false}
                   helperText={validationData[field?.fieldName]}
                 />
               </Grid>
             )
             )}
             {isEmpty(formFields) && (<>
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
               </>
               )}
             </Grid>
           </Card>

        </Box>
        <Box display={'flex'} gap={2}  sx={{justifyContent:"end", p:2}}>
        <Box> <FormControl >
              <InputLabel>Additional Fields</InputLabel>
              <Select
                // disabled={additionalFormFields.length == 0}
                name="additionalField"
                value={selectedAdditionalField}
                label="AdditionalField"
                size='medium'
                sx={{width:'100px'}}
                onChange={(e) => showAdditionalField( e.target.value )}
                fullWidth
              >
                {formFields && formFields.filter((fields:any)=>(fields.status!='display')).map((additionalFormFields:any,aindex:number)=>(
                     <MenuItem key={aindex} value={additionalFormFields.id}>{`${additionalFormFields.fieldName}`}</MenuItem>
                ))}
              </Select>
            </FormControl></Box>
            <ColorButton onClick={() => handleSubmit()} variant="contained" color="primary">
                {isEmpty(updateUserData) ? 'Submit' : 'Update'}
            </ColorButton>
        </Box> 
    </Box>
  );
};

export default CustomerTextField;
