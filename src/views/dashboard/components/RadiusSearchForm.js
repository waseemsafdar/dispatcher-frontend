import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box } from '@mui/material';
import { Autocomplete, LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const RadiusSearchForm = ({ open, onClose, onSubmit }) => {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      radius: 0,
      origin: '',
      destination: '',
      org_latitude: null,
      org_longitude: null,
      des_latitude: null,
      des_longitude: null,
    },
  });

  const [originLatLng, setOriginLatLng] = useState({ lat: null, lng: null });
  const [destinationLatLng, setDestinationLatLng] = useState({ lat: null, lng: null });

  const originRef = useRef();
  const destinationRef = useRef();

  const handlePlaceSelect = (setLatLng, fieldNameLat, fieldNameLng) => {
    return () => {
      const place = fieldNameLat === 'org_latitude' ? originRef.current.getPlace() : destinationRef.current.getPlace();
      if (!place.geometry) return;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLatLng({ lat, lng });
      setValue(fieldNameLat, lat);
      setValue(fieldNameLng, lng);
      setValue(fieldNameLat === 'org_latitude' ? 'origin' : 'destination', place.formatted_address || place.name);
    };
  };

  return (
    <LoadScript googleMapsApiKey={'AIzaSyB6AggcYKdKvkwUOdk-SqSWI6uYjCYjFp0'} libraries={libraries}>
      <Dialog
        maxWidth="md" // Adjust this value to your desired width ('xs', 'sm', 'md', 'lg', 'xl')
        fullWidth
        open={open}
        onClose={onClose}
      >
        <DialogTitle>Search by Radius</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit((data) => onSubmit({ ...data, originLatLng, destinationLatLng }))} display="grid" gap={2} mt={2}>
            <Controller
              name="radius"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Radius (miles)"
                  type="number"
                  inputProps={{ min: 0, max: 1000, step: 0.1 }}
                  fullWidth
                />
              )}
            />
            <Controller
              name="origin"
              control={control}
              render={({ field }) => (
                <Autocomplete onLoad={(autocomplete) => (originRef.current = autocomplete)} onPlaceChanged={handlePlaceSelect(setOriginLatLng, 'org_latitude', 'org_longitude')}>
                  <TextField
                    {...field}
                    label="Origin"
                    variant="outlined"
                    fullWidth
                  />
                </Autocomplete>
              )}
            />
            <Controller
              name="destination"
              control={control}
              render={({ field }) => (
                <Autocomplete onLoad={(autocomplete) => (destinationRef.current = autocomplete)} onPlaceChanged={handlePlaceSelect(setDestinationLatLng, 'des_latitude', 'des_longitude')}>
                  <TextField
                    {...field}
                    label="Destination"
                    variant="outlined"
                    fullWidth
                  />
                </Autocomplete>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit((data) => onSubmit({ ...data, originLatLng, destinationLatLng }))} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </LoadScript>
  );
};

export default RadiusSearchForm;