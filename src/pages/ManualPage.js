import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Select, MenuItem, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BackButton from '../components/BackButton';

const ManualPage = () => {
    const [selectedDuration, setSelectedDuration] = useState('');
    const [loading, setLoading] = useState(true);

    // GET request to fetch initial state
    useEffect(() => {
        const fetchState = async () => {
            try {
                const response = await fetch('https://flask-backend-app-7pvn.onrender.com/manual_page/get_state?user_id=1');
                const data = await response.json();
                setSelectedDuration(data.selected_duration || '');
                setLoading(false);
            } catch (error) {
                console.error("Error fetching state:", error);
                setLoading(false);
            }
        };

        fetchState();
    }, []);

    // Handle the POST request when the form is submitted
    const handleSubmit = async () => {
        try {
            const response = await fetch('https://flask-backend-app-7pvn.onrender.com/manual_page/set_state', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: 1, // This would normally come from user authentication
                    selected_duration: selectedDuration,
                }),
            });

            if (response.ok) {
                alert('State saved successfully');
            } else {
                alert('Failed to save state');
            }
        } catch (error) {
            console.error('Error saving state:', error);
        }
    };

    // Handle duration change
    const handleDurationChange = (event) => {
        setSelectedDuration(event.target.value);
    };

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ position: 'relative', height: '100vh', padding: 2 }}>
                <BackButton />
                <Typography
                    variant="h5"
                    sx={{
                        position: 'absolute',
                        fontFamily: "'Nunito', sans-serif",
                        top: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                    }}
                >
                    Manual Irrigation
                </Typography>
                <Container sx={{ textAlign: 'center', marginTop: '60px' }}>
                    <Typography variant="h6" sx={{
                        fontFamily: "'Nunito', sans-serif",
                        color:'#84a7b8'
                    }}>Select Irrigation Duration</Typography>
                    <Box sx={{ marginBottom: 2 }}>
                        <Select
                            sx={{ 
                              maxWidth: '300px',
                              width: '100%',
                            }}
                            value={selectedDuration}
                            onChange={handleDurationChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Select Duration' }}
                        >
                            <MenuItem value="" disabled>Select Minutes</MenuItem>
                            {[...Array(24).keys()].map(i => {
                                const minute = (i + 1) * 5;
                                return (
                                    <MenuItem key={minute} value={minute}>
                                        {minute} minute{minute > 1 ? 's' : ''}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Box>
                    
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{
                            marginTop: 2,
                            borderRadius: '50px',
                            background: 'linear-gradient(45deg, #84a7b8 30%, #aec1ca 90%)',
                            boxShadow: '0 6px 10px 4px rgba(110, 138, 152, .3)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #aec1ca 30%, #84a7b8 90%)',
                            },
                        }}
                    >
                         <Typography variant="h6" sx={{
                        fontFamily: "'Nunito', sans-serif",
                    }}>Submit</Typography>
                    </Button>
                </Container>
            </Box>
        </LocalizationProvider>
    );
};

export default ManualPage;
