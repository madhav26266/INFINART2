import React from "react";

import Herosection from "../src/components/Herosection/Herosection.jsx";
import Scrollsection from "../src/components/Scrollsection/Scrollsection.jsx";
import Shopsection from "../src/components/Shopsection/shopsection.jsx";
import BestSellers from "../src/components/BestSeller/Bestseller.jsx";

import Newsletter from "../src/components/NewsletterSection/Newsletter.jsx";
import Coustomer from "../src/components/Coustomerreview/Coustomer.jsx";
import SaleSection from "../src/components/Salesection/salesection.jsx";
import Blogsection from "../src/components/Blog/Blogsection/Blogsection.jsx";
import SearchBar from "../src/components/SearchBar/searchbar.jsx";

// import { getAllFeedback } from '../api/feedbackApi';
function Homepage() {
  return (
    <div>
     
      <SearchBar></SearchBar>
      <Herosection></Herosection>
      <Scrollsection></Scrollsection>
      <Shopsection></Shopsection>
      <BestSellers></BestSellers>
      <SaleSection></SaleSection>
      <Coustomer></Coustomer>
      <Blogsection></Blogsection>
      <Newsletter></Newsletter>
      
    </div>
  );
}

export default Homepage;
