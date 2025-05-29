import React, { useState, useRef } from "react";
import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../../../../data/mockData";
import { useAuth } from "../Context/AuthContext"; // 
// contextAPI
// Redux
import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites, addToCart } from "../Redux/authSlice";


import { Star, Heart, ShoppingCart, Plus, Minus } from "lucide-react";

import {toast} from 'react-toastify';
import { Button } from "../../../../../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../../../ui/dialog";
import "./ProductDetail.css";

const ProductDetail = () => {
    const { productId } = useParams();
  const navigate = useNavigate();
  const {
    isAuthenticated,
    addToFavorites,
    removeFromFavorites,
    isFavorite = () => false,
    addToCart,
  } = useAuth();

const product = products.find(p => p.id === productId);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [showBuyNowDialog, setShowBuyNowDialog] = useState(false);

  const imageRef = useRef(null);


const isCurrentFavorite = useMemo(
    () => isFavorite(product?.id), // Keep using ID for favorites logic
    [isFavorite, product?.id]
  );

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist.</p>
        <Button onClick={() => navigate("/shop")}>Return to Shop</Button>
      </div>
    );
  }

  const handleImageHover = (e) => {
    if (!imageRef.current) return;
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
    setShowZoom(true);
  };

  const handleImageLeave = () => setShowZoom(false);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to your cart");
      navigate("/login");
      return;
    }
    addToCart(product.id, quantity);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
toast.error("Please sign in to Buy Now");
      navigate("/login");
      return;
    }
    setShowBuyNowDialog(true);
  };

   const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to your favorites");
      navigate("/login");
      return;
    }
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      toast.success(`${product.name} removed from favorites`);
    } else {
      addToFavorites(product.id);
      toast.success(`${product.name} added to favorites`);
    }
  };

  const discountAmount = product.originalPrice
    ? (product.originalPrice - product.price).toFixed(2)
    : "0.00";

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="star full" size={18} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="half-star">
            <Star className="star empty" size={18} />
            <div className="star-overlay">
              <Star className="star full" size={18} />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="star empty" size={18} />);
      }
    }

    return (
      <div className="rating">
        {stars}
        <span className="rating-text">{rating.toFixed(1)}</span>
      </div>
    );
  };

   return (
    <div className="product-detail-container">
      {!product ? (
        <div className="not-found-container">
          <h2 className="not-found-title">Product Not Found</h2>
          <p className="not-found-message">The product you are looking for does not exist.</p>
          <Button className="back-to-shop-btn" onClick={() => navigate('/shop')}>
            Return to Shop
          </Button>
        </div>
      ) : (
        <div className="product-detail-content">
          {/* Left Column: Thumbnails */}
          <div className="thumbnail-column">
            <div className="thumbnail-container">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail-item ${selectedImageIndex === index ? 'selected-thumbnail' : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="thumbnail-image"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Middle Column: Main Image */}
          <div 
            className="main-image-container"
            onMouseMove={handleImageHover}
            onMouseLeave={handleImageLeave}
            ref={imageRef}
          >
            <div className="main-image-wrapper">
              <img 
                src={product.images[selectedImageIndex]} 
                alt={product.name}
                className="main-product-image"
              />
              
              <button 
                onClick={handleFavoriteToggle}
                className={`favorite-button ${isFavorite(product.id) ? 'favorite-active' : ''}`}
              >
                <Heart size={20} fill={isFavorite(product.id) ? "currentColor" : "none"} />
              </button>
            </div>
            
            {showZoom && (
              <div className="zoom-overlay">
                <div 
                  className="zoom-content"
                  style={{
                    backgroundImage: `url(${product.images[selectedImageIndex]})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`
                  }}
                />
              </div>
            )}
          </div>

          {/* Right Column: Product Details */}
          <div className={`product-details ${showZoom ? 'details-dimmed' : ''}`}>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="rating-container">
              {renderRating(product.rating)}
            </div>
            
            <div className="price-container">
              <div className="price-wrapper">
                <span className="current-price">Rs. {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="original-price">Rs. {product.originalPrice.toFixed(2)}</span>
                    
                  </>
                )}
              </div>
              
              {product.discountPercentage && (
                <div className="discount-badge">
                  <span>{product.discountPercentage}% OFF</span>
                </div>
              )}
            </div>

            <div className="description-container">
              <h3 className="section-title">Description</h3>
              <p className="product-description">{product.description}</p>
            </div>
            
            <div className="stock-status">
              <span className={`stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <div className="quantity-container">
              <h3 className="section-title">Quantity</h3>
              <div className="quantity-controls">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="quantity-button"
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                  className="quantity-button"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <div className="action-buttons">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="add-to-cart-btn"
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </Button>
              
              <Button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="buy-now-btn"
              >
                <span>Buy Now</span>
              </Button>
            </div>
            
            {product.tags && (
              <div className="tags-container">
                <h3 className="tags-title">Tags:</h3>
                <div className="tags-list">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="product-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="category-container">
              <h3 className="category-title">Category:</h3>
              <div className="category-path">
                <span className="category-item">{product.category}</span>
                <span>›</span>
                <span className="category-item">{product.subcategory}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showBuyNowDialog} onOpenChange={setShowBuyNowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Please provide your shipping details to complete this purchase.
            </DialogDescription>
          </DialogHeader>

          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="name">Full Name</label>
              <input id="name" placeholder="John Doe" />
            </div>
            <div className="form-row">
              <label htmlFor="address">Address</label>
              <textarea id="address" placeholder="123 Main Street" rows={3} />
            </div>
            <div className="form-row">
              <label htmlFor="phone">Phone</label>
              <input id="phone" placeholder="+91 1234567890" />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowBuyNowDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setShowBuyNowDialog(false)}>
              Confirm Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;
