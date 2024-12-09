import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Box, Button, MenuItem, FormControl, InputLabel, Select, Typography } from '@mui/material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';

const validationSchema = Yup.object({
  customerLoadNumber: Yup.string().required('Required'),
  customerBroker: Yup.string().required('Required'),
  expectedDispatcher: Yup.string().required('Required'),
  trailerType: Yup.string().required('Required'),
  freightAmount: Yup.number().required('Required').positive('Must be positive'),
  cpm: Yup.number().required('Required').positive('Must be positive'),
  deliveryIds: Yup.string().required('Required'),
  expectedVehicle: Yup.string().required('Required'),
});

const LoadForm = () => {
  const formik = useFormik({
    initialValues: {
      customerLoadNumber: '',
      customerBroker: '',
      expectedDispatcher: '',
      trailerType: '',
      freightAmount: '',
      cpm: '',
      deliveryIds: '',
      expectedVehicle: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Typography marginBottom={3} variant="h2" gutterBottom> Create Load  </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="customerLoadNumber"
            name="customerLoadNumber"
            label="Customer Load Number"
            value={formik.values.customerLoadNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.customerLoadNumber && Boolean(formik.errors.customerLoadNumber)}
            helperText={formik.touched.customerLoadNumber && formik.errors.customerLoadNumber}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="customerBroker-label">Customer / Broker</InputLabel>
            <Select
              labelId="customerBroker-label"
              id="customerBroker"
              name="customerBroker"
              value={formik.values.customerBroker}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.customerBroker && Boolean(formik.errors.customerBroker)}
              label="Customer / Broker"
              
            >
              <MenuItem value="Broker1">Broker 1</MenuItem>
              <MenuItem value="Broker2">Broker 2</MenuItem>
              <MenuItem value="Broker3">Broker 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="expectedDispatcher"
            name="expectedDispatcher"
            label="Expected Dispatcher"
            value={formik.values.expectedDispatcher}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.expectedDispatcher && Boolean(formik.errors.expectedDispatcher)}
            helperText={formik.touched.expectedDispatcher && formik.errors.expectedDispatcher}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="trailerType-label">Trailer Type</InputLabel>
            <Select
              labelId="trailerType-label"
              id="trailerType"
              name="trailerType"
              value={formik.values.trailerType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.trailerType && Boolean(formik.errors.trailerType)}
              label="Trailer Type"
              
            >
              <MenuItem value="Reefer">Reefer</MenuItem>
              <MenuItem value="Dry Van">Dry Van</MenuItem>
              <MenuItem value="Flatbed">Flatbed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="freightAmount"
            name="freightAmount"
            label="Freight Amount"
            type="number"
            value={formik.values.freightAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.freightAmount && Boolean(formik.errors.freightAmount)}
            helperText={formik.touched.freightAmount && formik.errors.freightAmount}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="cpm"
            name="cpm"
            label="CPM"
            type="number"
            value={formik.values.cpm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cpm && Boolean(formik.errors.cpm)}
            helperText={formik.touched.cpm && formik.errors.cpm}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="deliveryIds-label">Delivery IDs</InputLabel>
            <Select
              labelId="deliveryIds-label"
              id="deliveryIds"
              name="deliveryIds"
              value={formik.values.deliveryIds}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.deliveryIds && Boolean(formik.errors.deliveryIds)}
              label="Delivery IDs"
            >
              <MenuItem value="ID1">ID 1</MenuItem>
              <MenuItem value="ID2">ID 2</MenuItem>
              <MenuItem value="ID3">ID 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="expectedVehicle"
            name="expectedVehicle"
            label="Expected Vehicle"
            value={formik.values.expectedVehicle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.expectedVehicle && Boolean(formik.errors.expectedVehicle)}
            helperText={formik.touched.expectedVehicle && formik.errors.expectedVehicle}
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

export default LoadForm;
