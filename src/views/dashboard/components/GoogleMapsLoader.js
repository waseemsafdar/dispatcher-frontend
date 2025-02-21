import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const GoogleMapsLoader = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey={''}>
      {children}
    </LoadScript>
  );
};

export default GoogleMapsLoader;