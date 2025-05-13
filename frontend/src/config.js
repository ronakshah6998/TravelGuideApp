const config = {
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
    timeout: 30000, // 30 seconds
  },

  // Google Maps Configuration
  googleMaps: {
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    defaultCenter: { lat: 20.5937, lng: 78.9629 }, // Center of India
    defaultZoom: 5,
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
  },


  // UI Configuration
  ui: {
    theme: {
      primaryColor: '#1976d2',
      secondaryColor: '#dc004e',
      borderRadius: 4,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  },

  // Feature Flags
  features: {
    enableAnalytics: false,
    enableOfflineMode: false,
  },

  // External Links
  links: {
    documentation: 'https://example.com/docs',
    github: 'https://github.com/yourusername/travel-guide',
    contactEmail: 'contact@example.com',
  },

  // Default values
  defaults: {
    countryImage: 'https://source.unsplash.com/random/800x400/?landscape',
    cityImage: 'https://source.unsplash.com/random/800x400/?city',
    avatarImage: 'https://i.pravatar.cc/150?img=32',
  },
};

export default config;
