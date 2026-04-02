import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Badge } from '../components/ui';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) return (
    <div className="max-w-4xl mx-auto px-6 py-40 text-center space-y-12">
      <div className="bg-gray-50 w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-10 border border-gray-100 relative group">
        <ShoppingBag className="w-16 h-16 text-gray-300 group-hover:text-orange-500 transition-colors" />
        <div className="absolute inset-0 bg-orange-500/5 rounded-full scale-150 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="space-y-6">
        <h2 className="text-6xl font-black uppercase tracking-tighter italic text-gray-900">Library Empty.</h2>
        <p className="text-gray-500 font-bold uppercase text-sm tracking-[0.4em]">Selection missing for current session flow.</p>
      </div>
      <Link to="/shop" className="inline-block pt-8">
        <Button className="hero-btn h-18 px-12 text-sm uppercase tracking-[0.3em] shadow-xl shadow-orange-500/20">Return to Catalog</Button>
      </Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pt-10 pb-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          <div className="flex-1 w-full space-y-16">
            <div className="space-y-6">
               <h1 className="text-6xl font-black leading-none tracking-tighter uppercase italic flex items-center gap-6 text-gray-900">
                 Selection <span className="text-orange-500 underline underline-offset-8 decoration-orange-500/20">Matrix.</span>
               </h1>
               <p className="text-sm font-black uppercase tracking-[0.5em] text-gray-500">Bag Aggregate Layer</p>
            </div>

            <div className="space-y-8">
               <AnimatePresence>
                {cart.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col sm:flex-row items-center gap-12 p-12 rounded-3xl border border-gray-100 bg-white hover:border-orange-500/20 hover:shadow-2xl transition-all group"
                  >
                    <div className="w-32 h-40 rounded-2xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                       <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                    </div>
                    <div className="flex-1 space-y-6 text-center sm:text-left">
                       <div>
                          <h3 className="font-black uppercase text-sm tracking-widest text-gray-900 mb-2">{item.name}</h3>
                          <p className="text-orange-600 font-black text-3xl italic tracking-tighter">₹{item.price.toLocaleString()}</p>
                       </div>
                       <div className="flex flex-wrap items-center justify-center sm:justify-start gap-12 pt-4">
                          <div className="flex items-center bg-gray-50 rounded-full h-14 px-4 border border-gray-200">
                             <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-full transition-all"><Minus className="w-4 h-4 text-gray-500" /></button>
                             <span className="w-16 text-center text-base font-black text-gray-900">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-full transition-all group/plus"><Plus className="w-4 h-4 text-orange-500 transition-colors" /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-600 transition-colors p-2">
                             <Trash2 className="w-6 h-6" />
                          </button>
                       </div>
                    </div>
                  </motion.div>
                ))}
               </AnimatePresence>
            </div>
          </div>

          <aside className="w-full lg:w-[480px] shrink-0 sticky top-32">
             <div className="p-14 space-y-14 rounded-3xl border border-gray-100 bg-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-orange-500 to-orange-400"></div>
                <h3 className="font-black uppercase text-sm tracking-[0.4em] text-gray-500">Aggregate Insight</h3>
                
                <div className="space-y-10">
                   <div className="flex justify-between text-sm font-black uppercase tracking-widest text-gray-500">
                      <span>Selection Value</span>
                      <span className="text-gray-900 font-black">₹{cartTotal.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-sm font-black uppercase tracking-widest text-gray-500">
                      <span>Logistics Pulse</span>
                      <span className="text-green-600 italic font-bold">No Charge</span>
                   </div>
                   <div className="pt-12 border-t border-gray-100 flex justify-between items-end">
                      <span className="font-black uppercase text-sm tracking-[0.3em] text-gray-900">Final Aggregate</span>
                      <span className="text-6xl font-black tracking-tighter text-orange-600 italic">₹{cartTotal.toLocaleString()}</span>
                   </div>
                </div>

                <Button className="hero-btn h-20 w-full text-base uppercase tracking-[0.4em] shadow-xl shadow-orange-500/20 rounded-2xl">
                   Execute Payment <ArrowRight className="ml-6 w-7 h-7" />
                </Button>

                <div className="flex justify-center pt-6">
                   <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-gray-500">
                      <ShieldCheck className="w-6 h-6 text-orange-500" /> Secure Pulse Layer Verified
                   </div>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
