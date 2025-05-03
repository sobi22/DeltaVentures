import React,{useState,useEffect,useContext} from 'react';
import {
   Box,
   Card,
   IconButton,
   Typography,
} from '@mui/material'; //Material UI designs
import { GridColDef } from '@mui/x-data-grid'; //For create Listing with pagination
import DeleteIcon from '@mui/icons-material/Delete';  //Delete icon
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'; //Edit icon
import PaginationTable from '../../utils/paginationTable';  //Common Pagination table
import { User} from '../../types/user'; //Type definition
import CreateUser from './create/createUser' //Create customer
import ColorButton from '../../utils/styledButton';// Custom style button
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';// Add button circle icon
import {  
  useGetUsersMutation,
  useDeleteUserMutation } from '../../api/userAPI';


const Users=()=>{
  const [open, setOpen] = useState(false);
  const [rows,setRows] =useState<User|any>([]);
  const [rowCount,setRowCount]=useState(3);
  const [updateUserData,setUpdateUserData] = useState<User|any>({})
  const [getDataFromUser] = useGetUsersMutation();
  const [DeleteUser] = useDeleteUserMutation();
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  useEffect(()=>{
    fetchData(paginationModel.page, paginationModel.pageSize)
  },[paginationModel])

  const fetchData = async (page: number, size: number) => {
    // setRowsFilterBySearch([]);
    const response: any = await getDataFromUser({ page, size, searchByName: "" });
    console.log(response);
    if ('data' in response) {
      setRows(response.data);
      // setRowsFilterBySearch(response.data[0].data);
      // setRowCount(response.data[0].totalCount);
    } else {
      console.error('Error fetching data:', response.error);
    }
  };

  // Open Create page
  const handleClickOpen =()=>{ 
      setUpdateUserData({});
      setOpen(true);
  }

  const handleEditclick = async (row: any) => {
      console.log(row.id)
      setUpdateUserData(row);
      setOpen(true);
  };
  
  const handleDeleteclick = async (row: any) => {
      console.log(row.id)
      const response:any = await DeleteUser(row.id);
      console.log(response);
      setUpdateUserData(row);
  };
  const handleClose = ()=>{
    setUpdateUserData({})
    setOpen(false);
  }
  const columns: GridColDef[] = [
    {
      field: 'firstName',
      flex: 1,
      minWidth: 150,
      align: 'center',
      headerAlign: 'center',
      headerName: 'First Name',
    },
    {
      field: 'lastName',
      flex: 1,
      minWidth: 150,
      align: 'center',
      headerAlign: 'center',
      headerName: 'Last Name',
    },
    
    {
      field: 'phoneNumber',
      flex: 1,
      minWidth: 150,
      align: 'center',
      headerAlign: 'center',
      headerName: 'Phone Number',
    },

    {
      field: 'email',
      flex: 1,
      minWidth: 150,
      align: 'center',
      headerAlign: 'center',
      headerName: 'Email Address',
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return (
          <>
              <IconButton onClick={() => handleEditclick(params.row as User)} sx={{ mr: 1 }}>
                <EditTwoToneIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteclick(params.row as User)} sx={{ mr: 1 }}>
                <DeleteIcon />
              </IconButton>
          </>
        );
      },
    },
  ];

  // const rows:any[]=[
  //   {
  //     id:1,
  //     firstName:'Sobi',
  //     lastName: 'C',
  //     email:'sobi@gmail.com',
  //     phoneNumber:9567777777,
  //   },
  //   {
  //     id:2,
  //     firstName:'Shalin',
  //     lastName: 'L',
  //     email:'shalin@gmail.com',
  //     phoneNumber:9567777777,
  //   },
  //   {
  //     id:3,
  //     firstName:'Britto',
  //     lastName: 'S',
  //     email:'britto@gmail.com',
  //     phoneNumber:9567775677,
  //   }
  // ]
  return (
  <Box width="100%" height="100%" p={2} overflow="auto" position="relative">
      { !open &&( 
      <Box
        p={2}
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Typography variant="h5">USER LIST</Typography> 
        <Card sx={{ padding: '1%', borderRadius: '2mm', width: '97%'}} >      
        <Box display="flex" justifyContent="end" alignItems="center" mb={2}>
          <ColorButton
          variant="contained"
          onClick={handleClickOpen}
          size="small"
          align-items="right"
          startIcon={<AddCircleOutlineIcon />}
          >
          Add User
          </ColorButton>
        </Box>
        <PaginationTable columns={columns} rows={rows} checkbox={false} />
      </Card>
    </Box>
    )} 
    {open && 
      <CreateUser  handleClose={handleClose} updateUserData={updateUserData} />
    }
  </Box>
  );
}
export default Users;