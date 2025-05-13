import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  Paper,
  Avatar,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupIcon from '@mui/icons-material/Group';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      bio: 'Travel enthusiast with over 15 years of experience in the tourism industry. Founded Travel Guide to help people discover the world more easily.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Sarah Chen',
      role: 'Chief Technology Officer',
      bio: 'Tech expert with a passion for creating innovative solutions. Leads our development team in building cutting-edge travel tools.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Miguel Rodriguez',
      role: 'Head of Content',
      bio: 'Former travel journalist who has visited over 50 countries. Ensures our travel guides provide authentic and valuable information.',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg'
    },
    {
      name: 'Priya Patel',
      role: 'UX/UI Designer',
      bio: 'Design specialist focused on creating intuitive and beautiful user experiences for travelers of all backgrounds.',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom>
          About Travel Guide
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Helping travelers explore the world with confidence since 2020
        </Typography>
      </Box>

      {/* Mission Statement */}
      <Paper elevation={3} sx={{ p: 4, mb: 6, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          At Travel Guide, we believe that travel has the power to transform lives, broaden perspectives, and create meaningful connections across cultures. Our mission is to make travel planning accessible, informative, and enjoyable for everyone.
        </Typography>
        <Typography variant="body1">
          We strive to provide accurate, up-to-date information about destinations worldwide, helping travelers make informed decisions and discover the perfect places for their unique interests and needs.
        </Typography>
      </Paper>

      {/* What Sets Us Apart */}
      <Box mb={6}>
        <Typography variant="h4" component="h2" gutterBottom>
          What Sets Us Apart
        </Typography>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <PublicIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5">Global Coverage</Typography>
                </Box>
                <Typography variant="body1">
                  Our database includes information on over 200 countries and thousands of cities worldwide, providing comprehensive coverage for travelers exploring any corner of the globe.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <EmojiObjectsIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5">Smart Recommendations</Typography>
                </Box>
                <Typography variant="body1">
                  Our AI-powered travel assistant provides personalized recommendations based on your preferences, helping you discover hidden gems and must-see attractions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <GroupIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5">Community-Driven</Typography>
                </Box>
                <Typography variant="body1">
                  We incorporate insights from real travelers, ensuring our information reflects authentic experiences rather than just tourist brochures.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <SecurityIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5">Trustworthy Information</Typography>
                </Box>
                <Typography variant="body1">
                  Our content team rigorously verifies all information to ensure accuracy and reliability, so you can plan your trips with confidence.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Our Team */}
      <Box mb={6}>
        <Typography variant="h4" component="h2" gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} mt={2}>
          {teamMembers.map((member, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h6" component="h3">
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {member.role}
                </Typography>
                <Typography variant="body2">
                  {member.bio}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Our Values */}
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Values
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Authenticity" 
              secondary="We believe in presenting destinations as they truly are, highlighting both their beauty and challenges."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Inclusivity" 
              secondary="We strive to make travel information accessible to everyone, regardless of background or ability."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Sustainability" 
              secondary="We promote responsible travel practices that respect local communities and environments."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Curiosity" 
              secondary="We encourage travelers to explore beyond the obvious and discover the unique aspects of each destination."
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default AboutPage;
