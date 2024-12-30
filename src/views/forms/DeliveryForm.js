import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TableCell, TableRow, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations } from '../../store/locationsSlice';

const validationSchema = Yup.object({
  type: Yup.string().required('Required'),
  delivery_date: Yup.date().required('Required'),
  delivery_start_time: Yup.string().required('Required'),
  delivery_end_time: Yup.string().required('Required'),
  location_id: Yup.string().required('Required'),
});

const DeliveryFormRow = ({ formData, onChange, onDelete }) => {
  const { locationData, status, error } = useSelector((state) => state.locations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      type: '',  // Make sure the initial value is an empty string to avoid undefined
      delivery_date: '',
      delivery_start_time: '',
      delivery_end_time: '',
      location_id: '',
    },
    validationSchema,
  });

  useEffect(() => {
    formik.setValues(formData);
  }, [formData]);

  useEffect(() => {
    if (onChange) {
      onChange(formik.values);
    }
  }, [formik.values]);

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const formattedTime = today.toTimeString().split(' ')[0];

  return (
    <TableRow>
      <TableCell>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            name="type"
            value={formik.values.type || ''} // Default to an empty string if undefined
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.type && Boolean(formik.errors.type)}
            label="Type"
          >
            <MenuItem value="Delivery">Delivery</MenuItem>
            <MenuItem value="Pickup">Pickup</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <CustomTextField
          id="delivery_date"
          name="delivery_date"
          label="Delivery Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formik.values.delivery_date || ''} // Ensure it's never undefined
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.delivery_date && Boolean(formik.errors.delivery_date)}
          helperText={formik.touched.delivery_date && formik.errors.delivery_date}
          fullWidth
          inputProps={{ min: formattedDate }}  // Disable past dates
        />
      </TableCell>
      <TableCell>
        <CustomTextField
          id="delivery_start_time"
          name="delivery_start_time"
          label="Start Time"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={formik.values.delivery_start_time || ''} // Ensure it's never undefined
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.delivery_start_time && Boolean(formik.errors.delivery_start_time)}
          helperText={formik.touched.delivery_start_time && formik.errors.delivery_start_time}
          fullWidth
          inputProps={{ min: formattedTime }}  // Disable past times
        />
      </TableCell>
      <TableCell>
        <CustomTextField
          id="delivery_end_time"
          name="delivery_end_time"
          label="End Time"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={formik.values.delivery_end_time || ''} // Ensure it's never undefined
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.delivery_end_time && Boolean(formik.errors.delivery_end_time)}
          helperText={formik.touched.delivery_end_time && formik.errors.delivery_end_time}
          fullWidth
          inputProps={{ min: formattedTime }}  // Disable past times
        />
      </TableCell>
      <TableCell>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="location_id-label">Location</InputLabel>
          <Select
            labelId="location_id-label"
            id="location_id"
            name="location_id"
            value={formik.values.location_id || ''} // Ensure it's never undefined
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.location_id && Boolean(formik.errors.location_id)}
            label="Location"
          >
            {locationData?.map((location) => (
              <MenuItem key={location?.id} value={location?.id}>{location?.google_query}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <Button variant="contained" color="secondary" onClick={onDelete}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default DeliveryFormRow;
