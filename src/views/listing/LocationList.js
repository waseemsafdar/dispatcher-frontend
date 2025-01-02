// src/components/LocationList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations } from '../../store/locationsSlice';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Typography, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { IconEdit, IconEye } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import SyncButton from '../dashboard/components/syncbutton';

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
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'google_query', headerName: 'Google Query', width: 200 },
    { field: 'street', headerName: 'Street', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'zip_code', headerName: 'Zip Code', width: 110 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'longitude', headerName: 'Longitude', width: 150 },
    { field: 'latitude', headerName: 'Latitude', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
        {/* <IconButton onClick={() => handleEdit(params.id)} aria-label="edit">
          <IconEdit />
        </IconButton> */}
        <IconButton onClick={() => handleRowClick(params.id)} aria-label="edit">
        <IconEye />
      </IconButton>
      </>
        
      ),
    },
  ];
  const handleRowClick = (id) => { 
    navigate(`/location-detail/${id}`); 
  }
  const rows = locationData?.map((location) => ({
    id: location.id,
    google_query: location.google_query,
    street: location.street,
    city: location.city,
    zip_code: location.zip_code,
    state: location.state,
    longitude: location.longitude,
    latitude: location.latitude,
  }));

  return (
    <div style={{ maxheight: 400, width: '100%' }}>
      <Typography marginBottom={3} variant="h2" gutterBottom>
        Location List
      </Typography>
      
      
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default LocationList;
