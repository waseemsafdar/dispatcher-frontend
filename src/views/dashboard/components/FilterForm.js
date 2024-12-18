import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchPartner, fetchTrailer } from '../../../store/partnerSlice';

const FilterForm = ({ onSubmit, onClear }) => {
  const dispatch = useDispatch();
  const {tarilerData, partnerData, status, error } = useSelector((state) => state.partners);

  useEffect(() => { 
        dispatch(fetchPartner()); 
        dispatch(fetchTrailer()); 
    }, [dispatch]);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      search:'',

    }
  });

  return (
    <Box mt={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>        
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            {...register('Search')}
            placeholder="Search.."
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="trailer-label">Trailer Type</InputLabel>
            <Select
              labelId="trailerType-label"
              id="trailerType"
              {...register('trailerType')}
              label="Trailer Type"
            >
              {tarilerData?.map((trailer) => (
                    <MenuItem key={trailer.id} value={trailer.id}>{trailer.type}</MenuItem>
                  ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="partner-label">Partner</InputLabel>
            <Select
              labelId="partner-label"
              id="partner"
              {...register('partner')}
              label="Partner"
            >
              {partnerData?.map((partner) => (
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
