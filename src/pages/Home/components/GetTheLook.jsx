import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { necklaceItems } from "../../../constant";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import apiClient from "../../../lib/utils";
import CustomImg from "../../../components/ui/customImg";

const GetTheLook = () => {
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await apiClient.get({ url: `/products/byCategory/rings` });
        setAllProducts(res?.products);
      } catch (error) {
        console.log(error?.data?.message || "error");
      }
    };
    getAllProducts();
  }, []);
  return (
    <div data-aos="fade-up" className="py-[4rem]">
      <h2 className="uppercase text-xl text-center tracking-widest">
        get the look
      </h2>
      <div className="mt-[2rem]">
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            550: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            930: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1120: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {allProducts
            ? allProducts?.map((item) => (
                <SwiperSlide className="p-3 border" key={item?._id}>
                  <Link
                    to={`/product-details/${item?._id}`}
                    key={item?._id}
                    className="relative aspect-[3/4] overflow-hidden h-fit flex flex-col transition-all duration-200 gap-2 items-center pb-[2rem] group"
                  >
                    {item?.isBestSeller && (
                      <small className="absolute z-10 left-2 top-2 bg-primary text-white py-1 px-2 rounded-full">
                        Best Seller
                      </small>
                    )}
                    <CustomImg
                      src={item?.images[0]}
                      className="group-hover:opacity-100 opacity-100 absolute h-full w-[95%] group-hover:-translate-x-[105%] duration-300 object-cover"
                      alt={item?.name}
                      loading="lazy"
                    />
                    <CustomImg
                      src={item?.images[1]}
                      className="group-hover:opacity-100 opacity-100 absolute h-full w-[95%] translate-x-[105%] group-hover:translate-x-0 duration-300 object-cover"
                      alt={item?.name}
                      loading="lazy"
                    />
                  </Link>
                  <div className="text-center">
                    <p className="uppercase desc mt-3 text-[.9rem]">
                      {item?.name}
                    </p>
                    <p className="text-sm text-black/60 font-light">
                      ₹{item?.price}
                    </p>
                  </div>
                </SwiperSlide>
              ))
            : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <SwiperSlide className="p-3 border" key={item}>
                  <div
                    className="relative overflow-hidden aspect-[3/4] h-fit flex flex-col transition-all duration-200 gap-2 items-center pb-[2rem] group"
                    key={item}
                  >
                    {/* Skeleton for the badge */}
                    <div className="absolute z-10 left-2 top-2 bg-gray-300 py-1 px-4 rounded-full animate-pulse h-[20px] w-[80px]"></div>

                    {/* Skeleton for images */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="absolute h-full w-[95%] bg-gray-300 animate-pulse"></div>
                      <div className="absolute h-full w-[95%] bg-gray-300 animate-pulse translate-x-[105%]"></div>
                    </div>

                    {/* Skeleton for text */}
                    <div className="text-center w-full mt-3">
                      <div className="h-[1rem] bg-gray-300 animate-pulse w-3/4 mx-auto rounded"></div>
                      <div className="h-[0.8rem] bg-gray-300 animate-pulse w-1/2 mx-auto rounded mt-2"></div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
      <div className="flex justify-center wrapper mt-5">
        <Link to="/shop/rings" className="btn primary-btn mx-auto w-fit">
          View More
        </Link>
      </div>
    </div>
  );
};

export default GetTheLook;
