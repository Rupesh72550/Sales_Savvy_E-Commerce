import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Package, Users, ShoppingCart, TrendingUp, Plus, Search, MoreHorizontal, Inbox, Zap, Database } from 'lucide-react';
import api from '../services/api';
import { Button, Badge } from '../components/ui';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0, revenue: 0 });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.admin.getStats().then(res => setStats(res.data)).catch(() => {});
    api.products.getAll().then(res => setProducts(res.data)).catch(() => {});
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-100 p-10 hidden xl:block sticky top-0 h-screen">
        <div className="mb-20">
           <Link to="/" className="text-3xl font-black italic text-accent tracking-tighter">Sales Savvy<span className="text-primary not-italic">.</span></Link>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mt-2">Nexus Terminal</p>
        </div>
        <nav className="space-y-4">
          {[
            { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Overview Pulse', active: true },
            { icon: <Package className="w-4 h-4" />, label: 'Asset Matrix' },
            { icon: <Users className="w-4 h-4" />, label: 'Entity Tracker' },
            { icon: <ShoppingCart className="w-4 h-4" />, label: 'Revenue Flows' },
            { icon: <TrendingUp className="w-4 h-4" />, label: 'Market Metrics' },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-6 px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] transition-all group ${item.active ? 'bg-accent text-white shadow-xl shadow-accent/20' : 'hover:bg-gray-50 text-gray-400 hover:text-primary'}`}>
              <span className={item.active ? 'text-white' : 'text-gray-300 group-hover:text-accent'}>{item.icon}</span> 
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 md:p-20 overflow-y-auto w-full">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-24 gap-12">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-accent" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">Management Node</h4>
             </div>
             <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Administrative <span className="text-accent underline/accent">Nexus.</span></h1>
          </div>
          <div className="flex gap-6">
             <Button className="hero-btn h-16 w-64 text-[10px] uppercase tracking-widest shadow-xl shadow-accent/20">
                <Plus className="w-4 h-4 mr-3" /> Initialize Resource
             </Button>
          </div>
        </div>

        {/* Stats Pulse */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { label: 'Market Revenue', value: `₹${stats.revenue.toLocaleString()}`, color: 'text-accent' },
            { label: 'Network Flows', value: stats.totalOrders, color: 'text-primary' },
            { label: 'Asset Library', value: stats.totalProducts, color: 'text-primary' },
            { label: 'Active Identities', value: stats.totalUsers, color: 'text-primary' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 group hover:shadow-2xl hover:shadow-accent/5 transition-all">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">{item.label}</p>
              <h3 className={`text-4xl font-black tracking-tighter italic ${item.color}`}>{item.value || '0'}</h3>
            </div>
          ))}
        </div>

        {/* List Matrix */}
        <div className="rounded-[3rem] border border-gray-100 overflow-hidden shadow-2xl shadow-accent/[0.02]">
          <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/20">
            <h3 className="font-black uppercase text-[10px] tracking-[0.4em] italic">Intelligence Matrix</h3>
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-accent" />
               <input placeholder="Query Matrix..." className="pl-10 h-10 bg-white border border-gray-100 rounded-full text-[10px] font-bold outline-none" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/30 text-[9px] font-black uppercase tracking-[0.2em] text-gray-300">
                  <th className="px-10 py-8">Entity</th>
                  <th className="px-10 py-8">Market Value</th>
                  <th className="px-10 py-8">Resource SKU</th>
                  <th className="px-10 py-8 text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.length > 0 ? products.slice(0, 5).map(prod => (
                  <tr key={prod.id} className="hover:bg-accent/[0.01] transition-colors">
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                             <img src={prod.imageUrl} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-black text-sm uppercase italic tracking-tighter">{prod.name}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8 font-black text-accent text-lg italic tracking-tighter">₹{prod.price.toLocaleString()}</td>
                    <td className="px-10 py-8">
                      <Badge className="bg-primary/5 text-primary border-none text-[9px] font-black px-4 py-2 rounded-xl">
                        {prod.stockQuantity} RESOURCES
                      </Badge>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button className="text-gray-200 hover:text-accent transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="px-10 py-32 text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">Matrix Idle</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
