import React, { useEffect, useState } from 'react';
import { FastField, useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Box, Button, MenuItem, FormControl, InputLabel, Select, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import DeliveryFormRow from './DeliveryForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDispatchers, fetchPartner, fetchTrailer } from '../../store/partnerSlice';
import { fetchloadById, resetStatus, saveLoad, updateLoad , restLoad} from '../../store/loadSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import ConfirmationDialog from '../../components/shared/ConfirmationDialog';
import { Stack } from '@mui/system';

const validationSchema = Yup.object({
  customer_load: Yup.string().required('Required'),
  partner_name: Yup.string(),
  expected_dispatcher: Yup.string().required('Required'),
  trailerType: Yup.array().min(1, 'At least one trailer type is required').required('Required'), // Validate as an array
  freight_amount: Yup.number().required('Required').positive('Must be positive'),
  cpm: Yup.number().required('Required').positive('Must be positive'),
  expected_vehicle: Yup.string().required('Required'),
});

const LoadForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tarilerData, partnerData, dispatchersData } = useSelector((state) => state.partners);
  const { loadData } = useSelector((state) => state.load);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
   

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPartner());
    dispatch(fetchTrailer());
    dispatch(fetchDispatchers());

  }, [dispatch]);

  const handleResetLoad = () => {
    console.log('Resetting load...');
    // Dispatch reset action here
    // dispatch(resetStatus());
    dispatch(restLoad({id}))
    .unwrap().then(() => {
      formik.resetForm();
      toast.success('Updated successfully!');
      navigate('/dashboard');
    }).catch((err) => {
      toast.error('Failed to update');
    });
    setResetDialogOpen(false)
  }
  useEffect(() => {
    if (id) {
      dispatch(fetchloadById(id)).then((action) => {
        const data = action.payload;
        formik.setValues({
          customer_load: data?.customer_load || '',
          partner_id: data?.partner.id || '',
          partner_name: data?.partner.name || '',
          expected_dispatcher: data?.expected_dispatcher || '',
          trailerType: data?.trailer_type.map(t => t.id) || [],
          freight_amount: data?.freight_amount || '',
          cpm: data?.cpm || '',
          expected_vehicle: data?.expected_vehicle || '',
          pickup_city: data?.pickup_city || '',
          pickup_state: data?.pickup_state || '',
          delivery_city: data?.delivery_city || '',
          delivery_state: data?.delivery_state || '',
          planned_start_time: data?.planned_start_time || '',
          planned_end_time: data?.planned_end_time || '',
          load_type: data?.load_type || '',
          temperature: data?.temperature || '',
          weight: data?.weight || '',
          length: data?.length || '',
          load_comments: data?.load_comments || '',
          odoo_load_stage: data?.odoo_load_stage || '',
          owner_operator_rate: data?.owner_operator_rate || 0,
          company_driver_rate: data?.company_driver_rate || 0,


        });
        setDeliveryForms(
          data?.delivery_ids?.map((delivery, index) => ({
            id: index + 1,
            data: delivery,
          }))
        );
      });
    }
  }, [id, dispatch]);

  const handleResetDialogOpen = () => {
    setResetDialogOpen(true);
  };

  // Handle reset dialog close
  const handleResetDialogClose = () => {
    setResetDialogOpen(false);
  };
  const [deliveryForms, setDeliveryForms] = useState([{ id: 1, data: {} }]);
  const addDeliveryRow = () => setDeliveryForms([...deliveryForms, { id: deliveryForms.length + 1, data: {} }]);
  const deleteDeliveryRow = (id) => setDeliveryForms(deliveryForms?.filter(form => form.id !== id));

  const handleFormChange = (id, updatedData) => {
    setDeliveryForms(deliveryForms.map(form => (form.id === id ? { ...form, data: updatedData } : form)));
  };
  console.log('aaaaaa')

  const formik = useFormik({
    initialValues: {
      customer_load: '',
      partner_name: '',
      expected_dispatcher: '',
      trailerType: [],
      freight_amount: '',
      cpm: '',
      expected_vehicle: '',
      pickup_city: '',
      pickup_state: '',
      delivery_city: '',
      delivery_state: '',
      planned_start_time: '',
      planned_end_time: '',
      load_type: '',
      temperature: '',
      weight: '',
      length: '',
      odoo_load_stage: '',
      load_comments: '',
      company_driver_rate: 0,
      owner_operator_rate: 0
    },
    //validationSchema: validationSchema,
    onSubmit: (values) => {
      const loadData = { ...values, delivery_info: deliveryForms?.map(form => form.data) };
      console.log('Load Form Data:', loadData);
      if (id) {
        dispatch(updateLoad({ id, loadData }))
          .unwrap().then(() => {
            formik.resetForm();
            toast.success('Updated successfully!');
            navigate('/dashboard');
          }).catch((err) => {
            toast.error('Failed to update');
          });
      } else {
        dispatch(saveLoad(loadData))
          .unwrap().then(() => {
            toast('Load saved successfully');
            formik.resetForm();
            navigate('/dashboard');
            setDeliveryForms([{ id: 1, data: {} }]);
            dispatch(resetStatus());
          })
          .catch((err) => {
            toast('Failed to save load', err);
            dispatch(resetStatus());
          });
      }
    },
  });

 
  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom={3}>
        <Typography variant="h2" gutterBottom> Update Load </Typography>
        <Button
          variant="contained"  // Change from "outlined" to "contained" for a solid background
          sx={{
            backgroundColor: '#FF8C00', // Use an orange color hex code
            '&:hover': {
              backgroundColor: '#FF7000', // A slightly darker orange for hover state
            }
          }}
          onClick={handleResetDialogOpen}
        >
          Reset Load
        </Button>
      </Stack>
      {/* Reset Load Confirmation Dialog using the reusable component */}
      <ConfirmationDialog
        open={resetDialogOpen}
        onClose={handleResetDialogClose}
        onConfirm={handleResetLoad}
        title="Reset Load Confirmation"
        message="Are you sure you want to reset the dispatcher and truck assigment for this load? This action will make load available for again and can not be undone."
        cancelButtonText="Cancel"
        confirmButtonText="Yes, Reset"
        cancelButtonColor="primary"
        confirmButtonColor="secondary"
      />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="customer_load"
            name="customer_load"
            disabled={true}
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
          <CustomTextField
            id="pickup_state"
            name="pickup_state"
            label="Pickup State"
            disabled={true}
            value={formik.values.pickup_state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickup_state && Boolean(formik.errors.pickup_state)}
            helperText={formik.touched.pickup_state && formik.errors.pickup_state}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="pickup_city"
            name="pickup_city"
            label="Origin (Pickup City)"
            value={formik.values.pickup_city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickup_city && Boolean(formik.errors.pickup_city)}
            helperText={formik.touched.pickup_city && formik.errors.pickup_city}
            fullWidth
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="delivery_state"
            name="delivery_state"
            label="Delivery State"
            value={formik.values.delivery_state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.delivery_state && Boolean(formik.errors.delivery_state)}
            helperText={formik.touched.delivery_state && formik.errors.delivery_state}
            fullWidth
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="delivery_city"
            name="delivery_city"
            label="Destination (Delivery City)"
            value={formik.values.delivery_city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.delivery_city && Boolean(formik.errors.delivery_city)}
            helperText={formik.touched.delivery_city && formik.errors.delivery_city}
            fullWidth
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="planned_start_time"
            name="planned_start_time"
            label="Planned DateTime Start"
            InputLabelProps={{ shrink: true }}
            value={formik.values.planned_start_time || ''} // Ensure it's never undefined
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.planned_start_time && Boolean(formik.errors.planned_start_time)}
            helperText={formik.touched.planned_start_time && formik.errors.planned_start_time}
            fullWidth
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="planned_end_time"
            name="planned_end_time"
            label="Planned DateTime End"
            InputLabelProps={{ shrink: true }}
            value={formik.values.planned_end_time || ''} // Ensure it's never undefined
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.planned_end_time && Boolean(formik.errors.planned_end_time)}
            helperText={formik.touched.planned_end_time && formik.errors.planned_end_time}
            fullWidth
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <FormControl fullWidth variant="outlined">
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
              disabled={true}
            >
              {partnerData?.map((partner) => (
                <MenuItem key={partner.id} value={partner.id}>{partner.name}</MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <CustomTextField
            id="partner_name"
            name="partner_name"
            label="Partner"
            value={formik.values.partner_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.partner_name && Boolean(formik.errors.partner_name)}
            helperText={formik.touched.partner_name && formik.errors.partner_name}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="expected_dispatcher-label">Planned Dispatcher</InputLabel>
            <Select
              labelId="expected_dispatcher-label"
              id="expected_dispatcher"
              name="expected_dispatcher"
              value={formik.values.expected_dispatcher}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.expected_dispatcher && Boolean(formik.errors.expected_dispatcher)}
              label="Planned Dispatcher"

            >
              {dispatchersData?.map((dispachter) => (
                <MenuItem key={dispachter?.id} value={dispachter?.name}>{dispachter?.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
              disabled={true}
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
            disabled={true}
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
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="expected_vehicle"
            name="expected_vehicle"
            label="Planned Vehicle"
            value={formik.values.expected_vehicle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.expected_vehicle && Boolean(formik.errors.expected_vehicle)}
            helperText={formik.touched.expected_vehicle && formik.errors.expected_vehicle}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="load_type"
            name="load_type"
            label="Load Type"
            value={formik.values.load_type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.load_type && Boolean(formik.errors.load_type)}
            helperText={formik.touched.load_type && formik.errors.load_type}
            fullWidth
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="temperature"
            name="temperature"
            label="Temperature"
            type="number"
            value={formik.values.temperature}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.temperature && Boolean(formik.errors.temperature)}
            helperText={formik.touched.temperature && formik.errors.temperature}
            fullWidth
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="weight"
            name="weight"
            label="Weight (lbs)"
            type="number"
            value={formik.values.weight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.weight && Boolean(formik.errors.weight)}
            helperText={formik.touched.weight && formik.errors.weight}
            fullWidth
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="owner_operator_rate"
            name="owner_operator_rate"
            label="Rate For Owner Operator"
            type="number"
            value={formik.values.owner_operator_rate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.owner_operator_rate && Boolean(formik.errors.owner_operator_rate)}
            helperText={formik.touched.owner_operator_rate && formik.errors.owner_operator_rate}
            fullWidth

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="company_driver_rate"
            name="company_driver_rate"
            label="Rate For Company Driver"
            type="number"
            value={formik.values.company_driver_rate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.company_driver_rate && Boolean(formik.errors.company_driver_rate)}
            helperText={formik.touched.company_driver_rate && formik.errors.company_driver_rate}
            fullWidth

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <CustomTextField
            id="length"
            name="length"
            label="Length (Feet)"
            type="number"
            value={formik.values.length}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.length && Boolean(formik.errors.length)}
            helperText={formik.touched.length && formik.errors.length}
            fullWidth
            disabled={true}
          /> */}

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="loadstage-label">Load Stage</InputLabel>
            <Select
              labelId="loadstage-label"
              id="odoo_load_stage"
              name="odoo_load_stage"
              value={formik.values.odoo_load_stage || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.odoo_load_stage && Boolean(formik.errors.odoo_load_stage)}
              label="Load Stage"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Planned">Planned</MenuItem>
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Invoiced">Invoiced</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            id="load_comments"
            name="load_comments"
            label="Load Comments"
            type="textarea"
            value={formik.values.load_comments}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.load_comments && Boolean(formik.errors.load_comments)}
            helperText={formik.touched.load_comments && formik.errors.load_comments}
            fullWidth
            disabled={false}
          />

        </Grid>
        <Grid item xs={6}>
          {/* <Button variant="contained" color="primary" onClick={addDeliveryRow}>
            Add Stops
          </Button> */}
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
                {/* <TableCell>Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveryForms?.map((form) => (
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