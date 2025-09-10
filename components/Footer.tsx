
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} wassan-kadiri. All Rights Reserved.</p>
        <p className="text-sm text-green-200 mt-1">Freshness Delivered.</p>
      </div>
    </footer>
  );
};

export default Footer;
