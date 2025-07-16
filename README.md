# Personal Task Manager

This is a full-stack personal task manager application built with a FastAPI backend and a React frontend. It allows users to register, log in, and manage their tasks through a secure, token-based authentication system.

## Features

*   **User Authentication**: Secure user registration and login with JWT (JSON Web Token) authentication.
*   **Task Management**: Create, view, and delete tasks.
*   **Dark Mode**: A sleek, modern dark theme for the user interface.

## Technology Stack

*   **Backend**: 
    *   Python 3
    *   FastAPI
    *   PostgreSQL
    *   SQLAlchemy
    *   Uvicorn
*   **Frontend**:
    *   React
    *   Axios
    *   Node.js

## Setup and Installation

Follow these instructions to get the project running on your local machine.

### Prerequisites

*   Python 3.8+
*   Node.js and npm
*   PostgreSQL

### Backend Setup

1.  **Clone the repository**:
    ```bash
    git clone <your-repository-url>
    cd my_personal_task_manager
    ```

2.  **Create and activate a Python virtual environment**:
    ```bash
    python -m venv .venv
    # On Windows (PowerShell)
    .\.venv\Scripts\Activate.ps1
    ```

3.  **Install dependencies**:
    ```bash
    pip install -r backend/requirements.txt
    ```

4.  **Set up environment variables**:
    Create a file named `.env` in the project root directory (`my_personal_task_manager/`) and add the following, replacing the placeholder values with your own:
    ```env
    DATABASE_URL="postgresql://user:password@host/dbname"
    SECRET_KEY="your_very_secret_key"
    ```

5.  **Run the backend server**:
    ```bash
    uvicorn backend.main:app --reload
    ```
    The backend will be running at `http://127.0.0.1:8000`.

### Frontend Setup

1.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the frontend development server**:
    ```bash
    npm start
    ```
    The frontend will open automatically in your browser at `http://localhost:3000`.

   Screenshots
    
   Login Page
   
   ![Login](docs/images/login.jpg)
   
   Register Page
   ![Register](docs/images/register.jpg)
   Task Manager
   
   ![Task Manager](docs/images/task_manager.jpg)









   
