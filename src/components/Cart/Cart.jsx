import React, { useState, useEffect } from 'react';
import './Cart.scss';

import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../../features/reduxSlice/cartSlice';


export const Cart = () => {

  const pathWithoutSlash = location.pathname.slice(1);
  const { carts } = useSelector(item => item.user)

  const totalItems = carts.reduce((total, item) => total + item.quantity, 0);
  const sumPrice = carts.reduce((total, item) => total + (item.price * item.quantity), 0);

  const dispatch = useDispatch();

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity({ id: itemId }));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity({ id: itemId }));
  };

  const handleCheckout = () => {
    const productsToSave = carts.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    // Przetwarzanie danych do formatu JSON
    const jsonData = JSON.stringify(productsToSave);

    // Tworzenie obiektu Blob z danymi JSON
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Tworzenie linku do pobrania pliku JSON
    const url = window.URL.createObjectURL(blob);

    // Tworzenie elementu a, aby pobrać plik JSON
    const link = document.createElement('a');
    link.href = url;
    link.download = 'checkout.json';
    link.click();

    // Czyszczenie koszyka po zatwierdzeniu zamówienia
    dispatch(clearCart());
  };


  return (
    <div className="cart">
      <div className="cart__title">
        <div className="cart__title-block">
          <FontAwesomeIcon
            className="cart__title-icon"
            icon={faHouse}
          />

          <FontAwesomeIcon
            className="cart__title-icon"
            icon={faChevronRight}
          />

          <p className="cart__title-page">
            {pathWithoutSlash}
          </p>
        </div>

        <div className="cart__title-head">
          <h1 className="cart__title-name">
            Cart
          </h1>
        </div>
      </div>

      <div className="cart-product__block">
        <div className="cart-product">
          <div className="cart-product__list">
            {carts?.map((item, index) => (
              <li
                className="cart-product__item"
                key={index}
              >
                <div className="cart-product__item-main">
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="cart-product__item-remove"
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="cart-product__item-icon"
                    />
                  </button>

                  <div className="cart-product__item-image">
                    <img
                      src={item.image}
                      alt="cart-product-image"
                      className="cart-product__item-img"
                    />
                  </div>

                  <div className="cart-product__head">
                    <p
                      className="cart-product__item-title"
                    >
                      {item.name}
                    </p>

                    <span
                      className="cart-product__item-title--bold"
                    >
                      ${item.price}
                    </span>
                  </div>
                </div>

                <div className="cart-product__item-more">
                  <div className="cart-product__item-counter">
                    <button
                      className="cart-product__item-count"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      -
                    </button>

                    <p
                      className="cart-product__item-quantity">
                      {item.quantity}
                    </p>

                    <button
                      className="cart-product__item-count"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <p
                    className="cart-product__item-total"
                  >
                    ${item.price * item.quantity}
                  </p>
                </div>
              </li>
            ))}
          </div>
        </div>

        <div className="cart-cash">
          <div className="cart-cash__amount-block">
            <p className="cart-cash__amount">
              {`$${sumPrice}`}
            </p>

            <p className="cart-cash__quantity">
              {`Total for ${totalItems} items`}
            </p>
          </div>

          <div className="cart-cash__button">
            <button
              className="cart-cash__checkout-button"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
