import { useState, useEffect, createContext, useContext } from "react";
import "./App.css"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Menu, 
  X,
  Star,
  Percent,
  Truck,
  Shield,
  Baby,
  Heart,
  Package,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Send,
  MessageCircle,
  User,
  CreditCard
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

const WHATSAPP_NUMBER = "+918197783024";
const WHATSAPP_MESSAGE = "Hi! I'd like to know more about your products.";

// Cart Context
const CartContext = createContext();

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Store information
const storeInfo = {
  name: "Discount Centre",
  nameKannada: "ಡಿಸ್ಕೌಂಟ್ ಸೆಂಟರ್",
  tagline: "Your Family's Hygiene & Care Partner",
  description: "Wholesale & Retail store offering quality products at prices below MRP. From baby care to household essentials, we've got everything your family needs.",
  phone: "+91 81977 83024",
  email: "Mahammedmukthar07@gmail.com",
  address: "07, Banglegudde, Near Banglegudde Junction, Karkala, Karnataka - 576117",
  gstin: "29CQOPM7443M1ZW",
  hours: [
    { day: "Monday", time: "9:00 AM - 10:00 PM" },
    { day: "Tuesday", time: "9:00 AM - 10:00 PM" },
    { day: "Wednesday", time: "9:00 AM - 10:00 PM" },
    { day: "Thursday", time: "9:00 AM - 10:00 PM" },
    { day: "Friday", time: "9:00 AM - 10:00 PM" },
    { day: "Saturday", time: "9:00 AM - 10:00 PM" },
    { day: "Sunday", time: "9:00 AM - 8:30 PM" },
  ]
};

// Product categories
const categories = [
  { id: 1, name: "Baby Care", description: "Diapers, wipes & more", icon: Baby, color: "bg-blue-50" },
  { id: 2, name: "Adult Diapers", description: "Premium adult care", icon: Heart, color: "bg-purple-50" },
  { id: 3, name: "Hygiene Products", description: "Sanitary & period care", icon: Shield, color: "bg-pink-50" },
  { id: 4, name: "Baby Accessories", description: "Bottles, clothes & more", icon: Package, color: "bg-teal-50" },
];

