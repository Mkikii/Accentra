import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Accentra Inc. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
