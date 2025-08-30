import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import img1 from "../../assets/images/aboutus/image-1.jpg";
import img2 from "../../assets/images/aboutus/image-2.jpg";
import { Star } from "lucide-react";
import img3 from "../../assets/images/aboutus/image-3.jpg";
import img5 from "../../assets/images/aboutus/image-5.jpg";

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
            jewello
          </h1>
        </div>
      </div>
      <section className="py-[3rem] wrapper">
        <p
          data-aos="fade-up"
          className="text-center max-w-3xl mx-auto font-light"
        >
          At{" "}
          <b>
            Jewello, we believe that jewellery is more than just an
            accessory--it's a form of self-expression, a keepsake of cherished
            moments, and a piece of timeless artistry. Founded by husband and
            wife duo Sanjuktaa and Sagar,
          </b>{" "}
          our brand is built on a shared passion for craftmanship, fashion, and
          elegance.
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
            Sagar’s journey began in the world of fashion, where he spent years
            as a model working with leading brands and designers, mastering the
            art of style and presentation. He later stepped into his family’s
            footwear manufacturing business, immersing himself in the
            intricacies of design, quality, and production.
            <br />
            <br />
            Meanwhile, Sanjuktaa’s career flourished in luxury fashion,
            beginning with Louis Vuitton in India and Paris and later becoming
            Retail Head at designer Gaurav Gupta, where she has been shaping
            luxury retail experiences for nearly a decade.
          </p>
        </div>
      </div>
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
              With our combined expertise in fashion, luxury, and craftsmanship,
              Jewello was born—a brand that embodies our love for fine jewelry,
              exceptional quality, and accessible elegance. We meticulously
              curate and create jewelry that blends sophistication,
              affordability, and timeless beauty.
            </p>
          </div>
        </div>
      </section>
      <section className="py-[3rem] flex flex-col gap-[2rem]">
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
      <div className="py-[3rem] wrapper">
        <p className="text-center max-w-[35rem] mx-auto">
          "Jewello's jewelry resemble works of art"
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} fill="#DEA821" size={20} stroke="0" />
            ))}
        </div>
      </div>
      <div className="pb-[3rem]">
        <p className="text-md font-light max-w-4xl mx-auto text-center">
          For us, jewelry is more than just an ornament; it carries memories,
          emotions, and traditions. Whether you’re celebrating a milestone,
          embracing your individuality, or simply indulging in a beautiful
          piece, <b>Jewello is here to make those moments even more special.</b>
          <br />
          <br />
          <b>
            Thank you for being part of our journey— we can't wait to be part of
            yours.
          </b>
          <br />
          <br />
          <b>— Sanjuktaa & Sagar, Co-founders of Jewello</b>
        </p>
      </div>
      <img
        className="w-full object-cover max-h-[75vh]"
        src={img2}
        width="500"
        height="400"
        alt="About Us 2"
        loading="lazy"
      />

      {/* <section className="py-[3rem]">
        <div className="wrapper mb-[2rem]">
          <div className="max-w-3xl mx-auto text-center">
            
          </div>
        </div>
      </section> */}
      <Footer />
    </div>
  );
};

export default AboutUs;
