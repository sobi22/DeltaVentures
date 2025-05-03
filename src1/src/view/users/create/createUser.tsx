import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Autocomplete,
  Backdrop,
  Button,
  Card,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import  Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
// import {
//   useCheckCustomerPhoneDuplicateMutation,
//   useSaveCustomerCreateDetailsMutation,
//   useUpdateCustomerCreateDetailsMutation,
// } from 'api/erp/CustomerAPI';
import React, { useEffect, useRef, useState } from 'react';
import { User} from '../../../types/user';
import { useSnackbar } from '../../../utils/snackbar';


// import './CountryCss.css';
// import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { validateCustomerData } from './validateData';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { useCheckDuplicateInProductMutation } from 'api/erp/ProductMasterAPI';
// import { useKeyboardShortcuts } from 'useKeyboardShortcuts';

interface CreateUserProps {
  updateUserData: User;
  handleClose: () => void;
}
const stateList: { code: string; statecode: string }[] = [
  { code: '1', statecode: 'Jammu and Kashmir' },
  { code: '2', statecode: 'Himachal Pradesh' },
  { code: '3', statecode: 'Punjab' },
  { code: '4', statecode: 'Chandigarh' },
  { code: '5', statecode: 'Uttarakhand' },
  { code: '6', statecode: 'Haryana' },
  { code: '7', statecode: 'Delhi' },
  { code: '8', statecode: 'Rajasthan' },
  { code: '9', statecode: 'Uttar Pradesh' },
  { code: '10', statecode: 'Bihar' },
  { code: '11', statecode: 'Sikkim' },
  { code: '12', statecode: 'Arunachal Pradesh' },
  { code: '13', statecode: 'Nagaland' },
  { code: '14', statecode: 'Manipur' },
  { code: '15', statecode: 'Mizoram' },
  { code: '16', statecode: 'Tripura' },
  { code: '17', statecode: 'Meghalaya' },
  { code: '18', statecode: 'Assam' },
  { code: '19', statecode: 'West Bengal' },
  { code: '20', statecode: 'Jharkhand' },
  { code: '21', statecode: 'Odisha' },
  { code: '22', statecode: 'Chhattisgarh' },
  { code: '23', statecode: 'Madhya Pradesh' },
  { code: '24', statecode: 'Gujarat' },
  { code: '25', statecode: 'Daman and Diu' },
  { code: '26', statecode: 'Dadra and Nagar Haveli' },
  { code: '27', statecode: 'Maharashtra' },
  { code: '29', statecode: 'Karnataka' },
  { code: '30', statecode: 'Goa' },
  { code: '31', statecode: 'Lakshadweep' },
  { code: '32', statecode: 'Kerala' },
  { code: '33', statecode: 'Tamil Nadu' },
  { code: '34', statecode: 'Puducherry' },
  { code: '35', statecode: 'Andaman and Nicobar Islands' },
  { code: '36', statecode: 'Telangana' },
  { code: '37', statecode: 'Andhra Pradesh' },
  { code: '39', statecode: 'OTHER COUNTRY' },
];

