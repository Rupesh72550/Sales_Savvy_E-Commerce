import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-32 pb-16 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          
          {/* Brand Column */}
          <div className="space-y-10">
            <Link to="/" className="inline-block group">
              <h2 className="text-4xl font-black tracking-tighter group-hover:scale-105 transition-transform uppercase italic">
              SALES SAVVY<span className="text-orange-500">Sales Savvy</span>
              </h2>
            </Link>
            <p className="text-gray-400 font-semibold leading-relaxed text-lg">
              Redefining your shopping experience with curated premium collections and world-class service.
            </p>
            <div className="flex gap-6">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <button key={i} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:-translate-y-2 transition-all">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-10">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-orange-500">Quick Links</h3>
            <nav className="flex flex-col gap-6">
              {['Home', 'Shop', 'New Arrivals', 'Offers', 'About Us', 'Blog'].map((item) => (
                <Link key={item} to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-all flex items-center gap-4 group font-bold">
                  <span className="w-0 h-[2px] bg-orange-500 group-hover:w-6 transition-all duration-300"></span> {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-10">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-orange-500">Support</h3>
            <nav className="flex flex-col gap-6">
              {['Contact Us', 'Help Center', 'FAQs', 'Sizes Guide', 'Shipping Policy', 'Returns'].map((item) => (
                <Link key={item} to="/support" className="text-gray-400 hover:text-white transition-all flex items-center gap-4 group font-bold">
                  <span className="w-0 h-[2px] bg-orange-500 group-hover:w-6 transition-all duration-300"></span> {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-10">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-orange-500">Get in Touch</h3>
            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex flex-shrink-0 items-center justify-center group-hover:bg-orange-500 transition-all transform group-hover:scale-110">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-gray-400 text-base font-semibold leading-tight">16th Main Road 2nd Stage BTM Layout, <br />Bengaluru,  560076</p>
              </div>
              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex flex-shrink-0 items-center justify-center group-hover:bg-orange-500 transition-all transform group-hover:scale-110">
                  <Phone className="w-5 h-5" />
                </div>
                <p className="text-gray-400 text-base font-semibold">+91 6202507661</p>
              </div>
              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex flex-shrink-0 items-center justify-center group-hover:bg-orange-500 transition-all transform group-hover:scale-110">
                  <Mail className="w-5 h-5" />
                </div>
                <p className="text-gray-400 text-base font-semibold truncate">support@salessavvy.com</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            © {currentYear} SALES SAVVY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-10 text-sm font-bold text-gray-500 uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
