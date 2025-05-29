import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// UI Imports
import { Toaster } from "../src/ui/toaster/toaster.jsx";

import Navbar from "./components/Navbar/Navbar.jsx";
import Footersec from "./components/Footersection/Footersection.jsx";
import Homepage from "../pages/homepage";
import Productpage from "../pages/productpage";
import Loginpage from "../pages/Loginpage";
import Registerpage from "../pages/Registerpage";
import Contactpage from "../pages/contactpage";
import ProductDetail from "./components/Product/Testing/ShopM/ProductDetail/ProductDetail.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Blog from "../pages/blogpage.jsx";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Productpage />} />

          <Route path="/product/:productId" element={<ProductDetail />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/contact" element={<Contactpage />} />
          {/* <Route path="/blog" element={<Blog />} /> */}
          {/* Add more routes as needed */}
        </Routes>
        <Footersec />
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