const CustomerTextField: React.FC<CreateUserProps> = ({ handleClose, updateUserData }: CreateUserProps) => {
//   const [saveCustomerCreateDetails, data] = useSaveUserCreateDetailsMutation();
//   const [updateCustomerDetails, data1] = useUpdateUserCreateDetailsMutation();
  const { openSnackbar } = useSnackbar();
  const [loadingScreen, setLoadingScreen] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const [duplicateData, setDuplicateData] = useState<boolean>(false);
//   const [checkduplicate, { isLoading }] = useCheckCustomerPhoneDuplicateMutation();
//   const typingTimeout = React.useRef<NodeJS.Timeout | null>(null);
//   const [addressFields, setAddressFields] = React.useState<any>([
//     {
//       address: '',
//       addressLine1: '',
//       streetName: '',
//       district: '',
//       state: '',
//       stateCode: '',
//       zipCode: undefined,
//       country: '',
//       addressError: '',
//       addressLine1Error: false,
//       streetNameError: false,
//       districtError: false,
//       stateError: false,
//       stateCodeError: false,
//       zipCodeError: false,
//       countryError: false,
//     },
//   ]);
  const [userData, setUserData] = useState<User>({
    id:0,
    name: '',
    role:'',
    designation:'',
    branch:'',
    mobileNumber: 0,
    email: '',
    address: '',
    image:'',
    status:'Active'
  });

  const [validationData, setValidationData] = useState<any>({
    customerName: false,
    companyName: false,
    mobileNumber: false,
    location: false,
    address: false,
    email: false,
    gstNumber: false,
    prospectFor: false,
    companySegment: false,
    creditLimit: false,
    creditInDays: false,
  });

  useEffect(() => {
    if (updateUserData) {
      setUserData(updateUserData);
    }
  }, [updateUserData]);
  const handleCheckDuplicate = (key: 'mobileNumber', val: string) => {
    setDuplicateData(false);
    console.log(val);

    if (updateUserData && updateUserData[key as keyof typeof updateUserData] === val) {
      handleField(key, val);
      return;
    }

    // if (typingTimeout.current) {
    //   clearTimeout(typingTimeout.current);
    //   console.log('Cleared previous timeout');
    // }

    handleField(key, val);
    // typingTimeout.current = setTimeout(async () => {
      console.log(`Sending API request for ${key}...`);
      if (!val.trim()) {
        return;
      }
      try {
        // const response: any = await checkduplicate({ duplicate: { [key]: val } });
        // setDuplicateData(response.data);
      } catch (error) {
        setDuplicateData(true);
      }
    // }, 1000);
  };
  const handleField = (fieldName: keyof User, value: string) => {
    const stateCode = getStateCode(value!);
    setUserData((prevUserData) => ({
      ...prevUserData,
      [fieldName]: value,
      stateCode: stateCode,
    }));
    setValidationData((prev: any) => ({
      ...prev,
      [fieldName]: false,
    }));
  };

  const getStateCode = (value: string) => {
    const foundState = stateList.find((state) => state.statecode.toLocaleLowerCase().trim() === value.toLocaleLowerCase().trim());
    if (foundState) {
      return foundState.code;
    }
  };
  const handleSubmit = async () => {
    setLoadingScreen(true);

    let errorCustomerDaat: any = await validateCustomerData(userData);
    setValidationData(errorCustomerDaat);
    let errorStatusData = Object.values(errorCustomerDaat).some((val: any) => val == true);

    try {
      if (errorStatusData == false) {
        if (!updateUserData) {
        //   const response = await saveCustomerCreateDetails({
        //     Customercreate: userData,
        //   });
        //   if ('data' in response) {
        //     openSnackbar('Customer Detail created successfully', 'success');
        //     handleClose();
        //   } else {
        //     const errorData = response.error as any;
        //     if (errorData.data && typeof errorData.data === 'object') {
        //       const errorMessage = errorData.data.message;
        //       openSnackbar(errorMessage ?? 'An error occurred', 'error');
        //     } else {
        //       openSnackbar('An error occurred', 'error');
        //     }
        //   }
        } else {
        //   const response = await updateCustomerDetails({
        //     Usercreate: userData,
        //   });

        //   if ('data' in response) {
        //     openSnackbar('Customer Detail updated successfully', 'success');
        //     handleClose();
        //   } else {
        //     const errorData = response.error as any;
        //     if (errorData.data && typeof errorData.data === 'object') {
        //       const errorMessage = errorData.data.message;
        //       openSnackbar(errorMessage ?? 'An error occurred', 'error');
        //     } else {
        //       openSnackbar('An error occurred', 'error');
        //     }
        //   }
        }
      }
    } finally {
      setLoadingScreen(false);
    }
  };

  let trigerClose = () => {
    setUserData({
        id:0,
        name: '',
        role:'',
        designation:'',
        branch:'',
        mobileNumber:0,
        email: '',
        address: '',
        image:'',
        status:'Active'
    });
    handleClose();
  };

  const [dialogType, setDialogType] = useState<any>('createAndEdit');

  const closeExelTable = () => {
    setDialogType('createAndEdit');
  };

  let [filtredApiData, setFilteredApiData] = useState<any>();
  const filterData = (data: any) => {
    const requiredFields = ['customerName', 'mobileNumber', 'address'];
    let existingmobileNumbers = new Set<string>();
    const expectedKeys = [...requiredFields].sort();
    if (data[0] === undefined) {
      setLoadingButton(false);
      openSnackbar('Invalid or empty Excel file', 'error');

      return;
    }
    const isKeyMismatch = data.some((val: any) => {
      const actualKeys = Object.keys(val).sort();
      return JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys);
    });

    if (isKeyMismatch) {
      openSnackbar('Some required fields are missing or mismatched. The sample format is next to the upload button.', 'error');
      setLoadingButton(false);
      return;
    }
    const isRowEmpty = (val: any) => {
      return requiredFields.every((field) => !val[field] || val[field].toString().trim() === '');
    };

    const isAnyRowEmpty = data.some(isRowEmpty);
    if (isAnyRowEmpty) {
      setLoadingButton(false);
      openSnackbar('One or more rows in the Excel file are completely empty. Please ensure all rows contain data.', 'error');
      return;
    }

    for (const val of data) {
      let errorMessage = '';

      if (val?.customerName?.trim() == '' || val?.customerName == undefined) {
        errorMessage = 'customer name is required.';
      } else if (val?.address?.trim() == '' || val?.address == undefined) {
        errorMessage = 'Address is required.';
      } else if (!/^[A-Za-z. ]+$/.test(val.customerName.trim())) {
        errorMessage = 'Customer name can only contain letters';
      } else if (val.customerName.trim().length > 50) {
        errorMessage = 'Customer name cannot exceed 50 characters.';
      } else if (/^\.+|\.+$/.test(val.customerName.trim())) {
        errorMessage = "Customer name cannot start or end with a '.' symbol.";
      } else if (!val?.mobileNumber) {
        errorMessage = 'Phone number is required.';
      } else if (!/^\d+$/.test(String(val.mobileNumber))) {
        errorMessage = 'Phone number must contain only digits.';
      } else if (val.mobileNumber.toString().length < 7 || val.mobileNumber.toString().length > 15) {
        errorMessage = 'Phone number must be between 8 to 15 digits.';
      } else if (val.mobileNumber.toString().startsWith('0')) {
        errorMessage = 'Phone number cannot start with zero.';
      } else if (existingmobileNumbers.has(String(val.mobileNumber))) {
        errorMessage = 'Duplicate phone numbers in the list. Please use a different number.';
      } else {
        existingmobileNumbers.add(String(val.mobileNumber));
      }

      if (errorMessage) {
        console.error(errorMessage, JSON.stringify(val, null, 2));
        setLoadingButton(false);
        setTimeout(() => {
          openSnackbar(errorMessage, 'error');
        }, 300);

        return;
      }
    }
    let configData = data.map((val: any, index: any) => ({
      ...val,
      id: index + 1,
    }));
    setFilteredApiData(configData);
    setDialogType('ExelViewTable');
    setLoadingButton(false);
  };
  

  const validationPhoneNumber = () => {
    return validationData.mobileNumber && !userData.mobileNumber ? 'phone  number is required' : 'phone number length must between 8 to 15';
  };
