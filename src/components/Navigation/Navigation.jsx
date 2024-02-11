import './Navigation.scss';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NiceLogo from '../../data/data_apple/img/logo/Nice_Gadget_logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { Cart } from '../Cart/Cart';
import { useSelector } from 'react-redux';

export const Navigation = () => {

  const { carts } = useSelector(item => item.user)
  const { favorites } = useSelector(state => state.favor)
  const totalFavorites = favorites.reduce((total, item) => total + item.quantity, 0);
  const totalItems = carts.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="navigation" id="navigation">
      <div className="navigation-container">
        <div className="navigation-container--align-left">
          <div className="navigation-logo">
            <div className="navigation-logo__block">
              <img className="navigation-logo__block-img" src={NiceLogo} alt="Logo" />
              <span className="navigation-logo__block-title">
                Nice <br /> Gadget
              </span>
            </div>
          </div>

          <nav className="navigation-block">
            <NavLink
              to="/Home"
              className={({ isActive }) => isActive ? "navigation-block__link--active" : "navigation-block__link"}
            >
              Home
            </NavLink>

            <NavLink
              to="/Phones"
              className={({ isActive }) => isActive ? "navigation-block__link--active" : "navigation-block__link"}
            >
              Phones
            </NavLink>

            <NavLink
              to="/Tablets"
              className={({ isActive }) => isActive ? "navigation-block__link--active" : "navigation-block__link"}
            >
              Tablets
            </NavLink>

            <NavLink
              to="/Accessories"
              className={({ isActive }) => isActive ? "navigation-block__link--active" : "navigation-block__link"}
            >
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className="navigation-container--align-right">
          <div className="navigation-favorites">
            <div className="navigation-favorites__block">
              <NavLink
                to={"/Favorites"}
                className="navigation-favorites__icon-button">
                <FontAwesomeIcon
                  className="navigation__icon navigation-favorites__icon-favorite"
                  icon={faHeart}
                />
                <p className="navigation__counter navigation__counter-favorite">{totalFavorites}</p>
              </NavLink>
            </div>
          </div>

          <div className="navigation-cart">
            <div className="navigation-cart__block">
              <NavLink
                to={"/Cart"}
                className="navigation-favorites__icon-button"
              >
                <FontAwesomeIcon
                  className="navigation__icon navigation-cart__icon-shop"
                  icon={faCartShopping}
                />
                <p className="navigation__counter navigation__counter-cart">{totalItems}</p>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="navigation-burger">
          <a
            className="navigation-burger__open"
            href="#navigation-menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </a>
        </div>


      </div>

      <aside className="navigation-aside" id="navigation-menu">
        <div className="navigation-aside__block">
          <div className="navigation-aside__top">
            <div className="navigation-aside__logo">
              <img
                className="navigation-logo__block-img"
                src={NiceLogo}
                alt="Logo"
              />

              <span className="navigation-logo__block-title">
                Nice <br /> Gadget
              </span>
            </div>

            <a
              className="navigation-burger__close"
              href="#navigation"
            >
              <FontAwesomeIcon icon={faXmark} />
            </a>
          </div>

          <div className="navigation-aside__bottom">
            <nav className="navigation-aside__block">
              <a
                href="/Home"
                className="navigation-aside__link"
              >
                Home
              </a>

              <a
                href="/Phones"
                className="navigation-aside__link"
              >
                Phones
              </a>

              <a
                href="/Tablets"
                className="navigation-aside__link"
              >
                Tablets
              </a>

              <a
                href="/Accessories"
                className="navigation-aside__link"
              >
                Accessories
              </a>
            </nav>
          </div>
        </div>
      </aside>
    </div>
  );
}