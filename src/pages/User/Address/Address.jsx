import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import pincodes from "indian-pincodes";
import { State } from "country-state-city";
import apiClient from "../../../lib/utils";

const Address = () => {
  const [states, setStates] = useState(State.getStatesOfCountry("IN"));

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm();
  const setProfileData=async()=>{
    try {
      const res =await apiClient.get({url:`/profile`})
      if(res.profile){
        setValue('fullName', res?.profile?.fullName)
        setValue('phoneNumber', res?.profile?.phoneNumber)
        setValue('postalCode', res?.profile?.postalCode)
        setValue('address', res?.profile?.address)
        setValue('landmark', res?.profile?.landmark)
        setValue('city', res?.profile?.city)
        setValue('state', res?.profile?.state)
      }
    } catch (error) {
      console.log(error?.data?.message || 'error')
    }}
useEffect(()=>{
    setProfileData();
},[])

  const handleFormSubmit = async(data) => {
    try {
      const res =await apiClient.post({url:`/profile`, data})
      if(res){
        setProfileData();
      }
    } catch (error) {
      console.log(error?.data?.message || 'error')
    }
  };

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <p className="mb-3 text-xl">Shipping Address</p>
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
                    value: /^[0-9]\d{9}$/i,
                    message: "Please enter a valid mobile number",
                  },
                })}
              />
              <small className="text-red-600">{errors.phoneNumber?.message}</small>
            </div>
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
              {...register("landmark", {
                required: "Landmark is required",
                validate: (value) => {
                  if (value.trim() === "") {
                    return "Landmark is required";
                  } else {
                    return true;
                  }
                },
              })}
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
            <div className="">
              <label className="text-[.95rem]">State</label>
              <select
                className="p-2 rounded-md outline-none border-2 w-full"
                name="state"
                id="state"
                {...register("state", { required: "State is required" })}
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
          <button type="submit" className="btn primary-btn">
            Update Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default Address;
