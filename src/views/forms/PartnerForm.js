import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Box, Button, Typography } from '@mui/material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  street: Yup.string().required('Required'),
  zip: Yup.string().required('Required').matches(/^\d{5}$/, 'Must be exactly 5 digits'),
  state: Yup.string().required('Required'),
  mcNumber: Yup.string().required('Required'),
});

const PartnerForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      city: '',
      street: '',
      zip: '',
      state: '',
      mcNumber: '',
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
        Add partner
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
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
        <Grid item xs={12} sm={6}>
          <CustomTextField
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
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="zip"
            name="zip"
            label="Zip"
            value={formik.values.zip}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.zip && Boolean(formik.errors.zip)}
            helperText={formik.touched.zip && formik.errors.zip}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
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
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="mcNumber"
            name="mcNumber"
            label="MC Number"
            value={formik.values.mcNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mcNumber && Boolean(formik.errors.mcNumber)}
            helperText={formik.touched.mcNumber && formik.errors.mcNumber}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PartnerForm;
