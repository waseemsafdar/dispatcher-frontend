import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchUserById } from '../../store/usersSlice'; // Assuming you have this action
import { Typography, Box, Grid, Paper } from '@mui/material';

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <Paper>
      <Box p={3}>
        <Typography marginBottom={3} variant="h4" gutterBottom>
          User Details
        </Typography>
        {/* <SyncButton url={`syncuser/${id}`} /> */}

        {user && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Name: {user.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Username: {user.username}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Email: {user.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">User Role: {user.user_role}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Dispatcher: {user.is_dispatcher ? 'Yes' : 'No'}</Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
};

export default UserDetail;