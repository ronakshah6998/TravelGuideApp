import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import requests
from chat import chat_service
from config import config
import json
import spacy

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load spaCy model for NER
nlp = spacy.load("en_core_web_sm")

# Wikipedia Summary API
def get_wikipedia_summary(topic):
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{topic}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json().get("extract", "")
    return ""

# Extract location entities (cities/countries) using spaCy NER
def extract_location_entities(text):
    doc = nlp(text)
    return [ent.text for ent in doc.ents if ent.label_ in ("GPE", "LOC")]

# GeoDB API
def get_geodb_info(city):
    url = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities"
    headers = config.get_geo_headers()
    params = {"namePrefix": city, "limit": 1}
    response = requests.get(url, headers=headers, params=params)
    print(f"GeoDB status: {response.status_code}")
    print(f"GeoDB response: {response.text}")  # Good for debugging
    if response.status_code == 200 and response.json()["data"]:
        city_data = response.json()["data"][0]
        return f"{city_data['name']}, {city_data['country']}, population: {city_data['population']}"
    return ""


# Error handling
class APIError(Exception):
    def __init__(self, message, status_code=400, payload=None):
        super().__init__()
        self.message = message
        self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        rv['status'] = 'error'
        return rv

@app.errorhandler(APIError)
def handle_api_error(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

# Helper function to format error responses
def format_api_error(message, status_code=500):
    return {
        "status": "error",
        "message": message,
        "code": status_code
    }

# Helper function to make API requests
def make_geodb_request(endpoint, params=None):
    # Real API request
    headers = config.get_geo_headers()
    
    # Print debug information
    print(f"\n--- API Request Debug ---")
    print(f"Endpoint: {endpoint}")
    print(f"Headers: {headers}")
    print(f"Params: {params}")
    print(f"API URL: {config.GEO_API_URL}/{endpoint}")
    
    try:
        # Make the API request
        print(f"Making request to: {config.GEO_API_URL}/{endpoint}")
        response = requests.get(
            f"{config.GEO_API_URL}/{endpoint}",
            headers=headers,
            params=params or {}
        )
        
        # Print response status
        print(f"Response status code: {response.status_code}")
        
        # Check if the response was successful
        response.raise_for_status()
        
        # Parse the JSON response
        data = response.json()
        print(f"API request successful. Data received.")
        return data
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error: {e}")
        print(f"Response content: {e.response.content if hasattr(e, 'response') else 'No response content'}")
        error_msg = f"API returned error: {e.response.status_code}" if hasattr(e, 'response') else str(e)
        raise APIError(error_msg, status_code=e.response.status_code if hasattr(e, 'response') else 500)
    except requests.exceptions.ConnectionError as e:
        print(f"Connection Error: {e}")
        raise APIError(f"Connection error: Unable to connect to the API", status_code=503)
    except requests.exceptions.Timeout as e:
        print(f"Timeout Error: {e}")
        raise APIError(f"Timeout error: API request timed out", status_code=504)
    except requests.exceptions.RequestException as e:
        print(f"Request Exception: {e}")
        raise APIError(f"Request error: {str(e)}", status_code=500)
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise APIError(f"Unexpected error: {str(e)}", status_code=500)

# Routes
@app.route('/api/countries', methods=['GET'])
def get_countries():
    """Get all countries"""
    try:
        print("\n[API] Getting countries from GEOdb API")
        data = make_geodb_request('geo/countries', {
            'limit': 10
        })
        print(f"[API] Countries data received: {len(data.get('data', []))} countries")
        return jsonify(data)
    except APIError as e:
        print(f"[API ERROR] Error getting countries: {e.message}")
        return jsonify(e.to_dict()), e.status_code
    except Exception as e:
        print(f"[API ERROR] Unexpected error getting countries: {str(e)}")
        error = APIError(f"Failed to retrieve countries: {str(e)}", 500)
        return jsonify(error.to_dict()), error.status_code

@app.route('/api/cities', methods=['GET'])
def get_cities():
    """Get cities for a country"""
    try:
        country_id = request.args.get('countryId')
        offset = request.args.get('offset', 0, type=int)
        limit = request.args.get('limit', 10, type=int)
        
        if not country_id:
            raise APIError("countryId is required", status_code=400)
        
        print(f"\n[API] Getting cities for country {country_id} from GEOdb API")
        data = make_geodb_request('geo/cities', {
            'countryIds': country_id,
            'offset': offset,
            'limit': limit
        })
        print(f"[API] Cities data received: {len(data.get('data', []))} cities")
        return jsonify(data)
    except APIError as e:
        print(f"[API ERROR] Error getting cities: {e.message}")
        return jsonify(e.to_dict()), e.status_code
    except Exception as e:
        print(f"[API ERROR] Unexpected error getting cities: {str(e)}")
        error = APIError(f"Failed to retrieve cities: {str(e)}", 500)
        return jsonify(error.to_dict()), error.status_code

@app.route('/api/cities/<city_id>', methods=['GET'])
def get_city_details(city_id):
    """Get details for a specific city"""
    try:
        print(f"\n[API] Getting details for city {city_id} from GEOdb API")
        data = make_geodb_request(f'geo/cities/{city_id}')
        return jsonify(data)
    except APIError as e:
        print(f"[API ERROR] Error getting city details: {e.message}")
        return jsonify(e.to_dict()), e.status_code
    except Exception as e:
        print(f"[API ERROR] Unexpected error getting city details: {str(e)}")
        error = APIError(f"Failed to retrieve city details: {str(e)}", 500)
        return jsonify(error.to_dict()), error.status_code

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'travel-guide-api'})

