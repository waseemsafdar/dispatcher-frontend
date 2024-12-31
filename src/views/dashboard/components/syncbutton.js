import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';  // Import your syncData action
import { syncData } from '../../../store/loadSlice';
import { toast } from 'react-toastify';

const SyncButton = ({ url }) => {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const handleSyncClick = () => {
    setIsDisabled(true);
    dispatch(syncData({url}))
      .unwrap()
      .then(() => {
        toast.success('Data synced successfully!');
    setIsDisabled(false);

      })
      .catch((err) => {
        toast.error('Failed to sync data: ' + err.message);
      });
  };
  

  return (
    <Grid item xs={3} marginTop={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button disabled={isDisabled} color="primary" variant="contained" onClick={handleSyncClick}>
        Sync Data
      </Button>
    </Grid>
  );
};

export default SyncButton;
