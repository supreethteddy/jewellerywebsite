import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import cartimage from "../../assets/images/jewellery/pic-1.jpeg";
import { Minus, Plus, TrashIcon, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomImg from "../../components/ui/customImg";
import { updateCarts } from "../../services/api";

// const initialCartItems = [
//   {
//     id: 1,
//     image: cartimage,
//     title: "Pandaia Stack Rings",
//     price: 230,
//     quantity: 1,
//   },
//   {
//     id: 2,
//     image: cartimage,
//     title: "Aurora Necklace",
//     price: 450,
//     quantity: 1,
//   },
//   {
//     id: 3,
//     image: cartimage,
//     title: "Gemstone Bracelet",
//     price: 320,
//     quantity: 1,
//   },
//   {
//     id: 4,
//     image: cartimage,
//     title: "Classic Earrings",
//     price: 750,
//     quantity: 1,
//   },
// ];

const Cart = () => {
  const initialCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  let token = localStorage.getItem("key");

  const increment = (id) => {
    const updatedData = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedData));
    setCartItems(updatedData);
  };

  const decrement = (id) => {
    const updatedData = cartItems
      .map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item
      )
      .filter((item) => item.quantity > 0);

    localStorage.setItem("cartItems", JSON.stringify(updatedData));
    setCartItems(updatedData);
  };

  const emptyCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const checkoutHandle = async () => {
    if (token) {
      navigate("/checkout");
    } else {
      setShowModal(true);
    }
  };

  const handleLoginClick = () => {
    setShowModal(false);
    navigate("/login");
  };

  const handleGuestClick = () => {
    setShowModal(false);
    navigate("/checkout");
  };

  return (
    <div className="pt-[5.5rem]">
      <Header />
      <div data-aos="fade-up" className="wrapper">
        {cartItems.length === 0 ? (
          <div className="w-full flex flex-col justify-center items-center h-[90vh]">
            <h3 className="heading-2 uppercase text-center">
              YOUR BAG IS EMPTY
            </h3>
            {/* <p className="font-light text-[#6A6A6A] text-center mt-3">
              Free express shipping worldwide on orders over
              <br /> ₹250
            </p> */}
            <Link
              to="/shop/earrings"
              className="btn text-center primary-btn min-w-[18rem] mt-[1rem]"
            >
              SHOP OUR PRODUCTS
            </Link>
          </div>
        ) : (
          <div className="my-20 sm:my-16">
            <h2 className="text-xl uppercase">Shopping Cart</h2>
            <div className="grid gap-6 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-5 border w-full p-6 rounded-lg shadow-sm"
                >
                  <Link to={`/product-details/${item._id}`}>
                    <CustomImg
                      src={item?.images[0]}
                      alt={item.name}
                      className="w-full h-40 object-contain"
                    />
                  </Link>
                  <Link to={`/product-details/${item.id}`}>
                    <h4 className="text-xl text-start tracking-widest">
                      {item.name}
                    </h4>
                  </Link>
                  <h6 className="text-sm text-start tracking-widest flex items-start">
                    ₹ {item.price}
                  </h6>
                  <div className="flex gap-5 border w-fit px-3 py-1 rounded-full select-none">
                    {item.quantity === 1 ? (
                      <TrashIcon
                        className="cursor-pointer"
                        onClick={() => decrement(item._id)}
                      />
                    ) : (
                      <Minus
                        className="cursor-pointer"
                        onClick={async () => {
                          decrement(item._id);
                          await updateCarts(item._id, -1);
                        }}
                      />
                    )}
                    <p className="w-7 text-center">{item.quantity}</p>
                    <Plus
                      className="cursor-pointer"
                      onClick={async () => {
                        increment(item._id);
                        await updateCarts(item._id, 1);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t mt-10 py-5">
              <div className="flex justify-end">
                <h1 className="text-xl text- pl-3 min-w-[260px]">
                  Subtotal (
                  <span className="w-4">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    item
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0) > 1
                      ? "s"
                      : ""}
                  </span>
                  ): <span className="font-bold inline">₹ {totalPrice}</span>
                </h1>
              </div>

              <div className="flex justify-end mt-10 gap-5">
                <button
                  className="btn text-white bg-black hover:bg-black/70 uppercase"
                  onClick={emptyCart}
                >
                  Clear Cart
                </button>
                <button className="btn primary-btn" onClick={checkoutHandle}>
                  To Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full sm:mx-0 mx-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium uppercase tracking-wide">
                Checkout Options
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Please sign in to your account or continue as a guest to complete
              your purchase.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleGuestClick}
                className="btn primary-btn w-full"
              >
                Continue as Guest
              </button>
              <button
                onClick={handleLoginClick}
                className="btn text-white bg-black hover:bg-black/70 uppercase w-full"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
