import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => navigate('/')}
      sx={{
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
      }}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
};

export default BackButton;
