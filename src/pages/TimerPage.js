import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, TextField, Button, CircularProgress, Select, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BackButton from '../components/BackButton';
import dayjs from 'dayjs'; // Dayjs için import

const TimerPage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedHours, setSelectedHours] = useState('');
    const [selectedMinutes, setSelectedMinutes] = useState('');
    const [selectedDuration, setSelectedDuration] = useState('');
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch state when the component mounts
    useEffect(() => {
        const fetchState = async () => {
            try {
                const response = await fetch('https://flask-backend-app-7pvn.onrender.com/timer_page/get_state?user_id=1');
                if (response.ok) {
                    const data = await response.json();
                    setSelectedDate(data.selected_date ? dayjs(data.selected_date) : null);
                    setSelectedTime(data.selected_time ? dayjs(data.selected_time) : null);
                    setSelectedHours(data.selected_hours);
                    setSelectedMinutes(data.selected_minutes);
                    setSelectedDuration(data.selected_duration);
                } else {
                    console.error('Failed to fetch timer state');
                }
            } catch (error) {
                console.error('Error fetching timer state:', error);
            } finally {
                setLoading(false); // Make sure to set loading to false after fetching
            }
        };
        fetchState();
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleHoursChange = (event) => {
        setSelectedHours(event.target.value);
    };

    const handleMinutesChange = (event) => {
        setSelectedMinutes(event.target.value);
    };

    const handleDurationChange = (event) => {
        setSelectedDuration(event.target.value);
    };

    const handleSubmit = async () => {
        const stateData = {
            user_id: 1,
            selected_date: selectedDate ? selectedDate : null,
            selected_time: selectedTime ? selectedTime : null,
            selected_hours: selectedHours,
            selected_minutes: selectedMinutes,
            selected_duration: selectedDuration
        };

        try {
            const response = await fetch('https://flask-backend-app-7pvn.onrender.com/timer_page/set_state', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stateData),
            });

            if (response.ok) {
                alert('Timer settings saved successfully!');
            } else {
                console.error('Failed to save timer state');
            }
        } catch (error) {
            console.error('Error saving timer state:', error);
        }
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
                    Irrigation Timer
                </Typography>
                <Container sx={{ textAlign: 'center', marginTop: '60px' }}>
                    <Typography variant="h6" sx={{
                        fontFamily: "'Nunito', sans-serif", 
                        color:'#84a7b8'
                    }}>Select Date And Time</Typography>
                    <Box sx={{ marginBottom: 2 }}>
                        <DatePicker
                            label="Select Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{ maxWidth: '300px', width: '100%' }}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TimePicker
                            label="Select Time"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{ maxWidth: '300px', width: '100%' }}
                        />
                    </Box>
                    <Typography variant="h6" sx={{
                        fontFamily: "'Nunito', sans-serif",
                        color:'#84a7b8'
                    }}>Select Period</Typography>
                    <Box sx={{ marginBottom: 2 }}>
                        <Select
                            sx={{ 
                                maxWidth: '300px',
                                width: '100%',
                            }}
                            value={selectedHours}
                            onChange={handleHoursChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Select Hours' }}
                        >
                            <MenuItem value="" disabled>Select Hours</MenuItem>
                            {[...Array(24).keys()].map(hour => (
                                <MenuItem key={hour} value={hour}>{hour} hour{hour > 1 ? 's' : ''}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <Select
                            sx={{ 
                                maxWidth: '300px',
                                width: '100%',
                            }}
                            value={selectedMinutes}
                            onChange={handleMinutesChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Select Minutes' }}
                        >
                            <MenuItem value="" disabled>Select Minutes</MenuItem>
                            {[...Array(60).keys()].map(minute => (
                                <MenuItem key={minute} value={minute}>{minute} minute{minute > 1 ? 's' : ''}</MenuItem>
                            ))}
                        </Select>
                    </Box>
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
                            <MenuItem value="" disabled>Select Duration</MenuItem>
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

export default TimerPage
