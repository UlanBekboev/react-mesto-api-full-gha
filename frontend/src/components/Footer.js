import React from 'react';
import '../pages/index.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {new Date().getFullYear()} Mesto Russia</p>
    </footer>
  ) 
}

export default Footer;
