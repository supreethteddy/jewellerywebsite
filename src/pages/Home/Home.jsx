import React, { lazy } from "react";
import Header from "../../components/Header";
import { Star } from "lucide-react";
import earingsPic from "../../assets/images/home_page/earrings.jpg";
import ringsPic from "../../assets/images/home_page/rings.jpg";
import necklacePic from "../../assets/images/home_page/necklace.jpg";
import { Link } from "react-router-dom";
// import JoinSoulsunPopup from "../../components/JoinSoulsunPopup";
import Footer from "../../components/Footer";
import BannerSlider from "./components/BannerSlider";

const MustHave = lazy(() => import("./components/MustHave"));
// const GetTheLook = lazy(() => import("./components/GetTheLook"));
const SoulsunCollection = lazy(() => import("./components/SoulsunCollection"));
const Reviews = lazy(() => import("../../components/Reviews"));

const Home = () => {
  return (
    <div className="pt-[5rem]">
      <Header />
      <BannerSlider />
      <section data-aos="fade-up" className="py-[4rem] wrapper">
        <p className="text-center max-w-[35rem] mx-auto">
          "Demi-fine jewelry label blends clean lines with an innate feel for
          the body."
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} fill="#DEA821" size={20} stroke="0" />
            ))}
        </div>
      </section>
      <section className="border-t">
        <MustHave />
      </section>
      <section className="w-full relative">
        
        <div className="pb-[4rem] max-w-4xl mx-auto">
          <div
            data-aos="fade-up"
            className="wrapper grid sm:grid-cols-2 w-full"
          >
            {[
              {
                img: earingsPic,
                title: "Earrings",
                path: "/shop/earrings",
              },
              {
                img: ringsPic,
                title: "Rings",
                path: "/shop/rings",
              },
              {
                img: necklacePic,
                title: "Necklace",
                path: "/shop/necklaces",
              },
            ].map(({ img, title, path }, index) => (
              <div
                className={`${index === 2 && "sm:col-span-2"} h-full`}
                key={index}
              >
                <div
                  className={`${
                    index === 2 ? "sm:w-1/2 w-full mx-auto" : "w-full"
                  } h-full sm:aspect-[4/5] max-h-[30rem] relative group overflow-hidden`}
                >
                  <img
                    src={img}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-125 transition-all duration-300"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>
                  <div className="absolute z-10 bottom-[2rem] flex flex-col items-center gap-3 left-0 w-full text-center h-fit">
                    <h4 className="text-white uppercase tracking-widest">
                      {title}
                    </h4>
                    <Link to={path} className="btn primary-btn w-fit">
                      view more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <GetTheLook /> */}
      <SoulsunCollection />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;
