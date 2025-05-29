import React from "react";
import { Star } from "lucide-react";
import "./RatingStars.css";

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const partial = rating - fullStars;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="rating-stars">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="star filled" fill="#f59e0b" />
      ))}

      {/* Partial star */}
      {partial > 0 && (
        <div className="partial-star">
          <Star className="star base" />
          <div className="partial-fill" style={{ width: `${partial * 100}%` }}>
            <Star className="star filled" fill="#f59e0b" />
          </div>
        </div>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="star empty" />
      ))}

      <span className="rating-number">({rating})</span>
    </div>
  );
};

export default RatingStars;
