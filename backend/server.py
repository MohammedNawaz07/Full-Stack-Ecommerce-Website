from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.getenv("MONGO_URL")
db_name = os.getenv("DB_NAME")

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]
# Create the main app
app = FastAPI(title="Discount Centre API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class Category(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: int
    name: str
    description: str
    image: str
    color: str

class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: int
    name: str
    category: str
    originalPrice: float
    discountPrice: float
    savings: int
    badge: str
    image: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    message: str

class StoreInfo(BaseModel):
    name: str = "Discount Centre"
    nameKannada: str = "ಡಿಸ್ಕೌಂಟ್ ಸೆಂಟರ್"
    tagline: str = "Your Family's Hygiene & Care Partner"
    description: str = "Wholesale & Retail store offering quality products at prices below MRP."
    phone: str = "+91 81977 83024"
    email: str = "Mahammedmukthar07@gmail.com"
    address: str = "07, Banglegudde, Near Banglegudde Junction, Karkala, Karnataka - 576117"
    gstin: str = "29CQOPM7443M1ZW"
    whatsapp: str = "+918197783024"


# Store data
store_info = StoreInfo()

categories_data = [
    {
        "id": 1,
        "name": "Baby Care",
        "description": "Diapers, wipes, baby food & more",
        "image": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=800&fit=crop",
        "color": "bg-blue-50"
    },
    {
        "id": 2,
        "name": "Adult Diapers",
        "description": "Premium adult care products",
        "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=800&fit=crop",
        "color": "bg-purple-50"
    },
    {
        "id": 3,
        "name": "Housekeeping",
        "description": "Cleaning supplies & detergents",
        "image": "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&h=800&fit=crop",
        "color": "bg-orange-50"
    },
    {
        "id": 4,
        "name": "Body Care",
        "description": "Soaps, lotions & personal care",
        "image": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=800&fit=crop",
        "color": "bg-teal-50"
    },
    {
        "id": 5,
        "name": "Hygiene Products",
        "description": "Sanitizers, tissues & essentials",
        "image": "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=800&fit=crop",
        "color": "bg-green-50"
    },
    {
        "id": 6,
        "name": "Cosmetics",
        "description": "Beauty & skincare products",
        "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop",
        "color": "bg-pink-50"
    }
]

products_data = [
    {
        "id": 1,
        "name": "Pampers Baby Diapers",
        "category": "Baby Care",
        "originalPrice": 1299,
        "discountPrice": 999,
        "savings": 23,
        "badge": "Best Seller",
        "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop"
    },
    {
        "id": 2,
        "name": "Huggies Wipes Pack",
        "category": "Baby Care",
        "originalPrice": 450,
        "discountPrice": 349,
        "savings": 22,
        "badge": "Top Deal",
        "image": "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&h=400&fit=crop"
    },
    {
        "id": 3,
        "name": "Surf Excel Detergent 4kg",
        "category": "Housekeeping",
        "originalPrice": 799,
        "discountPrice": 649,
        "savings": 19,
        "badge": "Popular",
        "image": "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop"
    },
    {
        "id": 4,
        "name": "Dove Body Wash 1L",
        "category": "Body Care",
        "originalPrice": 599,
        "discountPrice": 449,
        "savings": 25,
        "badge": "Best Seller",
        "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop"
    },
    {
        "id": 5,
        "name": "Colgate Toothpaste Pack",
        "category": "Hygiene",
        "originalPrice": 350,
        "discountPrice": 275,
        "savings": 21,
        "badge": "Value Pack",
        "image": "https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=400&fit=crop"
    },
    {
        "id": 6,
        "name": "Lakme Makeup Kit",
        "category": "Cosmetics",
        "originalPrice": 1499,
        "discountPrice": 1199,
        "savings": 20,
        "badge": "Trending",
        "image": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop"
    }
]


# Routes
@api_router.get("/")
async def root():
    return {"message": "Welcome to Discount Centre API"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

@api_router.get("/store", response_model=StoreInfo)
async def get_store_info():
    return store_info

@api_router.get("/categories", response_model=List[Category])
async def get_categories():
    return [Category(**cat) for cat in categories_data]

@api_router.get("/products", response_model=List[Product])
async def get_products():
    return [Product(**prod) for prod in products_data]

@api_router.get("/products/bestsellers", response_model=List[Product])
async def get_bestsellers():
    return [Product(**prod) for prod in products_data]

@api_router.get("/products/category/{category_name}", response_model=List[Product])
async def get_products_by_category(category_name: str):
    filtered = [Product(**prod) for prod in products_data if prod["category"].lower() == category_name.lower()]
    return filtered

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contact_messages.insert_one(doc)
    return contact_obj

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
