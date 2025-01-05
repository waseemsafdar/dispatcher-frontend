import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'; // Import toast
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { login } from '../../../store/authSlice'; // Adjust the path if necessary

const AuthLogin = ({ title, subtitle, subtext }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { status, error, user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      dispatch(login(values))
      .unwrap().then(() => { 
          toast.success('Login successful!');
          navigate('/'); // Redirect to the home page
             })
      ;
    },
  });



  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="username" mb="5px">
              User Name
            </Typography>
            <CustomTextField
              id="username"
              name="username"
              type="username"
              variant="outlined"
              fullWidth
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Box>
          <Box mt="25px">
            <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px">
              Password
            </Typography>
            <CustomTextField
              id="password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <Typography
              component={Link}
              to="/"
              fontWeight="500"
              sx={{ textDecoration: 'none', color: 'primary.main' }}
            >
              Forgot Password?
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Button color="primary" variant="contained" size="large" fullWidth type="submit">
            Sign In
          </Button>
        </Box>
      </form>
      {subtitle}
      {status === 'loading' && <Typography>Loading...</Typography>}
      {status === 'failed' && <Typography color="error">{error}</Typography>}
    </>
  );
};

export default AuthLogin;
