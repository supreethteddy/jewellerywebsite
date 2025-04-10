import React, { useState } from "react";
import { ActionButton } from "../../../components/Button";
import { useForm } from "react-hook-form";
import pincodes from "indian-pincodes";

import { State, City } from "country-state-city";
import toast from "react-hot-toast";
import { displayRazorpay } from "./razorpay";
import apiClient from "../../../lib/utils";

const ShippingAddress = ({ total, setCartItems }) => {
  const [states, setStates] = useState(State.getStatesOfCountry("IN"));
  const [cities, setCities] = useState(City.getCitiesOfState("IN", "KL"));
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // const handleStateChange = (val) => {
  //   setValue("state", val);
  //   const selectedState = State.getStatesOfCountry("IN").find(
  //     (state) => state.name === val
  //   );
  //   setCities(City.getCitiesOfState("IN", selectedState.isoCode));
  // };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      pincode: "",
      address: "",
      landmark: "",
      city: "",
      state: "",
    },
  });

  const handleFormSubmit = async (data) => {
    const token = localStorage.getItem("key");
    if (!token) {
      data.name = data.fullName;
      const res = await apiClient.post({
        url: "/auth/signin-guest-user",
        data,
        showToast: true,
      });
      if (res?.data?.token) {
        const newToken = res.data.token;
        localStorage.setItem("key", newToken);
      }
    }

    displayRazorpay(total, reset, setCartItems, data);
    // toast.success("Order Placed");
    // reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h2 className="uppercase text-xl mb-1">Shipping Address</h2>
        <p className="mb-3 animate_color">
          Estimated Delivery: 3-6 Business Days
        </p>
        <div className="flex flex-col gap-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="">
              <label className="text-[.95rem]">
                Full name (First and Last name)
              </label>
              <input
                type="text"
                className="p-2 rounded-md outline-none border-2 w-full"
                {...register("fullName", {
                  required: "Name is required",
                  validate: (value) => {
                    if (value.trim() === "") {
                      return "Name is required";
                    } else {
                      return true;
                    }
                  },
                })}
              />
              <small className="text-red-600">{errors.fullName?.message}</small>
            </div>
            <div className="">
              <label className="text-[.95rem]">Mobile number</label>
              <input
                type="tel"
                className="p-2 rounded-md outline-none border-2 w-full"
                {...register("phoneNumber", {
                  required: "Mobile is required",
                  pattern: {
                    value: /^[1-9]\d{9}$/i,
                    message: "Please enter a valid mobile number",
                  },
                })}
              />
              <small className="text-red-600">
                {errors.phoneNumber?.message}
              </small>
            </div>
          </div>
          <div className="">
            <label className="text-[.95rem]">Email</label>
            <input
              type="email"
              className="p-2 rounded-md outline-none border-2 w-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            <small className="text-red-600">{errors.email?.message}</small>
          </div>

          <div className="">
            <label className="text-[.95rem]">Pincode</label>
            <input
              type="text"
              className="p-2 rounded-md outline-none border-2 w-full"
              placeholder="6 digit [0-9] pincode"
              maxLength={6}
              minLength={6}
              {...register("postalCode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Please enter a valid ZIP or postal code",
                },
                validate: (val) => {
                  const details = pincodes.getPincodeDetails(Number(val));
                  if (details) {
                    setValue("city", details.division);
                    setValue("state", details.state);
                    setError("city", null);
                    setError("state", null);
                    return true;
                  } else {
                    return "Please enter a valid ZIP or postal code";
                  }
                },
              })}
            />
            <small className="text-red-600">{errors.postalCode?.message}</small>
          </div>
          <div className="">
            <label className="text-[.95rem]">Address</label>
            <input
              type="text"
              className="p-2 rounded-md outline-none border-2 w-full"
              {...register("address", {
                required: "Address is required",
                validate: (value) => {
                  if (value.trim() === "") {
                    return "Address is required";
                  } else {
                    return true;
                  }
                },
              })}
            />
            <small className="text-red-600">{errors.address?.message}</small>
          </div>
          <div className="">
            <label className="text-[.95rem]">Landmark</label>
            <input
              type="text"
              className="p-2 rounded-md outline-none border-2 w-full"
              {...register("landmark")}
            />
            <small className="text-red-600">{errors.landmark?.message}</small>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="">
              <label className="text-[.95rem]">Town/City</label>
              <input
                type="text"
                className="p-2 rounded-md outline-none border-2 w-full"
                {...register("city", {
                  required: "City is required",
                })}
              />
              <small className="text-red-600">{errors.city?.message}</small>
            </div>
            {/* <div className="">
              <label className="text-[.95rem]">Town/City</label>
              <select
                className="p-2 rounded-md outline-none border-2 w-full"
                name="city"
                id="city"
                {...register("city", { required: true })}
              >
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="">
              <label className="text-[.95rem]">State</label>
              <select
                className="p-2 rounded-md outline-none border-2 w-full"
                name="state"
                id="state"
                {...register("state", { required: "State is required" })}
                // onChange={(e) => handleStateChange(e.target.value)}
              >
                <option defaultValue="" value="">
                  Select State
                </option>
                {states.map((state) => (
                  <option key={state.name} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              <small className="text-red-600">{errors.state?.message}</small>
            </div>
          </div>
          <ActionButton
            type="submit"
            className={"bg-black text-white text-center rounded-md"}
          >
            Proceed to Checkout
          </ActionButton>
        </div>
      </form>
    </>
  );
};

export default ShippingAddress;
