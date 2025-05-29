import React from 'react';
import './Footersection.css';
import { FaInstagram, FaLinkedin} from 'react-icons/fa';
import { Link } from 'react-router-dom';


 function Footersec() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Branding & Social */}
        <div className="footer-section">
          <h2 className="footer-logo"><Link to="/" onClick={() => window.scrollTo(0, 0)}>Infinart</Link>
          </h2>
          <p className="footer-desc">
            Curated gifts & timeless decor for every space.
          </p>
          <div className="footer-social">
          <a href="https://www.instagram.com/aestheticommerce" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon">
            <FaInstagram />
          </a>
          <a 
            href="https://www.linkedin.com/company/aestheticommerce/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon">
            <FaLinkedin />
          </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/products">Product</Link></li>
            <li><Link to="/shops">Shops</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-section">
          <h3>Customer Support</h3>
          <ul>
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/ship">Shipping & Returns</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/track">Track Orrder</Link></li>
            <li><Link to="/refund">Refund Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
       

        <div className="footer-section">
          <h3>Our Store</h3>
          <p>Infinart HQ, Noida, India</p>
          <p>Mon – Sat: 10AM – 8PM</p>
          <p>Email: support@infinart.in</p>
        </div>
      </div>

      

      {/* Bottom Bar */}
      <div className="footer-bottom">
        © 2025 Infinart. All rights reserved. | Made with ❤️ by Team Infinart.
      </div>
    </footer>
  );
}

export default Footersec;