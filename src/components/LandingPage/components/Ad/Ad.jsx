// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { collection, getDocs } from 'firebase/firestore';
// import { db, auth } from '../../../../firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import { IndianRupee, Home, MapPin, Heart } from 'lucide-react';

// const PropertyAd = ({ imageUrl, name, price, category, location, id }) => {
//   const [liked, setLiked] = useState(false);

//   const handleLike = () => {
//     setLiked(!liked);
//   };

//   return (
//     <div className="property-ad">
//       <div className="property-image-container">
//         <img src={imageUrl} alt={name} className="property-image" />
//         <button 
//           className={`like-button ${liked ? 'like-button-active' : ''}`}
//           onClick={handleLike}
//         >
//           <Heart 
//             size={20} 
//             fill={liked ? "#e74c3c" : "none"} 
//             color={liked ? "#e74c3c" : "#ffffff"} 
//           />
//         </button>
//       </div>
//       <div className="property-info">
//         <h2 className="property-title">{name}</h2>
//         <div className="property-detail">
//           <IndianRupee size={18} color="#34495e" />
//           <p className="property-text">{price}</p>
//         </div>
//         <div className="property-detail">
//           <Home size={18} color="#34495e" />
//           <p className="property-text">{category}</p>
//         </div>
//         <div className="property-detail-address">
//           <MapPin size={18} color="#34495e" />
//           <p className="property-text-address">{location}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Ad() {
//   const [ads, setAds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const fetchAds = async () => {
//       try {
//         const adsCollectionRef = collection(db, 'properties');
//         const querySnapshot = await getDocs(adsCollectionRef);

//         const adsList = querySnapshot.docs
//           .map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//           .filter((ad) => ad.userId !== currentUser?.uid);

//         setAds(adsList);
//       } catch (error) {
//         console.error('Error fetching ads:', error);
//         setError('Failed to fetch ads. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAds();
//   }, [currentUser]);

//   if (loading) {
//     return <div className="loading-error">Loading...</div>;
//   }

//   if (error) {
//     return <div className="loading-error">Error: {error}</div>;
//   }

//   return (
//     <div className="ad-container">
//       <h1 className="heading">Property Listings</h1>
//       <div className="ads-grid">
//         {ads.length > 0 ? (
//           ads.map((ad) => (
//             <Link to={`/property/${ad.id}`} key={ad.id} className="ad-link">
//               <PropertyAd
//                 imageUrl={ad.images && ad.images.length > 0 ? ad.images[0] : '/placeholder.svg'}
//                 name={ad.title}
//                 price={ad.action === 'Sell' ? `${ad.amount} INR` : `${ad.rent} INR/month`}
//                 category={ad.propertyCategory}
//                 location={`${ad.location}, ${ad.district}, ${ad.state} - ${ad.pincode}`}
//                 id={ad.id}
//               />
//             </Link>
//           ))
//         ) : (
//           <p className="no-properties">No properties available.</p>
//         )}
//       </div>
//       <style jsx>{`
//         .ad-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 20px;
//           font-family: Arial, sans-serif;
//         }

//         .heading {
//           font-size: 2.5em;
//           color: #2c3e50;
//           margin-bottom: 30px;
//           text-align: center;
//         }

//         .ads-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           gap: 30px;
//           justify-content: center;
//         }

//         .ad-link {
//           text-decoration: none;
//           color: inherit;
//         }

//         .property-ad {
//           background-color: #ffffff;
//           border-radius: 12px;
//           overflow: hidden;
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//           transition: transform 0.3s, box-shadow 0.3s;
//         }

//         .property-ad:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
//         }

//         .property-image-container {
//           position: relative;
//           height: 200px;
//           overflow: hidden;
//         }

//         .property-image {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.3s;
//         }

//         .property-ad:hover .property-image {
//           transform: scale(1.05);
//         }

//         .like-button {
//           position: absolute;
//           top: 10px;
//           right: 10px;
//           background: rgba(0, 0, 0, 0.5);
//           backdrop-filter: blur(5px);
//           border: none;
//           border-radius: 50%;
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: transform 0.2s, background-color 0.2s;
//         }

//         .like-button:hover {
//           transform: scale(1.1);
//         }

//         .like-button-active {
//           background: rgba(231, 76, 60, 0.7);
//         }

//         .property-info {
//           padding: 20px;
//         }

//         .property-title {
//           font-size: 1.4em;
//           font-weight: bold;
//           margin: 0 0 15px 0;
//           color: #2c3e50;
//         }

