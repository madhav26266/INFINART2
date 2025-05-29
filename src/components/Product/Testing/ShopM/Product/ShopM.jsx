import React, { useState, useEffect } from "react"; 
import { useDispatch, useSelector } from 'react-redux';
import { setSortOption, setFilterOptions, filterProducts } from '../Redux/productSlice';  // Adjusted import path
import ProductCard from "../ProductCard/ProductCard";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import SortDropdown from "../SortDropdown/SortDropdown";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "../../../../../ui/Button";
import "./ShopM.css";

const Shop = () => {
  const dispatch = useDispatch();
  const { 
    filteredProducts, 
    sortOption, 
    filterOptions 
  } = useSelector(state => state.products);

  const productCount = filteredProducts ? filteredProducts.length : 0;
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Sort options defined locally as per Redux slice
  const sortOptions = [
    { label: 'Relevance', value: 'default', direction: 'asc' },
    { label: 'Lowest Price', value: 'price', direction: 'asc' },
    { label: 'Highest Price', value: 'price', direction: 'desc' },
    { label: 'Top Customer Reviews', value: 'rating', direction: 'desc' },
    { label: 'Most Recent', value: 'id', direction: 'desc' },
  ];

  useEffect(() => {
    dispatch(filterProducts());
  }, [dispatch]);

  const handleSort = (option) => {
    dispatch(setSortOption(option));
    dispatch(filterProducts());
  };

  const handleFilterChange = (newFilters) => {
    dispatch(setFilterOptions(newFilters));
    dispatch(filterProducts());
  };

  return (
    <div className="shop-container">
      <h1 className="shop-title">Our Craft Kits</h1>

      <div className="shop-toolbar">
        <div className="filter-button-container">
          <Button
            variant="outline"
            className="filter-button"
            onClick={() => setShowFilterDrawer(true)}
          >
            <SlidersHorizontal size={16} className="filter-icon" />
            <span>Filters</span>
          </Button>
        </div>

        <div className="sort-container">
          <span className="results-count">{productCount} results</span>

          <SortDropdown
            options={sortOptions}
            selectedOption={sortOption || sortOptions[0]}
            onOptionSelect={handleSort}
          />
        </div>
      </div>

      <FilterDrawer
        open={showFilterDrawer}
        onClose={() => setShowFilterDrawer(false)}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
      />

      <div className="products-container">
        {!filteredProducts || filteredProducts.length === 0 ? (
          <div className="no-products">
            <h3>No products match your filters</h3>
            <p>Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;