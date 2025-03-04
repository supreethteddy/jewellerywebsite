// src/components/NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="wrapper min-h-[calc(100vh-200px)] flex justify-center items-center flex-col gap-5">
        {/* <div style={{ textAlign: "center", padding: "50px" }}> */}
          <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
          <p>The page you are looking for doesn't exist.</p>
          <Link to="/" className="bg-primary px-5 py-2 rounded-lg text-white">
            Go back to Home
          </Link>
        {/* </div> */}
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
