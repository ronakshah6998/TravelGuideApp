import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ 
      background: 'linear-gradient(90deg, #4285f4 0%, #34a853 100%)',
      boxShadow: 'none'
    }}>
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <PublicIcon sx={{ mr: 1.5, fontSize: 28, color: 'white' }} />
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: 500, 
                  fontFamily: '"Google Sans", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  letterSpacing: '0.25px',
                  color: 'white'
                }}
              >
                World Travel Guide
              </Typography>
            </Box>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                opacity: 0.9, 
                fontSize: '0.9rem',
                fontFamily: '"Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                color: 'white'
              }}
            >
              Discover amazing destinations around the world
            </Typography>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/" 
              sx={{ 
                mx: 1, 
                fontFamily: '"Google Sans", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 500,
                fontSize: '0.9rem',
                letterSpacing: '0.25px',
                textTransform: 'none'
              }}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/features" 
              sx={{ 
                mx: 1, 
                fontFamily: '"Google Sans", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 500,
                fontSize: '0.9rem',
                letterSpacing: '0.25px',
                textTransform: 'none'
              }}
            >
              Features
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/about" 
              sx={{ 
                mx: 1, 
                fontFamily: '"Google Sans", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 500,
                fontSize: '0.9rem',
                letterSpacing: '0.25px',
                textTransform: 'none'
              }}
            >
              About
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
