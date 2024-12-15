// src/components/LocationPicker.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const LocationPicker = ({ onSelectLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchBox, setSearchBox] = useState(null);

  const handlePlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      address: place.formatted_address,
      street: place.address_components.find(comp => comp.types.includes('route'))?.long_name || '',
      city: place.address_components.find(comp => comp.types.includes('locality'))?.long_name || '',
      state: place.address_components.find(comp => comp.types.includes('administrative_area_level_1'))?.short_name || '',
      zip: place.address_components.find(comp => comp.types.includes('postal_code'))?.long_name || '',
    };

    setSelectedLocation(location);
    onSelectLocation(location);
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" libraries={['places']}>
      <StandaloneSearchBox
        onLoad={ref => setSearchBox(ref)}
        onPlacesChanged={handlePlacesChanged}
      >
        <input
          type="text"
          placeholder="Search a location"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </StandaloneSearchBox>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={(event) => {
          const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
          setSelectedLocation(location);
          onSelectLocation(location);
        }}
      >
        {selectedLocation && <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationPicker;
