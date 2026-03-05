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
- **Frontend**: React 18, Tailwind CSS, Lucide Icons
- **Backend**: FastAPI, MongoDB
- **UI Components**: Shadcn/UI

## Project Structure
```
discount-centre-website/
├── backend/
│   ├── server.py          # FastAPI backend
│   ├── requirements.txt   # Python dependencies
│   └── .env.example       # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Component styles
│   │   ├── index.js       # Entry point
│   │   ├── index.css      # Global styles
│   │   └── components/ui/ # Shadcn UI components
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── package.json       # Node dependencies
│   ├── tailwind.config.js # Tailwind configuration
│   └── .env.example       # Environment variables template
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- Python 3.9+
- MongoDB (local or cloud like MongoDB Atlas)

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your MongoDB URL
uvicorn server:app --reload --port 8001
```

### Frontend Setup
```bash
cd frontend
npm install  # or yarn install
cp .env.example .env
# Edit .env with your backend URL
npm start    # or yarn start
```

## Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=discount_centre
CORS_ORIGINS=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

## Customization

### Adding/Removing Products
Edit the `allProducts` array in `frontend/src/App.js`:
```javascript
const allProducts = [
  {
    id: 1,
    name: "Product Name",
    category: "Baby Care",  // or other category
    description: "Product description",
    originalPrice: 999,
    discountPrice: 599,
    badge: "Best Seller",
    image: "https://your-image-url.jpg"
  },
  // Add more products...
];
```

### Changing Store Information
Edit the `storeInfo` object in `frontend/src/App.js`:
```javascript
const storeInfo = {
  name: "Your Store Name",
  phone: "+91 XXXXXXXXXX",
  email: "your@email.com",
  address: "Your address",
  // ...
};
```

### Changing WhatsApp Number
Update the `WHATSAPP_NUMBER` constant at the top of `App.js`:
```javascript
const WHATSAPP_NUMBER = "+91XXXXXXXXXX";
```

## Deployment

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect to Vercel/Netlify
3. Set environment variables
4. Deploy

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect to Railway/Render
3. Set environment variables
4. Deploy

## License
MIT License - Feel free to use and modify for your business.

## Support
For any questions, contact: Mahammedmukthar07@gmail.com
