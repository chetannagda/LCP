import React, { useState, useRef } from 'react';
import styles from './FloatingButton.module.css';
import { LuMoreVertical } from 'react-icons/lu';
import { FaCar, FaWrench, FaEnvelope, FaUserTie } from 'react-icons/fa';
import { LiaOmSolid } from 'react-icons/lia';
import { IoIosConstruct } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { FaHandsHelping } from "react-icons/fa";

const FloatingButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const handleMouseOver = () => {
    setIsHovered(true);
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleMouseOut = () => {
    if (!isExpanded) {
      setTimeout(() => {
        setIsHovered(false);
        setIsExpanded(false);
      }, 1500);
    }
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const options = [
    { label: 'Property Consultant', icon: <FaUserTie />, href: '/propertyconsult' },
    { label: 'Open Forum', icon: <FaHandsHelping />, href: '/forum' },
    { label: 'Vaastu Consultant', icon: <LiaOmSolid />, href: '/vaastu' },
    { label: 'Pick & Drop', icon: <TbTruckDelivery />, href: '/pad' },
    { label: 'Repair House', icon: <IoIosConstruct />, href: '/repair' },
    { label: 'Contact Us', icon: <FaEnvelope />, href: '/contact-us' },
  ];

  return (
    <div
      className={styles.floatingButtonContainer}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      ref={containerRef}
    >
      <button
        className={`${styles.mainButton} ${isExpanded ? styles.expanded : ''}`}
        onClick={handleClick}
        aria-expanded={isExpanded}
        aria-label="Floating Button"
      >
        <LuMoreVertical />
      </button>
      <div className={`${styles.optionsContainer} ${isExpanded ? styles.expanded : ''}`}>
        {options.map((option, index) => (
          <a
            key={index}
            href={option.href}
            className={styles.optionButton}
            aria-label={option.label}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            {option.icon}
            <span className={styles.optionLabel}>{option.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FloatingButton;
