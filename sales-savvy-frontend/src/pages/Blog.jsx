import React from 'react';
import { Card } from '../components/ui';

const Blog = () => {
  const posts = [
    {
      title: "Top 5 Gadgets in 2026",
      desc: "Explore the most innovative tech arriving this year, from AI-integrated home hubs to next-gen wearable displays."
    },
    {
      title: "How to Choose a Laptop",
      desc: "A comprehensive guide on balancing performance, portability, and price for your next professional upgrade."
    },
    {
      title: "Best Budget Accessories",
      desc: "Small additions that make a big difference in your daily productivity and style without breaking the bank."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-12">Latest Stories.</h1>
      <div className="space-y-8">
        {posts.map((post, i) => (
          <Card key={i} className="p-8 hover:border-orange-500 transition-colors group cursor-pointer">
            <h2 className="text-xl font-black uppercase tracking-tight mb-3 group-hover:text-orange-500 transition-colors">{post.title}</h2>
            <p className="text-gray-500 font-medium leading-relaxed">{post.desc}</p>
            <button className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Read More →</button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
