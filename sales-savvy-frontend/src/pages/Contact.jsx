import React from 'react';
import { Button, Input } from '../components/ui';

const Contact = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">Get In Touch.</h1>
      <p className="text-gray-500 font-medium mb-12">Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">FullName</label>
          <Input placeholder="Your Name" className="h-14 font-bold" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
          <Input type="email" placeholder="email@example.com" className="h-14 font-bold" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Message</label>
          <textarea 
            className="w-full min-h-[150px] bg-gray-50 border border-gray-100 rounded-2xl p-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
            placeholder="How can we help?"
          />
        </div>
        <Button className="w-full h-16 rounded-2xl shadow-xl shadow-orange-500/10">SUBMIT MESSAGE</Button>
      </form>
    </div>
  );
};

export default Contact;
