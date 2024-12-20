import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchPartnerById } from '../../store/partnerSlice'; // Assuming you have this action
import { Typography, Box, Grid, Paper } from '@mui/material';
import SyncButton from '../dashboard/components/syncbutton';

const PartnerDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { partnerData, status, error } = useSelector((state) => state.partners);

  useEffect(() => {
    if (id) {
      dispatch(fetchPartnerById(id));
    }
  }, [dispatch, id]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <Paper>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Partner Details
        </Typography>
    
        {partnerData && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Name: {partnerData.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">City: {partnerData.city}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Street: {partnerData.street}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">ZIP Code: {partnerData.zip_code}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">State: {partnerData.state}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">MIC Number: {partnerData.mic_number}</Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
};

export default PartnerDetail;
