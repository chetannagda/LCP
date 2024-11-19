import React, { useState } from 'react';
import './PropertyAd.css'; // Import the CSS file for styling

const PropertyAd = ({ imageUrl, name, price, category, location, likedByDefault }) => {
  const [liked, setLiked] = useState(likedByDefault);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="property-ad-container">
      <div className="property-ad">
        <div className="property-image-wrapper">
          <img src={imageUrl} alt={name} className="property-image" />
        </div>
        <div className="property-info">
          <div className="property-header">
            <h1 className="property-title">{name}</h1>
            <button
              className={`like-button ${liked ? 'liked' : ''}`}
              onClick={handleLike}
              aria-label={liked ? 'Unlike' : 'Like'}
            >
              {liked ? '♥' : '♡'}
            </button>
          </div>
          <h2 className="property-price">{price}</h2>
          <p className="property-category">{category}</p>
          <p className="property-location">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyAd;
