// components/Filters.js
import React from 'react';
import './SearchFilters.css';

function SearchFilters({ onFilterChange }) {
  return (
    <div className="Filters-container">
      <select
        className="Filters-select"
        onChange={(e) => onFilterChange('category', e.target.value)}
      >
        <option value="books">Books</option>
        <option value="electronics">Electronics</option>
        {/* Add more categories as needed */}
      </select>
    </div>
  );
}

 export default SearchFilters;