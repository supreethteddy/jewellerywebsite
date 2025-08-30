import React, { useState } from "react";
import {
  earringsItems,
  headerLinks,
  necklaceItems,
  ringsItems,
  smHeaderLinks,
} from "../constant";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiSearch, BiCart, BiUser, BiX } from "react-icons/bi";
import Drawer from "react-modern-drawer";
import { Divide as Hamburger } from "hamburger-react";
import DropDown from "./DropDown";
import { useDebouncedCallback } from "use-debounce";
import apiClient from "../lib/utils";
import CustomImg from "./ui/customImg";
import { addSearchQuery } from "../services/api";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLogedIn] = useState(!!localStorage.getItem("key"));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const [query, setQuery] = useState("");

  const products = necklaceItems.concat(ringsItems, earringsItems);

  const handleSearch = useDebouncedCallback(async (event) => {
    const value = event.target.value;

    if (!value) {
      setFilteredItems([]);
      return;
    }
    const res = await apiClient.get({
      url: `/products/search?name=${value}`,
    });

    // const items = products.filter((product) =>
    //   product.title.toLowerCase().includes(value.toLowerCase())
    // );
    setFilteredItems(res?.products);
  }, 300);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const menu = [
    {
      key: 1,
      content: (
        <Link
          to={"/profile"}
          className={`font-light uppercase text-[.75rem] pb-1 h-full ${
            pathname === "/profile" && "border-b-2 border-primary"
          }`}
        >
          Profile
        </Link>
      ),
    },
    {
      key: 2,
      content: <hr className="py-1" />,
    },
    {
      key: 2,
      content: (
        <button
          to={"/profile"}
          className={`font-light uppercase text-[.75rem]`}
          onClick={() => {
            setIsLogedIn(false);
            localStorage.removeItem("key");
            localStorage.removeItem("user");
            navigate("/");
          }}
        >
          Log Out
        </button>
      ),
    },
  ];

  const cartCount = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")).length
    : 0;

  return (
    <div className="border pb-2 bg-white left-0 top-0 z-[100] fixed w-full">
      <div className="p-2 text-white text-center bg-primary text-[.95rem]">
        Thanks for visiting! Enjoy 15% on all orders | Use Code:{" "}
        <span className="font-semibold tracking-wide">JEWELLO15</span>
      </div>
      <div className="pt-2 wrapper grid grid-cols-[30%_auto] sm:grid-cols-[35%_auto_35%] gap-4 sm:gap-7 lg:items-end items-center lg:pb-2">
        <div className="flex items-end gap-[3rem]">
          <Link className="w-fit" to="/">
            <div className="w-[4rem] md:w-[4rem] md:min-w-[4rem] h-[4rem] md:h-[4rem] md:min-h-[4rem] bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">J</span>
            </div>
          </Link>
          <div className="hidden lg:flex gap-6 h-full">
            {headerLinks.map((link) => (
              <Link
                key={link.name}
                className={`font-light uppercase text-[.75rem] pb-3 h-full ${
                  pathname === link.path && "border-b-2 border-primary"
                }`}
                to={link.path}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <Link
          to="/"
          className="sm:block hidden w-fit mx-auto text-3xl text-primary text-center"
        >
          JEWELLO
        </Link>
        <div className="flex gap-4 sm:gap-6 items-center justify-end lg:pb-2">
          {/* Conditional rendering for Login/Profile */}
          {!isLoggedIn ? (
            <Link
              to="/login"
              title="Login"
              className={`font-light uppercase text-[.75rem]  h-full`}
            >
              Log In{/* <UserRound size={20} /> */}
            </Link>
          ) : (
            // <Link to="/profile" title="Profile">
            <DropDown head={<BiUser size={20} />} content={menu} />
            // </Link>
          )}
          <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <BiSearch size={20} />
          </button>
          <Link to="/cart" title="My Cart" className="relative">
            <BiCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2  w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <div className="block lg:hidden" onClick={toggleDrawer}>
            <Hamburger
              color="black"
              size="20"
              toggled={isOpen}
              rounded
              toggle={setIsOpen}
            />
          </div>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="py-4 px-6 z-10"
      >
        <div className="mb-6 flex items-center justify-end py-[.4rem]">
          <button
            onClick={() => setIsOpen(false)}
            className="text-black text-[2.2rem]"
          >
            <BiX size={30} />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {smHeaderLinks.map(({ name, path }) => (
            <Link
              onClick={() => setIsOpen(false)}
              key={name}
              className="text-3xl text-black font-light transition-colors duration-300"
              to={path}
            >
              {name}
            </Link>
          ))}
        </div>
      </Drawer>

      {/* Search and search results */}
      {isSearchOpen && (
        <div className="fixed top-0 left-0 w-full z-[99] pt-[5.5rem]">
          <div className="wrapper p-4 bg-white">
            <div className="flex items-center gap-3 border border-primary px-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 outline-none"
                onChange={async (e) => {
                  setQuery(e.target.value);
                  await handleSearch(e);
                }}
                value={query}
              />
              <button onClick={() => setIsSearchOpen(false)}>
                <BiX size={20} />
              </button>
            </div>
            {filteredItems.length > 0 && (
              <div className="pt-5 grid grid-cols-1 gap-3 overflow-scroll scrollbar-none max-h-[calc(100vh-15rem)]">
                {filteredItems.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product-details/${item._id}`}
                    onClick={async () => addSearchQuery(query)}
                    className="border border-primary rounded flex items-center gap-3"
                  >
                    <CustomImg
                      src={item?.images[0]}
                      alt={item.name}
                      className="w-[3rem] h-[3rem] object-cover"
                    />
                    <p className="text-sm">{item.name}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
