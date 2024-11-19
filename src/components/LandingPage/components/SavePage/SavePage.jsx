import React, { useState } from 'react';
import PropertyAd from './PropertyAd';
import './SavePage.css';

const SavePage = () => {
  const [likedPosts, setLikedPosts] = useState([
    {
      image: 'https://via.com/150',
      name: 'Beautiful House',
      price: '$500000',
      category: 'Real Estate',
      location: 'New York'
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Modern Apartment',
      price: '$300,000',
      category: 'Real Estate',
      location: 'Los Angeles'
    },
    // Add more liked posts as needed
  ]);

  return (
    <div className="save-page">
      <h1>Saved Posts</h1>
      <div className="saved-posts-container">
        {likedPosts.map((post, index) => (
          <PropertyAd
            key={index}
            imageUrl={post.imageUrl}
            name={post.name}
            price={post.price}
            category={post}
            location={post.location}
          />
        ))}
      </div>
    </div>
  );
};

export default SavePage;