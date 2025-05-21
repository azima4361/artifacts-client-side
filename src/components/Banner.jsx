import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import banner1 from '../assets/banner1.jpg'
import banner2 from '../assets/banner2.jpg'
import banner3 from '../assets/banner3.jpg'

const Banner = () => {
  return (
    <div className="w-full h-[60vh] md:h-[80vh]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
      >
        <SwiperSlide>
          <div className="relative h-full">
            <img
              src={banner1}
              alt="Ancient Egyptian Artifact"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0  bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-xl md:text-5xl font-bold">Ancient Egyptian Wonders</h2>
              <p className="text-md md:text-lg mt-2 max-w-2xl text-center">
                Discover and track rare Egyptian artifacts, from hieroglyphic scrolls to preserved statues.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-full">
            <img
              src={banner2}
              alt="Roman Pottery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0  bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-2xl md:text-5xl font-bold">Roman Empire Relics</h2>
              <p className="text-md md:text-lg mt-2 max-w-2xl text-center">
                Keep a detailed record of Roman-era pottery, weapons, and architectural pieces.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-full">
            <img
              src={banner3}
              alt="Medieval Armor"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0  bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-2xl md:text-5xl font-bold">Medieval Era Treasures</h2>
              <p className="text-md md:text-lg mt-2 max-w-2xl text-center">
                Catalog swords, shields, and manuscripts from the Middle Ages for global preservation.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
