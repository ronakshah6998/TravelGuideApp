import os
import requests
import re
from dotenv import load_dotenv
from config import config

# Load environment variables
load_dotenv()

# Use the provided Swift Chat API key directly
SWIFTCHAT_API_KEY = '21bda582-e8d0-45bc-bb8b-a5c6c555d176'
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
        # Always use the Swift Chat API with our key
        try:
            print(f"Sending message to Swift Chat API: {message}")
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
            
            # For development/testing, log the request
            print(f"API Request to: {self.api_url}/chat")
            print(f"Headers: {headers}")
            print(f"Payload: {payload}")
            
            # Detect intent of the message
            message_lower = message.lower()
            
            # Check for specific query types
            is_capital_query = 'capital' in message_lower or ('what is the capital' in message_lower)
            is_population_query = 'population' in message_lower or ('how many people' in message_lower)
            is_largest_cities_query = ('largest cities' in message_lower or 'biggest cities' in message_lower or 
                                     'top cities' in message_lower or 'major cities' in message_lower)
            is_fun_fact_query = 'fun fact' in message_lower
            is_weather_query = 'weather' in message_lower or 'climate' in message_lower or 'temperature' in message_lower
            is_itinerary_query = 'itinerary' in message_lower or 'plan' in message_lower or 'schedule' in message_lower
            is_attractions_query = ('places to visit' in message_lower or 'tourist attractions' in message_lower or 
                                  'what to see' in message_lower or 'best places' in message_lower)
            
            # Simulate API response for now (since we don't have the actual API)
            # In production, uncomment the following code to make the actual API call
            # response = requests.post(
            #     f"{self.api_url}/chat",
            #     headers=headers,
            #     json=payload
            # )
            # response.raise_for_status()
            # return response.json()
            
            # Dictionary of city facts for easy expansion
            city_facts = {
                'paris': "Paris, known as the 'City of Light,' is home to the Eiffel Tower which was originally built as a temporary structure for the 1889 World's Fair. It was intended to be dismantled after 20 years but was saved because of its value as a radio transmission tower.",
                'london': "London has been a major settlement for two millennia, and the Big Ben clock tower is actually named after the bell inside it, not the tower itself. The tower is officially called the Elizabeth Tower.",
                'new york': "New York City's Central Park is larger than the principality of Monaco. The park spans 843 acres while Monaco is about 499 acres.",
                'tokyo': "Tokyo is the world's most populous metropolitan area with over 37 million residents. It was originally known as Edo until 1868 when it became the imperial capital.",
                'rome': "The Trevi Fountain in Rome collects approximately €3,000 in coins every day, which are donated to charity. The tradition says that throwing a coin over your shoulder ensures you'll return to Rome.",
                'delhi': "Delhi, India's capital territory, is one of the world's oldest continuously inhabited cities. The Red Fort, built in 1639, was the main residence of the Mughal emperors for nearly 200 years and is now a UNESCO World Heritage Site.",
                'mumbai': "Mumbai, formerly known as Bombay, is home to the world's most expensive private residence - Antilia, a 27-story building valued at over $1 billion.",
                'bangkok': "Bangkok's full ceremonial name is the longest city name in the world: Krungthepmahanakhon Amonrattanakosin Mahintharayutthaya Mahadilokphop Noppharatratchathaniburirom Udomratchaniwetmahasathan Amonphimanawatansathit Sakkathattiyawitsanukamprasit.",
                'sydney': "Sydney Opera House's iconic sail-shaped design was inspired by orange segments. It took 14 years to build, 10 years longer than planned, and cost $102 million, 14 times the original budget.",
                'cairo': "The Great Pyramid of Giza near Cairo is the only one of the Seven Wonders of the Ancient World that still exists today. It was the tallest man-made structure for over 3,800 years."
            }
            
            # Dictionary of country facts
            country_facts = {
                'france': "France is the world's most visited country, receiving over 89 million international tourists annually. The Louvre in Paris is the world's most visited museum, housing the Mona Lisa.",
                'india': "India is home to the world's largest postal network with over 155,000 post offices. The country has the second-largest English-speaking population in the world after the United States.",
                'japan': "Japan consists of 6,852 islands and has the world's oldest continuous monarchy. The country has more than 50,000 people who are over 100 years old.",
                'italy': "Italy has the most UNESCO World Heritage Sites of any country with 58 sites. The country is home to the oldest university in the world still in operation - the University of Bologna, founded in 1088.",
                'united states': "The United States has the world's largest economy and is home to more immigrants than any other country. It also has more public libraries than McDonald's restaurants.",
                'australia': "Australia is the only continent that is also a country. It has the world's longest fence, the Dingo Fence, which is approximately 5,614 km long.",
                'egypt': "Egypt is home to one of the oldest civilizations in the world, dating back to 3100 BCE. The Ancient Egyptian language was spoken for over 3,000 years, making it one of the longest-used languages in history.",
                'thailand': "Thailand is the only Southeast Asian country that was never colonized by a European power. The country was known as Siam until 1939.",
                'united kingdom': "The United Kingdom's London Underground is the oldest underground railway network in the world, opening in 1863. The country has over 170 museums in London alone, most of which are free to enter.",
                'china': "China has the world's largest population and is home to more than 160 cities with populations exceeding one million. The Great Wall of China is the largest man-made structure in the world."
            }
            
            # Dictionary of largest cities by country
            largest_cities = {
                'australia': ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
                'brazil': ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza"],
                'canada': ["Toronto", "Montreal", "Vancouver", "Calgary", "Ottawa"],
                'china': ["Shanghai", "Beijing", "Guangzhou", "Shenzhen", "Chongqing"],
                'france': ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"],
                'germany': ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt"],
                'india': ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"],
                'italy': ["Rome", "Milan", "Naples", "Turin", "Palermo"],
                'japan': ["Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo"],
                'united kingdom': ["London", "Birmingham", "Manchester", "Glasgow", "Liverpool"],
                'united states': ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"]
            }
            
            # Dictionary of country capitals
            country_capitals = {
                'australia': "Canberra",
                'brazil': "Brasília",
                'canada': "Ottawa",
                'china': "Beijing",
                'france': "Paris",
                'germany': "Berlin",
                'india': "New Delhi",
                'italy': "Rome",
                'japan': "Tokyo",
                'united kingdom': "London",
                'united states': "Washington, D.C.",
                'switzerland': "Bern",
                'spain': "Madrid",
                'russia': "Moscow",
                'mexico': "Mexico City",
                'south korea': "Seoul",
                'egypt': "Cairo",
                'thailand': "Bangkok",
                'south africa': "Pretoria (administrative), Cape Town (legislative), Bloemfontein (judicial)"
            }
            
            # Extract location from message
            message_lower = message.lower()
            found_city = None
            found_country = None
            
            # First check if this is a country query
            country_query = False
            if 'country' in message_lower:
                country_query = True
            
            # Check if any city name is in the message
            for city in city_facts.keys():
                if city in message_lower:
                    found_city = city
                    break
            
            # Check if any country name is in the message
            for country in country_facts.keys():
                if country in message_lower:
                    found_country = country
                    break
            
            # If location is provided, check that too
            if not found_city and not found_country and location:
                location_lower = location.lower()
                for city in city_facts.keys():
                    if city in location_lower:
                        found_city = city
                        break
                        
                for country in country_facts.keys():
                    if country in location_lower:
                        found_country = country
                        break
            
            # Extract location from message (could be city or country)
            found_city = None
            found_country = None
            extracted_location = None
            
            # First, try to find location using common patterns
            location_patterns = [
                r'(?:about|in|of|for|visit)\s+([a-zA-Z\s]+)',  # about X, in X, of X, for X, visit X
                r'(?:capital of|cities in|population of|weather in|fun fact about)\s+([a-zA-Z\s]+)',  # capital of X, cities in X
                r'([a-zA-Z\s]+)(?:\'s|\s+is|\s+has|\s+city|\s+country|\s+capital)'  # X's, X is, X has, X city, X country
            ]
            
            for pattern in location_patterns:
                location_match = re.search(pattern, message_lower)
                if location_match:
                    extracted_location = location_match.group(1).strip().lower()
                    print(f"Extracted location: {extracted_location}")
                    break
            
            # Check if any city name is in the message
            for city in city_facts.keys():
                if city in message_lower or (extracted_location and city in extracted_location):
                    found_city = city
                    break
            
            # Check if any country name is in the message
            for country in country_facts.keys():
                if country in message_lower or (extracted_location and country in extracted_location):
                    found_country = country
                    break
            
            # If we still don't have a location, try to extract it from the message
            if not found_city and not found_country and not extracted_location:
                # Extract potential location by removing common words
                words = message_lower.split()
                stop_words = ['what', 'where', 'when', 'how', 'why', 'is', 'are', 'the', 'a', 'an', 'in', 'of', 'for', 'about',
                              'tell', 'me', 'please', 'would', 'could', 'should', 'can', 'may', 'might', 'will', 'shall',
                              'to', 'from', 'with', 'by', 'as', 'on', 'at', 'and', 'or', 'but', 'if', 'then', 'that', 'this',
                              'these', 'those', 'it', 'its', 'there', 'their', 'they', 'them', 'he', 'she', 'his', 'her', 'hers',
                              'capital', 'population', 'weather', 'city', 'country', 'region', 'fun', 'fact', 'largest', 'biggest',
                              'best', 'places', 'visit', 'attractions', 'itinerary', 'plan', 'travel']
                
                potential_locations = [word for word in words if word not in stop_words and len(word) > 2]
                if potential_locations:
                    extracted_location = potential_locations[-1]  # Take the last potential location word
                    print(f"Extracted potential location: {extracted_location}")
            
            # Now handle specific query types
            
            # 1. Capital query
            if is_capital_query:
                target_country = found_country or extracted_location
                if target_country:
                    # First check hardcoded capitals
                    if target_country in country_capitals:
                        response_text = f"The capital city of {target_country.title()} is {country_capitals[target_country]}."
                        return self.format_response(user_id, message, response_text)
                    else:
                        # Try to get capital from GeoDB
                        try:
                            country_info = self.get_country_info(target_country)
                            if country_info and 'capital' in country_info and country_info['capital']:
                                response_text = f"The capital city of {target_country.title()} is {country_info['capital']}."
                                return self.format_response(user_id, message, response_text)
                            else:
                                # If we couldn't find the capital, give a generic response
                                response_text = f"I couldn't find information about the capital of {target_country.title()}. Would you like to know something else about this country?"
                                return self.format_response(user_id, message, response_text)
                        except Exception as e:
                            print(f"Error fetching country info: {str(e)}")
                            response_text = f"I'm having trouble finding information about the capital of {target_country.title()}. Would you like to know something else about this country?"
                            return self.format_response(user_id, message, response_text)
            
            # 2. Population query
            if is_population_query:
                # Check if we're asking about a city
                target_city = found_city or (extracted_location if not found_country else None)
                if target_city:
                    # Get city population
                    try:
                        city_info = self.get_city_info(target_city)
                        if city_info and 'population' in city_info and city_info['population']:
                            response_text = f"{target_city.title()} has a population of approximately {city_info['population']:,} people."
                            return self.format_response(user_id, message, response_text)
                        else:
                            response_text = f"I couldn't find population information for {target_city.title()}. Would you like to know something else about this city?"
                            return self.format_response(user_id, message, response_text)
                    except Exception as e:
                        print(f"Error fetching city info: {str(e)}")
                        response_text = f"I'm having trouble finding population information for {target_city.title()}. Would you like to know something else about this city?"
                        return self.format_response(user_id, message, response_text)
                
                # Check if we're asking about a country
                target_country = found_country or extracted_location
                if target_country:
                    # Get country population
                    try:
                        country_info = self.get_country_info(target_country)
                        if country_info and 'population' in country_info and country_info['population']:
                            response_text = f"{target_country.title()} has a population of approximately {country_info['population']:,} people."
                            return self.format_response(user_id, message, response_text)
                        else:
                            response_text = f"I couldn't find population information for {target_country.title()}. Would you like to know something else about this country?"
                            return self.format_response(user_id, message, response_text)
                    except Exception as e:
                        print(f"Error fetching country info: {str(e)}")
                        response_text = f"I'm having trouble finding population information for {target_country.title()}. Would you like to know something else about this country?"
                        return self.format_response(user_id, message, response_text)
            
            # 3. Largest cities query
            if is_largest_cities_query:
                target_country = found_country or extracted_location
                if target_country:
                    if target_country in largest_cities:
                        cities_list = largest_cities[target_country]
                        response_text = f"The largest cities in {target_country.title()} by population are: {', '.join(cities_list)}."
                        return self.format_response(user_id, message, response_text)
                    else:
                        # Try to get cities from GeoDB
                        try:
                            # Get country code first
                            country_info = self.get_country_info(target_country)
                            if country_info and 'code' in country_info:
                                country_code = country_info['code']
                                # This would ideally fetch cities by country code and sort by population
                                # For now, provide a more helpful response
                                response_text = f"I found information about {target_country.title()}, but I don't have a complete list of its largest cities at the moment. Would you like to know about the country's population or capital instead?"
                            else:
                                response_text = f"I couldn't find information about {target_country.title()}. Please check the country name and try again."
                            return self.format_response(user_id, message, response_text)
                        except Exception as e:
                            print(f"Error fetching cities: {str(e)}")
                            response_text = f"I'm having trouble finding information about cities in {target_country.title()}. Would you like to know about the country itself instead?"
                            return self.format_response(user_id, message, response_text)
            
            # 4. Fun fact query
            if is_fun_fact_query:
                if found_city and found_city in city_facts:
                    response_text = city_facts[found_city]
                    return self.format_response(user_id, message, response_text)
                elif found_country and found_country in country_facts:
                    response_text = country_facts[found_country]
                    return self.format_response(user_id, message, response_text)
            
            # 5. Weather query (unsupported)
            if is_weather_query:
                location_name = found_city or found_country or extracted_location or "that location"
                response_text = f"I'm sorry, I don't have real-time weather data for {location_name.title()} yet. Would you like to know about {location_name.title()}'s population, region, or country?"
                return self.format_response(user_id, message, response_text)
            
            # 6. Itinerary query (unsupported)
            if is_itinerary_query:
                location_name = found_city or found_country or extracted_location or "that location"
                response_text = f"I'm sorry, I can't provide travel itineraries for {location_name.title()} yet. Would you like to know about {location_name.title()}'s population, region, or country?"
                return self.format_response(user_id, message, response_text)
            
            # 7. Attractions query (unsupported)
            if is_attractions_query:
                location_name = found_city or found_country or extracted_location or "that location"
                response_text = f"I'm sorry, I don't have tourist attraction data for {location_name.title()} yet. Would you like to know about {location_name.title()}'s population, region, or country?"
                return self.format_response(user_id, message, response_text)
            
            # 8. General information query
            # If we've found a city or country but no specific query type was detected
            if found_city:
                try:
                    city_info = self.get_city_info(found_city)
                    if city_info:
                        response_text = f"{found_city.title()} is a fascinating city located in {city_info.get('country', 'its country')}."
                        
                        # Add population if available
                        if 'population' in city_info and city_info['population']:
                            response_text += f" It has a population of approximately {city_info['population']:,} people."
                            
                        # Add region if available
                        if 'region' in city_info and city_info['region']:
                            response_text += f" It's located in the {city_info['region']} region."
                            
                        response_text += f" What specific aspects of {found_city.title()} would you like to know about?"
                        return self.format_response(user_id, message, response_text)
                    elif found_city in city_facts:
                        return self.format_response(user_id, message, city_facts[found_city])
                except Exception as e:
                    print(f"Error fetching city info: {str(e)}")
                    if found_city in city_facts:
                        return self.format_response(user_id, message, city_facts[found_city])
            
            if found_country:
                try:
                    country_info = self.get_country_info(found_country)
                    if country_info:
                        response_text = f"{found_country.title()} is a fascinating country"
                        
                        # Add region if available
                        if 'region' in country_info and country_info['region']:
                            response_text += f" located in {country_info['region']}"
                            
                        response_text += "."
                        
                        # Add population if available
                        if 'population' in country_info and country_info['population']:
                            response_text += f" It has a population of approximately {country_info['population']:,} people."
                            
                        # Add capital if available
                        if 'capital' in country_info and country_info['capital']:
                            response_text += f" The capital city is {country_info['capital']}."
                            
                        response_text += f" What specific aspects of {found_country.title()} would you like to know about?"
                        return self.format_response(user_id, message, response_text)
                    elif found_country in country_facts:
                        return self.format_response(user_id, message, country_facts[found_country])
                except Exception as e:
                    print(f"Error fetching country info: {str(e)}")
                    if found_country in country_facts:
                        return self.format_response(user_id, message, country_facts[found_country])
            
            # 9. Unknown location
            if extracted_location and not found_city and not found_country:
                # Try to get info from GeoDB
                try:
                    # First try as a city
                    city_info = self.get_city_info(extracted_location)
                    if city_info:
                        response_text = f"{extracted_location.title()} is a fascinating city located in {city_info.get('country', 'its country')}."
                        
                        # Add population if available
                        if 'population' in city_info and city_info['population']:
                            response_text += f" It has a population of approximately {city_info['population']:,} people."
                            
                        # Add region if available
                        if 'region' in city_info and city_info['region']:
                            response_text += f" It's located in the {city_info['region']} region."
                            
                        response_text += f" What specific aspects of {extracted_location.title()} would you like to know about?"
                        return self.format_response(user_id, message, response_text)
                        
                    # Then try as a country
                    country_info = self.get_country_info(extracted_location)
                    if country_info:
                        response_text = f"{extracted_location.title()} is a fascinating country"
                        
                        # Add region if available
                        if 'region' in country_info and country_info['region']:
                            response_text += f" located in {country_info['region']}"
                            
                        response_text += "."
                        
                        # Add population if available
                        if 'population' in country_info and country_info['population']:
                            response_text += f" It has a population of approximately {country_info['population']:,} people."
                            
                        # Add capital if available
                        if 'capital' in country_info and country_info['capital']:
                            response_text += f" The capital city is {country_info['capital']}."
                            
                        response_text += f" What specific aspects of {extracted_location.title()} would you like to know about?"
                        return self.format_response(user_id, message, response_text)
                        
                    # If we couldn't find info, give a generic response
                    response_text = f"{extracted_location.title()} is a fascinating destination with rich history and culture. What specific aspects of {extracted_location.title()} would you like to know about?"
                    return self.format_response(user_id, message, response_text)
                except Exception as e:
                    print(f"Error fetching location info: {str(e)}")
                    response_text = f"{extracted_location.title()} is a fascinating destination with rich history and culture. What specific aspects of {extracted_location.title()} would you like to know about?"
                    return self.format_response(user_id, message, response_text)
            
            # 10. No location found
            response_text = "I'd be happy to tell you about various travel destinations. Which city or country are you interested in learning about?"
            
            # Use the format_response helper
            return self.format_response(user_id, message, response_text)
            
        except Exception as e:
            # Log the error and provide a fallback response
            print(f"Error processing message: {str(e)}")
            return {
                "message": "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
                "conversation_id": user_id,
                "status": "error"
            }

    def format_response(self, user_id, message, response_text):
        """Format the response and update conversation history"""
        # Add to conversation history
        if user_id not in self.conversation_history:
            self.conversation_history[user_id] = []
        self.conversation_history[user_id].append({"role": "user", "content": message})
        self.conversation_history[user_id].append({"role": "assistant", "content": response_text})
        
        return {
            "message": response_text,
            "conversation_id": user_id,
            "status": "success"
        }
    
    def get_city_info(self, city_name):
        """Fetch city information from GeoDB API"""
        try:
            # Clean up city name
            city_name = city_name.strip().lower()
            
            # Prepare API request
            headers = config.get_geo_headers()
            endpoint = f"geo/cities"
            params = {
                "namePrefix": city_name,
                "limit": 5,  # Get more matches to find the best one
                "sort": "-population"  # Sort by population to get major cities first
            }
            
            # Make API request
            print(f"Fetching city info for: {city_name}")
            response = requests.get(
                f"{config.GEO_API_URL}/{endpoint}",
                headers=headers,
                params=params
            )
            response.raise_for_status()
            data = response.json()
            
            # Check if we got results
            if data and 'data' in data and len(data['data']) > 0:
                # Look for exact match first
                for city_data in data['data']:
                    if city_name == city_data.get('name', '').lower():
                        return {
                            'name': city_data.get('name'),
                            'country': city_data.get('country'),
                            'region': city_data.get('region'),
                            'population': city_data.get('population'),
                            'latitude': city_data.get('latitude'),
                            'longitude': city_data.get('longitude')
                        }
                
                # If no exact match, use the first result (highest population)
                city_data = data['data'][0]
                return {
                    'name': city_data.get('name'),
                    'country': city_data.get('country'),
                    'region': city_data.get('region'),
                    'population': city_data.get('population'),
                    'latitude': city_data.get('latitude'),
                    'longitude': city_data.get('longitude')
                }
            return None
        
        except Exception as e:
            print(f"Error in get_city_info: {str(e)}")
            return None
            
    def get_country_info(self, country_name):
        """Fetch country information from GeoDB API"""
        try:
            # Clean up country name
            country_name = country_name.strip().lower()
            
            # Prepare API request
            headers = config.get_geo_headers()
            endpoint = f"geo/countries"
            
            # Make API request to get country code first
            print(f"Fetching country info for: {country_name}")
            response = requests.get(
                f"{config.GEO_API_URL}/{endpoint}",
                headers=headers
            )
            response.raise_for_status()
            data = response.json()
            
            # Find the country by name
            country_code = None
            country_match = None
            best_match_score = 0
            
            if data and 'data' in data:
                for country in data['data']:
                    country_full_name = country.get('name', '').lower()
                    # Check for exact match
                    if country_name == country_full_name:
                        country_code = country.get('code')
                        country_match = country
                        break
                    # Check for partial match
                    elif country_name in country_full_name or country_full_name in country_name:
                        # Calculate match score (higher is better)
                        match_score = len(country_name) / len(country_full_name) if country_name in country_full_name else len(country_full_name) / len(country_name)
                        if match_score > best_match_score:
                            best_match_score = match_score
                            country_code = country.get('code')
                            country_match = country
            
            if not country_code:
                return None
                
            # Now get detailed country info
            response = requests.get(
                f"{config.GEO_API_URL}/{endpoint}/{country_code}",
                headers=headers
            )
            response.raise_for_status()
            country_data = response.json()
            
            # Get capital city if available
            capital = None
            try:
                capital_response = requests.get(
                    f"{config.GEO_API_URL}/{endpoint}/{country_code}/capital",
                    headers=headers
                )
                if capital_response.status_code == 200:
                    capital_data = capital_response.json()
                    if 'data' in capital_data:
                        capital = capital_data['data'].get('name')
            except Exception as e:
                print(f"Error fetching capital: {str(e)}")
            
            return {
                'name': country_data.get('data', {}).get('name'),
                'code': country_code,
                'region': country_data.get('data', {}).get('region'),
                'population': country_data.get('data', {}).get('population'),
                'capital': capital
            }
        except Exception as e:
            print(f"Error in get_country_info: {str(e)}")
            return None

# Create a singleton instance
chat_service = ChatService()
