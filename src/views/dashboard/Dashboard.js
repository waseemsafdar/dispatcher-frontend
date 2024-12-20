import React, { useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import FilterForm from './components/FilterForm';
import ListDataGrid from './components/ListDataGrid';
import { useDispatch } from 'react-redux';
import { clearFilters, getLoad, syncData } from '../../store/loadSlice';
import SyncButton from './components/syncbutton';


const Dashboard = () => {
  const dispatch = useDispatch();
  const handleClearFilters = () => { 
    dispatch(clearFilters());
    dispatch(getLoad());
  };
  const handleFilterSubmit = (filters) => {
    console.log(filters);
    dispatch(getLoad(filters));
  };
  const handleSyncClick = () => {
    // Dispatch the action when the button is clicked
    dispatch(syncData('sycnhere')); // Dispatch sync action
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={1}>
      <Typography marginBottom={3} variant="h2" gutterBottom>
                Load List
              </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FilterForm onSubmit={handleFilterSubmit} onClear={handleClearFilters}/>
          </Grid>
          <Grid item xs={12}>
            <ListDataGrid  />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
