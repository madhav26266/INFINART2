import React, { useState, useEffect } from "react";
import "./BlogHome.css";

const latestBlogs = [
  { id: 1, cover: "https://images.unsplash.com/photo-1743485754005-20501f75a602?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "How to create an Asthetic Wall Decor", author:"Asthetic Commerce", excerpt: "Beauty lies in the Simplicity." },
  { id: 2, cover: "https://images.unsplash.com/photo-1633102467628-6511a5129a03?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Thoughtful Gift Ideas for your Partner", author:"Gift Shop", excerpt: "Gifts that express your love." },
  { id: 3, cover: "https://plus.unsplash.com/premium_photo-1664277022191-fded07c9b676?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "How to be a Sustainable Customer", author:"SDG", excerpt: "Sustainablity is not just the resposibility of government, but an individual's duty." },
  { id: 4, cover: "https://plus.unsplash.com/premium_photo-1679811671595-c90569d90108?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Craftmanship: The Unheard Story", author:"The Crafts People", excerpt: "Mass production erodes the heritage and culture." },
  { id: 5, cover: "https://plus.unsplash.com/premium_photo-1712557132907-443356f607dc?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Indoor Plants for Air Purification", author:"SDG", excerpt: "Why use air purifiers?" },
  { id: 6, cover: "https://images.unsplash.com/photo-1568805778796-96b66708d6e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Culture in Clothes", author:"The Crafts People", excerpt: "The old ways." },
  { id: 7, cover: "https://images.unsplash.com/photo-1696685215151-b0996be0a21f?q=80&w=1971&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "What theme to set in your Drawing Room", author:"Asthetic Commerce", excerpt: "Choose furnitures that match your vibe." },
  { id: 8, cover: "https://images.unsplash.com/photo-1627815416399-ddaae0e2fa54?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Must-Try Tricks with your Arcylic Paints", author:"Asthetic Commerce", excerpt: "Colour combinations that match your vibe." },
  
  // Add more blog objects as needed
  
];

const CARDS_PER_SLIDE = 4;

const LatestBlogSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = Math.ceil(latestBlogs.length / CARDS_PER_SLIDE);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  // Calculate slice for current visible cards
  const start = currentIndex * CARDS_PER_SLIDE;
  const end = start + CARDS_PER_SLIDE;
  const visibleCards = latestBlogs.slice(start, end);

  // If at the end and not enough cards, wrap around
  if (visibleCards.length < CARDS_PER_SLIDE) {
    visibleCards.push(...latestBlogs.slice(0, CARDS_PER_SLIDE - visibleCards.length));
  }

  return (
    <section className="latest-blog-section">
      <h2>Latest Blogs</h2>
      <div className="blog-slider">
        {visibleCards.map((blog) => (
          <div key={blog.id} className="blog-card">
            <img src={blog.cover} alt={blog.title} className="blog-cover" />
            <div className="blog-content">
              <h2>{blog.title}</h2>
              <h3>{blog.author}</h3>
              <p>{blog.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestBlogSection;