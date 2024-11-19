import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SearchResultItem from './SearchResultItem';
import SearchFilters from './SearchFilters';

function SearchResultPage() {
  const [results, setResults] = useState([]);
  const location = useLocation(); // Get location from hook
   const query = new URLSearchParams(location.search).get('query');
//   const query = new URLSearchParams((location?.search || '')).get('query');


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/search?query=${query}`);
      setResults(response.data);
    };
    fetchData();
  }, [query]);

  const handleFilterChange = (filterName, filterValue) => {
    // Add logic to apply filters to the search results
  };

  return (
    <div className="SearchResultPage-container">
      <SearchFilters onFilterChange={handleFilterChange} />
      <div className="SearchResultPage-results">
        {results.map(result => (
          <SearchResultItem key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
}

export default SearchResultPage;
