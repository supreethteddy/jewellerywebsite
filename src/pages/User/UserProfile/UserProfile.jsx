import React, { useRef, useState, useEffect } from "react";
import apiClient from "../../../lib/utils";
// Convert DD:MM:YYYY to YYYY-MM-DD for input field
const formatDateForInput = (dateString) => {
  if (!dateString || typeof dateString !== "string") {
    return ""; // Return an empty string for invalid input
  }
  const [day, month, year] = dateString?.split(" - ");
  return `${year}-${month}-${day}`;
};

// Convert YYYY-MM-DD back to DD:MM:YYYY
const formatDateForState = (dateString) => {
  if (!dateString || typeof dateString !== "string") {
    return ""; // Return an empty string for invalid input
  }
  const [year, month, day] = dateString?.split("-");
  return `${day} - ${month} - ${year}`;
};

const UserProfile = () => {
  const dateInputRef = useRef(null);
  // const [profile, setProfile] = useState(null);

  const [profile, setProfile] = useState({
    fullName: "",
    phoneNumber: "",
    city:"",
    address:"",
    state:"",
    postalCode:"",
    landmark:"",
    dob:""
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleDateChange = (e) => {
    const inputDate = e.target.value; // Will be in YYYY-MM-DD format
    setProfile({ ...profile, dob: formatDateForState(inputDate) });
  };
    const user = localStorage.getItem('user')
    let email=''
    if(user){
      email=JSON.parse(user)?.email
    }
    const setProfileData=async()=>{
      try {
        const res =await apiClient.get({url:`/profile`})
        setProfile(res?.profile)
      } catch (error) {
        console.log(error?.data?.message || 'error')
      }}
  useEffect(()=>{
      setProfileData();
  },[])

  const handleSave =async()=>{
    setIsEditing(false)
    try {
    const res =await apiClient.post({url:`/profile`, data:profile})
    if(res){
      setProfileData();
    }
  } catch (error) {
    console.log(error?.data?.message || 'error')
  }
  }
  return (
    <div className="border border-primary">
      <div className="w-full h-[2.5rem] bg-primary"></div>
      <form className="p-5">
        <div className="flex items-center justify-between gap-5">
          <p className="text-xl">Personal Information</p>
          {isEditing ? (
            <button
              type="submit"
              onClick={handleSave}
              className="text-[.8rem] p-2 tracking-widest hover:-translate-y-1 transition-all duration-300 border border-primary text-sm hover:bg-primary hover:text-white"
            >
              Save
            </button>
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="cursor-pointer text-[.8rem] p-2 tracking-widest hover:-translate-y-1 transition-all duration-300 border border-primary text-sm hover:bg-primary hover:text-white"
            >
              Edit
            </div>
          )}
        </div>
        <div className="w-full pt-3 space-y-3">
          <div className="">
            <div className="grid gap-2 sm:gap-0 sm:grid-cols-[15rem_1rem_auto] items-center p-2 border">
              <p>Name</p>
              <div className="sm:block hidden">:</div>
              <div className="">
                {isEditing ? (
                  <input
                    type="text"
                    value={profile?.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                    className="border sm:border-none outline-none bg-slate-100 w-full px-2 py-1"
                  />
                ) : (
                  <p>{profile?.fullName}</p>
                )}
              </div>
            </div>
          </div>
          <div className="">
            <div className="grid gap-2 sm:gap-0 sm:grid-cols-[15rem_1rem_auto] items-center p-2 border">
              <p>Email</p>
              <div className="sm:block hidden">:</div>
              <div className="">
                  <p>{email}</p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="grid gap-2 sm:gap-0 sm:grid-cols-[15rem_1rem_auto] items-center p-2 border">
              <p>Phone Number</p>
              <div className="sm:block hidden">:</div>
              <div className="">
                {isEditing ? (
                  <input
                    type="text"
                    value={profile?.phoneNumber}
                    onChange={(e) =>
                      setProfile({ ...profile, phoneNumber: e.target.value })
                    }
                    className="border sm:border-none outline-none bg-slate-100 w-full px-2 py-1"
                  />
                ) : (
                  <p>{profile?.phoneNumber}</p>
                )}
              </div>
            </div>
          </div>
          <div className="">
            <div className="grid gap-2 sm:gap-0 sm:grid-cols-[15rem_1rem_auto] items-center p-2 border">
              <p>Date of Birth</p>
              <div className="sm:block hidden">:</div>
              <div className="">
                {isEditing ? (
                  <>
                    <p
                      onClick={() => dateInputRef.current.showPicker()}
                      className="bg-slate-100 w-full px-2 py-1"
                    >
                      {formatDateForInput(profile?.dob)}
                    </p>
                    <input
                      ref={dateInputRef}
                      type="date"
                      hidden
                      value={profile?.dob?formatDateForInput(profile?.dob):""}
                      onChange={handleDateChange}
                      className="border sm:border-none outline-none bg-slate-100 w-full px-2 py-1"
                    />
                  </>
                ) : (
                  <p>{profile?.dob}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
