/**
 * Utility functions for handling images in the travel guide application
 */

/**
 * Returns a reliable image URL for a city
 * @param {Object} city - The city object
 * @param {Object} country - The country object
 * @returns {string} - URL to an image for the city
 */
export const getCityImage = (city, country) => {
  // Map of city names to specific image URLs
  const cityImages = {
    'New York': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop',
    'Los Angeles': 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&auto=format&fit=crop',
    'Chicago': 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&auto=format&fit=crop',
    'Houston': 'https://images.unsplash.com/photo-1572981986848-b6f1c8a710a1?w=800&auto=format&fit=crop',
    'Phoenix': 'https://images.unsplash.com/photo-1558712526-cfa9350e8213?w=800&auto=format&fit=crop',
    'Philadelphia': 'https://images.unsplash.com/photo-1601332069884-11fdb174a2b2?w=800&auto=format&fit=crop',
    'London': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop',
    'Manchester': 'https://images.unsplash.com/photo-1519863528809-c6a8b9f0a6f8?w=800&auto=format&fit=crop',
    'Liverpool': 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?w=800&auto=format&fit=crop',
    'Tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop',
    'Osaka': 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&auto=format&fit=crop',
    'Kyoto': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop',
    'Paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
    'Marseille': 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=800&auto=format&fit=crop',
    'Lyon': 'https://images.unsplash.com/photo-1603069692898-9342aa7ab29e?w=800&auto=format&fit=crop',
    'Rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop',
    'Milan': 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=800&auto=format&fit=crop',
    'Naples': 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&auto=format&fit=crop',
    'Madrid': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&auto=format&fit=crop',
    'Barcelona': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop',
    'Valencia': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop',
    'Berlin': 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&auto=format&fit=crop',
    'Munich': 'https://images.unsplash.com/photo-1595867818082-083862f3d630?w=800&auto=format&fit=crop',
    'Hamburg': 'https://images.unsplash.com/photo-1558033004-7a7bfbd0fe8b?w=800&auto=format&fit=crop',
    'Sydney': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&auto=format&fit=crop',
    'Melbourne': 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&auto=format&fit=crop',
    'Brisbane': 'https://images.unsplash.com/photo-1566734904496-9309bb1798b3?w=800&auto=format&fit=crop'
  };

  // Country-specific fallback images
  const countryFallbacks = {
    'United States': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop',
    'United Kingdom': 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&auto=format&fit=crop',
    'Japan': 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&auto=format&fit=crop',
    'France': 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&auto=format&fit=crop',
    'Italy': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&auto=format&fit=crop',
    'Spain': 'https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=800&auto=format&fit=crop',
    'Germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop',
    'Australia': 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&auto=format&fit=crop'
  };

  // Generic city images for random assignment
  const genericCityImages = [
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470219556762-1771e7f9427d?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502899576159-f224dc2349fa?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop'
  ];

  // Try to get a specific image for the city
  if (cityImages[city.name]) {
    return cityImages[city.name];
  }
  
  // Try to get a country-specific fallback
  if (country && countryFallbacks[country.name]) {
    return countryFallbacks[country.name];
  }
  
  // Use a generic city image based on the city ID for consistency
  const cityId = parseInt(city.id) || Math.floor(Math.random() * 10000);
  return genericCityImages[cityId % genericCityImages.length];
};
