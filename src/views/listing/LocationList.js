import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations } from '../../store/locationsSlice';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router';

const LocationList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locationData, status, error } = useSelector((state) => state.locations);

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/edit-location/${id}`);
  };

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const columns = [
    { field: 'street', headerName: 'Street', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'zip_code', headerName: 'Zip Code', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'longitude', headerName: 'Longitude', flex: 1 },
    { field: 'latitude', headerName: 'Latitude', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          {/* Add action buttons here */}
        </>
      ),
    },
  ];

  const handleRowClick = (id) => { 
    navigate(`/location-detail/${id}`); 
  };

  const rows = locationData?.map((location) => ({
    id: location.id,
    street: location.street,
    city: location.city,
    zip_code: location.zip_code,
    state: location.state,
    longitude: location.longitude,
    latitude: location.latitude,
  }));

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography marginBottom={3} variant="h2" gutterBottom>
        Location List
      </Typography>
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

export default LocationList;