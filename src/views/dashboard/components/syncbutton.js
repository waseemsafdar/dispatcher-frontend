import React from 'react';
import { Button, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';  // Import your syncData action
import { syncData } from '../../../store/loadSlice';

const SyncButton = ({ url }) => {
  const dispatch = useDispatch();

  const handleSyncClick = () => {
    // Dispatch the action with the passed URL as an argument
    dispatch(syncData(url)); // Pass the URL to the syncData action
  };

  return (
    <Grid item xs={3} marginTop={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button color="primary" variant="contained" onClick={handleSyncClick}>
        Sync Load Data
      </Button>
    </Grid>
  );
};

export default SyncButton;
