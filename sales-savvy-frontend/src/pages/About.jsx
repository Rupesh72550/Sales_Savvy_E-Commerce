import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-8">About Sales Savvy.</h1>
      <div className="prose prose-lg text-gray-700 font-medium leading-relaxed">
        <p>
          Sales Savvy is a full-stack e-commerce web application built using React and Spring Boot. 
          It allows users to browse products, view details, and manage their shopping cart efficiently.
        </p>
        <p className="mt-4">
          The platform is designed to provide a smooth and responsive shopping experience similar to 
          modern e-commerce systems, ensuring high performance and visual clarity across all devices.
        </p>
      </div>
    </div>
  );
};

export default About;
