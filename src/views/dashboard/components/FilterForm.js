import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Box
} from '@mui/material';

const FilterForm = ({ onSubmit, onClear }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      equipmentType: 'reefer', // Set default value
      loadType: 'ftl',         // Set default value
      origin: '',
      deadheadOrigin: '',
      destination: '',
      deadheadDestination: '',
      temp: '',
      lengthFeet: '',
      weightLbs: '',
      pickupFrom: '',
      deliveryTo: ''
    }
  });

  return (
    <Box mt={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="origin"
            label="Origin"
            variant="outlined"
            {...register('origin')}
            placeholder="Enter origin"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="deadheadOrigin"
            label="Deadhead Origin (Miles)"
            type="number"
            variant="outlined"
            {...register('deadheadOrigin')}
            placeholder="Enter miles"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="destination"
            label="Destination"
            variant="outlined"
            {...register('destination')}
            placeholder="Enter destination"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="deadheadDestination"
            label="Deadhead Destination (Miles)"
            type="number"
            variant="outlined"
            {...register('deadheadDestination')}
            placeholder="Enter miles"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="equipmentType-label">Equipment Type</InputLabel>
            <Select
              labelId="equipmentType-label"
              id="equipmentType"
              {...register('equipmentType')}
              label="Equipment Type"
            >
              <MenuItem value="reefer">Reefer</MenuItem>
              <MenuItem value="dry-van">Dry Van</MenuItem>
              <MenuItem value="flatbed">Flatbed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="loadType-label">Load Type</InputLabel>
            <Select
              labelId="loadType-label"
              id="loadType"
              {...register('loadType')}
              label="Load Type"
            >
              <MenuItem value="ftl">FTL</MenuItem>
              <MenuItem value="ltl">LTL</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="temp"
            label="Temp"
            variant="outlined"
            {...register('temp')}
            placeholder="Temp"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="lengthFeet"
            label="Length (Ft)"
            type="number"
            variant="outlined"
            {...register('lengthFeet')}
            placeholder="Length"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="weightLbs"
            label="Weight (Lbs)"
            type="number"
            variant="outlined"
            {...register('weightLbs')}
            placeholder="Weight"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="pickupFrom"
            label="Pickup From"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register('pickupFrom')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="deliveryTo"
            label="Delivery To"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register('deliveryTo')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button variant="contained" type="submit" color="primary" fullWidth>
            Apply Filters
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button 
            variant="outlined" 
            color="secondary" 
            fullWidth
            onClick={() => {
              reset();
              onClear();
            }}
          >
            Clear Filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterForm;
