import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Configuration
class APIConfig:
    # GEOdb API configuration
    GEO_API_KEY = os.environ['GEO_API_KEY']  # This will raise an error if the key is not in .env
    GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1'
    
    # SwiftChat API configuration
    SWIFTCHAT_API_KEY = os.getenv('SWIFTCHAT_API_KEY', 'dummy_swiftchat_key_67890xyz')
    SWIFTCHAT_API_URL = 'https://api.swiftchat.example.com/v1'  # Placeholder URL
    
    # Feature flags
    USE_MOCK_DATA = False  # Set to False to always use the real API
    
    @classmethod
    def update_geo_api_key(cls, new_key):
        """Update the GEOdb API key at runtime"""
        cls.GEO_API_KEY = new_key
        cls.USE_MOCK_DATA = new_key.startswith('dummy_')
        return {"status": "success", "message": f"API key updated. Using {'mock' if cls.USE_MOCK_DATA else 'real'} data."}
    
    @classmethod
    def get_geo_headers(cls):
        """Get the headers for GEOdb API requests"""
        print(f"Using API key: {cls.GEO_API_KEY[:5]}...{cls.GEO_API_KEY[-5:]}")
        return {
            'X-RapidAPI-Key': cls.GEO_API_KEY,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }

# Export the config instance
config = APIConfig()
