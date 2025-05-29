
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('craftUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('craftUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('craftUser');
    }
  }, [user]);

  // Login function
  const login = async (email, password) => {
    // Simulating API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock successful login for demo purposes
        if (email && password) {
          const newUser = {
            id: '1',
            name: 'Demo User',
            email: email,
            favorites: [],
            cart: [],
          };
          setUser(newUser);
          setIsAuthenticated(true);
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };

  // Register function
  const register = async (name, email, password) => {
    // Simulating API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const newUser = {
            id: Date.now().toString(),
            name,
            email,
            favorites: [],
            cart: [],
          };
          setUser(newUser);
          setIsAuthenticated(true);
          resolve();
        } else {
          reject(new Error('Invalid registration data'));
        }
      }, 500);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // Favorites management
  const addToFavorites = (productId) => {
    if (!user) return;
    
    setUser({
      ...user,
      favorites: [...user.favorites, productId]
    });
  };

  const removeFromFavorites = (productId) => {
    if (!user) return;
    
    setUser({
      ...user,
      favorites: user.favorites.filter(id => id !== productId)
    });
  };

  const isFavorite = (productId) => {
  return user?.favorites?.includes(productId) || false;
};


  // Cart management
  const addToCart = (productId, quantity = 1) => {
    if (!user) return;

    const existingItem = user.cart.find(item => item.productId === productId);
    
    if (existingItem) {
      setUser({
        ...user,
        cart: user.cart.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      });
    } else {
      setUser({
        ...user,
        cart: [...user.cart, { productId, quantity }]
      });
    }
  };

  const removeFromCart = (productId) => {
    if (!user) return;
    
    setUser({
      ...user,
      cart: user.cart.filter(item => item.productId !== productId)
    });
  };

  const updateCartItemQuantity = (productId, quantity) => {
    if (!user) return;
    
    setUser({
      ...user,
      cart: user.cart.map(item => 
        item.productId === productId 
          ? { ...item, quantity }
          : item
      )
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register, 
      isAuthenticated,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      addToCart,
      removeFromCart,
      updateCartItemQuantity
    }}>
      {children}
    </AuthContext.Provider>
  );
};
