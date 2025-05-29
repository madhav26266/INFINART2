// TypeScript interfaces converted to JavaScript

// Product
function Product(id, name, description, price, originalPrice, discountPercentage, images, category, subcategory, rating, inStock, featured, tags, details) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.price = price;
  this.originalPrice = originalPrice;
  this.discountPercentage = discountPercentage;
  this.images = images;
  this.category = category;
  this.subcategory = subcategory;
  this.rating = rating;
  this.inStock = inStock;
  this.featured = featured;
  this.tags = tags;
  this.details = details;
}

// Category
function Category(id, name, subcategories) {
  this.id = id;
  this.name = name;
  this.subcategories = subcategories;
}

// Subcategory
function Subcategory(id, name, items) {
  this.id = id;
  this.name = name;
  this.items = items;
}

// SubcategoryItem
function SubcategoryItem(id, name) {
  this.id = id;
  this.name = name;
}

// User
function User(id, name, email, favorites, cart) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.favorites = favorites;
  this.cart = cart;
}

// CartItem
function CartItem(productId, quantity) {
  this.productId = productId;
  this.quantity = quantity;
}

// FilterOptions
function FilterOptions(inStock, priceRange, categories, subcategories) {
  this.inStock = inStock;
  this.priceRange = priceRange;
  this.categories = categories;
  this.subcategories = subcategories;
}

// SortOption
function SortOption(label, value, direction) {
  this.label = label;
  this.value = value;
  this.direction = direction;
}

