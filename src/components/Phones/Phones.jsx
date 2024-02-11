import './Phones.scss';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight, faTimesCircle, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import phoneData from '../../data/data_apple/products_iphone.json';

import { useLocation } from 'react-router-dom';
import { ProductCard } from '../ProductCard/ProductCard';

export const Phones = () => {
  const [filteredPhones, setFilteredPhones] = useState(phoneData);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [sortDirection, setSortDirection] = useState('desc'); // domyślnie sortuj od najwyższej ceny do najniższej

  const location = useLocation();
  const pathWithoutSlash = location.pathname.slice(1);

  const applyFilters = (filter) => {
    let filtered = [...phoneData];


    if (typeof filter === 'number') {
      // filter storage
      filtered = filtered.filter(item => {
        return item.capacity.includes(`${filter}GB`) || item.ram.includes(`${filter}GB`);
      });
    } else {
      //date product filter
      if (filter === "Newest") {
        filtered
          .sort((a, b) => b.year - a.year)
          .sort((a, b) => b.price - a.price);
      } else if (filter === "Oldest") {
        filtered
          .sort((a, b) => a.year - b.year)
          .sort((a, b) => a.price - b.price);
      }

      setSortDirection('desc');
    }

    setFilteredPhones(filtered);
    setSelectedFilter(filter);
  };

  const sortByPrice = () => {
    const direction = sortDirection === 'desc' ? 'asc' : 'desc';
    const sorted = [...filteredPhones].sort((a, b) => {
      if (direction === 'desc') {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });

    setFilteredPhones(sorted);
    setSortDirection(direction);
  };

  const clearFilters = () => {
    setFilteredPhones(phoneData);
    setSelectedFilter(null);
  };

  return (
    <div className="phones">
      <div className="phones__container">
        <div className="phones-navigate">
          <FontAwesomeIcon
            className="phones-navigate__icon"
            icon={faHouse}
          />

          <FontAwesomeIcon
            className="phones-navigate__icon"
            icon={faChevronRight}
          />

          <p className="phones-navigate__page">
            {pathWithoutSlash}
          </p>
        </div>

        <div className="phones-head">
          <h1 className="phones-head__title">
            Mobile phones
          </h1>
        </div>

        <div className="phones-filter">
          <button onClick={() => applyFilters(32)}>32gb</button>
          <button onClick={() => applyFilters(64)}>64gb</button>
          <button onClick={() => applyFilters(128)}>128gb</button>
          <button onClick={() => applyFilters(256)}>256gb</button>
          <button onClick={() => applyFilters(512)}>512gb</button>
          <p>--------------</p>
          <button onClick={() => applyFilters(2)}>2GB</button>
          <button onClick={() => applyFilters(3)}>3GB</button>
          <button onClick={() => applyFilters(4)}>4GB</button>
          <p>-----------</p>
          <button onClick={() => applyFilters("Newest")}>Newest</button>
          <button onClick={() => applyFilters("Oldest")}>Oldest</button>
          <p>----------------</p>
          <button onClick={sortByPrice}>
            Sort by price: {sortDirection === 'desc' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
          </button>
          <button onClick={clearFilters}>Clear Filters</button>
        </div>

        <div className="active-filters">
          {selectedFilter && (
            <div className="active-filter">
              {selectedFilter}
              <FontAwesomeIcon
                icon={faTimesCircle}
                onClick={clearFilters}
              />
            </div>
          )}
        </div>

        <div className="phones-block">
          {filteredPhones.map((item, index) => (
            <div key={index} className="phones-block__item">
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
