import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  favorites: loadFromLocalStorage('favorites'),
  cart: loadFromLocalStorage('cart'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    addToFavorites(state, action) {
      const productId = action.payload;
      if (!state.favorites.includes(productId)) {
        state.favorites.push(productId);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(id => id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    addToCart(state, action) {
      const { productId, quantity } = action.payload;
      const existingItem = state.cart.find(item => item.productId === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ productId, quantity });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  }
});

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectFavorites = (state) => state.auth.favorites;
export const selectCart = (state) => state.auth.cart;
export const selectIsFavorite = (productId) => (state) => 
  state.auth.favorites.includes(productId);

export const { login, logout, addToFavorites, removeFromFavorites, addToCart } = authSlice.actions;
export default authSlice.reducer;
