import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CountryPage from './pages/CountryPage';
import CityPage from './pages/CityPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ChatWidget from './components/ChatWidget';
import './App.css';

// Import required MUI icons to ensure they're available
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#4dd0e1',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// LocationProvider to pass location context to ChatWidget
const LocationProvider = ({ children }) => {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Extract location from URL path
    const pathParts = location.pathname.split('/');
    if (pathParts.length >= 3 && pathParts[1] === 'country') {
      setCurrentLocation(pathParts[2]);
    } else if (pathParts.length >= 3 && pathParts[1] === 'city') {
      // For city pages, we could potentially get more specific location info
      setCurrentLocation(pathParts[2]);
    } else {
      setCurrentLocation(null);
    }
  }, [location]);

  return React.cloneElement(children, { currentLocation });
};

function AppContent({ currentLocation }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <Navbar />
      <Container component="main" maxWidth="lg" sx={{ flex: 1, pb: 8 }}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/country/:countryId" element={<CountryPage />} />
            <Route path="/city/:cityId" element={<CityPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </ErrorBoundary>
      </Container>
      <Footer />
      <Box sx={{ position: 'fixed', bottom: 0, right: 0, zIndex: 1000 }}>
        <ChatWidget location={currentLocation} />
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <LocationProvider>
          <AppContent />
        </LocationProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
