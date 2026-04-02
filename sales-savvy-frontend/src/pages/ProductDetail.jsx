import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Share2, Heart, Award, ShieldCheck, Zap, Minus, Plus, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button, Badge } from '../components/ui';
import api from '../services/api';
import Rating from '../components/ui/Rating';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.products.getById(id)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setProduct({ 
          id, 
          name: 'Premium Oxford Shirt', 
          price: 2999, 
          category: { name: 'Men Fashion' },
          description: 'Experience the pinnacle of craftsmanship with our signature Premium Oxford Shirt. Featuring a tailored fit, premium cotton fabric, and the specific "Sales Savvy" design aesthetic captured in our trending collections.',
          imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c' 
        });
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-6 py-40 animate-pulse flex flex-col md:flex-row gap-24">
      <div className="flex-1 aspect-[3/4] bg-gray-50 rounded-[3rem]"></div>
      <div className="flex-1 space-y-16">
        <div className="h-20 bg-gray-50 w-3/4 rounded-full"></div>
        <div className="h-48 bg-gray-50 w-full rounded-3xl"></div>
        <div className="h-20 bg-gray-50 w-1/2 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white pb-40">
      {/* Navigation Header */}
      <section className="bg-gray-50 border-b border-gray-100 py-6 mb-24">
         <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <Link to="/shop" className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-gray-500 hover:text-orange-500 transition-colors">
               <ArrowLeft className="w-5 h-5" /> Back to Matrix
            </Link>
            <div className="flex items-center gap-6 text-sm font-black uppercase tracking-[0.3em] text-gray-400">
               <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span className="text-gray-900">{product.name}</span>
            </div>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-32">
        {/* Gallery / Image */}
        <div className="flex-1 relative group">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="aspect-[3/4] bg-gray-50 rounded-[4rem] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.2)] sticky top-32"
           >
              <img src={product.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={product.name} />
              
              {/* Product Status Badge */}
              <div className="absolute top-12 left-12">
                 <Badge className="bg-white/95 backdrop-blur text-gray-900 h-12 px-8 rounded-full shadow-2xl font-black tracking-widest border border-gray-100">IN STOCK</Badge>
              </div>

              {/* Share/Actions Floating */}
              <div className="absolute top-12 right-12 flex flex-col gap-6">
                 <button className="w-14 h-14 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-xl hover:bg-orange-500 hover:text-white transition-all transform hover:scale-110">
                    <Heart className="w-6 h-6" />
                 </button>
                 <button className="w-14 h-14 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-xl hover:bg-orange-500 hover:text-white transition-all transform hover:scale-110">
                    <Share2 className="w-6 h-6" />
                 </button>
              </div>
           </motion.div>
        </div>

        <div className="flex-1 space-y-16">
           <div className="space-y-8">
              <div className="flex items-center gap-8">
                 <Rating value={product.rating || 4.5} className="scale-150 origin-left" />
                 <span className="text-sm font-black text-gray-500 uppercase tracking-widest ml-4">| {product.reviews || 450} Realized Reviews</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-gray-900 leading-none italic">
                 {product.name}
              </h1>

              <div className="flex items-center gap-6">
                 <Badge className="bg-gray-900 text-white px-8 py-3 rounded-full font-black tracking-widest text-sm">IN STOCK</Badge>
                 <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Article Node: #{product.id}</span>
              </div>
              
              <div className="flex items-baseline gap-6 pt-6">
                 <span className="text-7xl font-black text-gray-900 tracking-tighter">₹{Number(product.price).toLocaleString()}</span>
                 <span className="text-2xl text-gray-400 font-bold line-through">₹{(Number(product.price) * 1.2).toLocaleString()}</span>
                 <span className="text-orange-500 font-black text-lg uppercase tracking-widest">20% OFF</span>
              </div>
           </div>

           <div className="space-y-8">
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-gray-900 border-b-4 border-orange-500 w-max pb-3">Description</h3>
              <p className="text-gray-700 font-semibold text-2xl leading-relaxed max-w-2xl">
                 {product.description}
              </p>
           </div>

           {/* Purchase Interactions */}
           <div className="pt-16 border-t border-gray-100 space-y-14">
              <div className="flex flex-wrap items-center gap-10">
                 <div className="flex items-center bg-gray-50 rounded-2xl h-20 px-4 border border-gray-100 shadow-sm">
                    <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="w-14 h-14 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm active:scale-95"><Minus className="w-5 h-5 text-gray-400" /></button>
                    <span className="w-24 text-center font-black text-3xl text-gray-900">{quantity}</span>
                    <button onClick={() => setQuantity(quantity+1)} className="w-14 h-14 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm active:scale-95"><Plus className="w-5 h-5 text-orange-500" /></button>
                 </div>
                 <Button 
                   onClick={() => addToCart({...product, quantity})} 
                   className="flex-1 h-20 text-sm uppercase tracking-[0.4em] rounded-2xl shadow-2xl shadow-orange-500/20 bg-orange-500 text-white hover:bg-gray-900"
                 >
                    <ShoppingBag className="w-6 h-6 mr-4" /> Initiate Acquisition
                 </Button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[
                   { icon: <ShieldCheck className="w-7 h-7" />, label: "Quality Guard", desc: "Premium Verified" },
                   { icon: <Zap className="w-7 h-7" />, label: "Pulse Delivery", desc: "Priority Dispatch" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-8 p-10 bg-gray-50 rounded-3xl border border-gray-100 group hover:border-orange-500/20 transition-all hover:shadow-xl">
                      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg group-hover:bg-orange-500 group-hover:text-white transition-all transform group-hover:scale-110">
                         {item.icon}
                      </div>
                      <div className="space-y-2">
                         <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 leading-none">{item.label}</h4>
                         <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
