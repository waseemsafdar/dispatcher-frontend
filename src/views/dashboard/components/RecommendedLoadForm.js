import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Slider, Grid, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getRecomendedLoads } from '../../../store/loadSlice';

const RecommendedLoadForm = ({ onSubmit, loadId }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            pickup_radius: 50,
            time_range_days: 3,
        },
    });
    

    const [loads, setLoads] = useState([]);

    const handleFormSubmit = (data) => {
        console.log(data);
        dispatch(getRecomendedLoads({...data, loadId}))
        // Fetch recommended loads based on the criteria
        // This is a placeholder for your load fetching logic
        const fetchedLoads = [
            {
                pickup_location: 'New York, NY',
                pickup_date: '2025-02-03',
                delivery_location: 'Los Angeles, CA',
                delivery_date: '2025-02-07',
                trailer_type: 'Refrigerated',
            },
            {
                pickup_location: 'Chicago, IL',
                pickup_date: '2025-02-04',
                delivery_location: 'Houston, TX',
                delivery_date: '2025-02-08',
                trailer_type: 'Flatbed',
            },
        ];

        // Filter loads based on the search criteria
        const filteredLoads = fetchedLoads.filter(load => {
            // Add your filtering logic here based on pickup radius and time range
            return true; // Placeholder
        });

        setLoads(filteredLoads);
    };

    return (
        <Box>
            <Box maxWidth={500} component="form" onSubmit={handleSubmit(handleFormSubmit)} display="grid" gap={2} mt={2}>
                <Controller
                    name="pickup_radius"
                    control={control}
                    render={({ field }) => (
                        <Box>
                            <label>Pickup Radius (miles)</label>
                            <Slider
                                {...field}
                                valueLabelDisplay="auto"
                                step={10}
                                min={10}
                                max={200}
                            />
                        </Box>
                    )}
                />
                <FormControl fullWidth variant="outlined">
                    <InputLabel id="time-range-label">Time Range for Pickups (days)</InputLabel>
                    <Controller
                        name="time_range_days"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="time-range-label"
                                label="Time Range for Pickups (days)"
                            >
                                {[...Array(7).keys()].map(day => (
                                    <MenuItem key={day + 1} value={day + 1}>
                                        {day + 1} {day + 1 === 1 ? 'day' : 'days'}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </FormControl>
                <Button variant="contained" type="submit" color="primary">
                    Search Loads
                </Button>
            </Box>
            <Box mt={3}>
                {loads.length > 0 ? (
                    loads.map((load, index) => (
                        <Paper key={index} sx={{ p: 2, mb: 2, background: "#f4f4f4" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        Pickup Location:
                                    </Typography>
                                    <Typography component="span">
                                        {' '}{load.pickup_location}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        Pickup Date:
                                    </Typography>
                                    <Typography component="span">
                                        {' '}{load.pickup_date}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        Delivery Location:
                                    </Typography>
                                    <Typography component="span">
                                        {' '}{load.delivery_location}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        Delivery Date:
                                    </Typography>
                                    <Typography component="span">
                                        {' '}{load.delivery_date}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        Trailer Type:
                                    </Typography>
                                    <Typography variant="" component="span">
                                        {' '}{load.trailer_type}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))
                ) : (
                    <Typography>No loads found</Typography>
                )}
            </Box>
        </Box>
    );
};

export default RecommendedLoadForm;