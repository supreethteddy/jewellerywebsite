import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const pages = [
  {
    id: 1,
    label: "Profile",
    path: "/profile",
  },
  {
    id: 2,
    label: "Wishlist",
    path: "/wishlist",
  },
  {
    id: 3,
    label: "Order History",
    path: "/orders",
  },
  {
    id: 4,
    label: "Address",
    path: "/address",
  },
  {
    id: 5,
    label: "Support 24/7",
    path: "/support",
  },
];

const ProfileLayout = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  pathname = pathname.replace(/\/+$/, "");

  const title = pages.find((page) => page.path === pathname)?.label;
  return (
    <>
      <Header />
      <div className="pt-[5.5rem]">
        <div className="py-[2rem] space-y-5">
          <div className="wrapper flex text-gray-400 font-light text-sm items-center gap-3">
            <Link to="/">Home</Link>|<p>My Account</p>|
            <p className="text-primary">{title || "Account Overview"}</p>
          </div>
          <h1 className="wrapper heading-2">{title || "Account Overview"}</h1>
          <div className="border-t">
            <div className="wrapper mt-5 md:mt-0 grid md:grid-cols-[12rem_auto] gap-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-0 md:flex flex-col">
                {pages.map((page) => (
                  <Link
                    key={page.id}
                    to={page.path}
                    className={`${
                      pathname === page.path && "bg-primary text-white"
                    } py-2 font-light px-4 border-x border-y md:border-t md:first:border-t-0`}
                  >
                    {page.label}
                  </Link>
                ))}
                <button className="py-2 px-4 font-light border text-start" 
                onClick={()=>{             
                localStorage.removeItem("key");
                localStorage.removeItem("user");
                navigate("/")}
                }>
                  Logout
                </button>
              </div>
              <div className="border md:border-l p-5">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileLayout;
