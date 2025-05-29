
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { products as initialProducts } from '../../../../../data/mockData.js'; // Adjust the import path as necessary

// Updated sort options with proper typing
const updatedSortOptions = [
  { label: 'Relevance', value: 'default', direction: 'asc' },
  { label: 'Lowest Price', value: 'price', direction: 'asc' },
  { label: 'Highest Price', value: 'price', direction: 'desc' },
  { label: 'Top Customer Reviews', value: 'rating', direction: 'desc' },
  { label: 'Most Recent', value: 'id', direction: 'desc' },
];

// Use the products directly from mockData
const updatedProducts = initialProducts;

const defaultFilterOptions = {
  inStock: false,
  priceRange: [0, 2000],
  categories: [],
  subcategories: [],
};

const ProductContext = createContext({});

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products] = useState(updatedProducts);
  const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);
  const [sortOption, setSortOption] = useState(updatedSortOptions[0]);
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters and sorting
  const filteredProducts = products
    .filter(product => {
      // Filter by availability
      if (filterOptions.inStock && !product.inStock) {
        return false;
      }

      // Filter by price
      if (
        product.price < filterOptions.priceRange[0] || 
        product.price > filterOptions.priceRange[1]
      ) {
        return false;
      }

      // Filter by categories
       // if (
        // filterOptions.categories.length > 0 &&
        // !filterOptions.categories.includes(product.category)

      // )  {
        // return false;
      // }  

      // Filter by categories (case-insensitive)
  if (filterOptions.categories.length > 0) {
    const productCategory = product.category.toLowerCase();
    const selectedCategories = filterOptions.categories.map(c => c.toLowerCase());
    if (!selectedCategories.includes(productCategory)) return false;
  }

  return true;



      // Filter by subcategories
      if (
        filterOptions.subcategories.length > 0 &&
        !filterOptions.subcategories.includes(product.subcategory)
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const { value, direction } = sortOption || updatedSortOptions[0];
      
      if (value === 'default') {
        return 0; // Don't sort
      }

      if (value === 'name') {
        return direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      // Handle numeric properties like price, rating, etc.
      const aValue = a[value];
      const bValue = b[value];

      return direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    });

 const updateFilterOptions = useCallback((options) => {
    setFilterOptions(prev => ({ ...prev, ...options }));
  }, []); // Empty dependency array ensures stable identity

  const resetFilters = () => {
    setFilterOptions(defaultFilterOptions);
    setSortOption(updatedSortOptions[0]);
  };

  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  return (
    <ProductContext.Provider value={{
      products,
      filteredProducts: filteredProducts || [],
      filterOptions,
      updateFilterOptions,
      sortOption,
      setSortOption,
      resetFilters,
      showFilters,
      toggleFilters,
      updatedSortOptions,
    }}>
      {children}
    </ProductContext.Provider>
  );
};
