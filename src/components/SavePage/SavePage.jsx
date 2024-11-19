import React, { useState } from 'react';
import PropertyAd from './PropertyAd';
import './SavePage.css';

import adImage1 from './ad_image1.jpg';
import adImage2 from './ad_image2.jpg';

const SavePage = () => {
  const [likedPosts, setLikedPosts] = useState([
    {
      imageUrl: adImage1,
      name: 'Beautiful House',
      price: '500,000',
      category: 'Flat',
      location: 'Udaipur'
    },
    {
      imageUrl: adImage2,
      name: 'Modern Apartment',
      price: '300,000',
      category: 'House',
      location: 'Jaipur'
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
            category={post.category}
            location={post.location}
            likedByDefault={true} // Set liked by default for saved posts
          />
        ))}
      </div>
    </div>
  );
};

export default SavePage;
