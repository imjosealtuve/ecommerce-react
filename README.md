# E-commerce React + Django Project

This project is a full-stack e-commerce application using React (Vite) for the frontend and Django (DRF) for the backend.

## Prerequisites

- Python 3.8+
- Node.js 18+

## setup

### Backend

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Create a virtual environment:
    ```bash
    python -m venv .venv
    ```

3.  Activate the virtual environment:
    - Windows: `.venv\Scripts\activate`
    - Mac/Linux: `source .venv/bin/activate`

4.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

5.  Run migrations:
    ```bash
    python manage.py migrate
    ```

6.  (Optional) Seed database:
    ```bash
    python populate_db.py
    ```

7.  Start the server:
    ```bash
    python manage.py runserver
    ```

### Frontend

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
