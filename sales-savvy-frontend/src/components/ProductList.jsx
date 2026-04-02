import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import api from '../services/api';
import { RefreshCw, Zap } from 'lucide-react';
import { Button } from './ui';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const generateRandomProducts = useCallback(() => {
    const productCatalog = [
      {
        category: 'Laptops',
        items: [
          { name: 'MacBook Pro M3', description: 'Ultimate power for creators and professionals.' },
          { name: 'Dell XPS 15', description: 'Stunning display with high-performance internals.' },
          { name: 'ASUS ROG Zephyrus', description: 'Fluid gaming performance in a portable chassis.' }
        ]
      },
      {
        category: 'Shoes',
        items: [
          { name: 'Air Jordan 1', description: 'Iconic style with premium comfort and support.' },
          { name: 'Nike Pegasus 40', description: 'Responsive cushioning for your daily runs.' },
          { name: 'Adidas Ultraboost', description: 'Energy-returning foam for ultimate walking comfort.' }
        ]
      },
      {
        category: 'Watches',
        items: [
          { name: 'Rolex Submariner', description: 'The pinnacle of luxury diving timepieces.' },
          { name: 'Apple Watch Ultra', description: 'The most capable and rugged Apple Watch yet.' },
          { name: 'Omega Speedmaster', description: 'A legendary chronograph with space heritage.' }
        ]
      },
      {
        category: 'Phones',
        items: [
          { name: 'iPhone 15 Pro', description: 'Titanium design with the advanced A17 Pro chip.' },
          { name: 'Samsung Galaxy S24', description: 'Unleash new levels of creativity and productivity.' },
          { name: 'Google Pixel 8', description: 'The helpful phone engineered by Google with Pro cameras.' }
        ]
      }
    ];

    const count = Math.floor(Math.random() * (20 - 12 + 1)) + 12;
    const randomProds = Array.from({ length: count }, (_, i) => {
      const catGroup = productCatalog[Math.floor(Math.random() * productCatalog.length)];
      const item = catGroup.items[Math.floor(Math.random() * catGroup.items.length)];
      const id = 2000 + i + Math.floor(Math.random() * 1000);
      
      return {
        id,
        name: item.name,
        description: item.description,
        price: Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
        rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
        reviews: Math.floor(Math.random() * 1000) + 50,
        category: { name: catGroup.category },
        imageUrl: `https://source.unsplash.com/300x300/?${catGroup.category.toLowerCase()},${item.name.split(' ')[0].toLowerCase()}`
      };
    });
    return randomProds;
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.products.getRandom();
      setProducts(Array.isArray(res.data) ? res.data : generateRandomProducts());
    } catch (err) {
      console.warn("Backend shuffle failed, using frontend generator", err);
      setTimeout(() => {
        setProducts(generateRandomProducts());
        setLoading(false);
      }, 800);
      return;
    }
    setLoading(false);
  }, [generateRandomProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-6">
            <div className="aspect-[4/5] bg-muted animate-pulse rounded-[2rem]"></div>
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded-full"></div>
            <div className="h-6 w-1/2 bg-muted animate-pulse rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-muted/30 p-10 rounded-[3rem] border border-border">
         <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
               <Zap className="w-7 h-7" />
            </div>
            <div>
               <h3 className="text-base font-black uppercase tracking-widest text-gray-900 leading-none">Dynamic Stream</h3>
               <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">Live Database Aggregate</p>
            </div>
         </div>
         <Button 
           onClick={fetchProducts}
           className="hero-btn h-16 px-12 text-sm uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-orange-500/10"
         >
            <RefreshCw className="w-4 h-4 mr-3" /> Shuffle Products
         </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
