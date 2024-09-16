import React from 'react';
import { Box } from '@mui/material';
import logo_image from '../images/irrigation.svg'; // Logo dosyasının yolu

const TaskBar = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '60px',
      backgroundColor: '#84a7b8', // Açık gri arka plan rengi
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 10, // Üstteki katman olması için
    }}
  >
    <img
      src={logo_image}
      alt="Logo"
      style={{ width: '50px', height: '50px' }}
    />
  </Box>
);

export default TaskBar;
