import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Box, Button, MenuItem, FormControl, InputLabel, Select, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import DeliveryFormRow from './DeliveryForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPartner, fetchTrailer } from '../../store/partnerSlice';
import { resetStatus, saveLoad } from '../../store/loadSlice';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  customer_load: Yup.string().required('Required'),
  partner_id: Yup.string().required('Required'),
  expected_dispatcher: Yup.string().required('Required'),
  trailerType: Yup.array().min(1, 'At least one trailer type is required').required('Required'), // Validate as an array
  freight_amount: Yup.number().required('Required').positive('Must be positive'),
  cpm: Yup.number().required('Required').positive('Must be positive'),
  expected_vehicle: Yup.string().required('Required'),
});

const LoadForm = () => {
  const dispatch = useDispatch();
  const {tarilerData, partnerData, status, error } = useSelector((state) => state.partners);

  useEffect(() => { 
   
      dispatch(fetchPartner()); 
      dispatch(fetchTrailer()); 

     
  }, [dispatch]);

  const [deliveryForms, setDeliveryForms] = useState([{ id: 1, data: {} }]);
  const addDeliveryRow = () => setDeliveryForms([...deliveryForms, { id: deliveryForms.length + 1, data: {} }]);
  const deleteDeliveryRow = (id) => setDeliveryForms(deliveryForms.filter(form => form.id !== id));
  
  const handleFormChange = (id, updatedData) => {
    setDeliveryForms(deliveryForms.map(form => (form.id === id ? { ...form, data: updatedData } : form)));
  };
  
  const formik = useFormik({
    initialValues: {
      customer_load: '',
      partner_id: '',
      expected_dispatcher: '',
      trailerType: [],
      freight_amount: '',
      cpm: '',
      expected_vehicle: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const loadData = { ...values, delivery_info: deliveryForms.map(form => form.data), };
      console.log('Load Form Data:', loadData);
      dispatch(saveLoad(loadData))
      .unwrap().then(() => { 
        toast('Load saved successfully'); 
        formik.resetForm();
        setDeliveryForms([{ id: 1, data: {} }]); 
        dispatch(resetStatus()); })
        .catch((err) => { 
          toast('Failed to save load', err); 
          dispatch(resetStatus()); 
        });
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Typography marginBottom={3} variant="h2" gutterBottom> Create Load </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="customer_load"
            name="customer_load"
            label="Customer Load Number"
            value={formik.values.customer_load}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.customer_load && Boolean(formik.errors.customer_load)}
            helperText={formik.touched.customer_load && formik.errors.customer_load}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="partner_id-label">Customer / Broker</InputLabel>
            <Select
              labelId="partner_id-label"
              id="partner_id"
              name="partner_id"
              value={formik.values.partner_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.partner_id && Boolean(formik.errors.partner_id)}
              label="Customer / Broker"
            >
              {partnerData?.map((partner) => (
                <MenuItem key={partner.id} value={partner.id}>{partner.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="expected_dispatcher"
            name="expected_dispatcher"
            label="Expected Dispatcher"
            value={formik.values.expected_dispatcher}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.expected_dispatcher && Boolean(formik.errors.expected_dispatcher)}
            helperText={formik.touched.expected_dispatcher && formik.errors.expected_dispatcher}
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
    multiple  // Enable multi-select
  >
    {tarilerData?.map((trailer) => (
      <MenuItem key={trailer.id} value={trailer.id}>{trailer.type}</MenuItem>
    ))}
  </Select>
</FormControl>

        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="freight_amount"
            name="freight_amount"
            label="Freight Amount"
            type="number"
            value={formik.values.freight_amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.freight_amount && Boolean(formik.errors.freight_amount)}
            helperText={formik.touched.freight_amount && formik.errors.freight_amount}
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
          <CustomTextField
            id="expected_vehicle"
            name="expected_vehicle"
            label="Expected Vehicle"
            value={formik.values.expected_vehicle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.expected_vehicle && Boolean(formik.errors.expected_vehicle)}
            helperText={formik.touched.expected_vehicle && formik.errors.expected_vehicle}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={addDeliveryRow}>
            Add Stops
          </Button>
        </Grid>
      </Grid>
       <Grid item xs={12} sm={12} marginTop={3}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Action</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {deliveryForms.map((form) => (
              <DeliveryFormRow
                key={form.id}
                formData={form.data}
                onChange={updatedData => handleFormChange(form.id, updatedData)}
                onDelete={() => deleteDeliveryRow(form.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
     
      <Grid container spacing={3}>
        
        <Grid item xs={3} marginTop={3}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Save Load
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoadForm;
