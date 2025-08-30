import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Icons removed for simplicity
import apiClient from "../../../lib/utils";
import CustomImg from "../../../components/ui/customImg";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const setWishlist = async () => {
    try {
      const res = await apiClient.get({ url: `/wishlist` });
      setItems(res?.wishlist?.products);
    } catch (error) {
      console.log(error?.data?.message || "error");
    }
  };
  useEffect(() => {
    setWishlist();
  }, []);
  const removeFromWishList = async (productId) => {
    setItems(items.filter((i) => i._id !== productId));
    try {
      await apiClient.post({ url: `/wishlist`, data: { productId } });
    } catch (error) {
      console.log(error?.data?.message);
    }
  };
  return (
    <div className="space-y-5">
      <p className="mb-3 text-xl">Wishlist</p>

        {items?.length > 0 ? (
          items.map((item) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7" key={item._id}>
            <div  className="flex flex-col gap-3 p-2 border rounded" >
              <Link
                to={`/product-details/${item._id}`}
                className="overflow-hidden border border-primary rounded"
              >
                <CustomImg
                  src={item?.images[0]}
                  className="aspect-square object-cover"
                  alt={item.title}
                />
              </Link>

              <div className="flex flex-col gap-2">
                <p className="">{item.name}</p>
                <p className="text-sm">₹{item.price}</p>
              </div>
              <div className="flex gap-5 justify-between">
                <button className="btn primary-btn w-full">Add to Cart</button>
                <button
                  onClick={() => removeFromWishList(item?._id)}
                  className="px-3 py-2 border rounded-full border-primary"
                >
                                      <span className="text-red-500">🗑</span>
                </button>
              </div>
            </div>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            {" "}
            <img
              src={"/empty-folder.png"}
              className="w-20 h-20"
              alt={"no data | jewello"}
            />
          <p className="font-light">Wishlist is empty.</p>
          </div>
        )}
    </div>
  );
};

export default Wishlist;
