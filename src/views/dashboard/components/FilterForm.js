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
    }
  });

  useEffect(() => {
    if (isClearFilter) {
      reset();
    
    }
  }, [isClearFilter]);

  const customerLoadValue = watch('customer_load');
  const trailerTypeValue = watch('trailer_type');
  const partnerIdValue = watch('partner_id');
  const isarchivedValue = watch('is_archived');

  

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
