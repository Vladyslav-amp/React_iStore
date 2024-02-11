import './ProductCard.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import { addCard } from '../../features/reduxSlice/cartSlice';
import { addFavorites, removeFromFavorites } from '../../features/reduxSlice/favoriteSlice';

export const ProductCard = ({ item }) => {
  const { carts } = useSelector(item => item.user)



  if (!item || !item.image) {
    return null;
  }

  const { favorites } = useSelector(state => state.favor);

  const dispatch = useDispatch();
  const isInFavorites = favorites.some(favorite => favorite.id === item.id);

  const handleAddToFavorites = () => {
    if (isInFavorites) {
      dispatch(removeFromFavorites(item));
    } else {
      dispatch(addFavorites(item));
    }
  };


  // const isInCart = Object.values(cartItems).some(cartItem => cartItem.id === item.id);

  // const isInFavorites = Object.values(favoriteItems).some(favoriteItem => favoriteItem.id === item.id);


  return (
    <div className="product-card">
      <div className="product-card__container">
        <div className="product-card__block">
          <div className="product-card__image-block">
            <img
              className="product-card__image"
              src={`${item.image}`}
              alt="phone-image" />
          </div>

          <div className="product-card__title-block">
            <h6 className="product-card__title">
              {`${item.name} (MQ023)`}
            </h6>
          </div>

          <div className="product-card__price-block">
            <h6 className="product-card__price">
              {`$ ${item.price}`}
            </h6>
          </div>

          <hr className="product-card__line" />

          <div className="product-card__details-block">
            <div className="product-card__details">
              <p className="product-card__details-key">
                {"Screen"}
              </p>

              <p className="product-card__details-value">
                {item.screen}
              </p>
            </div>

            <div className="product-card__details">
              <p className="product-card__details-key">
                {"Capacity"}
              </p>

              <p className="product-card__details-value">
                {item.capacity}
              </p>
            </div>

            <div className="product-card__details">
              <p className="product-card__details-key">
                {"RAM"}
              </p>

              <p className="product-card__details-value">
                {item.ram}
              </p>
            </div>
          </div>

          <div className="product-card__button-block">
            <button
              className="product-card__button product-card__button-add"
              onClick={() => dispatch(addCard(item))}
            >
              {/* {isInCart ? "Remove from Cart" : "Add to Cart"} */}
              Add to Cart
            </button>

            <button
              className="product-card__button product-card__button-favorite"
              onClick={handleAddToFavorites}
            >
              <FontAwesomeIcon
                className="product-card__button-icon"
                icon={faHeart}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

