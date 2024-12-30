import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField, MenuItem, Select, InputLabel, FormControl, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPartner, fetchTrailer } from '../../../store/partnerSlice';

const FilterForm = ({ onSubmit, onClear }) => {
  const dispatch = useDispatch();
  const { tarilerData, partnerData } = useSelector((state) => state.partners);
  const { isClearFilter } = useSelector((state) => state.load);

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
      delivery_start_time: '',
      delivery_end_time: '',
      delivery_type: '',
      city: '',
      state: '',
      zip_code: '',
    },
  });

  useEffect(() => {
    if (isClearFilter) {
      reset();
    }
  }, [isClearFilter]);

  const deliveryTypeOptions = [
    { value: 'Delivery', label: 'Delivery' },
    { value: 'Pickup', label: 'Pickup' },
  ];

  return (
    <Box mt={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {/* Existing Filters */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="customer_load"
            label="Customer Load"
            variant="outlined"
            {...register('customer_load')}
            placeholder="Customer Load"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="trailer-label">Trailer Type</InputLabel>
            <Select
              labelId="trailerType-label"
              id="trailer_type"
              {...register('trailer_type')}
              onChange={(e) => setValue('trailer_type', e.target.value)}
              label="Trailer Type"
            >
              {tarilerData?.map((trailer) => (
                <MenuItem key={trailer.id} value={trailer.id}>
                  {trailer.type}
                </MenuItem>
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
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="partner-label">Partner</InputLabel>
            <Select
              labelId="partner-label"
              id="partner_id"
              {...register('partner_id')}
              onChange={(e) => setValue('partner_id', e.target.value)}
              label="Partner"
            >
              {partnerData?.map((partner) => (
                <MenuItem key={partner.id} value={partner.id}>
                  {partner.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* New Filters */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="expected_dispatcher"
            label="Expected Dispatcher"
            variant="outlined"
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
            {...register('expected_vehicle')}
            placeholder="Expected Vehicle"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="delivery_date"
            label="Delivery Date"
            type="date"
            variant="outlined"
            {...register('delivery_date')}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="delivery_start_time"
            label="Delivery Start Time"
            type="time"
            variant="outlined"
            {...register('delivery_start_time')}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="delivery_end_time"
            label="Delivery End Time"
            type="time"
            variant="outlined"
            {...register('delivery_end_time')}
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
            id="city"
            label="City"
            variant="outlined"
            {...register('city')}
            placeholder="City"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="state"
            label="State"
            variant="outlined"
            {...register('state')}
            placeholder="State"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="zip_code"
            label="Zip Code"
            variant="outlined"
            {...register('zip_code')}
            placeholder="Zip Code"
            fullWidth
          />
        </Grid>

        {/* Submit and Clear Buttons */}
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
