import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f8f9fa',
        p: 2,
        mt: 'auto',
        borderTop: '1px solid #eaeaea',
        fontSize: '0.875rem',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontSize: '0.75rem' }}>
              {new Date().getFullYear()} World Travel Guide
            </Typography>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="#" color="inherit" underline="hover" sx={{ fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontSize: '0.75rem' }}>Terms</Link>
              <Link href="#" color="inherit" underline="hover" sx={{ fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontSize: '0.75rem' }}>Privacy</Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
