import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductList from '../components/ProductList';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
             <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-accent"></div>
                <span className="text-xs font-black uppercase tracking-[0.4em] text-accent">Our Selection</span>
             </div>
             <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">
               Trending <span className="text-gray-300">Now.</span>
             </h2>
          </div>
          <Link to="/shop">
             <Button variant="link" className="group h-auto p-0 text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                View All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
             </Button>
          </Link>
        </div>

        <ProductList />
      </section>

      {/* CTA / Newsletter Section */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
         <div className="relative bg-primary rounded-[3rem] overflow-hidden p-12 md:p-24 text-center space-y-10">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 space-y-6"
            >
               <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none text-center">
                  JOIN THE <span className="text-orange-500">SAVVY</span> CLUB
               </h2>
               <p className="text-gray-300 text-xl max-w-2xl mx-auto font-semibold text-center">
                  Subscribe to receive updates, access to exclusive deals, and more.
               </p>
            </motion.div>

            <div className="relative z-10 max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
               <input 
                 type="email" 
                 placeholder="Enter your email address" 
                 className="flex-1 h-16 rounded-2xl px-8 bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all placeholder:text-gray-500"
               />
               <Button className="h-16 px-10 rounded-2xl shadow-2xl shadow-accent/20">
                  SUBSCRIBE
               </Button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
