import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[60vh] lg:min-h-[50vh] flex items-center lg:overflow-hidden hero-gradient">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Content */}
        <div className="relative z-10 space-y-8 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-orange-500/20 bg-orange-500/5 rounded-full">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">New Season Arrived</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-gray-900 uppercase italic">
              Premium <br />
              <span className="text-orange-500 underline decoration-orange-500/20 underline-offset-8">Fashion</span> <br />
              Collection
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 font-semibold max-w-xl leading-relaxed">
              Experience the pinnacle of luxury and craftsmanship. Our latest collection blends timeless elegance with modern sophistication.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap items-center gap-4 md:gap-8"
          >
            <Link to="/shop">
              <Button className="h-16 px-10 text-xs font-black tracking-[0.2em] uppercase rounded-full shadow-2xl shadow-orange-500/25 hover:-translate-y-1 active:scale-95 transition-all bg-orange-500">
                Shop Now <ArrowRight className="ml-3 w-4 h-4" />
              </Button>
            </Link>
            
            <button className="flex items-center gap-4 group transition-all">
              <div className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-all hover:scale-110">
                <Play className="w-4 h-4 fill-gray-900 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-gray-900 transition-colors">Watch Story</span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-8 flex gap-8 md:gap-16 border-t-2 border-gray-50"
          >
            <div>
              <p className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900">15k+</p>
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">Happy Clients</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900">98%</p>
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">Satisfaction</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900">12+</p>
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">Global Stores</p>
            </div>
          </motion.div>
        </div>

        {/* Right Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md aspect-[3/4] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.25)] group">
             <img 
               src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
               alt="New Collection Model" 
               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 bg-gradient-to-t from-black/70 to-transparent">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl p-4 md:p-8 flex items-center justify-between">
                   <div>
                      <p className="text-white text-[8px] md:text-xs font-bold uppercase tracking-widest opacity-80">New Arrival</p>
                      <h3 className="text-white text-lg md:text-2xl font-black tracking-tight">Fashion Edition</h3>
                   </div>
                   <div className="w-10 h-10 md:w-14 md:h-14 bg-orange-500 rounded-full flex items-center justify-center text-white font-black hover:scale-110 transition-transform cursor-pointer">
                      →
                   </div>
                </div>
             </div>
          </div>

          {/* Floating Badge */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 md:-top-12 md:-right-12 w-32 h-32 md:w-48 md:h-48 bg-white rounded-full p-4 md:p-5 shadow-2xl flex items-center justify-center text-center hidden sm:flex border border-gray-100"
          >
            <div className="border-2 border-dashed border-orange-500/30 rounded-full w-full h-full flex flex-col items-center justify-center">
              <span className="text-xl md:text-3xl font-black text-orange-500 tracking-tighter">30%</span>
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-900 text-center">Limited Offer</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
