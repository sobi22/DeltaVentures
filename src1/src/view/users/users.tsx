import React,{useState,useEffect,useContext} from 'react';

import {
   Box,
   Card,
   Grid,
   TextField,
   FormControl,
   FormHelperText,
   IconButton,
   InputLabel,
   Select,
   MenuItem,
   Typography,
   Tooltip,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import foodImage from '../../assets/images/foodimg.png'
import PaginationTable from '../../utils/paginationTable';
import { styled } from '@mui/material/styles';
import Button,{ ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import { PageContainer } from '@toolpad/core/PageContainer';
// import invariant from 'invariant';
import { useActivePage } from '@toolpad/core/useActivePage';
import { useUserContext } from '../../contexts/userAuthContext';
// import useUserAuthentication from "../../hooks/userAuth";
import { useSelector } from "react-redux";
import {AppState} from "../../store";
import { User} from '../../types/user';
import CreateUser from './create/createUser'
import ColorButton from '../../utils/styledButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface Category{
    id:number,
    name:string,
    businessType:string,
    image:string,
    status:string,
}

// type UserContextType = {
//   handleRefreshUser:()=>void;
// };

const Users=()=>{
  const [open, setOpen] = useState(false);
  const [updateUserData,setUpdateUserData] = useState<User|any>({})
  // const { handleRefreshUser } = useUserContext();
  
  //const { user, setUser } = useUserContext();
  // setUser({ name: 'John Doe', email: 'john.doe@example.com' });
 
  // const [{ user }] = useSelector((store:any) => [store?.user]);
  // const userDetails = useSelector((state: AppState) => state.user);

  // console.log(userDetails);
  // const userContext = useContext(UserContext);

  // if (!userContext) {
  //   throw new Error('UserProfile must be used within a UserProvider');
  // }else{
  //   console.log(userContext.name);
  // }
    // const rows: Categories[] = (getCategories.data || []) as Category[];
    // const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    //   color: theme.palette.getContrastText(purple[500]),
    //   backgroundColor: '#009999',
    //   '&:hover': {
    //     backgroundColor: '#004d4d',
    //   },
    // }));

    const handleClickOpen =()=>{
      console.log("create new"); 
      setOpen(true);
    }
    const handleEditclick = async (row: any) => {
        console.log(row.id)
        setUpdateUserData(row);
        // setSelectedID(row.id);
        // setOpen(true);
    };
    const handleClose = ()=>{
      console.log("handle close");
      setUpdateUserData({})
      setOpen(false);
    }
    const columns: GridColDef[] = [
        {
          field: 'name',
          flex: 1,
          minWidth: 150,
          align: 'center',
          headerAlign: 'center',
          headerName: 'Name',
        },
        {
          field: 'email',
          flex: 1,
          minWidth: 150,
          align: 'center',
          headerAlign: 'center',
          headerName: 'Email',
        },
        {
          field: 'mobileNumber',
          flex: 1,
          minWidth: 150,
          align: 'center',
          headerAlign: 'center',
          headerName: 'Mobile Number',
        },
    
        {
          field: 'role',
          flex: 1,
          minWidth: 150,
          align: 'center',
          headerAlign: 'center',
          headerName: 'Role',
        },
    
        {
          field: 'Image',
          flex: 1,
          minWidth: 150,
          align: 'center',
          headerAlign: 'center',
          headerName: 'Image',
          renderCell: (params) => (<img src={params.row.image} 
            
            style={{ width: 100, height: 75}}/>)
        },
        {
            field: 'status',
            flex: 1,
            minWidth: 150,
            align: 'center',
            headerAlign: 'center',
            headerName: 'Status',
          },
      
        {
          field: 'action',
          headerName: 'Action',
          flex: 1,
          minWidth: 150,
          renderCell: (params) => {
            return (
              <>
                {/* {entity && entity.read && ( */}
                  <IconButton onClick={() => handleEditclick(params.row as Category)} sx={{ mr: 1 }}>
                    <EditTwoToneIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEditclick(params.row as Category)} sx={{ mr: 1 }}>
                    <DeleteIcon />
                  </IconButton>
                  
                {/* )} */}
              </>
            );
          },
        },
      ];
    const rows:any[]=[
        {
        id:1,
        name:'Sobi',
        email:'sobi@gmail.com',
        mobileNumber:9567777777,
        role:'admin',
        designation:'ADMIN',
        image:foodImage,
        status:'Active'
        },
        {
        id:2,
        name:'Shalin',
        email:'shalin@gmail.com',
        mobileNumber:9567777777,
        role:'admin',
        image: foodImage,
        status:'Active'
        },
        {
        id:3,
        name:'Britto',
        email:'britto@gmail.com',
        mobileNumber:9567775677,
        role:'branch admin',
        image:'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
        status:'Active'
        }
]
 const activePage = useActivePage();
  // invariant(activePage, 'No navigation match');
  // const params = useParams<{ id: string }>();
  const title = "User List";
  const path = `${activePage?.path}`;
  // const breadcrumbs = [...activePage?.breadcrumbs, { title, path }];
   return (
        // <PageContainer title={title} >
    
    <Box width="100%" height="100%" p={2} overflow="auto" position="relative">
            <Typography variant="h5">USER LIST</Typography> 

      <Card sx={{ padding: '1%', borderRadius: '2mm', width: '97%'}} >

    {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '10px' }}> */}
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      {/* {entity && entity.create && ( */}
        <ColorButton
        variant="contained"
        onClick={handleClickOpen}
        size="small"
        align-items="left"
        // sx={{ marginLeft: 2, mt: '1%',mb: '1%' }}
        startIcon={<AddCircleOutlineIcon />}
      >
          Add User
        </ColorButton>
        {/* <ColorButton 
        variant="contained"
        onClick={handleClickOpen}
        size="small"
        sx={{ marginLeft: 2, mt: '1%' }}
        startIcon={<ShoppingCartCheckoutIcon />}
      >
          Upload CSV
        </ColorButton>
        <ColorButton 
        variant="contained"
        onClick={handleClickOpen}
        size="small"
        sx={{ marginLeft: 2, mt: '1%' }}
        startIcon={<ShoppingCartCheckoutIcon />}
      >
          Generate CSV
      </ColorButton> */}
      {/* )} */}
    </Box>
    {/* <p>User: {user ? user.name : 'No user logged in'}</p> */}
      {/* <Box sx={{ width: '100%', border: '1.2px solid #eee' }}> */}
        <PaginationTable columns={columns} rows={rows} checkbox={false} />
      {/* </Box> */}
    </Card>

    {open && 
    <CreateUser  handleClose={handleClose} updateUserData={updateUserData}  />
    }
  </Box>
  // </PageContainer>
   );
}
export default Users;