//         .property-detail, .property-detail-address {
//           display: flex;
//           align-items: center;
//           margin-bottom: 10px;
//         }

//         .property-text {
//           margin: 0 0 0 10px;
//           font-size: 1em;
//           color: #34495e;
//         }

//         .property-text-address {
//           margin: 0 0 0 10px;
//           font-size: 0.9em;
//           color: #7f8c8d;
//           line-height: 1.4;
//         }

//         .loading-error {
//           text-align: center;
//           font-size: 1.2em;
//           color: #e74c3c;
//           margin: 20px 0;
//         }

//         .no-properties {
//           font-size: 1.2em;
//           color: #7f8c8d;
//           margin: 20px 0;
//           text-align: center;
//         }

//         @media (max-width: 768px) {
//           .ads-grid {
//             grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//           }
//         }

//         @media (max-width: 480px) {
//           .ads-grid {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { IndianRupee, Home, MapPin, Heart, Search, SlidersHorizontal, X } from 'lucide-react';

const PropertyAd = ({ imageUrl, name, price, category, location, id }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = (e) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Stop event propagation
    setLiked(!liked);
  };

  return (
    <div className="property-ad">
      <div className="property-image-container">
        <img src={imageUrl} alt={name} className="property-image" />
        <button 
          className={`like-button ${liked ? 'like-button-active' : ''}`}
          onClick={handleLike}
        >
          <Heart 
            size={20} 
            fill={liked ? "#e74c3c" : "none"} 
            color={liked ? "#e74c3c" : "#ffffff"} 
          />
        </button>
      </div>
      <div className="property-info">
        <h2 className="property-title">{name}</h2>
        <div className="property-detail">
          <IndianRupee size={18} color="#34495e" />
          <p className="property-text">{price}</p>
        </div>
        <div className="property-detail">
          <Home size={18} color="#34495e" />
          <p className="property-text">{category}</p>
        </div>
        <div className="property-detail-address">
          <MapPin size={18} color="#34495e" />
          <p className="property-text-address">{location}</p>
        </div>
      </div>
    </div>
  );
};

const PriceRangeSlider = ({ onRangeChange, maxPrice }) => {
  const [range, setRange] = useState({ min: 0, max: maxPrice });

  const handleChange = (e, type) => {
    const value = parseInt(e.target.value);
    const newRange = { ...range, [type]: value };
    setRange(newRange);
    onRangeChange(newRange);
  };

  return (
    <div className="price-range">
      <div className="price-range-container">
        <div className="range-inputs">
          <input
            type="number"
            value={range.min}
            onChange={(e) => handleChange(e, 'min')}
            placeholder="Min Price"
            className="range-input"
          />
          <span>to</span>
          <input
            type="number"
            value={range.max}
            onChange={(e) => handleChange(e, 'max')}
            placeholder="Max Price"
            className="range-input"
          />
        </div>
      </div>
    </div>
  );
};

