import React, { useEffect, useState } from "react";
import { necklaceItems } from "../../../constant";
import { Link } from "react-router-dom";
import apiClient from "../../../lib/utils";
import dayjs from "dayjs";
import CustomImg from "../../../components/ui/customImg";

const OrderHistory = () => {
  // const orders = necklaceItems.slice(0, 3);
  const [orders, setOrders] = useState([])

  const setProfileData=async()=>{
    try {
      const res =await apiClient.get({url:`/shipping`})
      setOrders(res?.orders)
    } catch (error) {
      console.log(error?.data?.message || 'error')
    }}
useEffect(()=>{
    setProfileData();
},[])
  return (
    <div className="space-y-3">
      <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-3 sm:gap-5">
        <p className="text-xl">Orders</p>

        <Link
          to="/cart"
          className="text-[.8rem] p-2 tracking-widest hover:-translate-y-1 transition-all duration-300 border border-primary text-sm hover:bg-primary hover:text-white"
        >
          Go to Cart
        </Link>
      </div>
      <div className="border border-primary">
        <div className="w-full h-[2.5rem] bg-primary"></div>
        <div className="p-5 flex flex-col gap-5">
          {orders.map((item) => (
            <div
              key={item._id}
              className="p-2 border border-primary rounded flex flex-col lg:flex-nowrap flex-wrap justify-between sm:items-center gap-4"
            >
              <p className="text-sm font-light w-full flex justify-between"><span>Invoice Number: {item._id}</span><span>Status : {item.isDelivered?'Delivered':'Pending'}</span></p>
              {item.products.map(ele=>(
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full justify-between">
                  <div className="flex gap-5 items-center flex-col sm:flex-row" >
                <div className="w-full max-w-[20rem] aspect-square sm:h-[4rem] sm:w-[4rem] relative">
                  <div className="absolute -top-0 -right-2 w-[1.24rem] h-[1.24rem] text-white text-sm bg-black/50 rounded-full flex items-center justify-center">
                    {ele.quantity}
                  </div>
                  <Link to={`/product-details/${ele._id}`}>
                    <CustomImg
                      src={ele?.images[0]}
                      className="object-cover aspect-square object-center"
                      alt={ele.name}
                    />
                  </Link>
                </div>
                <div className="flex flex-col gap-1">
                  <Link to={`/product-details/${ele._id}`}>
                    <h2 className="">{ele.name}</h2>
                  </Link>
                </div>
                </div>
              <p className="font-light">₹{ele.price * ele.quantity}</p>
              </div>))}

              {/* <p className="text-sm font-light">Invoice No : 1020192</p> */}
              <p className="text-sm font-light w-full flex justify-between"><span>Order Placed on {dayjs(item.createdAt).format('DD/MM/YYYY')}</span><span>Total Amount : ₹{item.totalPrice}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
