"""Quick registration test with detailed error output"""
import requests
import json

url = "http://localhost:8000/api/auth/register"
data = {
    "username": "testuser123",
    "email": "test123@example.com",
    "password": "SecurePass123!",
    "full_name": "Test User"
}

print("Sending registration request...")
print(f"URL: {url}")
print(f"Data: {json.dumps(data, indent=2)}")
print()

response = requests.post(url, json=data)

print(f"Status Code: {response.status_code}")
print(f"Response Headers: {dict(response.headers)}")
print()
print("Response Body:")
print(response.text)
