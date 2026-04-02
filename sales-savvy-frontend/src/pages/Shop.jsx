import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui';
import { Search, SlidersHorizontal, ChevronDown, Package, X } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(25000);

  useEffect(() => {
    Promise.all([api.products.getAll(), api.categories.getAll()])
      .then(([prodRes, catRes]) => {
        setProducts(Array.isArray(prodRes.data) ? prodRes.data : []);
        setCategories(Array.isArray(catRes.data) ? catRes.data : []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([
            { id: 1, name: 'Premium Oxford Shirt', price: 2999, rating: 4.5, category: { name: 'Men Fashion' }, imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c', description: 'Classic cotton shirt' },
            { id: 2, name: 'Classic Leather Jacket', price: 8499, rating: 4.8, category: { name: 'Outerwear' }, imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5', description: 'Timeless leather jacket' },
            { id: 3, name: 'Floral Summer Dress', price: 3499, rating: 4.2, category: { name: 'Women Fashion' }, imageUrl: 'https://images.unsplash.com/photo-1572804013307-a9a7dfd982ab', description: 'Beautful summer dress' },
            { id: 4, name: 'Slim Fit Denim', price: 2499, rating: 4.0, category: { name: 'Apparel' }, imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246', description: 'Quality denim jeans' },
        ]);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || (p.category?.name === activeCategory);
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = Number(p.price) <= priceRange;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="pt-20 pb-10 bg-gray-50 border-b border-gray-100">
         <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
            <h1 className="text-3xl font-black uppercase tracking-tighter italic text-gray-900 leading-none">
               THE <span className="text-orange-500 underline underline-offset-4 decoration-orange-500/20">CATALOG.</span>
            </h1>
            <p className="text-gray-500 font-bold max-w-2xl mx-auto text-sm uppercase tracking-widest">
               Exploring the intersection of luxury and modern utility.
            </p>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 space-y-12">
             {/* Search Filter */}
             <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 border-b border-gray-100 pb-4">Filter Search</h3>
                <div className="relative group">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500" />
                   <input 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search items..." 
                      className="w-full pl-11 pr-10 h-12 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-orange-500/5 focus:border-orange-500 transition-all outline-none"
                   />
                   {searchQuery && (
                     <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <X className="w-4 h-4" />
                     </button>
                   )}
                </div>
             </div>

             {/* Category Filter */}
             <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 border-b border-gray-100 pb-4">Categories</h3>
                <ul className="space-y-3">
                   <li 
                     className={`flex items-center gap-3 cursor-pointer transition-all ${activeCategory === 'All' ? 'text-orange-500' : 'text-gray-500 hover:text-black'}`}
                     onClick={() => setActiveCategory('All')}
                   >
                      <div className={`w-2 h-2 rounded-full ${activeCategory === 'All' ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                      <span className="text-[11px] font-black uppercase tracking-widest">All</span>
                   </li>
                   {categories.map((cat) => (
                     <li 
                       key={cat.id} 
                       className={`flex items-center gap-3 cursor-pointer transition-all ${activeCategory === cat.name ? 'text-orange-500' : 'text-gray-500 hover:text-black'}`}
                       onClick={() => setActiveCategory(cat.name)}
                     >
                       <div className={`w-2 h-2 rounded-full ${activeCategory === cat.name ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                       <span className="text-[11px] font-black uppercase tracking-widest">{cat.name}</span>
                     </li>
                   ))}
                </ul>
             </div>

             {/* Price Range */}
             <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 border-b border-gray-100 pb-4">Price (Max: ₹{priceRange.toLocaleString()})</h3>
                <div className="space-y-4 px-1">
                   <input 
                      type="range" 
                      min="0"
                      max="25000"
                      step="500"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full accent-orange-500 h-1.5 bg-gray-100 rounded-full cursor-pointer" 
                   />
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <span>₹0</span>
                      <span>₹25,000+</span>
                   </div>
                </div>
             </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 space-y-10">
            <div className="flex justify-between items-center bg-gray-50 p-6 rounded-2xl border border-gray-100">
               <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-orange-500" />
                  <span className="text-xs font-black uppercase tracking-widest text-gray-700">{filteredProducts.length} items found</span>
               </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[4/5] bg-gray-50 animate-pulse rounded-2xl"></div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-6">
                 <h2 className="text-3xl font-black uppercase tracking-tighter italic text-gray-300">No Entities Located</h2>
                 <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 underline underline-offset-4 cursor-pointer" onClick={() => {setActiveCategory('All'); setSearchQuery(''); setPriceRange(25000);}}>Reset Filters</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
