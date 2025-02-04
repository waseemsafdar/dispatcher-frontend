import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const GoogleMapsLoader = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey={'AIzaSyB6AggcYKdKvkwUOdk-SqSWI6uYjCYjFp0'}>
      {children}
    </LoadScript>
  );
};

export default GoogleMapsLoader;