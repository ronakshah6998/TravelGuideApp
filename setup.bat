@echo off
echo Setting up Travel Guide Application...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Python is not installed. Please install Python 3.8 or higher and try again.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js and try again.
    pause
    exit /b 1
)

echo Setting up backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment and install requirements
call venv\Scripts\activate
pip install -r requirements.txt

if %ERRORLEVEL% NEQ 0 (
    echo Failed to install Python dependencies.
    pause
    exit /b 1
)

cd ..

echo.
echo Setting up frontend...
cd frontend

REM Install Node.js dependencies
npm install

if %ERRORLEVEL% NEQ 0 (
    echo Failed to install Node.js dependencies.
    pause
    exit /b 1
)

cd ..

echo.
echo Setup completed successfully!
echo.
echo To start the application:
echo 1. Start the backend: cd backend && python app.py
echo 2. In a new terminal, start the frontend: cd frontend && npm start
echo.
pause
