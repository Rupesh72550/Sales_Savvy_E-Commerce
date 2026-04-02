import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const categoryName = typeof product.category === 'object' ? product.category?.name : product.category;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      
      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 space-y-3">
        <div className="space-y-1">
           <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{categoryName}</p>
           <Link to={`/product/${product.id}`}>
             <h3 className="text-sm font-black text-gray-900 leading-snug hover:text-orange-500 transition-colors line-clamp-1">
               {product.name}
             </h3>
           </Link>
        </div>

        <div className="flex items-center gap-1">
           <div className="flex items-center gap-0.5">
             {[...Array(5)].map((_, i) => (
               <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 4) ? 'fill-orange-400 text-orange-400' : 'text-gray-200'}`} />
             ))}
           </div>
           <span className="text-[10px] font-bold text-gray-400 ml-1">({product.reviews || 0})</span>
        </div>
        
        <div className="pt-2 flex items-center justify-between mt-auto">
          <span className="text-lg font-black text-gray-900">₹{Number(product.price).toLocaleString()}</span>
          <Button 
            onClick={() => addToCart(product)}
            className="w-10 h-10 rounded-lg bg-gray-900 text-white hover:bg-orange-500 transition-all flex items-center justify-center shadow-lg active:scale-95 p-0"
          >
            <ShoppingBag className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
