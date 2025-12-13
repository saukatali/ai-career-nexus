"""
Database Initialization Script
Creates the production database with all required tables
"""
from database import init_db, engine, Base, UserDB
import sys
import os

def main():
    """Initialize the database"""
    print("="*60)
    print("  AI Career Nexus - Database Initialization")
    print("="*60)
    print()
    
    try:
        # Remove old database if exists
        old_db = "career_nexus.db"
        if os.path.exists(old_db):
            os.remove(old_db)
            print(f"✔ Removed old database: {old_db}")
        
        # Create all tables
        print("\nCreating database tables...")
        Base.metadata.create_all(bind=engine)
        
        print("\n✔ Database created successfully!")
        print("\nTables created:")
        print("  • users")
        print("    - id (INTEGER, PRIMARY KEY)")
        print("    - username (VARCHAR, UNIQUE)")
        print("    - email (VARCHAR, UNIQUE)")
        print("    - hashed_password (VARCHAR)")
        print("    - full_name (VARCHAR)")
        print("    - is_active (BOOLEAN, default: True)")
        print("    - created_at (DATETIME)")
        print("    - updated_at (DATETIME)")
        
        print("\n" + "="*60)
        print("  Database Setup Complete!")
        print("="*60)
        
        sys.exit(0)
        
    except Exception as e:
        print(f"\n✘ Error creating database: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()
