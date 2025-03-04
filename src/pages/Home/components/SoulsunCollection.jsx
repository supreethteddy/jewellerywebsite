import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// import { necklaceItems } from "../../../constant";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronUp } from "lucide-react";
import apiClient from "../../../lib/utils";
import CustomImg from "../../../components/ui/customImg";

import image from "../../../assets/images/home_page/soulsun-collection.jpg";

const SoulsunCollection = () => {
  const swiperRef = useRef(null);
  // const [allProducts, setAllProducts] = useState(null);

  // useEffect(() => {
  //   const getAllProducts = async () => {
  //     try {
  //       const res = await apiClient.get({
  //         url: `/products/byCategory/earrings`,
  //       });
  //       setAllProducts(res?.products);
  //     } catch (error) {
  //       console.log(error?.data?.message || "error");
  //     }
  //   };
  //   getAllProducts();
  // }, []);
  // const handleNext = () => {
  //   swiperRef.current.swiper.slideNext();
  // };

  // const handlePrev = () => {
  //   swiperRef.current.swiper.slidePrev();
  // };
  return (
    <div className="max-w-[90rem] mx-auto px-6 lg:px-8">
      <div
        data-aos="fade-up"
        // flex-col-reverse
        className="max-w-5xl mx-auto pb-[4rem] flex flex-col md:grid grid-cols-[60%_auto] gap-4 md:gap-10"
      >
        <div className="h-full border relative">
          <h2 className="uppercase mt-[-1rem] bg-white w-fit mx-auto text-lg px-1 text-center tracking-widest">
            SOULSUN COLLECTION
          </h2>
          <div className="mt-[1rem]">
          {/* <div className="mt-[2rem]"> */}
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              // slidesPerView={2}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
              ref={swiperRef}
            >
              {/* {allProducts
                ? allProducts?.map((item) => ( */}
              {/* <SwiperSlide className="pb-3"> */}
              <div
                // <Link
                  // to={`/product-details/${item?._id}`}
                  // key={item?._id}
                  className="overflow-hidden h-fit flex flex-col transition-all duration-200 gap-2 items-center px-4 pb-4 group"
                  // className="relative overflow-hidden aspect-[3/4] h-fit flex flex-col transition-all duration-200 gap-2 items-center pb-[2rem] group"
                >
                  {/* {item?.isBestSeller && (
                          <small className="absolute z-10 left-3 top-1 bg-primary text-white py-1 px-2 rounded-full">
                            Best Seller
                          </small>
                        )} */}

                  {/* STATIC IMAGE */}
                  <img
                    src={image}
                    // src={item?.images[0]}
                    className="opacity-100 w-full duration-300 object-cover aspect-[5/3.4]"
                    alt={"soulsun collection"}
                    // alt={item?.name}
                    loading="lazy"
                  />

                  {/* <CustomImg
                          src={image}
                          // src={item?.images[0]}
                          className="group-hover:opacity-100 opacity-100 absolute h-full w-[95%] group-hover:-translate-x-[105%] duration-300 object-cover"
                          alt={"soulsun collection"}
                          // alt={item?.name}
                          loading="lazy"
                        />
                        <CustomImg
                          src={ item?.images[1]}
                          className="group-hover:opacity-100 opacity-100 absolute h-full w-[95%] translate-x-[105%] group-hover:translate-x-0 duration-300 object-cover"
                          alt={item?.name}
                          loading="lazy"
                        /> */}
                {/* </Link> */}
                </div>
                {/* <div className="text-center">
                        <p className="uppercase desc mt-3 text-[.9rem]">
                          {item?.name}
                        </p>
                        <p className="text-sm text-black/60 font-light">
                          ₹{item?.price}
                        </p>
                      </div> */}
              {/* </SwiperSlide> */}
              {/* ))
                : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <SwiperSlide className="p-3 border" key={item}>
                      <div
                        className="relative overflow-hidden aspect-[3/4] h-fit flex flex-col transition-all duration-200 gap-2 items-center pb-[2rem] group"
                        key={item}
                      >
                        
                        <div className="absolute z-10 left-2 top-2 bg-gray-300 py-1 px-4 rounded-full animate-pulse h-[20px] w-[80px]"></div>

                        
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="absolute h-full w-[95%] bg-gray-300 animate-pulse"></div>
                          <div className="absolute h-full w-[95%] bg-gray-300 animate-pulse translate-x-[105%]"></div>
                        </div>

                        
                        <div className="text-center w-full mt-3">
                          <div className="h-[1rem] bg-gray-300 animate-pulse w-3/4 mx-auto rounded"></div>
                          <div className="h-[0.8rem] bg-gray-300 animate-pulse w-1/2 mx-auto rounded mt-2"></div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))} */}
            </Swiper>
            {/* <button
              onClick={handlePrev}
              className="absolute top-1/2 -translate-y-1/2 -left-[1rem] z-10 p-2 rounded-full bg-white shadow-large shadow-black/10 text-black hover:shadow-black/20 hover:scale-110 transition-all duration-300"
            >
              <ChevronUp className="-rotate-90" size={20} strokeWidth={0.8} />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 -translate-y-1/2 -right-[1rem] z-10 p-2 rounded-full bg-white shadow-large shadow-black/10 text-black hover:shadow-black/20 hover:scale-110 transition-all duration-300"
            >
              <ChevronUp className="rotate-90" size={20} strokeWidth={0.8} />
            </button> */}
          </div>
        </div>
        <div className="p-5 bg-[#1C1B1B] text-white flex items-center">
          <p>
            Welcome to Soulsun Season! Those born under this intense water sign
            are celebrated for their passion, determination, and magnetic
            presence. Represented by the scorpion, Scorpios are known for their
            depth and transformative power, diving fearlessly into the mysteries
            of life. With a natural ability to uncover truths and a fierce sense
            of loyalty, they possess a unique intensity that captivates those
            around them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SoulsunCollection;
