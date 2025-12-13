# Authentication System Setup Guide

## Overview
Your AI Career Nexus now has a complete authentication system with:
- ✅ User registration and login
- ✅ JWT token-based authentication
- ✅ Secure password hashing with bcrypt
- ✅ SQLite database for user storage
- ✅ Beautiful sign-in/sign-up UI

## Prerequisites
1. **Python 3.8+** - Download from [python.org](https://www.python.org/downloads/)
2. **Node.js** - Already installed (frontend is running)

## Quick Start

### Step 1: Install Python
If Python is not installed:
1. Download Python from https://www.python.org/downloads/
2. During installation, **CHECK "Add Python to PATH"**
3. Verify installation:
```powershell
python --version
```

### Step 2: Install Backend Dependencies
```powershell
cd d:\HACKTHON\backend
pip install -r requirements.txt
```

This will install:
- FastAPI - Web framework
- SQLAlchemy - Database ORM
- passlib - Password hashing
- python-jose - JWT tokens
- And all other dependencies

### Step 3: Start the Backend Server
```powershell
cd d:\HACKTHON\backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will:
- Automatically create the database (`career_nexus.db`)
- Start on http://localhost:8000
- Show API docs at http://localhost:8000/docs

### Step 4: Test the System
1. Frontend is already running at http://localhost:5175
2. Open it in your browser
3. Click "Sign Up" to create an account
4. Fill in:
   - Username (3-50 characters)
   - Full Name
   - Email
   - Password (minimum 6 characters)
5. Click "Create Account"
6. You'll be automatically logged in!

## API Endpoints

### Authentication Routes (http://localhost:8000/api/auth)

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepass123",
  "full_name": "John Doe"
}

Response:
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "is_active": true
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}

Response:
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "full_name": "John Doe"
  }
}
```

#### Get All Users
```http
GET /api/auth/users

Response:
[
  {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "is_active": true,
    "created_at": "2024-01-15T10:30:00"
  }
]
```

#### Get User by Email
```http
GET /api/auth/user/john@example.com

Response:
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "is_active": true
}
```

## Database Schema

### UserDB Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Security Features

1. **Password Hashing**: Uses bcrypt with automatic salt generation
2. **JWT Tokens**: 30-day expiration, stored in localStorage
3. **Input Validation**: Pydantic schemas validate all requests
4. **Duplicate Prevention**: Checks for existing username/email
5. **CORS Protection**: Only allows localhost:5175 frontend

## File Structure

```
backend/
├── main.py                 # FastAPI app entry point
├── database.py            # SQLAlchemy setup + UserDB model
├── requirements.txt       # All dependencies
├── models/
│   └── auth.py           # Pydantic schemas
├── utils/
│   └── jwt_handler.py    # JWT token creation/verification
└── routes/
    └── auth.py           # Authentication endpoints

frontend/src/pages/
└── Login.jsx             # Sign-in/Sign-up UI
```

## Troubleshooting

### Port Already in Use
```powershell
# Kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Database Locked Error
- Close any DB browser tools
- Restart the backend server

### Import Errors
```powershell
# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

### CORS Errors
- Ensure frontend is on http://localhost:5175
- Check backend CORS settings in main.py

## Next Steps

1. **Protected Routes**: Add JWT verification to dashboard
2. **Logout**: Clear token from localStorage
3. **Profile Page**: Display user info from token
4. **Password Reset**: Email-based password recovery
5. **Email Verification**: Verify email addresses
6. **Session Management**: Refresh tokens, logout all devices

## Production Deployment

Before deploying to production:

1. **Use Environment Variables**:
```python
# In jwt_handler.py, replace:
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
```

2. **Switch to PostgreSQL**:
```python
# In database.py:
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
```

3. **Enable HTTPS**: Use SSL/TLS certificates
4. **Add Rate Limiting**: Prevent brute force attacks
5. **Email Service**: SendGrid, AWS SES for verification

## Support
- API Documentation: http://localhost:8000/docs
- Database File: `backend/career_nexus.db`
- JWT Secret: Currently hardcoded (change for production!)
