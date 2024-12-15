// src/components/LocationForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Button, Typography, TextField } from '@mui/material';
import { saveLocation } from '../../store/locationsSlice';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  google_query: Yup.string().required('Required'),
  street: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  zip_code: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  longitude: Yup.string().required('Required'),
  latitude: Yup.string().required('Required'),
});

const LocationForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.locations);

  const formik = useFormik({
    initialValues: {
      google_query: '',
      street: '',
      city: '',
      zip_code: '',
      state: '',
      longitude: '',
      latitude: '',
    },
    validationSchema,
    onSubmit: (values) => {
        dispatch(saveLocation(values)).unwrap().then(() => { 
            formik.resetForm();
            toast.success('Location saved successfully!'); 
        }).catch((err) => { 
            toast.error('Failed to save location'); 
            }); 
        }, 
    });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Typography marginBottom={3} variant="h2" gutterBottom>
        Location Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="google_query"
            name="google_query"
            label="Address"
            value={formik.values.google_query}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.google_query && Boolean(formik.errors.google_query)}
            helperText={formik.touched.google_query && formik.errors.google_query}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="street"
            name="street"
            label="Street"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.street && Boolean(formik.errors.street)}
            helperText={formik.touched.street && formik.errors.street}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="city"
            name="city"
            label="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="zip_code"
            name="zip_code"
            label="Zip"
            value={formik.values.zip_code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.zip_code && Boolean(formik.errors.zip_code)}
            helperText={formik.touched.zip_code && formik.errors.zip_code}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="state"
            name="state"
            label="State"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="longitude"
            name="longitude"
            label="Longitude"
            value={formik.values.longitude}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.longitude && Boolean(formik.errors.longitude)}
            helperText={formik.touched.longitude && formik.errors.longitude}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="latitude"
            name="latitude"
            label="Latitude"
            value={formik.values.latitude}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.latitude && Boolean(formik.errors.latitude)}
            helperText={formik.touched.latitude && formik.errors.latitude}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LocationForm;
