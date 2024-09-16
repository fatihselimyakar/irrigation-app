import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, IconButton } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import logo_image from './images/irrigation.svg'; // Logo dosyasının yolu
import timer_image from './images/timer.png';
import manual_image from './images/irrigation.png';
import setting_image from './images/setting.png';
import './App.css'; // CSS animasyonları için
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSwipeable } from 'react-swipeable';
import TimerPage from './pages/TimerPage';
import ManualPage from './pages/ManualPage';
import SettingsPage from './pages/SettingsPage';


const options = [
  {
    id: 1,
    logo: timer_image,
    title: "Irrigation Timer",
    description: "Irrigation timers automate watering, ensuring plants receive the right amount of water.",
    path: "/timer"
  },
  {
    id: 2,
    logo: manual_image,
    title: "Manual Irrigation",
    description: "Manual irrigation allows you to control watering schedules and amounts manually.",
    path: "/manual"
  },
  {
    id: 3,
    logo: setting_image,
    title: "Settings",
    description: "Configure your irrigation system settings for optimal performance and efficiency.",
    path: "/settings"
  },
];

const PageTitle = ({ title }) => (
  <Typography
    variant="h4"
    sx={{
      position: 'absolute',
      top: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1,
      fontFamily: "'Nunito', sans-serif",  // El yazısı fontu
      fontSize: '2.5rem',  // Daha büyük ve dikkat çekici font boyutu
      color: '#333',  // Renk
      fontWeight: 'bold',
      letterSpacing: '2px',  // Harfler arasında biraz boşluk
    }}
  >
    {title}
  </Typography>
);


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainPage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/manual" element={<ManualPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

function MainPage() {
  const [showAnimation, setShowAnimation] = useState(true); // Animasyonu kontrol etmek için
  const [selectedOption, setSelectedOption] = useState(0); // Seçilen seçenek
  const [transitioning, setTransitioning] = useState(false); // Geçiş animasyonu kontrolü
  const navigate = useNavigate();

  useEffect(() => {
    // 3 saniye sonra animasyonu gizle
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePrevious = () => {
    setTransitioning(true);
    setTimeout(() => {
      setSelectedOption((prev) => (prev === 0 ? options.length - 1 : prev - 1));
      setTransitioning(false);
    }, 500); // Geçiş animasyonu süresi
  };

  const handleNext = () => {
    setTransitioning(true);
    setTimeout(() => {
      setSelectedOption((prev) => (prev === options.length - 1 ? 0 : prev + 1));
      setTransitioning(false);
    }, 500); // Geçiş animasyonu süresi
  };

  const handleChoose = () => {
    navigate(options[selectedOption].path);
  };

  // Swipeable event handlers
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'block',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 0,
        textAlign: 'center',
        '@media (minWidth: 600px)': {
          maxWidth: 'md',
        },
      }}
    >
      
      {showAnimation ? (
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            animation: 'colorChange 2s linear infinite',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            zIndex: 2,
          }}
        >
          <PageTitle title="Irrigation App" />
          <img
            src={logo_image}
            alt="Loading Logo"
            style={{ width: '150px', height: '150px', animation: 'App-logo-spin 2s linear infinite' }}
          />
        </Box>
        
      ) : (
        <Box
          {...handlers}
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingBottom: '20px',
            '@media (minWidth: 600px)': {
              justifyContent: 'center',
            },
          }}
        >
          {/* Noktalar */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 12 }}>
            {options.map((option, index) => (
              <Box
                key={option.id}
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: selectedOption === index ? '#84a7b8' : '#aec1ca',
                  margin: '5px',
                }}
              />
            ))}
          </Box>

          {/* Seçenek */}
          <Box
            sx={{
              textAlign: 'center',
              flexGrow: 1,
              position: 'relative',
              width: '100%',
              height: '60%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'opacity 0.5s ease-in-out',
              opacity: transitioning ? 0 : 1,
            }}
          >
            <img
              src={options[selectedOption].logo}
              alt="Option Logo"
              style={{
                width: '200px',
                height: '200px',
                '@media (minWidth: 600px)': {
                  width: '120px',
                  height: '120px',
                },
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color:'#84a7b8',
                fontWeight: 'bold',
                fontFamily: "'Nunito', sans-serif",  // El yazısı fontu
                mt: 5,
                '@media (minWidth: 600px)': {
                  fontSize: '2rem',
                },
              }}
            >
              {options[selectedOption].title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'grey',
                fontFamily: "'Nunito', sans-serif",  // El yazısı fontu
                mt: 5,
                '@media (minWidth: 600px)': {
                  fontSize: '1.2rem',
                },
              }}
            >
              {options[selectedOption].description}
            </Typography>
          </Box>

          {/* Oklarla geçiş */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
            <IconButton onClick={handlePrevious}>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton onClick={handleNext}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>

          {/* Choose Butonu */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleChoose}
            sx={{
              position: 'relative',
              top:'100px',
              bottom: '40px',
              height:'50px',
              width: '70%',
              fontSize: 'rem',
              borderRadius: '50px',
              background: 'linear-gradient(45deg, #84a7b8 30%, #aec1ca 90%)',
              boxShadow: '0 6px 10px 4px rgba(110, 138, 152, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #aec1ca 30%, #84a7b8 90%)',
              },
              '@media (minWidth: 600px)': {
                width: '30%',
                fontSize: '1.2rem',
              },
            }}
          >
             <Typography variant="h6"  sx={{
                        fontFamily: "'Nunito', sans-serif",  // El yazısı fontu
                    }}>Choose</Typography>
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default App;
