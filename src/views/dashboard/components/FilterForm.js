import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Grid, TextField, MenuItem, Select, InputLabel, FormControl, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrailer } from '../../../store/partnerSlice';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const FilterForm = ({ onSubmit, onClear }) => {
  const dispatch = useDispatch();
  const { tarilerData } = useSelector((state) => state.partners);
  const { isClearFilter } = useSelector((state) => state.load);

  useEffect(() => {
    dispatch(fetchTrailer());
  }, [dispatch]);

  const { register, handleSubmit, reset, watch, setValue, control } = useForm({
    defaultValues: {
      pickup_city: '',
      delivery_city: '',
      trailer_type: '',
      load_type: '',
      temperature: '',
      weight: '',
      length: '',
      planned_start_time: null,
      planned_end_time: null,
    }
  });

  useEffect(() => {
    if (isClearFilter) {
      reset();
    }
  }, [isClearFilter]);

  const pickupCity = watch('pickup_city');
  const deliveryCity = watch('delivery_city');
  const trailerTypeValue = watch('trailer_type');
  const loadType = watch('load_type');
  const temperature = watch('temperature');
  const weight = watch('weight');
  const length = watch('length');
  const plannedStartTime = watch('planned_start_time');
  const plannedEndTime = watch('planned_end_time');

  return (
    <Box mt={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              id="pickup_city"
              label="Origin"
              variant="outlined"
              value={pickupCity}
              {...register('pickup_city')}
              placeholder="Origin"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              id="delivery_city"
              label="Destination"
              variant="outlined"
              value={deliveryCity}
              {...register('delivery_city')}
              placeholder="Destination"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="trailer-label">Equipment</InputLabel>
              <Select
                labelId="trailerType-label"
                id="trailer_type"
                value={trailerTypeValue}
                {...register('trailer_type')}
                onChange={(e) => setValue('trailer_type', e.target.value)}
                label="Equipment"
              >
                {tarilerData && tarilerData.map((trailer) => (
                  <MenuItem key={trailer.id} value={trailer.id}>{trailer.type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              id="load_type"
              label="Load Type"
              variant="outlined"
              value={loadType}
              {...register('load_type')}
              placeholder="Load Type"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              id="temperature"
              label="Temp"
              variant="outlined"
              type="number"
              value={temperature}
              {...register('temperature')}
              placeholder="Temperature"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              id="weight"
              label="Weight (lbs)"
              variant="outlined"
              type="number"
              value={weight}
              {...register('weight')}
              placeholder="Weight"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              id="length"
              label="Length (Ft)"
              variant="outlined"
              type="number"
              value={length}
              {...register('length')}
              placeholder="Length"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="planned_start_time"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    {...field}
                    label="Planned Start"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined"
                      }
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="planned_end_time"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    {...field}
                    label="Planned End"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined"
                      }
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button variant="contained" type="submit" color="primary" fullWidth>
              Apply Filters
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
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
        
      </Grid>
    </Box>
  );
};

export default FilterForm;