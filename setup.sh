#!/bin/bash
echo "Setting up Travel Guide Application..."
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python is not installed. Please install Python 3.8 or higher and try again."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

echo "Setting up backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment and install requirements
source venv/bin/activate
pip install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "Failed to install Python dependencies."
    exit 1
fi

cd ..

echo ""
echo "Setting up frontend..."
cd frontend

# Install Node.js dependencies
npm install

if [ $? -ne 0 ]; then
    echo "Failed to install Node.js dependencies."
    exit 1
fi

cd ..

echo ""
echo "Setup completed successfully!"
echo ""
echo "To start the application:"
echo "1. Start the backend: cd backend && source venv/bin/activate && python app.py"
echo "2. In a new terminal, start the frontend: cd frontend && npm start"
echo ""
