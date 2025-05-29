import React from 'react';
import './shopsection.css';

function Shopsection() {
  const items = [
    { class: "a", label: "House Party" },
    { class: "b", label: "Dinner Dates" },
    { class: "c", label: "Baby Shower" },
    { class: "d", label: "Anniversaries" },
    { class: "e", label: "Diwali Lights" },
    { class: "f", label: "Eid" },
    { class: "g", label: "Christmas Eve" }
  ];

  return (
    <div className="shop-section">
      <div className="shop-heading">Shop for Special Occasions →</div>
      <div className="shop-grid">
        {items.map((item, index) => (
          <div className={`grid-item ${item.class}`} key={index}>
            <div className="overlay">
              <span className="item-label">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shopsection;