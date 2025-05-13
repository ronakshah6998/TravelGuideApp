import React, { useState, useEffect } from 'react';
import { getCityImage } from '../utils/imageUtils';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  Breadcrumbs,
  Link,
  Chip,
  Divider,
  Paper
} from '@mui/material';
import { getCityDetails } from '../services/api';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import InfoIcon from '@mui/icons-material/Info';

const CityPage = () => {
  const { cityId } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // We'll use the API data for city details

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        setLoading(true);
        const data = await getCityDetails(cityId);
        if (!data?.data) {
          throw new Error('City data not found');
        }
        setCity(data.data);
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to load city details');
      } finally {
        setLoading(false);
      }
    };

    fetchCityDetails();
  }, [cityId]);

  if (loading && !city) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }


  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!city) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="info">City not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
        <Link
          underline="hover"
          color="inherit"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`/country/${city.countryId}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/country/${city.countryId}`);
          }}
        >
          {city.country}
        </Link>
        <Typography color="text.primary">
          {city.name}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={getCityImage(city, { name: city.country })}
              alt={city.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom>
                {city.name}, {city.country}
              </Typography>
              
              <Box display="flex" alignItems="center" mb={2}>
                <LocationOnIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" color="text.secondary">
                  {city.region}, {city.country}
                </Typography>
              </Box>
              
              {city.wikiDataId && (
                <Box display="flex" alignItems="center" mb={3}>
                  <LanguageIcon color="action" sx={{ mr: 1 }} />
                  <Link 
                    href={`https://www.wikidata.org/wiki/${city.wikiDataId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    color="primary"
                  >
                    View on Wikidata
                  </Link>
                </Box>
              )}
              
              <Divider sx={{ my: 3 }} />
              
              <Box mb={3}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <InfoIcon sx={{ mr: 1 }} /> About {city.name}
                </Typography>
                <Typography variant="body1" paragraph>
                  {city.name} is a beautiful city located in {city.region}, {city.country}. 
                  Known for its rich history, vibrant culture, and stunning landscapes, 
                  {city.name} offers visitors a unique travel experience.
                </Typography>
                <Typography variant="body1">
                  The city is located at latitude {city.latitude?.toFixed(4)} and longitude {city.longitude?.toFixed(4)}.
                </Typography>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box>
                <Typography variant="h6" gutterBottom>Quick Facts</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                      <Typography variant="subtitle2" color="text.secondary">Country</Typography>
                      <Typography variant="body1">{city.country}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                      <Typography variant="subtitle2" color="text.secondary">Region</Typography>
                      <Typography variant="body1">{city.region}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                      <Typography variant="subtitle2" color="text.secondary">Latitude</Typography>
                      <Typography variant="body1">{city.latitude?.toFixed(4)}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                      <Typography variant="subtitle2" color="text.secondary">Longitude</Typography>
                      <Typography variant="body1">{city.longitude?.toFixed(4)}</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Location</Typography>
              <Box 
                sx={{ 
                  height: 300, 
                  width: '100%',
                  bgcolor: 'grey.200',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1
                }}
              >
                <Typography color="text.secondary">Map View</Typography>
              </Box>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Nearby Attractions</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {['Historic Center', 'Local Museum', 'Main Square', 'City Park', 'Shopping District'].map((attraction) => (
                  <Chip 
                    key={attraction} 
                    label={attraction} 
                    variant="outlined" 
                    size="small"
                  />
                ))}
              </Box>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Travel Tips</Typography>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                <li><Typography variant="body2">Best time to visit: Spring or Fall</Typography></li>
                <li><Typography variant="body2">Local currency: {city.currencyCode || 'USD'}</Typography></li>
                <li><Typography variant="body2">Language: {city.language || 'English'}</Typography></li>
                <li><Typography variant="body2">Time zone: {city.timezone || 'UTC'}</Typography></li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CityPage;
