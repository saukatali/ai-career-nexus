#!/bin/bash

echo "========================================"
echo "  AI Career Nexus - Starting Frontend"
echo "========================================"
echo ""

cd frontend

echo "Checking for node_modules..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo ""
echo "Starting Vite development server..."
echo "Frontend will be available at: http://localhost:5173"
echo ""
npm run dev
