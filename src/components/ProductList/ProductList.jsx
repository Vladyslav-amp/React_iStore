import React, { useState, useEffect } from 'react';
import './ProductList.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Cart } from '../Cart/Cart';
import { Favorites } from '../Favorites/Favorites';
import phoneData from '../../data/data_apple/products_iphone.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export const ProductList = ({ products }) => {

  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const [allowClick, setAllowClick] = useState(true);

  // const [cartItems, setCartItems] = useState([]);
  // const [favoriteItems, setFavoriteItems] = useState([]);

  //get access to DOM element or react component
  const swiperRef = React.useRef(null);

  const prevSlide = () => {
    if (allowClick) {
      setAllowClick(false);
      if (swiperRef.current && swiperRef.current.swiper) {
        const swiperInstance = swiperRef.current.swiper;
        swiperInstance.slidePrev();
      }
      setTimeout(() => {
        setAllowClick(true);
      }, 1000); // Blokowanie na 1 sekundę
    }
  };

  const nextSlide = () => {
    if (allowClick) {
      setAllowClick(false);
      if (swiperRef.current && swiperRef.current.swiper) {
        const swiperInstance = swiperRef.current.swiper;
        if (!swiperInstance.isEnd) {
          swiperInstance.slideNext();
        }
      }
      setTimeout(() => {
        setAllowClick(true);
      }, 1000); // Blokowanie na 1 sekundę
    }
  };

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      setIsPrevDisabled(swiperInstance.isBeginning);
      setIsNextDisabled(swiperInstance.isEnd);
    }
  }, []);

  // useEffect(() => {
  //   const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  //   const storedFavoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];
  //   setCartItems(storedCartItems);
  //   setFavoriteItems(storedFavoriteItems);
  // }, []);

  // const handleAddToCart = (item) => {
  //   const updatedCartItems = cartItems.includes(item)
  //     ? cartItems.filter(cartItem => cartItem !== item)
  //     : [...cartItems, item];

  //   setCartItems(updatedCartItems);
  //   localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  // };

  // const handleRemoveFromCart = (item) => {
  //   const updatedCartItems = cartItems.filter(cartItem => cartItem !== item);
  //   setCartItems(updatedCartItems);
  //   localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  // };

  // const handleAddToFavorites = (item) => {
  //   const updatedFavoriteItems = favoriteItems.includes(item)
  //     ? favoriteItems.filter(favoriteItem => favoriteItem !== item)
  //     : [...favoriteItems, item];

  //   setFavoriteItems(updatedFavoriteItems);
  //   localStorage.setItem('favoriteItems', JSON.stringify(updatedFavoriteItems));
  // };

  // const handleRemoveFromFavorites = (item) => {
  //   const updatedFavoriteItems = favoriteItems.filter(favoriteItem => favoriteItem !== item);
  //   setFavoriteItems(updatedFavoriteItems);
  //   localStorage.setItem('favoriteItems', JSON.stringify(updatedFavoriteItems));
  // };

  // Filter brand new products
  const filteredAndSortedProducts = phoneData
    .filter(item => item.year === 2019)
    .sort((a, b) => b.price - a.price);
    
  // Calculate total price of items in cart
  // const cartTotalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="product-list">

      <div className="product-list__top">
        <div className="product-list__top-head">
          <h1 className="product-list__top-title">
            Brand new models
          </h1>
        </div>

        <div className="product-list__pagination">
          <button
            onClick={prevSlide}
            className={`product-list__pagination-btn ${isPrevDisabled ? 'disable' : ''}`}
            disabled={isPrevDisabled}
          >
            <FontAwesomeIcon
              className="product-list__pagination-icon"
              icon={faChevronLeft}
            />
          </button>

          <button
            onClick={nextSlide}
            className={`product-list__pagination-btn ${isNextDisabled ? 'disable' : ''}`}
            disabled={isNextDisabled}
          >
            <FontAwesomeIcon
              className="product-list__pagination-icon"
              icon={faChevronRight}
            />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: "product-list__pagination-prev",
          nextEl: "product-list__pagination-next",
        }}
        slidesPerView={1}
        slidesPerGroup={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        spaceBetween={10}
        speed={1000}
        onSlideChange={(swiper) => {
          setIsPrevDisabled(swiper.isBeginning);
          setIsNextDisabled(swiper.isEnd);
        }}
        ref={swiperRef}
      >
        {filteredAndSortedProducts.map((item, index) => (
          <SwiperSlide 
          key={index}
          className="product-list__swiper"
          >
            <ProductCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

