import React from 'react';
import { Truck, RefreshCw, ShieldCheck } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Truck className="w-10 h-10 text-orange-500" />,
      title: "Free Shipping",
      desc: "On all orders above ₹1000"
    },
    {
      icon: <RefreshCw className="w-10 h-10 text-orange-500" />,
      title: "Easy Return",
      desc: "30-day hassle-free returns"
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-orange-500" />,
      title: "Secure Payment",
      desc: "100% secure payment methods"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-y-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-16">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="group flex flex-col items-center text-center space-y-8 p-12 rounded-[3rem] bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-orange-500/10"
            >
              <div className="w-24 h-24 rounded-3xl bg-gray-50 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-orange-500/10 group-hover:shadow-xl group-hover:shadow-orange-500/5">
                {feature.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase tracking-widest text-gray-900 italic">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-600 font-semibold tracking-tight">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
