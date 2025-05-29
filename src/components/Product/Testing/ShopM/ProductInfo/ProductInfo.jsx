import React, { useState,} from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Heart, ShoppingCart, Plus, Minus } from "lucide-react";
import { useAuth } from "../Context/AuthContext.jsx";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import "./ProductInfo.css";

const ProductInfo = ({ product = {} }) => {
  const {
    isAuthenticated,
    addToFavorites,
    removeFromFavorites,
  isFavorite = () => false,
    addToCart,
  } = useAuth();




  const {
    id = "",
    name = "",
    price = 0,
    originalPrice,
    description = "",
    rating = 0,
    inStock = false,
    tags = [],
    category = "",
    subcategory = "",
    discountPercentage,
  } = product;

 // Update favorite check to use safe reference
const isCurrentFavorite = useMemo(() => isFavorite(id), [isFavorite, id]);

  const [quantity, setQuantity] = useState(1);
  const [expandDescription, setExpandDescription] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState("");
  const navigate = useNavigate();

  const discountAmount = originalPrice
    ? (originalPrice - price).toFixed(2)
    : "0.00";

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
    addToCart(id, quantity);
    toast.success(`${quantity} x ${name} added to cart`);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to purchase items");
      navigate("/login");
      return;
    }
    addToCart(id, quantity);
    navigate("/checkout");
  };

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to your favorites");
      navigate("/login");
      return;
    }
    if (isFavorite(id)) {
      removeFromFavorites(id);
      toast.success(`${name} removed from favorites`);
    } else {
      addToFavorites(id);
      toast.success(`${name} added to favorites`);
    }
  };

  const checkPincodeDelivery = (e) => {
    e.preventDefault();

    if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setPincodeError("Please enter a valid 6-digit pincode");
      setPincodeStatus("");
      return;
    }

    setPincodeError("");
    setPincodeStatus("checking");

    setTimeout(() => {
      const isDeliverable = parseInt(pincode) % 2 === 0;
      setPincodeStatus(isDeliverable ? "success" : "error");
    }, 1000);
  };

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            className="star-filled"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="..." clipRule="evenodd" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="star-half-container">
            <svg
              className="star-empty"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="..."
              />
            </svg>
            <div className="half-star-overlay">
              <svg
                className="star-filled"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="..." clipRule="evenodd" />
              </svg>
            </div>
          </div>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="star-empty"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="..."
            />
          </svg>
        );
      }
    }

    return <div className="star-rating">{stars}</div>;
  };

  return (
    <div className="product-info-container">
      <h1 className="product-title">{name}</h1>

      <div className="rating-section">{renderRating(rating)}</div>

      <div className="price-section">
        <div className="price-container">
          <span className="current-price">Rs. {price.toFixed(2)}</span>
          {originalPrice && (
            <>
              <span className="original-price">
                Rs. {originalPrice.toFixed(2)}
              </span>
              <span className="discount-amount">-Rs. {discountAmount}</span>
            </>
          )}
        </div>
        {discountPercentage && (
          <div className="discount-badge">{discountPercentage}% OFF</div>
        )}
      </div>

      <div className="description-section">
        <p
          className={`description-text ${expandDescription ? "expanded" : ""}`}
        >
          {description}
        </p>
        {description.length > 100 && (
          <button
            className="read-more-btn"
            onClick={() => setExpandDescription(!expandDescription)}
          >
            {expandDescription ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      <div className="stock-section">
        <span
          className={`stock-badge ${inStock ? "in-stock" : "out-of-stock"}`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
        <span className="view-badge">20+ people viewing</span>
      </div>

      <div className="pincode-section">
        <h3 className="section-title">Check Delivery</h3>
        <form onSubmit={checkPincodeDelivery} className="pincode-form">
          <div className="pincode-input-container">
            <input
              type="text"
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value);
                setPincodeError("");
                setPincodeStatus("");
              }}
              placeholder="Enter your pincode"
              maxLength={6}
              className={pincodeError ? "error" : ""}
            />
            <button type="submit" className="check-btn">
              Check
            </button>
          </div>
          {pincodeError && <p className="pincode-error">{pincodeError}</p>}
          {pincodeStatus === "checking" && (
            <p className="pincode-status checking">
              Checking delivery availability...
            </p>
          )}
          {pincodeStatus === "success" && (
            <p className="pincode-status success">
              Delivery available in your area!
            </p>
          )}
          {pincodeStatus === "error" && (
            <p className="pincode-status error">
              Sorry, delivery not available in your area.
            </p>
          )}
        </form>
      </div>

      <div className="quantity-section">
        <h3 className="section-title">Quantity</h3>
        <div className="quantity-selector">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="quantity-btn"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="quantity-value">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 10}
            className="quantity-btn"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="action-buttons">
        <button
  onClick={handleFavoriteToggle}
  className={`favorite-btn ${isCurrentFavorite ? 'active' : ''}`}
  disabled={!inStock}
>
  <Heart size={20} />
  <span>{isCurrentFavorite ? 'Added to Favorites' : 'Add to Favorites'}</span>
</button>

        <button
          onClick={handleAddToCart}
          className="cart-btn"
          disabled={!inStock}
        >
          <ShoppingCart size={20} />
          <span>Add to Cart</span>
        </button>

        <button onClick={handleBuyNow} className="buy-btn" disabled={!inStock}>
          <span>Buy Now</span>
        </button>
      </div>

      {tags.length > 0 && (
        <div className="tags-section">
          <h3 className="section-subtitle">Tags:</h3>
          <div className="tags-container">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="category-section">
        <h3 className="section-subtitle">Category:</h3>
        <div className="category-path">
          <span>{category}</span>
          <span className="separator">›</span>
          <span>{subcategory}</span>
        </div>
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    originalPrice: PropTypes.number,
    description: PropTypes.string,
    rating: PropTypes.number,
    inStock: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    subcategory: PropTypes.string,
    discountPercentage: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
  }),
};

ProductInfo.defaultProps = {
  product: {
    id: "",
    name: "Product Name",
    price: 0,
    description: "No description available",
    rating: 0,
    inStock: false,
    tags: [],
    category: "Uncategorized",
    subcategory: "No Subcategory",
    images: [],
  },
};

export default ProductInfo;
