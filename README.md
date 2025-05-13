# Travel Guide Application

A modern travel guide application that helps users explore countries and cities around the world using the GEOdb Cities API.

## Features

- Browse countries with pagination
- View cities within each country
- Detailed city information
- Responsive design for all devices
- Error handling and loading states
- Clean and modern UI with Material-UI

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)
- A GEOdb Cities API key (get it from [RapidAPI](https://rapidapi.com/wirefreethought/api/geodb-cities/))

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory with your API key:
   ```
   GEO_API_KEY=your_geodb_api_key_here
   FLASK_ENV=development
   FLASK_APP=app.py
   ```

5. Run the Flask development server:
   ```bash
   flask run
   ```
   The backend will be available at `http://localhost:5000`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the required packages:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

## Project Structure

```
travel-guide/
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
└── frontend/
    ├── public/             # Static files
    └── src/
        ├── components/      # Reusable components
        ├── pages/           # Page components
        ├── services/        # API services
        ├── App.js           # Main App component
        └── App.css          # Global styles
```

## API Endpoints

- `GET /api/countries` - Get list of countries
- `GET /api/cities?countryId=:id` - Get cities for a country
- `GET /api/city/:id` - Get details for a specific city

## Technologies Used

- **Frontend**: React, Material-UI, React Router
- **Backend**: Python, Flask, Flask-CORS
- **API**: GEOdb Cities API
- **Build Tools**: Create React App, npm

## License

This project is licensed under the MIT License - see the LICENSE file for details.