// All 20 Products with actual images
const allProducts = [
  {
    id: 1,
    name: "Baby Pants Diaper (Import)",
    category: "Baby Care",
    description: "Soft and comfort, Size M, L, XL available",
    originalPrice: 1199,
    discountPrice: 600,
    badge: "Best Seller",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/zqukorhp_WhatsApp%20Image%202026-03-05%20at%2011.50.59%20AM.jpeg"
  },
  {
    id: 2,
    name: "Mamy Poko Pants",
    category: "Baby Care",
    description: "Premium quality baby pants",
    originalPrice: 699,
    discountPrice: 600,
    badge: "Popular",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/qiyu2aw3_WhatsApp%20Image%202026-03-05%20at%2011.51.00%20AM%20%281%29.jpeg"
  },
  {
    id: 3,
    name: "Alfaby Baby Pants",
    category: "Baby Care",
    description: "Comfortable baby diaper pants",
    originalPrice: 699,
    discountPrice: 530,
    badge: "Value Deal",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/ura4ogia_WhatsApp%20Image%202026-03-05%20at%2011.51.00%20AM%20%282%29.jpeg"
  },
  {
    id: 4,
    name: "Nubaby Premium Pants",
    category: "Baby Care",
    description: "Import diaper, soft elastic, superb absorbency",
    originalPrice: 999,
    discountPrice: 650,
    badge: "Premium",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/i97a7z4l_WhatsApp%20Image%202026-03-05%20at%2011.51.00%20AM.jpeg"
  },
  {
    id: 5,
    name: "Little Angel Baby Diapers",
    category: "Baby Care",
    description: "Soft baby diaper pants",
    originalPrice: 699,
    discountPrice: 550,
    badge: "Top Deal",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/yihdv183_WhatsApp%20Image%202026-03-05%20at%2011.51.01%20AM%20%281%29.jpeg"
  },
  {
    id: 6,
    name: "Absorbia Baby Pants (NB)",
    category: "Baby Care",
    description: "Buy 2 Get 1 Free offer",
    originalPrice: 599,
    discountPrice: 399,
    badge: "Buy 2 Get 1",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/03zxubj1_WhatsApp%20Image%202026-03-05%20at%2011.51.01%20AM%20%282%29.jpeg"
  },
  {
    id: 7,
    name: "Good Dry Baby Pants",
    category: "Baby Care",
    description: "All sizes: NB, S, M, L, XL, XXL",
    originalPrice: 1199,
    discountPrice: 550,
    badge: "All Sizes",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/3m7y7mgg_WhatsApp%20Image%202026-03-05%20at%2011.51.01%20AM.jpeg"
  },
  {
    id: 8,
    name: "Sebamed Baby Body Care",
    category: "Baby Care",
    description: "Premium baby skincare products",
    originalPrice: 599,
    discountPrice: 509,
    badge: "10-15% OFF",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/qexpp5pj_WhatsApp%20Image%202026-03-05%20at%2011.51.02%20AM%20%281%29.jpeg"
  },
  {
    id: 9,
    name: "Realcare Period Panties",
    category: "Hygiene Products",
    description: "Comfortable period protection",
    originalPrice: 295,
    discountPrice: 180,
    badge: "Hot Deal",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/wyqnz3fx_WhatsApp%20Image%202026-03-05%20at%2011.51.02%20AM%20%282%29.jpeg"
  },
  {
    id: 10,
    name: "Absorbia Baby Pants (All Sizes)",
    category: "Baby Care",
    description: "All sizes available",
    originalPrice: 1199,
    discountPrice: 550,
    badge: "Best Value",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/ri9xud3q_WhatsApp%20Image%202026-03-05%20at%2011.51.02%20AM.jpeg"
  },
  {
    id: 11,
    name: "CIR Adult Medium Pants",
    category: "Adult Diapers",
    description: "10PC pack, 8 hours protection",
    originalPrice: 425,
    discountPrice: 290,
    badge: "Adult Care",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/sfa02vkp_WhatsApp%20Image%202026-03-05%20at%2011.51.04%20AM%20%282%29.jpeg"
  },
  {
    id: 12,
    name: "Real Care Period Panties (5PC)",
    category: "Hygiene Products",
    description: "L-XL Size, 3D leak guards",
    originalPrice: 275,
    discountPrice: 180,
    badge: "5 Pack",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/9etpc72t_WhatsApp%20Image%202026-03-05%20at%2011.51.04%20AM.jpeg"
  },
  {
    id: 13,
    name: "Baby Bottle Crown Cap 2-in-1",
    category: "Baby Accessories",
    description: "Cute design with handles",
    originalPrice: 849,
    discountPrice: 370,
    badge: "56% OFF",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/4a5rx4vi_WhatsApp%20Image%202026-03-05%20at%2011.51.05%20AM%20%281%29.jpeg"
  },
  {
    id: 14,
    name: "Baby Night Dress",
    category: "Baby Accessories",
    description: "Comfortable sleepwear",
    originalPrice: 750,
    discountPrice: 380,
    badge: "49% OFF",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/nafpj1mm_WhatsApp%20Image%202026-03-05%20at%2011.51.05%20AM%20%282%29.jpeg"
  },
  {
    id: 15,
    name: "Baby Slipper Wonderful",
    category: "Baby Accessories",
    description: "Cute bear design slippers",
    originalPrice: 999,
    discountPrice: 350,
    badge: "65% OFF",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/1e7cd178_WhatsApp%20Image%202026-03-05%20at%2011.51.05%20AM.jpeg"
  },
  {
    id: 16,
    name: "Absorbia Baby Wipes 80PC",
    category: "Baby Care",
    description: "Buy 1 Get 2 Free! Pack of 6",
    originalPrice: 750,
    discountPrice: 249,
    badge: "Buy 1 Get 2",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/r9gmdt9a_WhatsApp%20Image%202026-03-05%20at%2011.51.03%20AM%20%281%29.jpeg"
  },
  {
    id: 17,
    name: "Pampers Baby Pants (S-86)",
    category: "Baby Care",
    description: "All-round protection, Anti-rash",
    originalPrice: 1449,
    discountPrice: 880,
    badge: "No.1 Brand",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/q3pad939_WhatsApp%20Image%202026-03-05%20at%2011.51.03%20AM%20%282%29.jpeg"
  },
  {
    id: 18,
    name: "LuvLap Easy Baby Pants",
    category: "Baby Care",
    description: "Anti-rash, Aloe Vera, S-M-L-XL",
    originalPrice: 999,
    discountPrice: 580,
    badge: "All Sizes",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/gebr46gx_WhatsApp%20Image%202026-03-05%20at%2011.51.03%20AM%20%283%29.jpeg"
  },
  {
    id: 19,
    name: "RealCare Sanitary Pad 40PC",
    category: "Hygiene Products",
    description: "Maximum comfort & freshness, XXL",
    originalPrice: 450,
    discountPrice: 320,
    badge: "40 Pack",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/9l6lptpk_WhatsApp%20Image%202026-03-05%20at%2011.51.03%20AM.jpeg"
  },
  {
    id: 20,
    name: "Littles Comfy Night Pants",
    category: "Baby Care",
    description: "12 hours overnight absorption",
    originalPrice: 999,
    discountPrice: 550,
    badge: "Night Care",
    image: "https://customer-assets.emergentagent.com/job_value-driven-shop/artifacts/ya4mhb9d_WhatsApp%20Image%202026-03-05%20at%2011.51.04%20AM%20%281%29.jpeg"
  }
];

