import './Header.scss';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { Home } from '../Home/Home';
import { Phones } from '../Phones/Phones';
import { Tablets } from '../Tablets/Tablets';
import { Accessories } from '../Accessories/Accessories';
import { Favorites } from '../Favorites/Favorites';
import { Cart } from '../Cart/Cart';

import store from '../../features/store'
import { Provider } from 'react-redux';

export const Header = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Navigation />

          <Routes>
            <Route path="/" element={<Navigate to="/Home" />} />

            <Route path="/Home" element={<Home />}></Route>
            <Route path="/Phones" element={<Phones />}></Route>
            <Route path="/Tablets" element={<Tablets />}></Route>
            <Route path="/Accessories" element={<Accessories />}></Route>

            <Route path="/Favorites" element={<Favorites />}></Route>
            <Route path="/Cart" element={<Cart />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}