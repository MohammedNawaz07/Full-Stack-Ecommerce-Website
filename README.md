# Discount Centre Website

A modern e-commerce website for Discount Centre - Wholesale & Retail store in Karkala, Karnataka.

## Features
- 20+ Products with images and pricing
- Add to Cart functionality
- Cash on Delivery checkout via WhatsApp
- Customer feedback/reviews section
- Responsive design (mobile, tablet, desktop)
- Category filtering
- Google Maps integration

## Tech Stack
Frontend: React 18, Tailwind CSS  
Backend: FastAPI  
Database: MongoDB  

## Project Structure

discount-centre-website/
backend/
server.py
requirements.txt

frontend/
src/
App.js
App.css
index.js
index.css

## Setup Instructions

### Backend

cd backend  
pip install -r requirements.txt  
python -m uvicorn server:app --reload

### Frontend

cd frontend  
npm install  
npm start

## Environment Variables

Backend (.env)

MONGO_URL=mongodb://localhost:27017  
DB_NAME=discount_centre  
CORS_ORIGINS=http://localhost:3000  

Frontend (.env)

REACT_APP_BACKEND_URL=http://localhost:8000

## Deployment

Frontend → Vercel / Netlify  
Backend → Render / Railway  
Database → MongoDB Atlas