// Features/USPs
const features = [
  { icon: Percent, title: "Below MRP Prices", description: "All products at wholesale rates" },
  { icon: Package, title: "Wide Selection", description: "500+ products under one roof" },
  { icon: Truck, title: "Cash on Delivery", description: "Pay when you receive" },
  { icon: Shield, title: "Genuine Products", description: "100% authentic branded items" }
];

// Sample feedback/reviews
const initialReviews = [
  { id: 1, name: "Priya Sharma", rating: 5, comment: "Best prices in Karkala! Always shop here for baby products.", date: "Feb 2026" },
  { id: 2, name: "Mohammed Ali", rating: 5, comment: "Excellent service and genuine products. Highly recommended!", date: "Feb 2026" },
  { id: 3, name: "Lakshmi R", rating: 4, comment: "Good variety of products. Staff is very helpful.", date: "Jan 2026" },
];

// Navbar Component
const Navbar = ({ scrolled, mobileMenuOpen, setMobileMenuOpen }) => {
  const { cartCount, setIsCartOpen } = useCart();
  
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Feedback", href: "#feedback" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-dark shadow-soft" : "bg-white/90 backdrop-blur-sm"}`} data-testid="main-navbar">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#home" className="flex items-center gap-2" data-testid="logo-link">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-sky-500/30">
                <span className="w-full text-center">DC</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-slate-900">Discount Centre</span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="nav-link text-sm" data-testid={`nav-${item.label.toLowerCase()}`}>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-600 hover:text-sky-600 transition-colors"
                data-testid="cart-button"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-sky-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <a href={`tel:${storeInfo.phone}`} className="hidden md:flex items-center gap-2 text-sm text-slate-600 hover:text-sky-600 transition-colors">
                <Phone className="w-4 h-4" />
              </a>
              <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(true)} data-testid="mobile-menu-button">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="absolute inset-0" onClick={() => setMobileMenuOpen(false)} />
        <div className="mobile-menu-content">
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-lg">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-lg font-medium text-slate-700 hover:text-sky-600 py-2" onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Cart Drawer Component
const CartDrawer = () => {
  const { cartItems, cartTotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", address: "" });

  const handlePlaceOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Please fill all fields");
      return;
    }

    // Build order message for WhatsApp
    let orderMessage = `*NEW ORDER - Discount Centre*\n\n`;
    orderMessage += `*Customer Details:*\n`;
    orderMessage += `Name: ${customerInfo.name}\n`;
    orderMessage += `Phone: ${customerInfo.phone}\n`;
    orderMessage += `Address: ${customerInfo.address}\n\n`;
    orderMessage += `*Order Items:*\n`;
    
    cartItems.forEach((item, index) => {
      orderMessage += `${index + 1}. ${item.name}\n`;
      orderMessage += `   Qty: ${item.quantity} x ₹${item.discountPrice} = ₹${item.quantity * item.discountPrice}\n`;
    });
    
    orderMessage += `\n*Total Amount: ₹${cartTotal}*\n`;
    orderMessage += `*Payment: Cash on Delivery*\n\n`;
    orderMessage += `Thank you for your order!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    clearCart();
    setIsCheckout(false);
    setIsCartOpen(false);
    setCustomerInfo({ name: "", phone: "", address: "" });
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/50" onClick={() => { setIsCartOpen(false); setIsCheckout(false); }} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">{isCheckout ? "Checkout" : "Your Cart"}</h2>
          <button onClick={() => { setIsCartOpen(false); setIsCheckout(false); }} className="p-2 text-slate-500 hover:text-slate-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isCheckout ? (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500">Your cart is empty</p>
                  <Button onClick={() => setIsCartOpen(false)} className="mt-4 btn-primary">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3 p-3 bg-slate-50 rounded-xl" data-testid={`cart-item-${item.id}`}>
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                        <p className="text-sky-600 font-bold">₹{item.discountPrice}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-white border flex items-center justify-center">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-medium w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-white border flex items-center justify-center">
                            <Plus className="w-3 h-3" />
                          </button>
                          <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-sky-600">₹{cartTotal}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                  <Truck className="w-4 h-4" />
                  <span>Cash on Delivery Available</span>
                </div>
                <Button onClick={() => setIsCheckout(true)} className="w-full btn-primary" data-testid="proceed-checkout">
                  Proceed to Checkout
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Checkout Form */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-2 text-amber-800 font-medium mb-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Cash on Delivery</span>
                  </div>
                  <p className="text-sm text-amber-700">Pay when you receive your order</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Name *</label>
                  <Input
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    placeholder="Enter your full name"
                    data-testid="checkout-name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <Input
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    placeholder="Enter your phone number"
                    data-testid="checkout-phone"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                  <Textarea
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    placeholder="Enter your complete address"
                    rows={3}
                    data-testid="checkout-address"
                  />
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-medium mb-3">Order Summary</h4>
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm py-1">
                      <span className="truncate flex-1">{item.name} x{item.quantity}</span>
                      <span className="font-medium ml-2">₹{item.discountPrice * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-sky-600">₹{cartTotal}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Footer */}
            <div className="border-t p-4 space-y-3">
              <Button onClick={handlePlaceOrder} className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white" data-testid="place-order-btn">
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Place Order via WhatsApp
              </Button>
              <button onClick={() => setIsCheckout(false)} className="w-full text-slate-600 text-sm py-2">
                ← Back to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="home" className="pt-20 md:pt-24 pb-16 bg-hero-gradient relative overflow-hidden">
      <div className="blob-1 -top-48 -left-48 opacity-50" />
      <div className="blob-2 top-20 right-0 opacity-50" />
      
      <div className="container-custom relative z-10">
        <div className="hero-bento">
          <div className="hero-main animate-fade-in-up" data-testid="hero-main">
            <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">
              <Percent className="w-3 h-3 mr-1" /> Below MRP Prices
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 leading-tight">
              More Value.<br />
              <span className="gradient-text">Better Deals.</span><br />
              Every Day.
            </h1>
            <p className="text-base md:text-lg text-slate-600 mb-8 max-w-lg">
              {storeInfo.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#products">
                <Button className="btn-primary w-full sm:w-auto" data-testid="hero-explore-deals">
                  Shop Now <ShoppingCart className="w-4 h-4 ml-1" />
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" className="btn-secondary w-full sm:w-auto" data-testid="hero-visit-store">
                  Visit Our Store
                </Button>
              </a>
            </div>
          </div>

          <div className="hero-side hero-side-top animate-fade-in-up animation-delay-200" data-testid="hero-stats">
            <div className="stat-number">20+</div>
            <p className="text-slate-700 font-medium mt-2">Products Listed</p>
            <div className="flex items-center gap-1 mt-2 text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
          </div>

          <div className="hero-side hero-side-bottom animate-fade-in-up animation-delay-300" data-testid="hero-products">
            <div className="stat-number">50%</div>
            <p className="text-slate-700 font-medium mt-2">Savings Upto</p>
            <p className="text-sm text-slate-500 mt-1">Cash on Delivery</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {features.map((feature, index) => (
            <div key={feature.title} className="bg-white rounded-2xl p-4 md:p-6 shadow-soft card-hover animate-fade-in-up" style={{ animationDelay: `${(index + 4) * 100}ms` }}>
              <div className="feature-icon mb-3"><feature.icon className="w-5 h-5" /></div>
              <h3 className="font-semibold text-slate-900 text-sm md:text-base">{feature.title}</h3>
              <p className="text-xs md:text-sm text-slate-500 mt-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Products Section
const ProductsSection = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredProducts = selectedCategory === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  const categoryList = ["All", ...new Set(allProducts.map(p => p.category))];

  return (
    <section id="products" className="py-16 md:py-24 bg-subtle-gradient">
      <div className="container-custom">
        <div className="text-center mb-8 animate-fade-in-up" data-testid="products-header">
          <Badge className="mb-4 bg-sky-100 text-sky-800 hover:bg-sky-100">Shop Now</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Products</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">All products available at prices below MRP. Add to cart and order via WhatsApp!</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categoryList.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? "bg-sky-600 text-white shadow-lg shadow-sky-600/30" 
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
              data-testid={`filter-${cat.toLowerCase().replace(' ', '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, index) => {
            const savings = Math.round((1 - product.discountPrice / product.originalPrice) * 100);
            return (
              <div
                key={product.id}
                className="product-card animate-fade-in-up group"
                style={{ animationDelay: `${index * 50}ms` }}
                data-testid={`product-card-${product.id}`}
              >
                <div className="mb-2">
                  <span className="badge-deal text-xs">{product.badge}</span>
                </div>
                
                <div className="product-img mb-3 group-hover:scale-[1.02] transition-transform">
                  <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover rounded-lg" />
                </div>

                <p className="text-xs text-slate-500 mb-1">{product.category}</p>
                <h3 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-slate-400 mb-2 line-clamp-1">{product.description}</p>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold text-sky-600">₹{product.discountPrice}</span>
                  <span className="text-sm text-slate-400 line-through">₹{product.originalPrice}</span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    {savings}% OFF
                  </span>
                </div>

                <Button
                  onClick={() => addToCart(product)}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white text-sm h-9"
                  data-testid={`add-to-cart-${product.id}`}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add to Cart
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative animate-fade-in-up">
            <div className="aspect-square rounded-3xl overflow-hidden img-zoom">
              <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=800&fit=crop" alt="Discount Centre Store" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-2xl p-4 md:p-6 shadow-xl">
              <p className="text-sm text-slate-500">Serving Karkala since</p>
              <p className="text-2xl md:text-3xl font-bold text-sky-600">2015</p>
            </div>
          </div>

          <div className="animate-fade-in-up animation-delay-200">
            <Badge className="mb-4 bg-sky-100 text-sky-800 hover:bg-sky-100">About Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Trusted Partner for<br /><span className="gradient-text">Everyday Savings</span>
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              <strong>Discount Centre</strong> ({storeInfo.nameKannada}) has been Karkala's favorite destination for quality household products at unbeatable prices.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              From baby care essentials to hygiene products - we stock everything your family needs, all at wholesale prices available for retail customers too.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div><p className="text-3xl font-bold text-sky-600">20+</p><p className="text-slate-600 text-sm">Products Online</p></div>
              <div><p className="text-3xl font-bold text-sky-600">100%</p><p className="text-slate-600 text-sm">Genuine Products</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Feedback Section
const FeedbackSection = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    
    const review = {
      id: Date.now(),
      ...newReview,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="feedback" className="py-16 md:py-24 bg-slate-50">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in-up">
          <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">Customer Reviews</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Share your experience shopping with us</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Review Form */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft animate-fade-in-up">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-sky-600" />
              Write a Review
            </h3>
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600 fill-current" />
                </div>
                <p className="text-green-600 font-medium">Thank you for your feedback!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <Input
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    placeholder="Enter your name"
                    data-testid="feedback-name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({...newReview, rating: star})}
                        className="focus:outline-none"
                      >
                        <Star className={`w-8 h-8 transition-colors ${star <= newReview.rating ? "text-amber-400 fill-current" : "text-slate-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Your Review</label>
                  <Textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    placeholder="Share your experience..."
                    rows={4}
                    data-testid="feedback-comment"
                  />
                </div>
                
                <Button type="submit" className="w-full btn-primary" data-testid="submit-feedback">
                  <Send className="w-4 h-4 mr-2" /> Submit Review
                </Button>
              </form>
            )}
          </div>

          {/* Reviews List */}
          <div className="space-y-4 animate-fade-in-up animation-delay-200">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-2xl p-5 shadow-soft" data-testid={`review-${review.id}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{review.name}</p>
                      <p className="text-xs text-slate-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-amber-400 fill-current" : "text-slate-200"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in-up">
          <Badge className="mb-4 bg-sky-100 text-sky-800 hover:bg-sky-100">Visit Us</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Come Say Hello</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Visit our store in Karkala or order via WhatsApp</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="animate-fade-in-up">
            <div className="bg-slate-50 rounded-3xl p-6 md:p-8 h-full">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="contact-item">
                  <div className="contact-icon"><MapPin className="w-5 h-5" /></div>
                  <div>
                    <p className="font-medium text-slate-900">Store Address</p>
                    <p className="text-slate-600 text-sm mt-1">{storeInfo.address}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon"><Phone className="w-5 h-5" /></div>
                  <div>
                    <p className="font-medium text-slate-900">Phone / WhatsApp</p>
                    <a href={`tel:${storeInfo.phone}`} className="text-sky-600 text-sm mt-1 hover:underline">{storeInfo.phone}</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon"><Mail className="w-5 h-5" /></div>
                  <div>
                    <p className="font-medium text-slate-900">Email</p>
                    <a href={`mailto:${storeInfo.email}`} className="text-sky-600 text-sm mt-1 hover:underline break-all">{storeInfo.email}</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon"><Clock className="w-5 h-5" /></div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 mb-3">Store Hours</p>
                    <table className="hours-table text-sm">
                      <tbody>
                        {storeInfo.hours.map((item) => (
                          <tr key={item.day}><td>{item.day}</td><td>{item.time}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    Chat on WhatsApp
                  </Button>
                </a>
                <a href="https://maps.google.com/?q=Banglegudde+Junction+Karkala+Karnataka" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" className="w-full btn-secondary"><MapPin className="w-4 h-4 mr-2" />Get Directions</Button>
                </a>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up animation-delay-200">
            <div className="map-container h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.679847123456!2d74.9876543!3d13.2123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbca87a0d0c9a0f%3A0x0!2sBanglegudde%2C%20Karkala!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Discount Centre Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12 md:py-16">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white font-bold text-lg">DC</div>
              <span className="font-bold text-lg">Discount Centre</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">Your family's hygiene & care partner. Quality products at wholesale prices.</p>
            <p className="text-slate-500 text-xs">GSTIN: {storeInfo.gstin}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#home" className="footer-link text-sm block">Home</a>
              <a href="#products" className="footer-link text-sm block">Products</a>
              <a href="#about" className="footer-link text-sm block">About Us</a>
              <a href="#contact" className="footer-link text-sm block">Contact</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <div className="space-y-2">
              {categories.map(cat => <span key={cat.id} className="text-slate-400 text-sm block">{cat.name}</span>)}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <a href={`tel:${storeInfo.phone}`} className="footer-link text-sm flex items-center gap-2"><Phone className="w-4 h-4" />{storeInfo.phone}</a>
              <a href={`mailto:${storeInfo.email}`} className="footer-link text-sm flex items-center gap-2"><Mail className="w-4 h-4 flex-shrink-0" /><span className="truncate">{storeInfo.email}</span></a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">© {currentYear} Discount Centre. All rights reserved.</p>
          <p className="text-slate-500 text-sm">Karkala, Karnataka, India</p>
        </div>
      </div>
    </footer>
  );
};

// WhatsApp Floating Button
const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn animate-bounce-slow"
      aria-label="Chat on WhatsApp"
      data-testid="whatsapp-float-button"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
};

// Main App
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen">
        <Navbar scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <CartDrawer />
        <main>
          <HeroSection />
          <ProductsSection />
          <AboutSection />
          <FeedbackSection />
          <ContactSection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}

export default App;
