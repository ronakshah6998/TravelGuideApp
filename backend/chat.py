import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SWIFTCHAT_API_KEY = os.getenv('SWIFTCHAT_API_KEY')
SWIFTCHAT_API_URL = 'https://api.swiftchat.example.com/v1'  # Placeholder URL

class ChatService:
    def __init__(self):
        self.api_key = SWIFTCHAT_API_KEY
        self.api_url = SWIFTCHAT_API_URL
        self.conversation_history = {}
    
    def get_mock_response(self, message, user_id, location=None):
        """Generate mock responses when using dummy API key"""
        # Check if this is a new conversation
        if user_id not in self.conversation_history:
            self.conversation_history[user_id] = []
        
        # Add user message to history
        self.conversation_history[user_id].append({"role": "user", "content": message})
        
        # Generate appropriate response based on message content
        response = ""
        message_lower = message.lower()
        
        if "hello" in message_lower or "hi" in message_lower:
            response = "Hello! How can I help you with your travel plans today?"
        
        elif "recommend" in message_lower or "suggest" in message_lower:
            if location:
                response = f"Based on your interest in {location}, I'd recommend visiting the local landmarks and trying the regional cuisine. Would you like specific recommendations for attractions in {location}?"
            else:
                response = "I'd be happy to recommend some destinations! Are you interested in beaches, mountains, cities, or historical sites?"
        
        elif "hotel" in message_lower or "accommodation" in message_lower:
            if location:
                response = f"There are several great hotels in {location} for different budgets. Would you like luxury options or more affordable stays?"
            else:
                response = "I can help you find accommodations. Which city are you planning to visit?"
        
        elif "restaurant" in message_lower or "food" in message_lower or "eat" in message_lower:
            if location:
                response = f"{location} has amazing food options! From local street food to fine dining, there's something for everyone. Would you like me to suggest some popular restaurants?"
            else:
                response = "I'd be happy to recommend restaurants. Which cuisine are you interested in?"
        
        elif "weather" in message_lower or "temperature" in message_lower or "climate" in message_lower:
            if location:
                response = f"The weather in {location} is typically pleasant this time of year. Would you like more specific information about the current weather conditions?"
            else:
                response = "I can provide weather information. Which location are you interested in?"
        
        elif "transport" in message_lower or "getting around" in message_lower:
            if location:
                response = f"In {location}, you can get around using public transportation, taxis, or rental cars. The public transit system is quite efficient and affordable."
            else:
                response = "There are many transportation options for travelers. Which city are you asking about?"
        
        elif "thank" in message_lower:
            response = "You're welcome! Feel free to ask if you need any more travel assistance."
        
        elif "bye" in message_lower or "goodbye" in message_lower:
            response = "Goodbye! Have a wonderful trip and don't hesitate to chat again if you need more information."
        
        else:
            response = "I'm your travel assistant and can help with recommendations, accommodations, restaurants, weather information, and transportation options. How can I assist with your travel plans today?"
        
        # Add assistant response to history
        self.conversation_history[user_id].append({"role": "assistant", "content": response})
        
        return {
            "message": response,
            "conversation_id": user_id,
            "status": "success"
        }
    
    def send_message(self, message, user_id, location=None):
        """Send a message to the SwiftChat API and get a response"""
        # If using dummy API key, return mock response
        if self.api_key.startswith('dummy_'):
            return self.get_mock_response(message, user_id, location)
        
        # For real API implementation
        try:
            headers = {
                'Authorization': f'Bearer {self.api_key}',
                'Content-Type': 'application/json'
            }
            
            payload = {
                'message': message,
                'user_id': user_id,
                'context': {
                    'location': location
                } if location else {}
            }
            
            response = requests.post(
                f"{self.api_url}/chat",
                headers=headers,
                json=payload
            )
            response.raise_for_status()
            return response.json()
        
        except requests.exceptions.RequestException as e:
            # Fallback to mock response if API call fails
            print(f"API call failed: {str(e)}")
            return self.get_mock_response(message, user_id, location)

# Create a singleton instance
chat_service = ChatService()
