import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShippingAddress from "./components/ShippingAddress";
import CartItems from "./components/CartItems";
import { Link } from "react-router-dom";

const Checkout = () => {
  const cartList = JSON.parse(localStorage.getItem("cartItems")) || [];
  const [cartItems, setCartItems] = useState(cartList);

  // Calculate total quantity of items in the cart
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate shipping charges
  const shippingCharges = totalQuantity === 1 ? 80 : 0; // Free if total quantity > 1

  // Calculate subtotal (total without shipping)
  const subtotal = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);

  // Calculate total (subtotal + shipping charges)
  const [total, setTotal] = useState(subtotal + shippingCharges);

  return (
    <div className="pt-[5.5rem]">
      <Header />
      {cartItems.length > 0 ? (
        <section className="wrapper flex flex-col-reverse lg:grid grid-cols-[65%_auto] gap-7">
          <div className="py-[3rem]">
            <ShippingAddress total={total} setCartItems={setCartItems} />
          </div>
          <div className="py-[3rem] bg-[#EFEFEF]">
            <CartItems
              setTotal={setTotal}
              total={total}
              shippingCharges={shippingCharges}
              subtotal={subtotal}
              totalQuantity={totalQuantity}
            />
          </div>
        </section>
      ) : (
        <section className="wrapper">
          <div className="w-full flex flex-col justify-center items-center h-[90vh]">
            <h3 className="heading-2 uppercase text-center">
              YOUR BAG IS EMPTY
            </h3>
            <Link
              to="/shop/earrings"
              className="btn text-center primary-btn min-w-[18rem] mt-[1rem]"
            >
              SHOP OUR PRODUCTS
            </Link>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default Checkout;
