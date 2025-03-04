import React from "react";
import banner1 from "../../../assets/images/home_page/banner.jpg";
import banner2 from "../../../assets/images/home_page/banner1.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { LinkButton } from "../../../components/Button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const BannerSlider = () => {
  return (
    <Swiper
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper h-[calc(100vh-6rem)]"
    >
      <SwiperSlide className="relative ">
        <img
          data-aos="zoom-out"
          loading="lazy"
          src={banner1}
          className="h-full -z-0 object-cover w-full object-center"
          alt=""
        />
        <div
          data-aos="fade-right"
          className="wrapper flex flex-col gap-2 absolute left-[2rem] bottom-[3rem] text-black"
        >
          <p className="uppercase font-light">New In</p>
          <h4 className="heading-2 uppercase">The Soulsun Collection</h4>
          <LinkButton path="/shop/necklace" className="w-fit">
            Get Started
          </LinkButton>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative h-[calc(100vh-6rem)]">
        <img
          data-aos="zoom-out"
          loading="lazy"
          src={banner2}
          className="h-full -z-0 object-cover w-full object-center"
          alt=""
        />
        <div
          data-aos="fade-right"
          className="wrapper flex flex-col gap-2 absolute left-[2rem] bottom-[3rem] text-black"
        >
          <p className="uppercase font-light">New In</p>
          <h4 className="heading-2 uppercase">The Soulsun Collection</h4>
          <LinkButton path="/shop/necklace" className="w-fit">
            Get Started
          </LinkButton>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default BannerSlider;
