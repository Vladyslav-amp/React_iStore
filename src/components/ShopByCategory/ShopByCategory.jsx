import './ShopByCategory.scss';
import { NavLink } from 'react-router-dom';
import phones from '../../data/data_apple/products_iphone.json';

import shopPhone from '../../img/category/category-phones.png';
import shopTablets from '../../img/category/category-tablets.png';
import shopAccessories from '../../img/category/category-accessories.png';

export const ShopByCategory = () => {

  const categories = [
    { id: 1, section: 'Phones', label: 'Mobile phones', src: shopPhone, path: 'Phones', length: phones.length },
    { id: 2, section: 'Tablets', label: 'Tablets', src: shopTablets, path: 'Tablets', length: 0 },
    { id: 3, section: 'Accessories', label: 'Accessories', src: shopAccessories, path: 'Accessories', length: 0 },
  ]


  return (
    <div className="shop-category">
      <div className="shop-category__container">
        <div className="shop-category__head">
          <h1 className="shop-category__head-title">
            Shop by category
          </h1>
        </div>

        <div className="shop-category__body">
          {categories.map((category, index) => (
            <NavLink
              key={index}
              className="shop-category__link-block"
              to={`/${category.path}`}
            >
              <div className="shop-category__link">
                <div className="shop-category__banner-block">
                  <img
                    src={category.src}
                    alt="banner-shop"
                    className="shop-category__banner"
                  />
                </div>

                <div className="shop-category__category-name">
                  <h4 className="shop-category__label">
                    {category.label}
                  </h4>
                </div>

                <div className="shop-category__availability">
                  <h5 className="shop-category__availability-block">
                    {category.length}
                  </h5>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}