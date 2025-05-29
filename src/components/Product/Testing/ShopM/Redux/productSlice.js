// productSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { products as initialProducts } from '../../../../../data/mockData.js'; // Adjust the import path as necessary

 
 const  updatedSortOptions = [
    { label: 'Relevance', value: 'default', direction: 'asc' },
    { label: 'Lowest Price', value: 'price', direction: 'asc' },
    { label: 'Highest Price', value: 'price', direction: 'desc' },
    { label: 'Top Customer Reviews', value: 'rating', direction: 'desc' },
    { label: 'Most Recent', value: 'id', direction: 'desc' },
  ]
const updatedProducts = initialProducts;

const initialState = {
  products: initialProducts,
  filteredProducts: [...initialProducts],
  sortOption: updatedSortOptions[0],
  filterOptions: {
    inStock: false,
    priceRange: [0, 2000],
    categories: [],
    subcategories: [],
  },
   updatedSortOptions, 
 
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSortOption(state, action) {
      state.sortOption = action.payload;
    },
    setFilterOptions(state, action) {
      state.filterOptions = { ...state.filterOptions, ...action.payload };
    },
    resetFilters(state) {
      state.filterOptions = initialState.filterOptions;
      state.sortOption = initialState.updatedSortOptions[0];
    },
    filterProducts(state) {
      // Add your filtering logic here

       const { products, filterOptions, sortOption } = state;
      let filtered = [...products];

      // Filter by stock availability
      if (filterOptions.inStock) {
        filtered = filtered.filter(p => p.inStock === true);
      }

      // Filter by price range
      const [minPrice, maxPrice] = filterOptions.priceRange;
      filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);

      // Filter by category (case-insensitive)
      if (filterOptions.categories.length > 0) {
        const selected = filterOptions.categories.map(c => c.toLowerCase());
        filtered = filtered.filter(p =>
          selected.includes(p.category?.toLowerCase())
        );
      }

      // Filter by subcategory
      if (filterOptions.subcategories.length > 0) {
        filtered = filtered.filter(p =>
          filterOptions.subcategories.includes(p.subcategory)
        );
      }

      // Apply sorting
      if (sortOption?.value !== 'default') {
        const { value, direction } = sortOption;

        if (value === 'name') {
          // Alphabetical sort
          filtered.sort((a, b) =>
            direction === 'asc'
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name)
          );
        } else {
          // Numeric sort (price, rating, etc.)
          filtered.sort((a, b) =>
            direction === 'asc'
              ? a[value] - b[value]
              : b[value] - a[value]
          );
        }
      }

      // Save filtered list to state
      state.filteredProducts = filtered;
    }
  }
});

export const { setSortOption, setFilterOptions, resetFilters, filterProducts } = productSlice.actions;
export default productSlice.reducer;
