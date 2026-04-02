import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  History, 
  Layers, 
  Search, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { Button, Input, Card, Badge } from '../components/ui';

const Orders = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'history';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 800);
  }, []);

  const tabs = [
    { id: 'track', label: 'Track Order', icon: Truck, color: 'text-orange-500' },
    { id: 'history', label: 'Order History', icon: History, color: 'text-blue-500' },
    { id: 'multi', label: 'Multiple Orders', icon: Layers, color: 'text-purple-500' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'track':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-xl">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">Track Your Package.</h3>
              <p className="text-gray-500 text-sm mb-6">Enter your order ID or tracking number to see the current status.</p>
              <div className="flex gap-3">
                <Input placeholder="e.g. #SS-12345" className="h-14 font-bold" />
                <Button className="h-14 px-10">Track</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="p-8 border-orange-100 bg-orange-50/30">
                  <Badge className="mb-4">In Transit</Badge>
                  <h4 className="text-xl font-bold mb-1">Wireless Noise Cancelling...</h4>
                  <p className="text-xs text-gray-500 mb-6">Order ID: #SS-98210 • Expected April 2nd</p>
                  <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-200">
                     <div className="relative">
                        <div className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-orange-500 border-4 border-white ring-1 ring-orange-500/20" />
                        <p className="text-sm font-black uppercase tracking-widest text-orange-500">Departed Facility</p>
                        <p className="text-xs text-gray-500">Mumbai Distribution Center • 10:45 AM</p>
                     </div>
                     <div className="relative">
                        <div className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-gray-300 border-4 border-white" />
                        <p className="text-sm font-bold text-gray-400">Out for Delivery</p>
                        <p className="text-xs text-gray-400">Not started</p>
                     </div>
                  </div>
               </Card>
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
               <div className="relative w-full max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search your orders..." className="pl-12 h-12 text-sm" />
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px]">Last 3 Months</Button>
                  <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px]">Filter</Button>
               </div>
            </div>

            {[1, 2].map((i) => (
              <Card key={i} className="group hover:border-orange-200 transition-all p-0 overflow-hidden">
                <div className="bg-gray-50 px-8 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
                   <div className="flex gap-10">
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Order Placed</p>
                         <p className="text-sm font-bold">March {15 + i}, 2026</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total</p>
                         <p className="text-sm font-bold">₹{(1299 * i).toLocaleString()}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Ship To</p>
                         <p className="text-sm font-bold text-blue-600 cursor-pointer hover:underline">Rupesh Gupta</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Order ID</p>
                      <p className="text-sm font-bold">#SS-4491{i}</p>
                   </div>
                </div>
                <div className="p-8 flex items-center justify-between">
                   <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center p-2">
                         <Package className="w-8 h-8 text-gray-300" />
                      </div>
                      <div>
                         <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-black uppercase text-green-600">Delivered March 22</span>
                         </div>
                         <h4 className="text-lg font-bold mb-1">Premium Mechanical Keyboard v2.0</h4>
                         <p className="text-xs text-gray-500">Variant: Stealth Black • Qty: 1</p>
                      </div>
                   </div>
                   <div className="flex flex-col gap-3">
                      <Button className="h-10 px-6 text-xs rounded-xl">Buy Again</Button>
                      <Button variant="outline" className="h-10 px-6 text-xs rounded-xl">View Details</Button>
                   </div>
                </div>
              </Card>
            ))}
          </div>
        );
      case 'multi':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                <Layers className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-black uppercase italic mb-2">Multiple Order Management</h3>
                <p className="text-gray-500 max-w-sm mx-auto text-sm">Bulk tracking and collective shipment management for corporate or high-volume users.</p>
                <Button variant="outline" className="mt-8 px-10 h-14 rounded-2xl">Connect Business Account</Button>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <div className="mb-12">
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 mb-4">Customer Portal</h4>
        <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-0">
          Your <span className="text-gray-300">Orders.</span>
        </h1>
      </div>

      <div className="flex gap-4 mb-12 border-b border-gray-100 pb-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => window.history.pushState(null, '', `/orders?tab=${tab.id}`)} // Simplified for demonstration
              className={`flex items-center gap-3 px-6 py-4 border-b-2 transition-all whitespace-nowrap ${
                isActive 
                  ? `border-orange-500 ${tab.color}` 
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? tab.color : 'text-gray-300'}`} />
              <span className={`text-sm font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center pt-20">
             <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : renderContent()}
      </div>
    </div>
  );
};

export default Orders;
