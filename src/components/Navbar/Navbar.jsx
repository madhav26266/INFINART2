import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';
import { AiFillHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

const shopMegaMenu = [
  {
    heading: "Wall Decor",
    items: ["Macrame Hangings", "Wooden Signs", "Canvas Art", "Dreamcatchers"]
  },
  {
    heading: "Handmade Gifts",
    items: ["Personalized Frames", "Greeting Cards", "Gift Boxes", "Scrapbooks"]
  },
  {
    heading: "Art Supplies", 
    items: ["Paints & Brushes", "DIY Kits", "Craft Papers", "Beads & Threads"]
  }
];

const productMegaMenu = [
  {
    heading: "Home Accents",
    items: ["Table Lamps", "Vases", "Planters", "Candle Holders"]
  },
  {
    heading: "Stationery",
    items: ["Art Journals", " Notebooks", "Stickers", "Bookmarks"]
  },
  {
    heading: "Accessories",
    items: ["Tote Bags", "Keychains", "Pouches", "Jewelry"]
  }
];

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Infinart</div>

<div className='make-space'>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li
          onMouseEnter={() => setActiveDropdown('products')}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="nav-link-wrapper">
            <Link to="/products" className="nav-link nav-link-product">Products</Link>
            {activeDropdown === 'products' && (
              <div className="mega-dropdown">
                <div className="mega-dropdown-content">
                  {productMegaMenu.map((col, idx) => (
                    <div className="mega-dropdown-col" key={col.heading}>
                      <div className="mega-dropdown-heading">{col.heading}</div>
                      <ul>
                        {col.items.map(item => (
                          <li key={item}>
                            <Link to={`/products/${item.toLowerCase().replace(/[\s&]+/g, "-")}`}>{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="mega-dropdown-img">
                    <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&h=250" alt="Products" />
                    <div className="mega-dropdown-img-caption">Best Sellers</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </li>
        <li
          onMouseEnter={() => setActiveDropdown('shops')}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="nav-link-wrapper">
            <Link to="/shops" className="nav-link">Shops</Link>
            {activeDropdown === 'shops' && (
              <div className="mega-dropdown">
                <div className="mega-dropdown-content">
                  {shopMegaMenu.map((col, idx) => (
                    <div className="mega-dropdown-col mega-dropdown-col-shop" key={col.heading}>
                      <div className="mega-dropdown-heading-shop">{col.heading}</div>
                      <ul>
                        {col.items.map(item => (
                          <li key={item}>
                            <Link to={`/shops/${item.toLowerCase().replace(/[\s&]+/g, "-")}`}>{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="mega-dropdown-img">
                    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=250" alt="Crafts" />
                    <div className="mega-dropdown-shop-img-caption">Featured Crafts</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
      </div>

      {user ? (
        <div className="navbar-icons">
          <Link to="/favorites" className="nav-icon" aria-label="Favorites"><AiFillHeart /></Link>
          <Link to="/cart" className="nav-icon" aria-label="Cart"><FiShoppingCart /></Link>
          <Link to="/profile" className="nav-icon" aria-label="Profile"><CgProfile /></Link>
        </div>
      ) : (
        <Link to="/login" className="login_button">Sign in</Link>
      )}
    </nav>
  );
};

export default Navbar;