const FilterSort = ({ onFilterChange, onSortChange, onSearch, onPriceRangeChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    propertyType: [],
    category: [],
    action: [],
    parking: []
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const toggleFilter = (type, value) => {
    const newFilters = { ...activeFilters };
    if (newFilters[type].includes(value)) {
      newFilters[type] = newFilters[type].filter(item => item !== value);
    } else {
      newFilters[type] = [...newFilters[type], value];
    }
    setActiveFilters(newFilters);
    onFilterChange(type, newFilters[type]);
  };

  const removeFilter = (type, value) => {
    const newFilters = { ...activeFilters };
    newFilters[type] = newFilters[type].filter(item => item !== value);
    setActiveFilters(newFilters);
    onFilterChange(type, newFilters[type]);
  };

  const filterOptions = {
    propertyType: ['Flat', 'House', 'Land', 'Office', 'Shop'],
    category: ['Residential', 'Commercial'],
    action: ['Sell', 'Rent'],
    parking: ['Available', 'Not Available']
  };

  return (
    <div className={`filter-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="filter-header">
        <div className="search-bar">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search by property type, location, etc..." 
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button 
          className="filter-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <SlidersHorizontal size={20} />
          Filters
        </button>
      </div>

      <div className="active-filters">
        {Object.entries(activeFilters).map(([type, values]) => 
          values.map(value => (
            <div key={`${type}-${value}`} className="active-filter-chip">
              {value}
              <button 
                className="remove-filter"
                onClick={() => removeFilter(type, value)}
              >
                <X size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="filter-content">
        <div className="filter-groups">
          {Object.entries(filterOptions).map(([type, options]) => (
            <div key={type} className="filter-group">
              <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
              <div className="filter-options">
                {options.map(option => (
                  <button
                    key={option}
                    className={`filter-chip ${activeFilters[type].includes(option) ? 'active' : ''}`}
                    onClick={() => toggleFilter(type, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="filter-group">
            <h3>Price Range</h3>
            <PriceRangeSlider 
              onRangeChange={onPriceRangeChange}
              maxPrice={10000000}
            />
          </div>

          <div className="filter-group">
            <h3>Sort By</h3>
            <div className="filter-options">
              {['price-asc', 'price-desc', 'size-asc', 'size-desc'].map(sortOption => (
                <button
                  key={sortOption}
                  className="filter-chip"
                  onClick={() => onSortChange(sortOption)}
                >
                  {sortOption === 'price-asc' ? 'Price: Low to High' :
                   sortOption === 'price-desc' ? 'Price: High to Low' :
                   sortOption === 'size-asc' ? 'Size: Small to Large' :
                   'Size: Large to Small'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Ad() {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [filters, setFilters] = useState({
    propertyType: '',
    category: '',
    action: '',
    parking: ''
  });
  const [sortBy, setSortBy] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollectionRef = collection(db, 'properties');
        const querySnapshot = await getDocs(adsCollectionRef);

        const adsList = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((ad) => ad.userId !== currentUser?.uid);

        setAds(adsList);
        setFilteredAds(adsList);
      } catch (error) {
        console.error('Error fetching ads:', error);
        setError('Failed to fetch ads. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [currentUser]);

  const handleFilterChange = (filterType, values) => {
    let filtered = [...ads];
    
    // Apply all active filters
    if (values.length > 0) {
      filtered = filtered.filter(ad => {
        switch(filterType) {
          case 'propertyType':
            return values.includes(ad.propertyCategory);
          case 'category':
            return values.includes(ad.category);
          case 'action':
            return values.includes(ad.action);
          case 'parking':
            return values.includes(ad.parking ? 'Available' : 'Not Available');
          default:
            return true;
        }
      });
    }

    // Apply price range
    filtered = filtered.filter(ad => {
      const price = parseFloat(ad.action === 'Sell' ? ad.amount : ad.rent);
      return price >= priceRange.min && price <= priceRange.max;
    });

    setFilteredAds(filtered);
  };

  const handleSort = (sortValue, adsToSort = filteredAds) => {
    setSortBy(sortValue);
    let sorted = [...adsToSort];

    switch (sortValue) {
      case 'price-asc':
        sorted.sort((a, b) => parseFloat(a.amount || a.rent) - parseFloat(b.amount || b.rent));
        break;
      case 'price-desc':
        sorted.sort((a, b) => parseFloat(b.amount || b.rent) - parseFloat(a.amount || a.rent));
        break;
      case 'size-asc':
        sorted.sort((a, b) => parseFloat(a.size) - parseFloat(b.size));
        break;
      case 'size-desc':
        sorted.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
        break;
      default:
        break;
    }

    setFilteredAds(sorted);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredAds(ads);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const results = ads.filter(ad => 
      ad.title?.toLowerCase().includes(searchLower) ||
      ad.propertyCategory?.toLowerCase().includes(searchLower) ||
      ad.location?.toLowerCase().includes(searchLower) ||
      ad.district?.toLowerCase().includes(searchLower) ||
      ad.state?.toLowerCase().includes(searchLower)
    );

    setFilteredAds(results);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    let filtered = [...ads].filter(ad => {
      const price = parseFloat(ad.action === 'Sell' ? ad.amount : ad.rent);
      return price >= range.min && price <= range.max;
    });
    setFilteredAds(filtered);
  };

  if (loading) {
    return <div className="loading-error">Loading...</div>;
  }

  if (error) {
    return <div className="loading-error">Error: {error}</div>;
  }

  return (
    <div className="ad-container">
      <h1 className="heading">Property Listings</h1>
      <FilterSort 
        onFilterChange={handleFilterChange} 
        onSortChange={handleSort}
        onSearch={handleSearch}
        onPriceRangeChange={handlePriceRangeChange}
      />
      <div className="ads-grid">
        {filteredAds.length > 0 ? (
          filteredAds.map((ad) => (
            <Link to={`/property/${ad.id}`} key={ad.id} className="ad-link">
              <PropertyAd
                imageUrl={ad.images && ad.images.length > 0 ? ad.images[0] : '/placeholder.svg'}
                name={ad.title}
                price={ad.action === 'Sell' ? `${ad.amount} INR` : `${ad.rent} INR/month`}
                category={ad.propertyCategory}
                location={`${ad.location}, ${ad.district}, ${ad.state} - ${ad.pincode}`}
                id={ad.id}
              />
            </Link>
          ))
        ) : (
          <p className="no-properties">No properties available.</p>
        )}
      </div>
      <style jsx>{`
        .ad-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .heading {
          font-size: 2.5em;
          color: #2c3e50;
          margin-bottom: 30px;
          text-align: center;
        }

        .filter-container {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border-radius: 20px;
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .filter-container.expanded {
          transform: translateY(5px);
        }

        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 30px;
          padding: 10px 20px;
          flex: 1;
          margin-right: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .search-input {
          border: none;
          outline: none;
          padding: 5px 15px;
          font-size: 16px;
          width: 100%;
          color: #2c3e50;
        }

        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #3498db;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 30px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .filter-toggle:hover {
          background: #2980b9;
          transform: translateY(-2px);
        }

        .filter-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-in-out;
        }

        .expanded .filter-content {
          max-height: 1000px;
        }

        .filter-groups {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          padding-top: 20px;
        }

        .filter-group {
          background: white;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .filter-group h3 {
          color: #2c3e50;
          margin-bottom: 15px;
          font-size: 1.1em;
          font-weight: 600;
        }

        .filter-options {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .filter-chip {
          padding: 8px 16px;
          border-radius: 20px;
          border: 2px solid #e0e0e0;
          background: transparent;
          color: #2c3e50;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
        }

        .filter-chip:hover {
          border-color: #3498db;
          color: #3498db;
          transform: translateY(-2px);
        }

        .filter-chip.active {
          background: #3498db;
          color: white;
          border-color: #3498db;
        }

        .filter-row {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .filter-select {
          padding: 8px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          color: #2c3e50;
          background-color: white;
          cursor: pointer;
          outline: none;
          min-width: 150px;
        }

        .filter-select:hover {
          border-color: #3498db;
        }

        .ads-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          justify-content: center;
        }

        .ad-link {
          text-decoration: none;
          color: inherit;
        }

        .property-ad {
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .property-ad:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .property-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .property-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .property-ad:hover .property-image {
          transform: scale(1.05);
        }

        .like-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s, background-color 0.2s;
        }

        .like-button:hover {
          transform: scale(1.1);
        }

        .like-button-active {
          background: rgba(231, 76, 60, 0.7);
        }

        .property-info {
          padding: 20px;
        }

        .property-title {
          font-size: 1.4em;
          font-weight: bold;
          margin: 0 0 15px 0;
          color: #2c3e50;
        }

        .property-detail, .property-detail-address {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .property-text {
          margin: 0 0 0 10px;
          font-size: 1em;
          color: #34495e;
        }

        .property-text-address {
          margin: 0 0 0 10px;
          font-size: 0.9em;
          color: #7f8c8d;
          line-height: 1.4;
        }

        .loading-error {
          text-align: center;
          font-size: 1.2em;
          color: #e74c3c;
          margin: 20px 0;
        }

        .no-properties {
          font-size: 1.2em;
          color: #7f8c8d;
          margin: 20px 0;
          text-align: center;
        }

        @media (max-width: 768px) {
          .ads-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
          
          .filter-row {
            flex-direction: column;
          }

          .filter-select {
            width: 100%;
          }
          .filter-header {
            flex-direction: column;
            gap: 15px;
          }

          .search-bar {
            margin-right: 0;
            margin-bottom: 10px;
            width: 100%;
          }

          .filter-toggle {
            width: 100%;
            justify-content: center;
          }

          .filter-groups {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .ads-grid {
            grid-template-columns: 1fr;
          }
        }

        .active-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 15px 0;
        }

        .active-filter-chip {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          background: #3498db;
          color: white;
          border-radius: 20px;
          font-size: 14px;
        }

        .remove-filter {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 2px;
          border-radius: 50%;
          transition: background-color 0.2s;
        }

        .remove-filter:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .price-range {
          padding: 10px 0;
        }

        .price-range-container {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 15px;
          border: 1px solid #e0e0e0;
        }

        .range-inputs {
          display: flex;
          align-items: center;
          gap: 15px;
          justify-content: center;
        }

        .range-input {
          width: 140px;
          padding: 10px 15px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          background: white;
          transition: all 0.2s ease;
        }

        .range-input:focus {
          border-color: #3498db;
          outline: none;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
        }

        .range-inputs span {
          color: #666;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

