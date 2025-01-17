import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../store/usersSlice';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const handleCreateUser = () => {
    navigate('/create-user');
  };

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'user_role', headerName: 'User Role', flex: 1 },
    { field: 'is_dispatcher', headerName: 'Is Dispatcher', flex: 1, type: 'boolean' },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Button onClick={() => handleEdit(params.id)}>Edit</Button>
      ),
    },
  ];

  const handleRowClick = (id) => { 
    navigate(`/user-detail/${id}`); 
  };

  const rows = userData?.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    user_role: user.user_role,
    is_dispatcher: user.is_dispatcher,
  }));

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Typography variant="h2" gutterBottom>
          Users List
        </Typography>
        <Button color="primary" variant="contained" onClick={handleCreateUser}>
          Create User
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          sx={{
            flexGrow: 1,
            '& .MuiDataGrid-root': {
              border: '1px solid #ddd',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #ddd',
              borderRight: '1px solid #ddd',  // Vertical border
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: '1px solid #ddd',
              backgroundColor: '#f5f5f5',
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none',
            },
            '& .MuiDataGrid-row': {
              borderBottom: '1px solid #ddd',
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            disableRowSelectionOnClick
            autoHeight
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UserList;