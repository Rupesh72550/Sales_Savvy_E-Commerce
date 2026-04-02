import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  User, 
  Heart, 
  ChevronDown, 
  X,
  Package,
  History,
  Truck,
  Layers
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Button } from './ui';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const ordersRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    api.categories.getAll()
      .then(res => {
        if (Array.isArray(res.data)) {
          setCategories(["All Categories", ...res.data.map(c => c.name)]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch categories", err);
        setCategories(["All Categories", "Fashion", "Electronics", "Home & Living"]);
      });

    const handleClickOutside = (event) => {
      if (ordersRef.current && !ordersRef.current.contains(event.target)) setIsOrdersOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm h-16">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter text-black uppercase">
            SALES SAVVY<span className="text-orange-500">.</span>
          </h1>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
             const isActive = location.pathname === link.path;
             return (
               <Link 
                 key={link.name} 
                 to={link.path}
                 className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${
                   isActive ? 'text-orange-500' : 'text-gray-500 hover:text-black'
                 }`}
               >
                 {link.name}
               </Link>
             );
          })}
        </nav>

        {/* Search Bar - Center/Right */}
        <div className="hidden md:flex flex-1 max-w-sm bg-gray-50 rounded-xl border border-gray-100 items-center px-4 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-500/10 focus-within:border-orange-500">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <form onSubmit={(e) => { e.preventDefault(); navigate(`/shop?q=${e.target.search.value}`); }} className="flex-1 flex items-center h-10">
            <input 
              name="search"
              type="text" 
              placeholder="Search products..." 
              className="bg-transparent border-none focus:ring-0 w-full text-xs font-bold text-gray-700 placeholder:text-gray-400"
            />
          </form>
        </div>

        {/* Action Icons - Right */}
        <div className="flex items-center gap-1 md:gap-3">
          
          {/* Orders Dropdown */}
          <div className="relative" ref={ordersRef}>
            <button 
              onClick={() => setIsOrdersOpen(!isOrdersOpen)}
              className={`p-2 rounded-full transition-all ${isOrdersOpen ? 'bg-orange-50 text-orange-500' : 'hover:bg-gray-50 text-gray-700'}`}
            >
              <Package className="w-5 h-5" />
            </button>
            
            {isOrdersOpen && (
              <div className="absolute top-full right-0 mt-3 w-64 bg-white border border-gray-50 rounded-2xl shadow-2xl py-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-5 mb-3 border-b border-gray-50 pb-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your Orders</h4>
                </div>
                <Link to="/orders?tab=track" onClick={() => setIsOrdersOpen(false)} className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors">
                  <Truck className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-bold text-gray-800">Track Order</span>
                </Link>
                <Link to="/orders?tab=history" onClick={() => setIsOrdersOpen(false)} className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors">
                  <History className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold text-gray-800">Order History</span>
                </Link>
                <div className="mt-2 px-5 pt-3 border-t border-gray-50">
                  <Link to="/orders" onClick={() => setIsOrdersOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:text-orange-600">
                    View All
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`p-2 rounded-full transition-all ${isProfileOpen ? 'bg-orange-50 text-orange-500' : 'hover:bg-gray-50 text-gray-700'}`}
            >
              <User className="w-5 h-5" />
            </button>
            
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-3 w-56 bg-white border border-gray-50 rounded-2xl shadow-2xl py-4 z-50 animate-in fade-in slide-in-from-top-2">
                {user ? (
                  <>
                    <div className="px-5 mb-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Account</p>
                      <p className="text-xs font-black truncate">{user.fullName || user.sub}</p>
                    </div>
                    <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="block px-5 py-2 text-xs font-bold text-gray-800 hover:bg-gray-50">My Profile</Link>
                    <button onClick={handleLogout} className="w-full text-left px-5 py-2 text-xs font-black text-red-500 hover:bg-red-50 mt-2 border-t border-gray-50">Sign Out</button>
                  </>
                ) : (
                  <div className="px-5 py-2 text-center">
                    <Button onClick={() => { setIsProfileOpen(false); navigate('/login'); }} className="w-full h-10 rounded-xl text-[10px]">Sign In</Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="p-2 rounded-full hover:bg-gray-50 text-gray-900 transition-all relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 rounded-xl hover:bg-gray-50 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-[60] p-6 flex flex-col gap-6 animate-in slide-in-from-right overflow-y-auto">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-black uppercase tracking-tighter text-black border-b border-gray-50 pb-4"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-tighter text-black border-b border-gray-50 pb-4">Orders</Link>
          </div>
          
          <div className="mt-auto flex flex-col gap-4 pt-10 border-t border-gray-50">
            {user ? (
               <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-lg font-black uppercase text-black">
                 <User className="w-5 h-5 text-orange-500" /> Account Settings
               </Link>
            ) : (
               <Button onClick={() => { setIsMenuOpen(false); navigate('/login'); }} className="h-14">Sign In</Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
