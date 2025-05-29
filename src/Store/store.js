import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../Redux/authSlice';

 const store = configureStore({
    reducer: {
        user: authSlice,
    }
});

export default store;