//   useKeyboardShortcuts({
//     onCreate: () => handleSubmit('create'),
//     onBack: handleClose,
//     onSubmit: () => handleSubmit(typeData),
//   });
console.log("create user");
  return (
   <Box  sx={{ height: '100%',position:'absolute', top:0, width: '97%',p: 2 ,overflow:"auto"}} >
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
         
          sx={{
            backdropFilter: 'blur(100px)',
          }}
        >

          <Typography variant="h5" sx={{ fontWeight: '700' }}>
            User Details
          </Typography>
          <IconButton
            aria-label="close"
            onClick={trigerClose}
            sx={{
              padding: 0,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>
          <Card variant="outlined" sx={{ display: 'flex' }} style={{ marginBottom: '10px', borderRadius: 15, position: 'relative' }}>
              <Grid container spacing={3} sx={{ p: 4 }}>
             <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField
                   id="outlined-basic"
                   label="Customer Name *"
                  variant="outlined"
                  fullWidth
                  size="small"
                 value={userData.name}
                 onChange={(e) => handleField('name', e.target.value)}
                  error={validationData.customerName}
                 helperText={validationData.customerName ? 'User Name is required' : ''}
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
                   value={userData.mobileNumber || ''}
                   onChange={(e) => {
                     const value = e.target.value;

                       if (/^\d*$/.test(value) && value.length <= 15) {
                        // handleField('mobileNumber', value);
                       handleCheckDuplicate('mobileNumber', value);
                     }
                   }}
                    error={duplicateData || validationData.mobileNumber}
                    helperText={duplicateData ? 'phone number is duplicate' : validationData.mobileNumber ? validationPhoneNumber() : ''}
                  />
               </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                  <TextField
                    id="outlined-basic"
                    label="Location"
                   variant="outlined"
                   fullWidth
                    size="small"
                    value={userData.address}
                    onChange={(e) => handleField('address', e.target.value)}
                  />
               </Grid>
             </Grid>
           </Card>

        </Box>
        
    </Box>
    // <Box sx={{ height: '90svh', position: 'absolute', top: 0, width: '100%', p: 1 }}>
    //   <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loadingScreen}>
    //     <CircularProgress color="inherit" />
    //   </Backdrop>
    //   {/* {dialogType !== 'ExelViewTable' && ( */}
    //     <Box
    //       display={'flex'}
    //       justifyContent={'space-between'}
    //       alignItems={'center'}
    //       mb={5}
    //       position={'sticky'}
    //       top={0}
    //       width={'100%'}
    //       zIndex={99}
    //       sx={{
    //         backdropFilter: 'blur(100px)',
    //       }}
    //     >
    //       <Typography variant="h5" sx={{ fontWeight: '700' }}>
    //         User Details
    //       </Typography>
    //       <IconButton
    //         aria-label="close"
    //         onClick={trigerClose}
    //         sx={{
    //           padding: 0,
    //         }}
    //       >
    //         <CloseIcon />
    //       </IconButton>
    //     </Box>
    //   {/* )} */}
    //   <Box component="form" noValidate autoComplete="off" sx={{ width: 'auto', height: 'auto', p: 1 }} position={'relative'}>
    //     <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
    //       <IconButton
    //         aria-label="close"
    //         onClick={trigerClose}
    //         sx={{
    //           padding: 0,
    //         }}
    //       >
    //         <CloseIcon />
    //       </IconButton>
    //     </Box>

    //     {dialogType == 'createAndEdit' && (
    //       <Box sx={{ height: '80svh' }}>
    //         <Card variant="outlined" sx={{ display: 'flex' }} style={{ marginBottom: '10px', borderRadius: 15, position: 'relative' }}>
    //           <Grid container spacing={3} sx={{ p: 4 }}>
    //             <Grid item xs={12} sm={6} md={3} lg={3}>
    //               <TextField
    //                 id="outlined-basic"
    //                 label="Customer Name *"
    //                 variant="outlined"
    //                 fullWidth
    //                 size="small"
    //                 value={userData.name}
    //                 onChange={(e) => handleField('name', e.target.value)}
    //                 error={validationData.customerName}
    //                 helperText={validationData.customerName ? 'User Name is required' : ''}
    //               />
    //             </Grid>

    //             <Grid item xs={12} sm={6} md={3} lg={3}>
    //               <TextField
    //                 id="outlined-basic"
    //                 label="Phone Number *"
    //                 variant="outlined"
    //                 fullWidth
    //                 size="small"
    //                 type="number"
    //                 className="no-spinner"
    //                 inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
    //                 value={userData.mobileNumber || ''}
    //                 onChange={(e) => {
    //                   const value = e.target.value;

    //                   if (/^\d*$/.test(value) && value.length <= 15) {
    //                     // handleField('mobileNumber', value);
    //                     handleCheckDuplicate('mobileNumber', value);
    //                   }
    //                 }}
    //                 error={duplicateData || validationData.mobileNumber}
    //                 helperText={duplicateData ? 'phone number is duplicate' : validationData.mobileNumber ? validationPhoneNumber() : ''}
    //               />
    //             </Grid>
    //             <Grid item xs={12} sm={6} md={3} lg={3}>
    //               <TextField
    //                 id="outlined-basic"
    //                 label="Location"
    //                 variant="outlined"
    //                 fullWidth
    //                 size="small"
    //                 value={userData.address}
    //                 onChange={(e) => handleField('address', e.target.value)}
    //               />
    //             </Grid>
    //           </Grid>
    //         </Card>

    //         {/* {dialogType == 'createAndEdit' && ( */}
    //           <Box
    //             position={'sticky'}
    //             sx={{ backdropFilter: 'blur(10px)' }}
    //             bottom={0}
    //             width={'100%'}
    //             display={'flex'}
    //             justifyContent={'right'}
    //             zIndex={99}
    //           >
    //             <Box display={'flex'} gap={4}>
    //               <Button onClick={() => handleSubmit()} disabled={duplicateData} variant="contained" color="primary" sx={{}}>
    //                 {!updateUserData ? 'Submit' : 'Update'}
    //               </Button>
    //             </Box>
    //           </Box>
    //         {/* )} */}
    //         <Backdrop  open={loadingButton}>
    //           <Box display={'flex'} alignItems={'center'} flexDirection={'column'} gap={2}>
    //             <CircularProgress color="inherit" />
    //             <Typography variant="h4">Please wait</Typography>
    //           </Box>
    //         </Backdrop>
    //       </Box>
    //     )}
    //   </Box>
    // </Box>
  );
};

export default CustomerTextField;
