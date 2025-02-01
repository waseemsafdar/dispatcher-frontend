// RadiusSearchForm.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box } from '@mui/material';
import { Slider } from '@mui/material';

const RadiusSearchForm = ({ open, onClose, onSubmit }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      pickup_radius: 0,
      delivery_radius: 0,
      radius_city: '',
    },
  });

  return (
    <Dialog
    maxWidth="md" // Adjust this value to your desired width ('xs', 'sm', 'md', 'lg', 'xl')
      fullWidth
    open={open} onClose={onClose}>
      <DialogTitle>Search by Radius</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} display="grid" gap={2} mt={2}>
          <TextField
            id="radius_city"
            label="City"
            variant="outlined"
            {...register('radius_city')}
            fullWidth
          />
          <Controller
            name="pickup_radius"
            control={control}
            render={({ field }) => (
              <Box>
                <label>Pickup Radius</label>
                <Slider
                  {...field}
                  valueLabelDisplay="auto"
                  step={0.1}
                  min={0}
                  max={1000}
                />
              </Box>
            )}
          />
          <Controller
            name="delivery_radius"
            control={control}
            render={({ field }) => (
              <Box>
                <label>Delivery Radius</label>
                <Slider
                  {...field}
                  valueLabelDisplay="auto"
                  step={0.1}
                  min={0}
                  max={1000}
                />
              </Box>
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RadiusSearchForm;