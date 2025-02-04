import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDispatchers, fetchTrailer } from '../../../store/partnerSlice';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { setFilters , setBackFromDetail} from '../../../store/loadSlice';
import RadiusSearchForm from './RadiusSearchForm';
import GoogleMapsLoader from './GoogleMapsLoader';


const FilterForm = ({ onSubmit, onClear }) => {
  const dispatch = useDispatch();
  const { tarilerData, dispatchersData } = useSelector((state) => state.partners);
  const { isClearFilter } = useSelector((state) => state.load);
  const { filters,isBackFromDetail } = useSelector((state) => state.load);
  const [activeFilter, setActiveFilter] = useState(null);
  const [openRadiusSearch, setOpenRadiusSearch] = useState(false);

  const handleRadiusSearchSubmit = (data) => {  
    const { org_latitude, org_longitude, des_latitude, des_longitude, radius } = data;
  
    // Set values for all destructured properties
    setValue('org_latitude', org_latitude);
    setValue('org_longitude', org_longitude);
    setValue('des_latitude', des_latitude);
    setValue('des_longitude', des_longitude);
    setValue('radius', radius);
  
    // Submit the form
    handleSubmit(onSubmit)();
  
    // Close the popup
    setOpenRadiusSearch(false);
  };

  useEffect(() => {
    dispatch(fetchTrailer());
    dispatch(fetchDispatchers());
  }, [dispatch]);

  const { register, handleSubmit, reset, watch, setValue, control } = useForm({
    defaultValues: {
      pickup_city: '',
      delivery_city: '',
      pickup_state: '',
      delivery_state: '',
      trailer_type: '',
      load_type: '',
      temperature: '',
      weight: '',
      length: '',
      planned_start_time: null,
      planned_end_time: null,
      expected_dispatcher:'',
      customer_load: '', // Added default value for customer load
    }
  });

  useEffect(() => {
    if (isClearFilter) {
      reset();
    dispatch(setFilters({}))
      
    }
  }, [isClearFilter]);

  const handleFilterClick = (isArchived) => {
    setValue('is_archived', isArchived);
    setActiveFilter(isArchived?"Covered":"Open");
    handleSubmit(onSubmit)();
  };
  useEffect(() => {
    setActiveFilter(filters.is_archived !== undefined ? (filters.is_archived == true ? "Covered" : "Open") : null);
    const parsedFilters = {
      ...filters,
      planned_start_time: filters.planned_start_time 
        ? dayjs(filters.planned_start_time, 'YYYY-MM-DD HH:mm:ss')
        : null,
      planned_end_time: filters.planned_end_time 
        ? dayjs(filters.planned_end_time, 'YYYY-MM-DD HH:mm:ss')
        : null,
    };
    for (const [key, value] of Object.entries(parsedFilters)) {
      setValue(key, value);
      
    }
    
  }, [filters]);
  useEffect(() => {
    // Set form values from Redux state
    console.log(isBackFromDetail,'isBackFromDetail')
    if(isBackFromDetail) {
    handleSubmit(onSubmit)(filters);
    }
  }, [isBackFromDetail]);

  const pickupCity = watch('pickup_city');
  const deliveryCity = watch('delivery_city');
  const pickupState = watch('pickup_state');
  const deliveryState = watch('delivery_state');
  const trailerTypeValue = watch('trailer_type');
  const loadType = watch('load_type');
  const temperature = watch('temperature');
  const weight = watch('weight');
  const length = watch('length');
  const plannedStartTime = watch('planned_start_time');
  const plannedEndTime = watch('planned_end_time');
  const customerLoad = watch('customer_load'); // Added watch for customer load
  const expectedDispatcher = watch('expected_dispatcher'); // Added watch for customer load


  return (
    <Box className='filterform-box' mt={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box 
      display="grid" 
      gridTemplateColumns="repeat(8, 1fr)" 
      gridTemplateRows="repeat(2, auto)" 
      gap={1}
    >
        <TextField
          id="pickup_city"
          label="Origin (City)"
          variant="outlined"
          value={pickupCity}
          {...register('pickup_city')}
          placeholder="Origin"
          fullWidth
        />
        <TextField
          id="pickup_state"
          label="Origin (State)"
          variant="outlined"
          value={pickupState}
          {...register('pickup_state')}
          placeholder="Origin (State)"
          fullWidth
        />
        <TextField
          id="delivery_city"
          label="Delivery (City)"
          variant="outlined"
          value={deliveryCity}
          {...register('delivery_city')}
          placeholder="Delivery"
          fullWidth
        />
        <TextField
          id="delivery_state"
          label="Delivery (State)"
          variant="outlined"
          value={deliveryState}
          {...register('delivery_state')}
          placeholder="Delivery (State)"
          fullWidth
        />
        <FormControl fullWidth variant="outlined">
                    <InputLabel id="expected_dispatcher-label">Planned Dispatcher</InputLabel>
                    <Select
                      labelId="expected_dispatcher-label"
                      id="expected_dispatcher"
                      name="expected_dispatcher"
                      value={expectedDispatcher}
                      label="Planned Dispatcher"
                     {...register('expected_dispatcher')}
                     onChange={(e) => setValue('expected_dispatcher', e.target.value)}  
                    >
                      {dispatchersData?.map((dispachter) => (
                        <MenuItem key={dispachter?.id} value={dispachter?.name}>{dispachter?.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl> 
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="trailer-label">Equipment</InputLabel>
          <Select
            labelId="trailerType-label"
            id="trailer_type"
            value={trailerTypeValue}
            {...register('trailer_type')}
            onChange={(e) => setValue('trailer_type', e.target.value)}
            label="Equipment"
          >
            {tarilerData && tarilerData.map((trailer) => (
              <MenuItem key={trailer.id} value={trailer.id}>{trailer.type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="load-type-label">Load Type</InputLabel>
          <Select
            labelId="load-type-label"
            id="load_type"
            value={loadType}
            {...register('load_type')}
            onChange={(e) => setValue('load_type', e.target.value)}
            label="Load Type"
          >
            <MenuItem value="FTL">FTL</MenuItem>
            <MenuItem value="LTL">LTL</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="temperature"
          label="Temp"
          variant="outlined"
          type="number"
          value={temperature}
          {...register('temperature')}
          placeholder="Temperature"
          fullWidth
        />
        <TextField
          id="weight"
          label="Weight (lbs)"
          variant="outlined"
          type="number"
          value={weight}
          {...register('weight')}
          placeholder="Weight"
          fullWidth
        />
        <TextField
          id="length"
          label="Length (Ft)"
          variant="outlined"
          type="number"
          value={length}
          {...register('length')}
          placeholder="Length"
          fullWidth
        />
        <TextField
          id="customer_load"
          label="Customer Load"
          variant="outlined"
          value={customerLoad}
          {...register('customer_load')}
          placeholder="Customer Load"
          fullWidth
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="planned_start_time"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label="Planned Start"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined"
                  }
                }}
              />
            )}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="planned_end_time"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label="Planned End"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined"
                  }
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
      <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setOpenRadiusSearch(true)}
        >
          Search by Radius
        </Button>
      <Button
          variant="contained"
          color="primary"
          onClick={() => handleFilterClick(false)}
          sx={{ backgroundColor: activeFilter === 'Open' ? 'yellow' : undefined, color: activeFilter === 'Open' ? 'black' : undefined }}
        >
          Open
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleFilterClick(true)}
          sx={{ backgroundColor: activeFilter === 'Covered' ? 'yellow' : undefined, color: activeFilter === 'Covered' ? 'black' : undefined }}
        >
          Covered
        </Button>
        <Button variant="contained" type="submit" color="primary">
          Apply Filters
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            reset();
            onClear();
            setActiveFilter(null)
          }}
        >
          Clear Filters
        </Button>
      </Box>
      {/* <GoogleMapsLoader>  */}
      <RadiusSearchForm
        open={openRadiusSearch}
        onClose={() => setOpenRadiusSearch(false)}
        onSubmit={handleRadiusSearchSubmit}
      />
      {/* </GoogleMapsLoader> */}
    </Box>
  );
};

export default FilterForm;