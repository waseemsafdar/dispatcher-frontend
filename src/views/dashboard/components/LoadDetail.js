import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchloadById } from '../../../store/loadSlice';
import { Typography, Box, Grid, Paper, Divider } from '@mui/material';
import SyncButton from './syncbutton';

const LoadDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loadData, status, error } = useSelector((state) => state.load);

  useEffect(() => {
    if (id) {
      dispatch(fetchloadById(id));
    }
  }, [dispatch, id]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <Paper>
      <Box p={3}>
        <Typography marginBottom={3} variant="h4" gutterBottom>
          Load Details
        </Typography>
                      {/* <SyncButton url={`syncload/${id}`} /> */}
        
        {loadData && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Customer Load: {loadData?.customer_load}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">CPM: {loadData?.cpm}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Freight Amount: {loadData?.freight_amount}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Expected Dispatcher: {loadData?.expected_dispatcher}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Expected Vehicle: {loadData?.pickup_city}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Expected Vehicle: {loadData?.pickup_state}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>

                <Typography variant="h6">Expected Vehicle: {loadData?.delivery_city}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Expected Vehicle: {loadData?.delivery_state}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Expected Vehicle: {loadData?.planned_start_time}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Expected Vehicle: {loadData?.planned_end_time}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Partner: {loadData?.partner?.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Trailer Type: {loadData?.trailer_type.map(type => type.type).join(', ')}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Status: {loadData?.is_archived ? 'InActive' : 'Active'}</Typography>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography marginBottom={3} variant="h5" gutterBottom>
              Deliveries
            </Typography>
            {loadData?.delivery_ids?.map((delivery, index) => (
              <Box key={index} mb={2}>
                <Typography marginBottom={3} variant="h6">Delivery # {index + 1}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">Type: {delivery.type}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">Date: {delivery.delivery_date}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">Start Time: {delivery.delivery_start_time}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">End Time: {delivery.delivery_end_time}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">Location ID: {delivery.location_id}</Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}
          </>
        )}
      </Box>
    </Paper>
  );
};

export default LoadDetail;
