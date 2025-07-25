import React, { useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import FilterForm from './components/FilterForm';
import ListDataGrid from './components/ListDataGrid';
import { useDispatch } from 'react-redux';
import { clearFilters, getLoad, syncData, setFilters } from '../../store/loadSlice';
import SyncButton from './components/syncbutton';
import dayjs from 'dayjs';


const Dashboard = () => {
  const dispatch = useDispatch();
  const handleClearFilters = () => { 
    dispatch(clearFilters());
    dispatch(getLoad({ filters:{}}));
  };
  const handleFilterSubmit = (filters) => {
    const formattedData = {
      ...filters,
      planned_start_time: filters.planned_start_time 
        ? dayjs(filters.planned_start_time).format('YYYY-MM-DD HH:mm:ss')
        : null,
      planned_end_time: filters.planned_end_time 
        ? dayjs(filters.planned_end_time).format('YYYY-MM-DD HH:mm:ss')
        : null
    };
    console.log(formattedData);
    dispatch(getLoad({ filters: formattedData }));
    dispatch(setFilters(formattedData))
    
  };
 

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box >
     
        <Grid container spacing={3}>
          <Grid  item xs={12}>
          <Typography marginBottom={3} variant="h2" gutterBottom>
                Load List
              </Typography>
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
