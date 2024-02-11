import React from 'react';
import './Favorites.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../../features/reduxSlice/cartSlice';
import { removeFromFavorites } from '../../features/reduxSlice/favoriteSlice';



export const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.favor)

  const totalItems = favorites.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (item) => {
    dispatch(addCard(item));
  };

  const handleRemoveFromFavorites = (item) => {
    dispatch(removeFromFavorites(item));
  };


  return (
    <div className="favorites">
      <div className="favorites__container">
        <h2>Favorites</h2>
        <p>Total: {totalItems}</p>
        <ul className="favorites-product__block">
          {favorites?.map((item, index) => (
            <li className="favorites-product__list" key={index}>
              <div className="favorites-product">
                <ProductCard
                  className="fovorites-product__list-item"
                  item={item}
                  onAddToCart={() => handleAddToCart(item)}
                  onRemoveFromFavorites={() => handleRemoveFromFavorites(item)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
