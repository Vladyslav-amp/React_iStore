import './ImageBannerSlider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import React, { useState } from 'react';

import bannerPhone from '../../../img/banner/banner-phones.png';
import bannerTablets from '../../../img/banner/banner-tablets.png';
import bannerAccessories from '../../../img/banner/banner-accessories.png';


export const ImageSlider = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    { id: 1, section: 'Phones', src: bannerPhone },
    { id: 2, section: 'Tablets', src: bannerTablets },
    { id: 3, section: 'Accessories', src: bannerAccessories },
  ]

  const swiperRef = React.useRef(null);

  const prevSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.slidePrev();
    }
  };

  const nextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.slideNext();
    }
  };

  return (
    <div className="slider">
      <div className="slider-container">
        <div className="swiper-container">
          <Swiper
            className="swiper-block"
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: "swiper-button-prev",
              nextEl: "swiper-button-next",
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
            }}
            loop={true}
            speed={800}
            autoplay={{
              delay: 2500,
            }}
            slidesPerView={1}
            spaceBetween={50}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            ref={swiperRef}
          >
            {slides.map((slide) => {
              return (
                <SwiperSlide key={slide.id}>
                  <img
                    className="slider-block__banner-img"
                    src={slide.src}
                    alt={slide.category}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="swiper-pagination">
            {slides.map((slide, index) => (
              <span
                key={slide.id}
                className={`pagination-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <button onClick={prevSlide} className='swiper-button-prev'></button>
          <button onClick={nextSlide} className='swiper-button-next'></button>
        </div>
      </div>
    </div>
  );
}