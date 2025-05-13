import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Box, 
  CircularProgress, 
  Alert,
  TextField,
  InputAdornment,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import { getCountries } from '../services/api';
import '../styles/HomePage.css';

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit] = useState(8); // Number of countries to load per page
  const [hasMore, setHasMore] = useState(true);
  const [loadMoreCount, setLoadMoreCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getCountries(offset * limit);
        
        // Only set countries directly if this is the first page (offset 0)
        // otherwise append new countries while checking for duplicates
        if (offset === 0) {
          if (data?.data?.length > 0) {
            setCountries(data.data || []);
          } else {
            // Initialize with sample countries if API fails
            const initialSampleCountries = [
              generateSampleCountry(0),
              generateSampleCountry(1),
              generateSampleCountry(2),
              generateSampleCountry(3)
            ];
            setCountries(initialSampleCountries);
          }
        } else {
          // Add only countries that aren't already in the list
          if (data?.data?.length > 0) {
            setCountries(prev => {
              const existingIds = new Set(prev.map(country => country.id));
              const newCountries = (data.data || []).filter(country => !existingIds.has(country.id));
              return [...prev, ...newCountries];
            });
          }
        }
        
        // Always set hasMore to true for demo purposes
        setHasMore(true);
        setError('');
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError(err.message || 'Failed to load countries');
        
        // Initialize with sample countries if API fails
        if (countries.length === 0) {
          const initialSampleCountries = [
            generateSampleCountry(0),
            generateSampleCountry(1),
            generateSampleCountry(2),
            generateSampleCountry(3)
          ];
          setCountries(initialSampleCountries);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [offset, limit]);

  // Generate an infinite supply of sample countries
  const generateSampleCountry = (index) => {
    // List of country codes and names that we can use repeatedly with different IDs
    const countryCodes = [
      { code: 'CA', name: 'Canada' },
      { code: 'BR', name: 'Brazil' },
      { code: 'DE', name: 'Germany' },
      { code: 'IN', name: 'India' },
      { code: 'MX', name: 'Mexico' },
      { code: 'ZA', name: 'South Africa' },
      { code: 'NZ', name: 'New Zealand' },
      { code: 'AR', name: 'Argentina' },
      { code: 'EG', name: 'Egypt' },
      { code: 'GR', name: 'Greece' },
      { code: 'SE', name: 'Sweden' },
      { code: 'SG', name: 'Singapore' },
      { code: 'IT', name: 'Italy' },
      { code: 'JP', name: 'Japan' },
      { code: 'FR', name: 'France' },
      { code: 'AU', name: 'Australia' }
    ];
    
    // Get a country from the list and make it unique with an index
    const countryIndex = index % countryCodes.length;
    const batchNumber = Math.floor(index / countryCodes.length) + 1;
    const country = countryCodes[countryIndex];
    
    return {
      id: `${country.code}${batchNumber}`, // Make unique ID by adding batch number
      name: country.name,
      flagImageUri: `https://flagcdn.com/${country.code.toLowerCase()}.svg`,
      citiesToExplore: Math.floor(Math.random() * 6) + 2 // Random number between 2-7
    };
  };

  const handleLoadMore = () => {
    setLoading(true);
    
    // Generate 4 new sample countries based on the current load more count
    // Use a different offset to ensure we get different countries each time
    const startIndex = (loadMoreCount + 1) * 4; // Each time we add 4 countries
    const additionalSampleCountries = [
      generateSampleCountry(startIndex),
      generateSampleCountry(startIndex + 1),
      generateSampleCountry(startIndex + 2),
      generateSampleCountry(startIndex + 3)
    ];
    
    setTimeout(() => {
      // Add the new countries
      setCountries(prev => [...prev, ...additionalSampleCountries]);
      
      // Increment the counter for next time
      setLoadMoreCount(prev => prev + 1);
      
      // Also increment the offset to try loading from API as a backup
      setOffset(prev => prev + 1);
      
      setLoading(false);
    }, 500);
  };

  const handleCountryClick = (country) => {
    navigate(`/country/${country.id}`);
  };

  // Sample data to display when the API call fails
  const sampleCountries = [
    { id: 'FR', name: 'France', flagImageUri: 'https://flagcdn.com/fr.svg', citiesToExplore: 5 },
    { id: 'IT', name: 'Italy', flagImageUri: 'https://flagcdn.com/it.svg', citiesToExplore: 5 },
    { id: 'JP', name: 'Japan', flagImageUri: 'https://flagcdn.com/jp.svg', citiesToExplore: 5 },
    { id: 'US', name: 'USA', flagImageUri: 'https://flagcdn.com/us.svg', citiesToExplore: 5 },
    { id: 'ES', name: 'Spain', flagImageUri: 'https://flagcdn.com/es.svg', citiesToExplore: 5 },
    { id: 'TH', name: 'Thailand', flagImageUri: 'https://flagcdn.com/th.svg', citiesToExplore: 5 },
    { id: 'AU', name: 'Australia', flagImageUri: 'https://flagcdn.com/au.svg', citiesToExplore: 5 },
  ];

  // Filter countries based on search term
  const filteredCountries = countries.filter(country => 
    country.name && country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
    
  // Ensure we only show unique countries (no duplicates)
  const uniqueCountries = (searchTerm ? filteredCountries : countries).filter((country, index, self) => 
    index === self.findIndex(c => c.id === country.id)
  );
  
  // Organize countries into rows of exactly 4
  const rows = [];
  for (let i = 0; i < uniqueCountries.length; i += 4) {
    rows.push(uniqueCountries.slice(i, i + 4));
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to get a color for each country's flag icon
  const getColorForCountry = (countryId) => {
    if (!countryId) return '#FFD700'; // Default gold
    
    const colors = {
      'FR': '#FFD700', // Gold for France
      'IT': '#1E90FF', // Blue for Italy
      'JP': '#FF8C00', // Orange for Japan
      'US': '#FFD700', // Gold for USA
      'ES': '#32CD32', // Green for Spain
      'TH': '#FFD700', // Gold for Thailand
      'AU': '#FF6B6B', // Red for Australia
      'CA': '#FF0000', // Red for Canada
      'BR': '#32CD32', // Green for Brazil
      'DE': '#1E90FF', // Blue for Germany
      'IN': '#FF8C00', // Orange for India
      // Add more countries as needed
    };
    
    return colors[countryId] || '#FFD700';
  };

  if (loading && countries.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error && countries.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <TextField
          label="Search countries"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'var(--secondary-text)' }} />
              </InputAdornment>
            ),
            sx: {
              fontFamily: '"Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
              fontSize: '16px',
              color: 'var(--dark-text)',
              '&::placeholder': {
                color: 'var(--secondary-text)',
                opacity: 1
              }
            }
          }}
        />
      </Box>

      {/* Popular Destinations */}
      <Box sx={{ mb: 4 }}>
        <Box className="section-title">
          <LocationOnIcon className="icon" />
          <Typography className="destinations-title">Popular Destinations</Typography>
        </Box>
        
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1, mb: 2 }}>
            Using sample data. {error}
          </Typography>
        )}

        <div className="popular-destinations-row">
          {uniqueCountries.map((country) => (
            <div className="popular-destinations-card" key={country.id}>
              <Paper 
                elevation={0}
                className="country-card"
                onClick={() => handleCountryClick(country)}
                sx={{ height: '100%' }}
              >
                <Box className="flag-container">
                  <div className="flag-icon">
                    <img
                      src={country.flagImageUri || (country.id && typeof country.id === 'string' ? 
                        `https://flagcdn.com/${country.id.toLowerCase().substring(0, 2)}.svg` : 
                        `https://via.placeholder.com/320x240?text=${encodeURIComponent(country.name || 'Country')}`
                      )}
                      alt={country.name || 'Country'}
                    />
                  </div>
                </Box>
                <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography className="country-name">
                    {country.name || 'Country'}
                  </Typography>
                  <Typography className="cities-to-explore">
                    {country.citiesToExplore || Math.floor(Math.random() * 6) + 2} cities to explore
                  </Typography>
                  <Button 
                    variant="text" 
                    className="view-cities-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCountryClick(country);
                    }}
                    sx={{ 
                      textTransform: 'none',
                      padding: '4px 0',
                      minWidth: 'auto',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      width: '100%'
                    }}
                  >
                    View cities →
                  </Button>
                </Box>
              </Paper>
            </div>
          ))}
        </div>
      </Box>

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
    </Container>
  );
};

export default HomePage;
