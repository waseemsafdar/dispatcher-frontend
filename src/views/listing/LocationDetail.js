import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchLocationById } from '../../store/locationsSlice'; // Assuming you have this action
import { Typography, Box, Grid, Paper } from '@mui/material';
import SyncButton from '../dashboard/components/syncbutton';

const LocationDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { location, status, error } = useSelector((state) => state.locations);

  useEffect(() => {
    if (id) {
      dispatch(fetchLocationById(id));
    }
  }, [dispatch, id]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <Paper>
      <Box p={3}>
        <Typography marginBottom={3}  variant="h4" gutterBottom>
          Location Details
        </Typography>
        {/* <SyncButton url={`synclocation/${id}`} /> */}

        {location && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Google Query: {location.google_query}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Street: {location.street}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">City: {location.city}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Zip Code: {location.zip_code}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">State: {location.state}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Longitude: {location.longitude}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Latitude: {location.latitude}</Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
};

export default LocationDetail;
