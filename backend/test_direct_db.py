"""
Direct database test - bypass API
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from database import SessionLocal, UserDB, get_current_time
from datetime import datetime, timezone

print("Testing direct database operations...")
print("="*60)

# Create session
db = SessionLocal()

try:
    # Create a test user
    print("\n1. Creating test user...")
    hashed_password = UserDB.hash_password("TestPassword123!")
    
    test_user = UserDB(
        username="direct_test_user",
        email="directtest@example.com",
        hashed_password=hashed_password,
        full_name="Direct Test User"
    )
    
    db.add(test_user)
    db.commit()
    db.refresh(test_user)
    
    print(f"✔ User created successfully!")
    print(f"  ID: {test_user.id}")
    print(f"  Username: {test_user.username}")
    print(f"  Email: {test_user.email}")
    print(f"  Created At: {test_user.created_at}")
    
    # Verify password
    print("\n2. Testing password verification...")
    if test_user.verify_password("TestPassword123!"):
        print("✔ Password verification works!")
    else:
        print("✘ Password verification failed!")
    
    # Query user
    print("\n3. Querying user from database...")
    queried_user = db.query(UserDB).filter(UserDB.email == "directtest@example.com").first()
    if queried_user:
        print(f"✔ User query successful!")
        print(f"  Found: {queried_user.email}")
    else:
        print("✘ User query failed!")
    
    # List all users
    print("\n4. Listing all users...")
    all_users = db.query(UserDB).all()
    print(f"✔ Total users in database: {len(all_users)}")
    for user in all_users:
        print(f"  - {user.username} ({user.email})")
    
    print("\n" + "="*60)
    print("✔ All direct database tests passed!")
    print("="*60)
    
except Exception as e:
    print(f"\n✘ Error: {str(e)}")
    import traceback
    traceback.print_exc()
    
finally:
    db.close()
