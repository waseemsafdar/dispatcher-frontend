import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField, MenuItem, Select, InputLabel, FormControl, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPartner, fetchTrailer } from '../../../store/partnerSlice';


const FilterForm = ({ onSubmit, onClear }) => {
  const dispatch = useDispatch();
  const { tarilerData, partnerData } = useSelector((state) => state.partners);
  const { isClearFilter } = useSelector((state) => state.load);
  const deliveryTypeOptions = [
    { value: 'Delivery', label: 'Delivery' },
    { value: 'Pickup', label: 'Pickup' },
  ];
  useEffect(() => {
    dispatch(fetchPartner());
    dispatch(fetchTrailer());
  }, [dispatch]);

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      customer_load: '',
      trailer_type: '',
      partner_id: '',
      is_archived: '',
      expected_dispatcher: '',
      expected_vehicle: '',
      delivery_date: '',
      planned_start_time: '',
      planned_end_time: '',
      delivery_type: '',
      city: '',
      state: '',
      zip_code: '',
      pickup_city: '',
      pickup_state: '',
      delivery_city: '',
      delivery_state: '',
    }
  });

  useEffect(() => {
    if (isClearFilter) {
      reset();
    
    }
  }, [isClearFilter]);

  const customerLoadValue = watch('customer_load');
  const expectedDispatcher = watch('expected_dispatcher');
  const expectedVehicle = watch('expected_vehicle');
  const deliveryDate = watch('delivery_date');
  const plannedStartTime = watch('planned_start_time');
  const plannedEndTime = watch('planned_end_time');
  const deliveryType = watch('delivery_type');
  const trailerTypeValue = watch('trailer_type');
  const isarchivedValue = watch('is_archived');

  const partnerIdValue = watch('partner_id');
  const pickupCity = watch('pickup_city');
  const pickupState = watch('pickup_state');

  const deliveryCity = watch('delivery_city');
  const deliveryState = watch('delivery_state');


  

  return (
    <Box mt={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="customer_load"
            label="Customer Load"
            variant="outlined"
            value={customerLoadValue}
            {...register('customer_load')}
            placeholder="Customer Load"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="expected_dispatcher"
            label="Expected Dispatcher"
            variant="outlined"
            value={expectedDispatcher}
            {...register('expected_dispatcher')}
            placeholder="Expected Dispatcher"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="expected_vehicle"
            label="Expected Vehicle"
            variant="outlined"
            value={expectedVehicle}
            {...register('expected_vehicle')}
            placeholder="Expected Vehicle"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="pickup_city"
            label="Pickup City"
            variant="outlined"
            value={pickupCity}
            {...register('pickup_city')}
            placeholder="Pickup City"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="pickup_state"
            label="Pickup State"
            variant="outlined"
            value={pickupState}
            {...register('pickup_state')}
            placeholder="Pickup State"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="delivery_city"
            label="delivery City"
            variant="outlined"
            value={deliveryCity}
            {...register('delivery_city')}
            placeholder="delivery City"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="delivery_state"
            label="delivery State"
            variant="outlined"
            value={deliveryState}
            {...register('delivery_state')}
            placeholder="delivery State"
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          
          <TextField
            id="delivery_date"
            label="Delivery Date"
            type="date"
            variant="outlined"
            value={deliveryDate}
            {...register('delivery_date')}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="planned_start_time"
            label="planned Start Time"
            variant="outlined"
            type="time"
            value={plannedStartTime}
            {...register('planned_start_time')}
            placeholder="planned Start Time"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="deliveryType-label">Delivery Type</InputLabel>
            <Select
              labelId="deliveryType-label"
              id="delivery_type"
            value={deliveryType}
              {...register('delivery_type')}
              label="Delivery Type"
            >
              {deliveryTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="planned_end_time"
            label="planned End Time"
            variant="outlined"
            type="time"
            value={plannedEndTime}
            {...register('planned_end_time')}
            placeholder="planned End Time"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="trailer-label">Trailer Type</InputLabel>
            <Select
              labelId="trailerType-label"
              id="trailer_type"
              value={trailerTypeValue}
              {...register('trailer_type')}
              onChange={(e) => setValue('trailer_type', e.target.value)}
              label="Trailer Type"
            >
              {tarilerData && tarilerData?.map((trailer) => (
                <MenuItem key={trailer.id} value={trailer.id}>{trailer.type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <FormControl variant="outlined" fullWidth>
  <InputLabel id="status-label">Status</InputLabel>
  <Select
    labelId="status-label"
    id="is_archived"
    {...register('is_archived')}
    label="Status"
    value={isarchivedValue}

  >
    <MenuItem value={false}>Active</MenuItem>
    <MenuItem value={true}>Inactive</MenuItem>
  </Select>
</FormControl>

        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="partner-label">Partner</InputLabel>
            <Select
              labelId="partner-label"
              id="partner_id"
              value={partnerIdValue}
              {...register('partner_id')}
              onChange={(e) => setValue('partner_id', e.target.value)}
              label="Partner"
            >
              {Array.isArray(partnerData) && partnerData.map((partner) => (
  <MenuItem key={partner.id} value={partner.id}>{partner.name}</MenuItem>
))}

            </Select>
          </FormControl>
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
