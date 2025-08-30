import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Signup = () => {
  return (
    <div className="pt-[5.5rem]">
      <Header />
      <div className="wrapper py-[4rem]">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <div className="text-blue-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-blue-800 mb-4">Portfolio Website</h1>
            <p className="text-blue-700 mb-6">
              This is a portfolio website showcasing our jewelry collection. 
              Login and account creation are not available as this is for demonstration purposes only.
            </p>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> This website is designed to showcase our jewelry products and design capabilities. 
                It's not a functional e-commerce platform.
              </p>
            </div>
            <div className="mt-6">
              <Link 
                to="/" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Browsing
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
