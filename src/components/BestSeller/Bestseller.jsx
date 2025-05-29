import React, { useRef } from "react";
import "./Bestseller.css";

const bestSellers = [
  {
    name: "Friend’s Shop",
    image: "https://images.pexels.com/photos/2119903/pexels-photo-2119903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Apteka",
    image: "https://images.pexels.com/photos/1020370/pexels-photo-1020370.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Superdry Store",
    image: "https://images.pexels.com/photos/164763/pexels-photo-164763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Charm",
    image: "https://images.pexels.com/photos/2679323/pexels-photo-2679323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  
];

const BestSellers = () => {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const { current } = containerRef;
    if (direction === "left") {
      current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="best-sellers-section">
      <h2 className="section-title">The Best Sellers :</h2>
      <div className="slider-wrapper">
        <button className="arrow left" onClick={() => scroll("left")}>
          &#8249;
        </button>
        <div className="slider" ref={containerRef}>
          {bestSellers.map((item, index) => (
            <div className="seller-card" key={index}>
              <div className="image-wrapper">
                <img src={item.image} alt={item.name} />
                <div className="shop-details">
                  <p>{item.name}</p>
                  <span>Click for more info</span>
                </div>
              </div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={() => scroll("right")}>
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default BestSellers;
