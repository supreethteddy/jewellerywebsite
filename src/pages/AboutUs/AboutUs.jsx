import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import img1 from "../../assets/images/aboutus/image-1.jpg";
import img2 from "../../assets/images/aboutus/image-2.jpg";
import { Star } from "lucide-react";
// import { Swiper, SwiperSlide } from "swiper/react";
import img3 from "../../assets/images/aboutus/image-3.jpg";
import img4 from "../../assets/images/aboutus/image-4.jpg";
import img5 from "../../assets/images/aboutus/image-5.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import { celebrityJewelleryItems } from "../../constant";

const AboutUs = () => {
  return (
    <div className="pt-[5.5rem]">
      <Header />
      <div className="py-[4rem] bg-[#f9f9f9]">
        <div className="wrapper">
          <h1
            data-aos="fade-up"
            className="text-[3rem] sm:text-6xl uppercase text-center"
          >
            soulsun
          </h1>
        </div>
      </div>
      <section className="py-[3rem] wrapper">
        <p
          data-aos="fade-up"
          className="text-center max-w-3xl mx-auto font-light"
        >
          At Soulsun, we believe jewellery goes beyond beauty. It represents
          love, milestones, and unforgettable moments. Our mission is simple —
          to create timeless, elegant pieces that speak to your heart and become
          a meaningful part of your journey.
        </p>
      </section>
      <img
        data-aos="fade-up"
        className="w-full object-cover max-h-[75vh]"
        src={img1}
        alt="About Us 1"
        width="500"
        height="400"
        loading="lazy"
      />
      <div className="wrapper">
        <div className="max-w-3xl mx-auto text-center py-[3rem]">
          <p className="uppercase text-xl mb-2">Our Story</p>
          <p className="text-md font-light">
            Every dream starts small, and ours was no different. With a passion
            for art and an eye for detail, we set out to build a jewellery brand
            that celebrates individuality and craftsmanship. From humble
            beginnings, we’ve grown into a brand that takes pride in creating
            pieces that feel personal, intentional, and unique. <br />
            <br /> Unlike mass-produced jewellery, each piece we design has a
            purpose — to help you express your truest self. Our focus isn’t just
            on style; it’s on substance, sustainability, and sincerity. Every
            purchase you make supports a growing dream, and every piece you wear
            becomes part of your story.
          </p>
        </div>
      </div>
      <img
        className="w-full object-cover max-h-[75vh]"
        src={img2}
        width="500"
        height="400"
        alt="About Us 2"
        loading="lazy"
      />
      <div className="py-[3rem] wrapper">
        <p className="text-center max-w-[35rem] mx-auto">
          "Soulsun's jewelry resemble works of art"
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} fill="#DEA821" size={20} stroke="0" />
            ))}
        </div>
      </div>
      {/* <section>
        <div className="wrapper">
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase text-xl mb-2">Celebrity Highlights</p>
            <p className="text-md font-light">
              Dua Lipa, Zendaya, Lady Gaga, Kim Kardashion, Adele, Billie Eilish
              and other icons of contemporary fashion and culture have been
              spotted countless times in SOULSUN's jewellery. 
            </p>
          </div>
        </div>
        <div className="pt-[3rem] wrapper">
          <h2 className="uppercase text-xl text-center tracking-widest">
            Celebrities
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
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {celebrityJewelleryItems.map(({ id, img, img2 }) => (
                <SwiperSlide>
                  <div
                    key={id}
                    className="text-center h-fit flex flex-col transition-all duration-200 gap-2 items-center pb-[2rem] group"
                  >
                    <img
                      src={img}
                      className="group-hover:w-0 w-full aspect-[3/4] duration-300 object-cover"
                      alt="Celebrity"
                      loading="lazy"
                    />
                    <img
                      src={img2}
                      className="group-hover:w-full w-0 aspect-[3/4] duration-300 object-contain"
                      alt="Celebrity"
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section> */}
      <section className="pb-[3rem] pt-[1rem] flex flex-col gap-[2rem]">
        <div className="wrapper">
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase text-xl mb-2">What Makes Us Different?</p>
            <p className="text-md font-light">
              In a world of fast fashion, we believe in slowing down and doing
              things right. Here’s what sets us apart:
            </p>
          </div>
        </div>
        <div className="pl-5 pr-5 md:pr-0">
          <div className="max-w-6xl grid md:grid-cols-2 mx-auto items-center gap-7">
            <div className="max-w-3xl md:mx-auto sm:text-center md:text-start">
              {/* <p className="uppercase text-xl mb-2">awards</p> */}
              <ul className="font-light flex flex-col gap-2">
                <li>
                  <span className="font-normal">Authentic Craftsmanship</span>-
                  Each design is brought to life by skilled artisans who pour
                  passion and precision into every detail.
                </li>
                <li>
                  <span className="font-normal">Sustainable Sourcing</span>- We
                  prioritize responsible sourcing, using ethically sourced
                  materials and environmentally friendly production methods.
                </li>
                <li>
                  <span className="font-normal">Personalized Experience</span>-
                  Our collections are curated with your needs in mind — from
                  classic styles to bold statement pieces, there’s something for
                  everyone.
                </li>
                <li>
                  <span className="font-normal">Lasting Quality</span>-
                  Jewellery is meant to last a lifetime, and that’s exactly how
                  we design it. Our pieces are made to be worn, loved, and
                  passed down.
                </li>
              </ul>
            </div>
            <img
              className="h-full w-full object-contain"
              src={img3}
              width="200"
              height="200"
              alt="About Us 3"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      {/* <section className="pb-[3rem]">
        <div className="wrapper mb-[2rem]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase text-xl mb-2">PODS</p>
            <p className="text-md font-light">
              The first brand to create earrings for Apple's Airpods, SOULSUN's
              Pebble Pods took the internet by storm. Published in over 70
              countries worldwide, they were shortlisted for Dezeen's design
              award in 2021.
            </p>
          </div>
        </div>
        <img
          className="h-full w-full object-contain"
          src={img4}
          width="500"
          height="400"
          alt="About Us 4"
          loading="lazy"
        />
      </section> */}
      <section className="py-[2rem] wrapper flex flex-col-reverse md:grid grid-cols-2 gap-7 items-center">
        <div className="">
          <img
            className="h-[65vh] w-full object-cover"
            src={img5}
            width="500"
            height="400"
            alt="About Us 4"
            loading="lazy"
          />
        </div>
        <div className="mb-[2rem]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase text-xl mb-2">Our Vision</p>
            <p className="text-md font-light">
              We dream of a world where jewellery is more than just an
              accessory. It’s a way to celebrate love, self-expression, and the
              milestones that define our lives. As a growing start-up, we’re
              committed to creating jewellery that is timeless, personal, and
              crafted to last. We’re not just building a brand — we’re building
              a legacy of beauty, craftsmanship, and integrity. Every piece you
              own from us is part of that legacy. Our collections are designed
              to inspire confidence, self-love, and celebration in every chapter
              of life.
            </p>
          </div>
        </div>
      </section>
      {/* <section className="pt-[2rem]">
        <div className="wrapper mb-[2rem]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase text-xl mb-2">Be Part of Our Journey</p>
            <p className="text-md font-light">
              We’re just getting started, and we’d love for you to be part of
              our story. Explore our collections, find the piece that speaks to
              you, and wear it with pride. Every purchase you make fuels our
              growth, helping us bring even more beauty, love, and creativity
              into the world.
            </p>
          </div>
        </div>
        <div className="">
          <img
            className="h-[85vh] w-full object-cover object-[100%_70%]"
            src={img4}
            width="500"
            height="400"
            alt="About Us 4"
            loading="lazy"
          />
        </div>
      </section> */}
      <Footer />
    </div>
  );
};

export default AboutUs;
