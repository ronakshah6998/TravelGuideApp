# 🌍 Globe Scout – Interactive Geography Chat App for Students

**Globe Scout** is an AI-powered educational web application designed to make geography learning engaging and interactive for students. It features a conversational chatbot interface that allows students to explore countries, cities, capitals, population, and nearby locations — all through natural language queries.

---

## ✨ Features

- 💬 **Chat Interface** – Ask questions like “Tell me about France” or “What are the nearby cities to Tokyo?”
- 🌍 **Country Explorer** – Get key facts: population, capital, region, highlights, and trivia.
- 🏙️ **City Highlights** – Explore interesting facts and key features of global cities.
- 📍 **Nearby City Discovery** – Find and learn about cities near a given location.
- 📱 **Mobile Responsive UI** – Works seamlessly on mobile devices and tablets.
- 🔐 **Local LLM Integration** – Uses lightweight local language models for private, cost-effective operation (no dependency on cloud APIs).
- 🧒 **Teen-Safe** – Designed with appropriate preprompts and filters to maintain content safety for students.

---

## 📚 Use Case

> Perfect for students aged 10–18 who want to explore the world, prepare for geography assignments, or simply stay curious about global places in a fun, interactive way.

---

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Code4Bharat-2025/team10.git
cd globe-scout

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

6. Install [Ollama](https://ollama.com/download) for your OS, if not already and then run following commands:
   ```bash
   ollama run phi3
   ```

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

## 🧰 Tech Stack

| Layer        | Tech Used                         |
|--------------|----------------------------------|
| Frontend     | HTML, CSS, JavaScript, React |
| Backend      | Flask         |
| AI/LLM       | Local SLM (e.g., LLaMA) |
| Data Source  | Static location data / GeoDB    |
| Hosting      | Local server / lightweight VM     |
| UI           | Mobile responsive layout          |


## 🔮 Future Scope

🧩 Gamified Learning – Add interactive quizzes, leaderboards, and badges to make learning fun.

🔊 Voice Support – Enable voice-to-text input for accessibility and ease of use.

🌐 Multilingual Support – Introduce translations and multilingual responses for broader reach.

✈️ Virtual Tours – Integrate with Google Earth or Map APIs for immersive 3D exploration.

🎒 Curriculum Integration – Align content with school geography syllabus and enable teacher-student dashboards.

📶 Offline Mode – Allow access to preloaded data in low-connectivity environments.

📚 Cross-Subject Expansion – Extend the app to include history, culture, and current events.


