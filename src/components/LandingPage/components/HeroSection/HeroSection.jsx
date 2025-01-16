// import React, { useState, useEffect, useRef } from 'react'
// import { Home, Building, DollarSign, Wrench, Truck, Users, Compass, ChevronDown, Search } from 'lucide-react'
// import { useNavigate } from 'react-router-dom';

// export default function HeroSection() {
//   const [category, setCategory] = useState('Residential')
//   const [action, setAction] = useState('Buy')
//   const [isHovered, setIsHovered] = useState(false)
//   const scrollRef = useRef(null)
//   const navigate = useNavigate();

//   const handleServiceClick = () => {
//     // Handle service click logic here
//   };
//   const handleConsultClick = () => {
//     handleServiceClick();
//     navigate('/propertyconsult');
//   };
  
//   const handlePickandDropClick = () => {
//     handleServiceClick();
//     navigate('/pad');
//   };
  
//   const handleRepairClick = () => {
//     handleServiceClick();
//     navigate('/repair');
//   };
  
//   const handleListPropertyClick = () => {
//     handleServiceClick();
//     navigate('/listproperty');
//   };
  
//   const handleVaastuClick = () => {
//     handleServiceClick();
//     navigate('/vaastu');
//   };

//   const services = [
//     { name: 'Buy', icon: <DollarSign size={20} /> },
//     { name: 'Sell', icon: <DollarSign size={20} onClick={handleListPropertyClick}/> },
//     { name: 'Rent', icon: <Home size={20} /> },
//     { name: 'Repair', icon: <Wrench size={20} onClick={handleRepairClick}/> },
//     { name: 'Pick and Drop', icon: <Truck size={20} onClick={handlePickandDropClick}/> },
//     { name: 'Property Consultant', icon: <Users size={20} onClick={handleConsultClick}/> },
//     { name: 'Vaastu Consultant', icon: <Compass size={20} onClick={handleVaastuClick}/> },
//   ]

import React, { useState, useEffect, useRef } from 'react';
import { DollarSign, Wrench, Truck, Users, Compass, ChevronDown, Search, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection({ scrollToPropertyListing }) {
  const [category, setCategory] = useState('Residential');
  const [action, setAction] = useState('Buy');
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const handleBuyClick = () => {
    if (scrollToPropertyListing) scrollToPropertyListing();
  };

  const handleServiceClick = () => {
    // Handle other service clicks if necessary
  };

  const handleConsultClick = () => {
    handleServiceClick();
    navigate('/propertyconsult');
  };

  const handlePickandDropClick = () => {
    handleServiceClick();
    navigate('/pad');
  };

  const handleRepairClick = () => {
    handleServiceClick();
    navigate('/repair');
  };

  const handleListPropertyClick = () => {
    handleServiceClick();
    navigate('/listproperty');
  };

  const handleVaastuClick = () => {
    handleServiceClick();
    navigate('/vaastu');
  };

  const services = [
    { name: 'Buy', icon: <DollarSign size={20} onClick={handleBuyClick} /> },
    { name: 'Sell', icon: <DollarSign size={20} onClick={handleListPropertyClick} /> },
    // { name: 'Rent', icon: <Home size={20} /> },
    { name: 'Repair', icon: <Wrench size={20} onClick={handleRepairClick} /> },
    { name: 'Pick and Drop', icon: <Truck size={20} onClick={handlePickandDropClick} /> },
    { name: 'Property Consultant', icon: <Users size={20} onClick={handleConsultClick} /> },
    { name: 'Vaastu Consultant', icon: <Compass size={20} onClick={handleVaastuClick} /> },
  ];


  const propertyTypes = [
    'House', 'Land', 'Shop', 'Apartment', 'Villa', 'Office', 'Warehouse', 'Studio',
    'Condo', 'Townhouse', 'Duplex', 'Penthouse', 'Loft', 'Farmhouse', 'Bungalow'
  ]

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    let animationId
    let startTime

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      if (!isHovered && window.innerWidth <= 768) {
        scrollElement.scrollLeft = (progress / 50) % (scrollElement.scrollWidth / 2)
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [isHovered])

  return (
    <div className="hero-section">
      <div 
        className="services-scroll" 
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {services.map((service, index) => (
          <button key={index} className="service-item" onClick={service.icon.props.onClick}>
            {service.icon}
            <span>{service.name}</span>
          </button>
        ))}
      </div>

      <div className="content">
        <div className="text-content">
          <h1>Find Your Dream Property</h1>
          <p>Discover the perfect place with our expert real estate services</p>

          <div className="search-options">
            <div className="select-wrapper">
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
              <ChevronDown size={20} className="select-icon" />
            </div>
            <div className="select-wrapper">
              <select value={action} onChange={(e) => setAction(e.target.value)}>
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
              </select>
              <ChevronDown size={20} className="select-icon" />
            </div>
            <button className="search-button">
              <Search size={20} />
              <span>Search</span>
            </button>
          </div>

          <div className="property-types">
            {propertyTypes.map((type, index) => (
              <button key={index} className="property-type-button">
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          height: calc(100vh - 80px); /* Adjust based on your navbar height */
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          overflow: hidden;
          margin-top: 30px;
        }

        .services-scroll {
          display: flex;
          overflow-x: auto;
          white-space: nowrap;
          padding: 1rem 0;
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .services-scroll::-webkit-scrollbar {
          height: 8px;
        }

        .services-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .services-scroll::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        .services-scroll::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .service-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 1rem;
          padding: 0.5rem;
          background-color: #e0f2f1;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, background-color 0.3s ease;
          text-decoration: none;
          color: inherit;
          min-width: 100px;
        }

        .service-item:hover {
          transform: translateY(-5px);
          background-color: #b2dfdb;
        }

        .service-item span {
          margin-top: 0.5rem;
          font-size: 0.7rem;
          color: #00695c;
        }

        .content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
        }

        .text-content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: white;
          padding: 2rem;
          max-width: 800px;
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .search-options {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .select-wrapper {
          position: relative;
          width: 150px;
        }

        select {
          width: 100%;
          padding: 0.5rem 2rem 0.5rem 1rem;
          font-size: 1rem;
          border: 1px solid #bdc3c7;
          border-radius: 4px;
          background-color: white;
          appearance: none;
          cursor: pointer;
        }

        .select-icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #7f8c8d;
        }

        .search-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          background-color: #ff6b6b;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease;
          text-decoration: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          height: 40px; /* Match the height of select inputs */
        }

        .search-button:hover {
          background-color: #ff5252;
          transform: translateY(-2px);
        }

        .search-button span {
          margin-left: 0.5rem;
        }

        .property-types {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          max-width: 800px;
        }

        .property-type-button {
          background-color: rgba(255, 255, 255, 0.2);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.9rem;
          color: white;
          border: 1px solid white;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease;
          text-decoration: none;
        }

        .property-type-button:hover {
          background-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        @media (min-width: 769px) {
          .services-scroll {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            height: auto;
            min-height: calc(100vh - 60px); /* Adjust based on your mobile navbar height */
          }

          .content {
            padding: 1.5rem;
          }

          h1 {
            font-size: 2rem;
          }

          p {
            font-size: 1rem;
          }

          .search-options {
            flex-direction: column;
            align-items: center;
          }

          .select-wrapper {
            width: 100%;
            max-width: 250px;
          }

          .search-button {
            width: 100%;
            max-width: 250px;
          }
        }
      `}</style>
    </div>
  )
}

