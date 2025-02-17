import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Grid, Paper, Typography, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getRecomendedLoads } from '../../../store/loadSlice';
import { IconEdit, IconEye } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

const RecommendedLoadForm = ({ onSubmit, load_id , setTabIndex}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { RecommendedLoadList } = useSelector((state) => state.load);
    
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            pickup_radius: 50,
            time_range_days: 3,
        },
    });

    const [loads, setLoads] = useState([]);

    const handleFormSubmit = (data) => {
        console.log(data);
        dispatch(getRecomendedLoads({load_id, ...data}));

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

        //setLoads(RecommendedLoadList);
    };

    const HandleViewClick = (id) => {
        setTabIndex(0)
       navigate(`/load-detail/${id}`)

    }
    return (
        <Box>
            <Box maxWidth={500} component="form" onSubmit={handleSubmit(handleFormSubmit)} display="grid" gap={2} mt={2}>
                <Controller
                    name="pickup_radius"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Pickup Radius (miles)"
                            type="number"
                            inputProps={{ min: 0, max: 1000 }}
                            fullWidth
                        />
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
                {RecommendedLoadList?.length > 0 ? (
                    RecommendedLoadList?.map((load, index) => (
                        <Paper key={index} sx={{ p: 2, mb: 2, background: "#f4f4f4", position: 'relative' }}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    display: 'flex',
                                    gap: 1,
                                }}
                            >
                                <IconButton onClick={() => navigate(`/edit-load/${load.id}`)} size="small">
                                    <IconEdit  />
                                </IconButton>
                                <IconButton onClick={()=> HandleViewClick(load?.id)} size="small">
                                    <IconEye />
                                </IconButton>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        Pickup City:
                                    </Typography>
                                    <Typography component="span">
                                        {' '}{load?.pickup_city}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        Pickup Date:
                                    </Typography>
                                    <Typography component="span">
                                        {' '}{load.planned_start_time}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        Delivery City:
                                    </Typography>
                                    <Typography component="span">
                                        {' '}{load.delivery_city}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        Delivery Date:
                                    </Typography>
                                    <Typography component="span">
                                        {' '}{load.planned_end_time}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        Load Type:
                                    </Typography>
                                    <Typography component="span">
                                        {' '}{load.load_type}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                            <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                Trailer Type:
                            </Typography>
                            <Typography component="span">
                                {' '}
                                {load.trailer_type.map((trailer, index) => (
                                    <span key={trailer.id}>
                                        {trailer.type}
                                        {index < load.trailer_type.length - 1 && ', '}
                                    </span>
                                ))}
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