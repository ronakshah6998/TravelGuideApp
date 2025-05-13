import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import MapIcon from '@mui/icons-material/Map';
import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';

const FeaturesPage = () => {
  const features = [
    {
      title: 'Explore Countries',
      description: 'Discover detailed information about countries around the world, including demographics, geography, and cultural highlights.',
      icon: <ExploreIcon fontSize="large" />,
      image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'City Guides',
      description: 'Access comprehensive guides for major cities, featuring attractions, local tips, and essential travel information.',
      icon: <MapIcon fontSize="large" />,
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'Accommodation Finder',
      description: 'Find the perfect place to stay with our curated selection of hotels, hostels, and vacation rentals.',
      icon: <HotelIcon fontSize="large" />,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'Restaurant Recommendations',
      description: 'Discover local cuisine and top-rated restaurants with reviews from travelers and food enthusiasts.',
      icon: <RestaurantIcon fontSize="large" />,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'Transportation Options',
      description: 'Navigate your destination with ease using our comprehensive transportation guides and booking options.',
      icon: <DirectionsBusIcon fontSize="large" />,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'Flight Booking',
      description: 'Compare and book flights at the best prices with our integrated flight search engine.',
      icon: <FlightIcon fontSize="large" />,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'Travel Assistant',
      description: 'Get personalized travel advice and recommendations from our AI-powered chat assistant.',
      icon: <ChatIcon fontSize="large" />,
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      title: 'Travel Guides',
      description: 'Access detailed travel guides with insider tips, must-see attractions, and local recommendations.',
      icon: <InfoIcon fontSize="large" />,
      image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom>
          Features
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Discover all the tools and resources available to make your travel planning seamless and enjoyable.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={feature.image}
                alt={feature.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box color="primary.main" mr={2}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body1">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={3} sx={{ mt: 8, p: 4, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Coming Soon
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <List>
          <ListItem>
            <ListItemIcon>
              <ExploreIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Interactive Maps" 
              secondary="Explore destinations with our interactive maps featuring points of interest, routes, and local insights."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MapIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Offline Guides" 
              secondary="Download travel guides for offline access during your journeys."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ChatIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Community Forums" 
              secondary="Connect with fellow travelers, share experiences, and get advice from our global community."
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default FeaturesPage;
