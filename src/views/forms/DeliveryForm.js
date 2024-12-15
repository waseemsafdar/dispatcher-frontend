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
const formData = {
      type: '',
      delivery_date : '',
      delivery_start_time: '',
      delivery_end_time: '',
      location_id: '',
}
const DeliveryFormRow = ({ formData, onChange, onDelete }) => {
  const { locationData, status, error } = useSelector((state) => state.locations);
  const dispatch = useDispatch();

  useEffect(() => { 
     if (status === 'idle') { 
      dispatch(getLocations()); 
    } }, [status]);

  const formik = useFormik({
    initialValues: {
      type: '',
      delivery_date : '',
      delivery_start_time: '',
      delivery_end_time: '',
      location_id: '',
    },
    validationSchema
  });

  useEffect(() => {
    if (onChange) {
      onChange(formik.values);
    }
  }, [formik.values]);

  return (
    <TableRow>
    
      <TableCell>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.type && Boolean(formik.errors.type)}
            label="Type"
          >
            <MenuItem value="Type1">Type 1</MenuItem>
            <MenuItem value="Type2">Type 2</MenuItem>
            <MenuItem value="Type3">Type 3</MenuItem>
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
          value={formik.values.delivery_date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.delivery_date && Boolean(formik.errors.delivery_date)}
          helperText={formik.touched.delivery_date && formik.errors.delivery_date}
          fullWidth
        />
      </TableCell>
      <TableCell>
        <CustomTextField
          id="delivery_start_time"
          name="delivery_start_time"
          label="Start Time"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={formik.values.delivery_start_time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.delivery_start_time && Boolean(formik.errors.delivery_start_time)}
          helperText={formik.touched.delivery_start_time && formik.errors.delivery_start_time}
          fullWidth
        />
      </TableCell>
      <TableCell>
        <CustomTextField
          id="delivery_end_time"
          name="delivery_end_time"
          label="End Time"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={formik.values.delivery_end_time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.delivery_end_time && Boolean(formik.errors.delivery_end_time)}
          helperText={formik.touched.delivery_end_time && formik.errors.delivery_end_time}
          fullWidth
        />
      </TableCell>
      <TableCell>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="location_id-label">location_id</InputLabel>
          <Select
            labelId="location_id-label"
            id="location_id"
            name="location_id"
            value={formik.values.location_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.location_id && Boolean(formik.errors.location_id)}
            label="location_id"
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
