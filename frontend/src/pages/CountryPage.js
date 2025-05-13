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
  Button, 
  Box, 
  CircularProgress, 
  Alert,
  Breadcrumbs,
  Link
} from '@mui/material';
import '../styles/CityPage.css';
import { getCountries, getCities } from '../services/api';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Image utility function has been moved to ../utils/imageUtils.js

const CountryPage = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const limit = 9;

  // API data will be used for countries and cities

  useEffect(() => {
    // Reset cities and offset when country changes
    if (countryId) {
      setCities([]);
      setOffset(0);
    }
  }, [countryId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get the country details from the list of countries
        const countriesData = await getCountries();
        const countryData = countriesData?.data?.find(c => c.id === countryId);
        if (!countryData) {
          throw new Error('Country not found');
        }
        setCountry(countryData);
        
        // Fetch cities for the country
        const citiesData = await getCities(countryId, offset * limit);
        const citiesList = citiesData?.data || [];
        
        // If this is the first page, replace cities, otherwise append new ones
        if (offset === 0) {
          setCities(citiesList);
        } else {
          // Add only cities that aren't already in the list
          setCities(prev => {
            const existingIds = new Set(prev.map(city => city.id));
            const newCities = citiesList.filter(city => !existingIds.has(city.id));
            return [...prev, ...newCities];
          });
        }
        
        setHasMore((citiesData?.metadata?.totalCount || 0) > (offset + 1) * limit);
        
        setError('');
      } catch (err) {
        setHasMore(false);
        setError(err.message || 'Failed to load country data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [countryId, offset, limit]);

  const handleLoadMore = () => {
    setOffset(prev => prev + 1);
  };

  const handleCityClick = (city) => {
    navigate(`/city/${city.id}`);
  };

  if (loading && !country) {
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
        <Typography color="text.primary">
          {country?.name || 'Country'}
        </Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {country?.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {country?.region} • {country?.continent}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Explore the beautiful cities of {country?.name} and discover amazing destinations for your next trip.
        </Typography>
      </Box>

      <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 3 }}>
        Popular Cities
      </Typography>
      
      <div className="city-grid">
        {(() => {
          const cards = cities.map((city) => (
            <div className="city-card-container" key={city.id}>
              <div className="city-card" onClick={() => handleCityClick(city)}>
                <img 
                  className="city-image"
                  src={getCityImage(city, country)}
                  alt={city.name}
                />
                <div className="city-content">
                  <div className="city-name">{city.name}</div>
                  <div className="city-region">{city.region}</div>
                  <Button 
                    className="explore-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCityClick(city);
                    }}
                  >
                    Explore →
                  </Button>
                </div>
              </div>
            </div>
          ));
          
          // Add invisible placeholders if needed to fill the last row
          const remainder = cards.length % 4;
          if (remainder !== 0) {
            for (let i = 0; i < 4 - remainder; i++) {
              cards.push(<div className="city-card-container placeholder" key={`empty-${i}`}></div>);
            }
          }
          return cards;
        })()}
      </div>

      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
          <Button 
            variant="outlined" 
            onClick={handleLoadMore} 
            disabled={loading}
            sx={{ 
              borderRadius: '24px', 
              textTransform: 'none',
              px: 3,
              py: 1,
              fontFamily: '"Google Sans", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 500,
              fontSize: '0.9rem',
              letterSpacing: '0.25px',
              color: 'var(--primary-blue)',
              borderColor: 'var(--primary-blue)'
            }}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CountryPage;
