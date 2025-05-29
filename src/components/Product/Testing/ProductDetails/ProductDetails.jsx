
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/mockData';  // for Product details
import { useAuth } from '../contexts/AuthContext';
import { Star, Heart, ShoppingCart, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import './ProductDetail.css';

const ProductDetail = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, addToFavorites, removeFromFavorites, isFavorite, addToCart } = useAuth();
  
  const product = products.find(p => p.name === productName);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [showBuyNowDialog, setShowBuyNowDialog] = useState(false);
  
  const imageRef = useRef(null);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you are looking for does not exist.</p>
        <Button onClick={() => navigate('/shop')}>Return to Shop</Button>
      </div>
    );
  }

  const handleImageHover = (e) => {
    if (!imageRef.current) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
    setShowZoom(true);
  };

  const handleImageLeave = () => {
    setShowZoom(false);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to your cart');
      navigate('/login');
      return;
    }
    
    addToCart(product.id, quantity);
    toast.success(`${quantity} x ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to purchase items');
      navigate('/login');
      return;
    }
    
    setShowBuyNowDialog(true);
  };

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to your favorites');
      navigate('/login');
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

  // Calculate discount amount
  const discountAmount = product.originalPrice 
    ? (product.originalPrice - product.price).toFixed(2)
    : '0.00';

  // Generate star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="fill-yellow-400 text-yellow-400" size={18} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="text-gray-300" size={18} />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star className="fill-yellow-400 text-yellow-400" size={18} />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="text-gray-300" size={18} />);
      }
    }
    
    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Thumbnails - Decreased size */}
        <div className="lg:w-1/12">
          <div className="flex flex-row lg:flex-col gap-2 mb-4 lg:mb-0">
            {product.images.map((image, index) => (
              <div 
                key={index}
                className={`aspect-square border-2 rounded cursor-pointer overflow-hidden ${selectedImageIndex === index ? 'border-craft-teal' : 'border-gray-200'}`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column: Main Image */}
        <div 
          className="lg:w-2/5 relative"
          onMouseMove={handleImageHover}
          onMouseLeave={handleImageLeave}
          ref={imageRef}
        >
          <div className="aspect-square rounded overflow-hidden border border-gray-200 cursor-zoom-in relative">
            <img 
              src={product.images[selectedImageIndex]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Favorite Button - Made always visible */}
            <button 
              onClick={handleFavoriteToggle}
              className={`absolute top-2 right-2 z-20 p-2 rounded-full ${isFavorite(product.id) ? 'bg-craft-coral text-white' : 'bg-white text-craft-coral'}`}
            >
              <Heart size={20} fill={isFavorite(product.id) ? "currentColor" : "none"} />
            </button>
          </div>
          
          {/* Zoom View (only visible on hover) */}
          {showZoom && (
            <div className="hidden lg:block lg:absolute lg:top-0 lg:left-full lg:ml-4 lg:w-full lg:aspect-square lg:rounded lg:overflow-hidden lg:border lg:border-gray-200 lg:shadow-lg z-30">
              <div 
                style={{
                  backgroundImage: `url(${product.images[selectedImageIndex]})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundSize: '200%',
                  backgroundRepeat: 'no-repeat',
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
          )}
        </div>

        {/* Right Column: Product Details */}
        <div className={`lg:w-2/5 ${showZoom ? 'opacity-50 transition-opacity duration-300' : ''}`}>
          {/* Product Title */}
          <h1 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="mb-4">
            {renderRating(product.rating)}
          </div>
          
          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-craft-navy">Rs. {product.price.toFixed(2)}</span>
              
              {product.originalPrice && (
                <>
                  <span className="text-gray-400 line-through text-lg">Rs. {product.originalPrice.toFixed(2)}</span>
                  <span className="text-craft-coral text-lg">-Rs. {discountAmount}</span>
                </>
              )}
            </div>
            
            {product.discountPercentage && (
              <div className="mt-1">
                <span className="bg-craft-coral text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.discountPercentage}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {/* Stock Status */}
          <div className="mb-6">
            <span className={`${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-sm font-semibold px-3 py-1 rounded`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          
          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Quantity</h3>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
                className="p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Action Buttons - Modified with smaller Add to Cart + Buy Now */}
          <div className="flex space-x-4 mb-8">
            {/* Add to Cart - Smaller */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 bg-craft-teal hover:bg-craft-teal/80 text-white flex items-center justify-center space-x-2 py-4"
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </Button>
            
            {/* Buy Now Button - New */}
            <Button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="flex-1 bg-craft-coral hover:bg-craft-coral/80 text-white flex items-center justify-center space-x-2 py-4"
            >
              <span>Buy Now</span>
            </Button>
          </div>
          
          {/* Tags */}
          {product.tags && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2 text-gray-500">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Category */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-500">Category:</h3>
            <div className="flex items-center space-x-2">
              <span className="text-craft-navy">{product.category}</span>
              <span>›</span>
              <span className="text-craft-navy">{product.subcategory}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Now Dialog */}
      <Dialog open={showBuyNowDialog} onOpenChange={setShowBuyNowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Please provide your shipping details to complete this purchase.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Full Name
              </label>
              <input
                id="name"
                className="col-span-3 p-2 border rounded"
                placeholder="John Doe"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="address" className="text-right">
                Address
              </label>
              <textarea
                id="address"
                className="col-span-3 p-2 border rounded"
                placeholder="123 Main Street"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right">
                Phone
              </label>
              <input
                id="phone"
                className="col-span-3 p-2 border rounded"
                placeholder="+91 1234567890"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button"
              variant="outline" 
              onClick={() => setShowBuyNowDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              onClick={() => {
                toast.success("Order placed successfully!");
                setShowBuyNowDialog(false);
              }}
            >
              Confirm Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;
