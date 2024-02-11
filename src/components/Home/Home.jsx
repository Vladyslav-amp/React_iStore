import './Home.scss';
import React, { useState } from 'react';

import { ImageSlider } from './ImageSlider/ImageBannerSlider';
import { ProductList } from '../ProductList/ProductList';


import phoneData from '../../data/data_apple/products_iphone.json';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';

export const Home = () => {

  return (
    <div className="home">
      <div className="home-container">
        {/* <div className="home__title">
          <h1 className="home__title-head">
            Welcome to Nice Gadgets store!
          </h1>
        </div> */}

        <ImageSlider />

        <ProductList products={phoneData} />

        <ShopByCategory />
      </div>
    </div>
  );
}