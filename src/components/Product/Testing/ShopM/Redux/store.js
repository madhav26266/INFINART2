// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import productReducer from '../Redux/productSlice';
import authReducer from '../Redux/authSlice';

const rootReducer = combineReducers({
  products: productReducer,
  auth: authReducer
});

export const store = configureStore({
  reducer: rootReducer
});