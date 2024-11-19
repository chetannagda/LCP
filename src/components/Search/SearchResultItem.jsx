// components/SearchResultItem.js
import React from 'react';
import './SearchResultItem.css';

function SearchResultItem({ data }) {
  return (
    <div className="SearchResultItem-container">
      <h3 className="SearchResultItem-title">{data.title}</h3>
      <p className="SearchResultItem-description">{data}</p>
    </div>
  );
}

export default SearchResultItem;