import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import FilterForm from './components/FilterForm';
import ListDataGrid from './components/ListDataGrid';

export const mockData = [
  {
    id: 1,
    age: '1 Day',
    customerLoadNumber: '123456',
    cargoValue: '$5000',
    rate: '$1200',
    pickupDate: '11/29/2024',
    origin: 'Chicago',
    deliveryTime: '12/02/2024 15:00',
    destination: 'New York',
    miles: 850,
    cpm: 1.41,
    temp: '40°F',
    appointment: 'Yes',
    equipmentType: 'Reefer',
    trailerLength: '48 ft',
    weight: '16,000 lbs',
    capacity: 'FTL',
    company: 'Vista Trans Logistic',
    contact: 'John Doe',
    truckNumber: '4567',
    dispatcher: 'Jane Smith',
    status: 'Available',
    notes: 'No issues',
  },
  {
    id: 2,
    age: '3 Days',
    customerLoadNumber: '123457',
    cargoValue: '$4500',
    rate: '$1100',
    pickupDate: '11/30/2024',
    origin: 'Dallas',
    deliveryTime: '12/03/2024 12:00',
    destination: 'Houston',
    miles: 500,
    cpm: 2.20,
    temp: '50°F',
    appointment: 'No',
    equipmentType: 'Dry Van',
    trailerLength: '53 ft',
    weight: '20,000 lbs',
    capacity: 'LTL',
    company: 'Swift Logistics',
    contact: 'Mike Lee',
    truckNumber: '7890',
    dispatcher: 'Susan Brown',
    status: 'Pending',
    notes: 'None',
  },
  {
    id: 3,
    age: '5 Days',
    customerLoadNumber: '123458',
    cargoValue: '$6000',
    rate: '$1400',
    pickupDate: '12/01/2024',
    origin: 'Los Angeles',
    deliveryTime: '12/04/2024 18:00',
    destination: 'San Francisco',
    miles: 400,
    cpm: 3.50,
    temp: '70°F',
    appointment: 'Yes',
    equipmentType: 'Flatbed',
    trailerLength: '40 ft',
    weight: '15,000 lbs',
    capacity: 'FTL',
    company: 'ABC Freight',
    contact: 'Anna Clark',
    truckNumber: '1122',
    dispatcher: 'Tom White',
    status: 'Delivered',
    notes: 'All good',
  },
  {
    id: 4,
    age: '2 Days',
    customerLoadNumber: '123459',
    cargoValue: '$5500',
    rate: '$1250',
    pickupDate: '12/02/2024',
    origin: 'Seattle',
    deliveryTime: '12/05/2024 14:00',
    destination: 'Portland',
    miles: 200,
    cpm: 4.50,
    temp: '60°F',
    appointment: 'Yes',
    equipmentType: 'Reefer',
    trailerLength: '48 ft',
    weight: '18,000 lbs',
    capacity: 'LTL',
    company: 'Transport Co',
    contact: 'Laura King',
    truckNumber: '9988',
    dispatcher: 'David Black',
    status: 'Available',
    notes: 'Urgent',
  },
  {
    id: 5,
    age: '4 Days',
    customerLoadNumber: '123460',
    cargoValue: '$4000',
    rate: '$1000',
    pickupDate: '12/03/2024',
    origin: 'Miami',
    deliveryTime: '12/06/2024 16:00',
    destination: 'Orlando',
    miles: 250,
    cpm: 4.00,
    temp: '55°F',
    appointment: 'No',
    equipmentType: 'Dry Van',
    trailerLength: '53 ft',
    weight: '22,000 lbs',
    capacity: 'FTL',
    company: 'XYZ Hauling',
    contact: 'Steve Green',
    truckNumber: '3344',
    dispatcher: 'Mary Blue',
    status: 'In Progress',
    notes: 'On schedule',
  }
];


const Dashboard = () => {
  const [data, setData] = useState(mockData);
  const handleClearFilters = () => { 
    setData(mockData);
  };
  const handleFilterSubmit = (filters) => {
    console.log(filters);

    const filteredData = mockData.filter(item => {
      // Apply filter logic
      return (
        (!filters.origin || item.origin.toLowerCase().includes(filters.origin.toLowerCase())) &&
        (!filters.destination || item.destination.toLowerCase().includes(filters.destination.toLowerCase())) &&
        (!filters.deadheadOrigin || item.deadheadOrigin === filters.deadheadOrigin) &&
        (!filters.deadheadDestination || item.deadheadDestination === filters.deadheadDestination) &&
        (!filters.equipmentType || item.equipmentType === filters.equipmentType) &&
        (!filters.loadType || item.loadType === filters.loadType) &&
        (!filters.temp || item.temp.includes(filters.temp)) &&
        (!filters.lengthFeet || item.lengthFeet === parseInt(filters.lengthFeet, 10)) &&
        (!filters.weightLbs || item.weightLbs === parseInt(filters.weightLbs, 10)) &&
        (!filters.pickupFrom || item.pickupDate === filters.pickupFrom) &&
        (!filters.deliveryTo || item.deliveryTime === filters.deliveryTo)
      );
    });

    setData(filteredData);
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FilterForm onSubmit={handleFilterSubmit} onClear={handleClearFilters}/>
          </Grid>
          <Grid item xs={12}>
            <ListDataGrid data={data} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