# Chat endpoints
@app.route('/api/chat/send', methods=['POST'])
def send_chat_message():
    data = request.json
    
    if not data or 'message' not in data:
        raise APIError('Message is required', 400)
    
    user_input = data.get('message')
    
    try:
        # Extract locations from the input
        locations = extract_location_entities(user_input)
        print(f"@@@@@@ locations used: {locations}")
        info = ""
        # If a location was found, use it; otherwise, use the whole input
        if locations:
            topic = locations[0]  # Pick the first detected location
            info = get_wikipedia_summary(topic)
            geo_info = get_geodb_info(topic)
            print(f"@@@@@@ geo_info used: {geo_info}")
            
            if geo_info:
                info += f"\n\nGeo Info: {geo_info}"
        else:
            # Fallback if no location is found, use the full input for general query
            info = get_wikipedia_summary(user_input)

        prompt = f"""Answer the following question like you're explaining to a curious teenager from India. Keep it short (probably 3 to 5 sentences), fun, and use simple words. Use emojis and analogies to engage kids' imagination. Add a cool fact if it helps! Question is - {user_input}, and to support the answer use the following information: {info}"""
        print(f"@@@@@@ PROMPT used: {prompt}")
        
        # Call Ollama API
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": "phi3", "prompt": prompt},
            stream=True
        )

        output = ""
        try:
            for line in response.iter_lines():
                if line:
                    data = json.loads(line.decode("utf-8"))
                    if "response" in data:
                        output += data["response"]
        except json.JSONDecodeError as e:
            error_msg = "Failed to decode Ollama response"
            print(f"{error_msg}: {str(e)}")
            return jsonify({"error": error_msg, "details": str(e)}), 500

        # Return in the format expected by the frontend
        return jsonify({
            "message": output.strip(),
            "conversation_id": data.get('user_id', 'anonymous'),
            "status": "success"
        })
        
    except Exception as e:
        print(f"Error in send_chat_message: {str(e)}")
        raise APIError(str(e), 500)

@app.route('/api/chat/history', methods=['GET'])
def get_chat_history():
    user_id = request.args.get('user_id', 'anonymous')
    
    try:
        history = chat_service.conversation_history.get(user_id, [])
        return jsonify({
            'history': history,
            'user_id': user_id
        })
    except Exception as e:
        raise APIError(str(e), 500)

# API Key management endpoint
@app.route('/api/config/update-key', methods=['POST'])
def update_api_key():
    data = request.json
    
    if not data or 'api_key' not in data:
        raise APIError('API key is required', 400)
    
    api_key = data.get('api_key')
    
    try:
        result = config.update_geo_api_key(api_key)
        return jsonify(result)
    except Exception as e:
        raise APIError(str(e), 500)

# API configuration status endpoint
@app.route('/api/config/status', methods=['GET'])
def get_api_status():
    return jsonify({
        'using_mock_data': config.USE_MOCK_DATA,
        'geo_api_key_type': 'dummy' if config.USE_MOCK_DATA else 'real'
    })

# TEST
@app.route('/api/rag', methods=['POST'])
def get_rag():
    user_input = request.json.get("message", "")

    # Extract locations from the input
    locations = extract_location_entities(user_input)
    print(f"@@@@@@ locations used: {locations}")
    info = ""
    # If a location was found, use it; otherwise, use the whole input
    if locations:
        topic = locations[0]  # Pick the first detected location
        info = get_wikipedia_summary(topic)
        geo_info = get_geodb_info(topic)
        print(f"@@@@@@ geo_info used: {geo_info}")
        
        if geo_info:
            info += f"\n\nGeo Info: {geo_info}"
    else:
        # Fallback if no location is found, use the full input for general query
        info = get_wikipedia_summary(user_input)

    
    prompt = f"""Answer the following question like you're explaining to a curious teenger from India. Keep it short (probably 3 to 5 sentences), fun, and use simple words. Add a cool fact if it helps! Question is - {user_input}, and to support the answer use the following information: {info}"""
    print(f"@@@@@@ PROMPT used: {prompt}")
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "phi3", "prompt": prompt},
        stream=True
    )

    output = ""
    try:
        for line in response.iter_lines():
            if line:
                data = json.loads(line.decode("utf-8"))
                if "response" in data:
                    output += data["response"]
    except json.JSONDecodeError as e:
        return jsonify({"error": "Failed to decode Ollama response", "details": str(e)}), 500

    return jsonify({"message": output.strip()})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
