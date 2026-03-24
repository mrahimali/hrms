# HRMS Lite – Human Resource Management System

HRMS Lite is a Full-Stack Human Resource Management System built using:

### React (Vite)
### Django
### Django REST Framework
### Postgresql
### CSS

This system allows you to manage employees and track attendance records.

### Project Structure
hrms-lite/  
│  
├── backend/                # Django Backend (API)  
│   ├── manage.py  
│   ├── requirements.txt  
│   └── project files  
│  
├── frontend/             # React Frontend (Vite)  
│   ├── package.json  
│   ├── vite.config.js  
│   └── src/  
│  
├── .gitignore  
└── README.md  
### Backend Setup (Django)

Follow these steps to run the backend server:

1. Go to backend folder : ``` cd backend ```
2. Create Virtual Environment: ``` python -m venv env ```
3. Activate Virtual Environment
- Windows: ``` env\Scripts\activate ```
- Mac/Linux: ``` source env/bin/activate ```
4. Install Dependencies: ``` pip install -r requirements.txt ```
5. Apply Migrations: ``` python manage.py migrate ```
6. Run Server: ``` python manage.py runserver ```
Backend will run at: ``` http://127.0.0.1:8000/ ```


### Frontend Setup (React + Vite)
1. Go to frontend folder : ``` cd frontend ```
2. Install Dependencies : ``` npm install ```
3. Create Environment File: ``` .env ```
4. Add this inside it: ``` VITE_API_BASE_URL=http://127.0.0.1:8000/api/ ```
5. Start Frontend : ``` npm run dev ```
Frontend will run at: ``` http://localhost:5173/ ```


## API Endpoints
### Employees API

GET     /api/employees/  
POST    /api/employees/  
DELETE  /api/employees/<id>/  

### Attendance APIs  
GET     /api/attendance/  
GET     /api/attendance/?employee=<id>  
POST    /api/attendance/


## All dependencies are inside: backend/requirements.txt
### Install using: ``` pip install -r requirements.txt ```


