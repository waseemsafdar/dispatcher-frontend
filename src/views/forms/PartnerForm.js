import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Box, Button, Typography } from '@mui/material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addPartner, fetchPartnerById, updatePartnerById } from '../../store/partnerSlice';
import { useParams } from 'react-router';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  street: Yup.string().required('Required'),
  zip_code: Yup.string().required('Required').matches(/^\d{5}$/, 'Must be exactly 5 digits'),
  state: Yup.string().required('Required'),
  mic_number: Yup.string().required('Required'),
});

const PartnerForm = () => {
    const { id } = useParams();
  
  const dispatch = useDispatch()
  useEffect(() => {
      if (id) {
        // Fetch location data if ID is provided (edit mode)
        dispatch(fetchPartnerById(id)).then(action => {
          formik.setValues(action.payload);
        });
      }
    }, [id, dispatch]);
  const formik = useFormik({
    initialValues: {
      name: '',
      city: '',
      street: '',
      zip_code: '',
      state: '',
      mic_number: '',
    },
    validationSchema,
    onSubmit: (values) => {
     if(id) {
      dispatch(updatePartnerById({ id, values }))
      .unwrap()
      .then(() => { 
          formik.resetForm();
          toast.success('patner saved successfully!'); 
      }).catch((err) => { 
          toast.error('Failed to save partner'); 
          });
     }
     else {
      dispatch(addPartner(values))
      .unwrap()
      .then(() => { 
          formik.resetForm();
          toast.success('patner saved successfully!'); 
      }).catch((err) => { 
          toast.error('Failed to save partner'); 
          });
     } 
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
            id="mic_number"
            name="mic_number"
            label="MIC Number"
            value={formik.values.mic_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mic_number && Boolean(formik.errors.mic_number)}
            helperText={formik.touched.mic_number && formik.errors.mic_number}
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
