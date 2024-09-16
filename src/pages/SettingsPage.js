import React, { useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Select, MenuItem } from '@mui/material';
import BackButton from '../components/BackButton';

const SettingsPage = () => {
    const [selectedPercentage, setSelectedPercentage] = React.useState('');
    const [valveState, setValveState] = React.useState('');

    // Fetch state when the component mounts
    useEffect(() => {
        const fetchState = async () => {
            try {
                const response = await fetch('https://flask-backend-app-7pvn.onrender.com/settings_page/get_state?user_id=1');
                if (response.ok) {
                    const data = await response.json();
                    setSelectedPercentage(data.valve_opening_amount);
                    setValveState(data.default_open);
                } else {
                    console.error('Failed to fetch settings state');
                }
            } catch (error) {
                console.error('Error fetching settings state:', error);
            }
        };
        fetchState();
    }, []);

    const handlePercentageChange = (event) => {
        setSelectedPercentage(event.target.value);
    };

    const handleValveStateChange = (event) => {
        setValveState(event.target.value);
    };

    const handleSubmit = async () => {

        try {
            const response = await fetch('https://flask-backend-app-7pvn.onrender.com/settings_page/set_state', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user_id: 1, // This would normally come from user authentication
                  valve_opening_amount: selectedPercentage,
                  default_open: valveState
                }),
            });

            if (response.ok) {
                alert('Settings saved successfully!');
            } else {
                console.error('Failed to save settings state');
            }
        } catch (error) {
            console.error('Error saving settings state:', error);
        }
    };

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
                    Settings
                </Typography>
                <Container sx={{ textAlign: 'center', marginTop: '60px' }}>
                    <Typography variant="h6" sx={{
                        fontFamily: "'Nunito', sans-serif", 
                        color:'#84a7b8'
                    }}>
                        Select Valve Opening Amount
                    </Typography>
                    <Box sx={{ marginBottom: 2 }}>
                      <Select
                        sx={{ 
                          maxWidth: '300px',
                          width: '100%',
                        }}
                        value={selectedPercentage}
                        onChange={handlePercentageChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Select Percentage' }}
                      >
                        <MenuItem value="" disabled>Select Percentage</MenuItem>
                        {[...Array(20).keys()].map(i => {
                          const percentage = (i + 1) * 5;
                          return (
                            <MenuItem key={percentage} value={percentage}>
                              {percentage}%
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Box>

                    <Typography variant="h6" sx={{
                        fontFamily: "'Nunito', sans-serif",
                        color:'#84a7b8'
                    }}>
                        Select Valve State
                    </Typography>
                    <Box sx={{ marginBottom: 2 }}>
                      <Select
                        sx={{ 
                          maxWidth: '300px',
                          width: '100%',
                        }}
                        value={valveState}
                        onChange={handleValveStateChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Select Valve State' }}
                      >
                        <MenuItem value="" disabled>Select Valve State</MenuItem>
                        <MenuItem value="1">Normally Open</MenuItem>
                        <MenuItem value="0">Normally Closed</MenuItem>
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

export default SettingsPage;
