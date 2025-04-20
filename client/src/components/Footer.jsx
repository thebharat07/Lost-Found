import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Lost & Found Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
