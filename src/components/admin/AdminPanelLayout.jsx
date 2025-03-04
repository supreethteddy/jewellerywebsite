import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Home,
  LogOut,
  PackageSearch,
  Shapes,
  ShoppingCart,
  StickyNote,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";


const pages = [
  {
    icon: Home,
    name: "Dashboard",
    path: "/admin",
  },
  {
    icon: PackageSearch,
    name: "Products",
    path: "/admin/products",
  },
  {
    icon: ShoppingCart,
    name: "Orders",
    path: "/admin/orders",
  },
  {
    icon: StickyNote,
    name: "Coupons",
    path: "/admin/coupons",
  },
  {
    icon: Shapes,
    name: "Reports",
    path: "/admin/reports",
  },
  //   {
  //     icon: Wallet,
  //     name: "Withdraw",
  //     path: "/admin/withdraw",
  //   },
];

const AdminPanelLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="md:max-h-[100vh]">
      <div className="grid md:grid-cols-[12rem,1fr]">
        <>
          {/* Sidebar */}
          <div className="relative w-full">
            <div className="md:h-screen bg-[#F6F8F9] fixed left-0 py-[2rem] px-[1rem] hidden md:flex flex-col justify-between gap-1">
              <div className="h-full flex flex-col items-center">
                <h2 className="text-3xl text-primary">SOULSUN</h2>
                <div className="space-y-1 pt-[2rem] w-full">
                  {pages.map((page, index) => (
                    <Link
                      key={index}
                      to={page.path}
                      className={`${
                        pathname === page.path && "bg-[#D7EDFF] text-[#4094F7]"
                      } flex items-center gap-2 w-full py-[.5rem] px-[1.5rem] rounded-md`}
                    >
                      <page.icon
                        size={20}
                        className={`${
                          pathname === page.path
                            ? "text-[#4094F7]"
                            : "text-gray-600"
                        }`}
                      />
                      <span>{page.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <button
                className="flex items-center gap-2 w-full py-[.5rem] px-[1rem] rounded-md"
                onClick={() => {
                  localStorage.removeItem("key");
                  localStorage.removeItem("user");
                  navigate("/admin/login");
                }}
              >
                <LogOut size={20} className="text-gray-600" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
        <div className="h-full overflow-scroll pb-[2rem]">
          <Outlet />
        </div>
      </div>
      {/* mobile bottom nav */}
      <div className="fixed z-20 bottom-0 w-full md:hidden border-t">
        <div className="grid grid-cols-5 gap-2 bg-[#F6F8F9]">
          {pages.map((page, index) => (
            <Link
              key={index}
              to={page.path}
              className={`${
                pathname === page.path && "bg-[#D7EDFF] text-[#4094F7]"
              } flex flex-col gap-1 items-center justify-center w-full min-w-[4.2rem] py-[.5rem]`}
            >
              <page.icon
                size={20}
                className={`${
                  pathname === page.path ? "text-[#4094F7]" : "text-gray-600"
                }`}
              />
              <small>{page.name}</small>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanelLayout;
