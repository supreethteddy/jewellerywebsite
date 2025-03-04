import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
// import SortDropdown from "./components/SortDropdown";
// import { earringsItems, necklaceItems, ringsItems } from "../../constant";
import { Link, useParams } from "react-router-dom";
import apiClient from "../../lib/utils";
import CustomImg from "../../components/ui/customImg";

const earringData = {
  heading: "Earrings & Earcuffs",
  subHeading:
    "Explore SOULSUN's luxury sculptural earring & earcuff collections - perfect for any wardrobe. From simple mini hoops, to statement must-haves, and in a stunning gold or silver plated finish.",
  // products: earringsItems,
};

const ringData = {
  heading: "Rings",
  subHeading:
    "Explore Soulsun stunning luxury collection of rings. From everyday sets to statement rings, and a beautiful gold or silver plated finish - shop your new jewellery favourites.",
  // products: ringsItems,
};

const necklaceData = {
  heading: "Necklaces",
  subHeading:
    "Discover SOULSUN's exquisite collection of luxury necklaces. From delicate chains to bold statement pieces, available in stunning gold or silver plated finishes – elevate your style with the perfect accessory.",
  // products: necklaceItems,
};

const braceletData = {
  heading: "Cuffs, Bracelets & Anklets",
  subHeading:
    "Discover Soulsun stunning luxury collection of bracelets. From everyday sets to statement bracelets, and a beautiful gold or silver plated finish - shop your new jewellery favourites.",
  // products: braceletItems,
};

const Shop = () => {
  const { category } = useParams();
  const [allProducts, setAllProducts] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [rings, setRings] = useState(null);
  let heading, subHeading;

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setIsPending(true);
        const res = await apiClient.get({
          url: `/products/byCategory/${category}`,
        });
        const res2 = await apiClient.get({ url: `/products/byCategory/rings` });
        setAllProducts(res?.products);
        setRings(res2?.products);
      } catch (error) {
        console.log(error?.data?.message || "error");
      } finally {
        setIsPending(false);
      }
    };
    getAllProducts();
  }, [category]);

  if (category === "earrings") {
    heading = earringData.heading;
    subHeading = earringData.subHeading;
    // products = earringData.products;
  } else if (category === "rings") {
    heading = ringData.heading;
    subHeading = ringData.subHeading;
    // products = ringData.products;
  } else if (category === "necklaces") {
    heading = necklaceData.heading;
    subHeading = necklaceData.subHeading;
    // products = necklaceData.products;
  }else{
    heading = braceletData.heading;
    subHeading = braceletData.subHeading;
    // products = braceletData.products;
  }

  // const numOfPages = 5;
  // const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="pt-[5.5rem]">
      <Header />
      <section data-aos="fade-up" className="py-[4rem] wrapper">
        <div className="max-w-[40rem] mx-auto text-center">
          <p className="uppercase text-xl mb-2">{heading}</p>
          <p className="text-md font-light">{subHeading}</p>
        </div>
      </section>
      <section>
        {/* <div className="h-10 border flex items-center justify-end px-5">
          <div className="w-[15rem] h-full max-w-[15rem] relative">
            <SortDropdown />
          </div>
        </div> */}
        <div className="wrapper py-[2rem] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5">
          {allProducts && !isPending
            ? allProducts.map((item) => {
                return (
                  <div className="p-3 border">
                    <Link
                      to={`/product-details/${item?._id}`}
                      key={item?._id}
                      className="relative overflow-hidden aspect-[3/4] h-fit flex flex-col transition-all duration-200 gap-2 items-center pb-[2rem] group"
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
                  </div>
                );
              })
            : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
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
              ))}
        </div>
        {/* <div className="my-[2rem] flex mx-auto w-fit">
          <Pagination
            totalPages={numOfPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div> */}
      </section>
      <section data-aos="fade-up" className="py-[2rem] wrapper text-center">
        <p className="uppercase text-xl mb-2">LATEST SOULSUN COLLECTION</p>
        <div className="grid grid-cols-2 gap-5 max-w-xl mx-auto">
          {rings
            ? rings?.slice(0, 2).map((item) => (
                <div className="p-3 border">
                  <Link
                    to={`/product-details/${item?._id}`}
                    key={item?._id}
                    className="relative overflow-hidden aspect-[3/4] h-fit flex flex-col transition-all duration-200 gap-2 items-center pb-[2rem] group"
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
                    <img
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
                </div>
              ))
            : [1, 2].map((item) => (
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
              ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shop;

// pagination component
// const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
//   const handleClick = (page) => {
//     setCurrentPage(page);
//   };

//   const renderPagination = () => {
//     const pages = [];

//     // Show the first page
//     pages.push(
//       <button
//         key={1}
//         className={`${
//           currentPage === 1 && "border-black"
//         } min-w-[4rem] border-b-2 pb-2`}
//         onClick={() => handleClick(1)}
//       >
//         1
//       </button>
//     );

//     // Handle pages before and after the current page
//     if (currentPage > 3) {
//       pages.push(<span key="start-ellipsis">...</span>);
//     }

//     for (
//       let i = Math.max(2, currentPage - 1);
//       i <= Math.min(totalPages - 1, currentPage + 1);
//       i++
//     ) {
//       pages.push(
//         <button
//           key={i}
//           className={`${
//             currentPage === i && "border-black"
//           } min-w-[4rem] border-b-2 pb-2`}
//           onClick={() => handleClick(i)}
//         >
//           {i}
//         </button>
//       );
//     }

//     if (currentPage < totalPages - 2) {
//       pages.push(<span key="end-ellipsis">...</span>);
//     }

//     // Show the last page
//     pages.push(
//       <button
//         key={totalPages}
//         className={`${
//           currentPage === totalPages && "border-black"
//         } min-w-[4rem] border-b-2 pb-2`}
//         onClick={() => handleClick(totalPages)}
//       >
//         {totalPages}
//       </button>
//     );

//     return pages;
//   };

//   return (
//     <div className="flex">
//       <button
//         disabled={currentPage === 1}
//         onClick={() => handleClick(currentPage - 1)}
//       >
//         &lt;
//       </button>

//       {renderPagination()}

//       <button
//         disabled={currentPage === totalPages}
//         onClick={() => handleClick(currentPage + 1)}
//       >
//         &gt;
//       </button>
//     </div>
//   );
// };
