// src/components/LocationList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations } from '../../store/locationsSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, IconButton, Icon } from '@mui/material';

import { toast } from 'react-toastify';
import { IconEdit } from '@tabler/icons-react';
import { Navigate, useNavigate } from 'react-router';


const LocationList = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
  const { locationData, status, error } = useSelector((state) => state.locations);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getLocations());
    }
  }, [status, dispatch]);

  const handleEdit = (id) => {
    navigate(`/edit-location/${id}`);
  };

//   const handleDelete = (id) => {
//     dispatch(deleteLocation(id)).unwrap().then(() => {
//       toast.success('Location deleted successfully!');
//       dispatch(getLocations()); // Refresh the list
//     }).catch((err) => {
//       toast.error('Failed to delete location');
//     });
//   };

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Typography marginBottom={3} variant="h4" gutterBottom>
        Location List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Google Query</TableCell>
            <TableCell>Street</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Zip Code</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Longitude</TableCell>
            <TableCell>Latitude</TableCell>
            <TableCell>Actions</TableCell> {/* Add Actions Column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {locationData?.map((location) => (
            <TableRow key={location.id}>
              <TableCell>{location.id}</TableCell>
              <TableCell>{location.google_query}</TableCell>
              <TableCell>{location.street}</TableCell>
              <TableCell>{location.city}</TableCell>
              <TableCell>{location.zip_code}</TableCell>
              <TableCell>{location.state}</TableCell>
              <TableCell>{location.longitude}</TableCell>
              <TableCell>{location.latitude}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(location.id)} aria-label="edit">
                  <IconEdit/>
                </IconButton>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LocationList;
