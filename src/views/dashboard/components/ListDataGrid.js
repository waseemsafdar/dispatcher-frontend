import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'age', headerName: 'Age', width: 90 },
  { field: 'customerLoadNumber', headerName: 'Customer Load Number', width: 180 },
  { field: 'cargoValue', headerName: 'Cargo Value', width: 150 },
  { field: 'rate', headerName: 'Rate', width: 130 },
  { field: 'pickupDate', headerName: 'Pickup Date', width: 150 },
  { field: 'origin', headerName: 'Origin', width: 130 },
  { field: 'deliveryTime', headerName: 'Delivery Time', width: 170 },
  { field: 'destination', headerName: 'Destination', width: 160 },
  { field: 'miles', headerName: 'Miles', width: 100 },
  { field: 'cpm', headerName: 'CPM', width: 100 },
  { field: 'temp', headerName: 'Temp', width: 100 },
  { field: 'appointment', headerName: 'Appointment', width: 130 },
  { field: 'equipmentType', headerName: 'Equipment Type', width: 150 },
  { field: 'trailerLength', headerName: 'Trailer Length', width: 150 },
  { field: 'weight', headerName: 'Weight', width: 130 },
  { field: 'capacity', headerName: 'Capacity', width: 130 },
  { field: 'company', headerName: 'Company', width: 150 },
  { field: 'contact', headerName: 'Contact', width: 130 },
  { field: 'truckNumber', headerName: 'Truck Number', width: 150 },
  { field: 'dispatcher', headerName: 'Dispatcher', width: 150 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'notes', headerName: 'Notes', width: 200 },
];

const ListDataGrid = ({ data }) => {
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection />
    </div>
  );
};

export default ListDataGrid;
