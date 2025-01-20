// src/components/vistaappUserForm.js
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Button, Typography, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { fetchUserById, saveUser, updateUserById } from '../store/usersSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().required('Required'),
  user_role: Yup.string().required('Required'),
  is_dispatcher: Yup.boolean(),
});

const VistaappUserForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status, error } = useSelector((state) => state.users);
  
  useEffect(() => {
    if (id) {
      // Fetch user data if ID is provided (edit mode)
      dispatch(fetchUserById(id)).then(action => {
        formik.setValues(action.payload);
      });
    }
  }, [id, dispatch]);

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      user_role: '',
      is_dispatcher: false,
    },
    validationSchema,
    onSubmit: (values) => {
      if (id) {
        console.log(id,'id')
        dispatch(updateUserById({ id, values }))
          .unwrap()
          .then(() => {
            formik.resetForm();
            toast.success('User updated successfully!');
            navigate('/users')
          })
          .catch((err) => {
            toast.error('Failed to update user');
          });
      } else {
        dispatch(saveUser(values))
          .unwrap()
          .then(() => {
            formik.resetForm();
            toast.success('User saved successfully!');
          })
          .catch((err) => {
            toast.error('Failed to save user');
          });
      }
    },
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: '500px', width: '100%' }} component="form" onSubmit={formik.handleSubmit} noValidate>
        <Typography marginBottom={3} variant="h2" gutterBottom>
          User Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="name"
              name="name"
              label="Name"
              value={formik.values?.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="username"
              name="username"
              label="Username"
              value={formik.values?.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              name="email"
              label="Email"
              value={formik.values?.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values?.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="user_role"
              name="user_role"
              label="User Role"
              value={formik.values?.user_role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.user_role && Boolean(formik.errors.user_role)}
              helperText={formik.touched.user_role && formik.errors.user_role}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  id="is_dispatcher"
                  name="is_dispatcher"
                  checked={formik.values?.is_dispatcher}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  color="primary"
                />
              }
              label="Is Dispatcher"
              error={formik.touched.is_dispatcher && Boolean(formik.errors.is_dispatcher) ? 'true' : undefined}
              helperText={formik.touched.is_dispatcher && formik.errors.is_dispatcher}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default VistaappUserForm;