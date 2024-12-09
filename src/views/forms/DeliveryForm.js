import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Box, Button, MenuItem, FormControl, InputLabel, Select, Typography } from '@mui/material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';

const validationSchema = Yup.object({
  type: Yup.string().required('Required'),
  deliveryDate: Yup.date().required('Required'),
  deliveryStartTime: Yup.string().required('Required'),
  deliveryEndTime: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
});

const DeliveryForm = () => {
  const formik = useFormik({
    initialValues: {
      type: '',
      deliveryDate: '',
      deliveryStartTime: '',
      deliveryEndTime: '',
      location: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Typography marginBottom={3} variant="h2" gutterBottom>
        Add Delivery Information 
      </Typography>
      <Grid container spacing={3}>
      
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="type-label">Type Selection</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.type && Boolean(formik.errors.type)}
              label="Type Selection"
            >
              <MenuItem value="Type1">Type 1</MenuItem>
              <MenuItem value="Type2">Type 2</MenuItem>
              <MenuItem value="Type3">Type 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="deliveryDate"
            name="deliveryDate"
            label="Delivery Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.deliveryDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.deliveryDate && Boolean(formik.errors.deliveryDate)}
            helperText={formik.touched.deliveryDate && formik.errors.deliveryDate}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="deliveryStartTime"
            name="deliveryStartTime"
            label="Delivery Start Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={formik.values.deliveryStartTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.deliveryStartTime && Boolean(formik.errors.deliveryStartTime)}
            helperText={formik.touched.deliveryStartTime && formik.errors.deliveryStartTime}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="deliveryEndTime"
            name="deliveryEndTime"
            label="Delivery End Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={formik.values.deliveryEndTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.deliveryEndTime && Boolean(formik.errors.deliveryEndTime)}
            helperText={formik.touched.deliveryEndTime && formik.errors.deliveryEndTime}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="location-label">Location Selection</InputLabel>
            <Select
              labelId="location-label"
              id="location"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              label="Location Selection"
            >
              <MenuItem value="Location1">Location 1</MenuItem>
              <MenuItem value="Location2">Location 2</MenuItem>
              <MenuItem value="Location3">Location 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
      </Grid>
      <Grid container xs={12}>
        <Grid marginTop={3} item xs={3}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Save
          </Button>
        </Grid>
        </Grid>
    </Box>
  );
};

export default DeliveryForm;
