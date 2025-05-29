import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToFavorites,
  removeFromFavorites,
} from "../Redux/authSlice.js";

import RatingStars from "../../../../Product/RatingStars/RatingStars.jsx";
import { Heart, Star } from "lucide-react";

import { toast } from "react-toastify";

import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state selectors
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const favorites = useSelector((state) => state.auth.favorites);
  const cart = useSelector((state) => state.auth.cart);

  // Check if product is in favorites
  const isFavorite = (productId) => favorites.includes(productId);

  // Check if product is in cart
  const isInCart = (productId) =>
    cart.some((item) =>
      typeof item === "object" ? item.productId === productId : item === productId
    );

  // Discount calculation
  const calculateDiscount = (actual, striked) => {
    if (!actual || !striked || striked <= actual) return 0;
    return Math.round(((striked - actual) / striked) * 100);
  };

  const discount = calculateDiscount(product.price, product.originalPrice);

  const [isHovering, setIsHovering] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (isHovering && product.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isHovering, product.images.length]);

  // Handlers
  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please sign in to add items to your favorites");
      navigate("/login");
      return;
    }

    if (isFavorite(product.id)) {
      dispatch(removeFromFavorites(product.id));
      toast.success(`${product.name} removed from favorites`);
    } else {
      dispatch(addToFavorites(product.id));
      toast.success(`${product.name} added to favorites`);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please sign in to add items to your cart");
      navigate("/login");
      return;
    }

    // Your authSlice addToCart currently pushes payload directly, 
    // assuming payload is productId only. 
    // If you want quantity, you can change slice or send just product.id here.
    dispatch(addToCart(product.id));
    toast.success(`${product.name} added to cart`);
  };

  const renderRating = () => {
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          size={11}
          fill="currentColor"
          className="star-icon full-star"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="half-star-container">
          <Star size={11} className="star-icon empty-star" />
          <Star size={11} fill="currentColor" className="star-icon half-star" />
        </span>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={11} className="star-icon empty-star" />
      );
    }

    return (
      <div className="rating">
        {stars}
        <span style={{ fontSize: "0.7rem", marginLeft: "5px" }}>
          ({product.rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setCurrentImageIndex(0);
      }}
    >
      {discount > 0 && <div className="discount-badge">{discount}% OFF</div>}

      <button
        className={`favorite-btn ${isHovering ? "visible" : "hidden"} ${
          isFavorite(product.id) ? "active" : ""
        }`}
        onClick={handleFavoriteToggle}
      >
        <Heart
          size={20}
          fill={isFavorite(product.id) ? "currentColor" : "none"}
        />
      </button>

      <div className="image-container">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder.jpg";
          }}
        />
      </div>

      <div className="product-info">
        <h3 className="title">{product.name}</h3>
        <div className="rating">
          <RatingStars rating={product.rating} />
        </div>
        <div className="price-stock">
          <div className="price">
            <span className="actual">₹{product.price}</span>
            {product.originalPrice && (
              <span className="striked">₹{product.originalPrice}</span>
            )}
          </div>
          <span
            className={`stock ${product.inStock ? "in-stock" : "out-of-stock"}`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      <div className={`add-to-cart ${isHovering ? "visible" : ""}`}>
        <button disabled={!product.inStock} onClick={handleAddToCart}>
          <span>Add to Cart</span>
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
