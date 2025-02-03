import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { fetchloadById } from '../../../store/loadSlice';
import { Typography, Box, Grid, Paper, Divider, Button, Tabs, Tab } from '@mui/material';
import { setBackFromDetail } from '../../../store/loadSlice';
import RecommendedLoadForm from './RecommendedLoadForm';

const LoadDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loadData, status, error } = useSelector((state) => state.load);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchloadById(id));
    }
  }, [dispatch, id]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  const handleClick = () => {
    dispatch(setBackFromDetail(true));
    navigate('/dashboard');
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Paper>
      <Box p={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          sx={{ marginBottom: '20px', textDecoration: 'none' }}
        >
          Back
        </Button>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Load Tabs">
          <Tab label="Load Details" />
          <Tab label="Recommend Load" />
        </Tabs>
        {tabIndex === 0 && (
          <Box mt={3}>
            <Typography marginBottom={3} variant="h4" gutterBottom>
              Load Details
            </Typography>
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
                    <Typography variant="h6">Planned Dispatcher: {loadData?.expected_dispatcher}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Planned Vehicle: {loadData?.expected_vehicle}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Pickup State: {loadData?.pickup_state}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Origin (Pickup City): {loadData?.pickup_city}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Delivery State: {loadData?.delivery_state}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Destination (Delivery City): {loadData?.delivery_city}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Planned Start Time: {loadData?.planned_start_time}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Planned End Time: {loadData?.planned_end_time}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Partner: {loadData?.partner?.name}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Trailer Type: {loadData?.trailer_type.map(type => type.type).join(', ')}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Status: {loadData?.is_archived ? 'Covered' : 'Open'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Load Type: {loadData?.load_type}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Temperature: {loadData?.temperature}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Weight (lbs): {loadData?.weight}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Length (Feet): {loadData?.length}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Comments: {loadData?.load_comments}</Typography>
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
                        <Typography variant="body1">Type: {delivery?.type}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">Date: {delivery?.delivery_date}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">Start Time: {delivery?.delivery_start_time}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">End Time: {delivery?.delivery_end_time}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">Location: {delivery?.location_id}</Typography>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))}
              </>
            )}
          </Box>
        )}
        {tabIndex === 1 && (
          <Box mt={3}>
            <Typography variant="h4" gutterBottom>
              Recommend Load
            </Typography>
            <RecommendedLoadForm load_id={id}/>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default LoadDetail;