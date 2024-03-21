import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-800 mb-6 lg:mb-9">Welcome to PayTM</h1>
        <p className="text-gray-600 mb-4 md:mb-6 text-md md:text-lg lg:text-xl text-center">
          The easiest way to pay and manage your finances, and get free credit upto ₹10,000 on Sign up
        </p>
        <div className="flex flex-col md:flex-row justify-center md:space-x-4">
          <Link to="/signup">
            <button className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 focus:outline-none focus:ring focus:border-gray-900 mb-4 md:mb-0 md:mr-4">
              Sign Up
            </button>
          </Link>
          <Link to="/signin">
            <button className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-100 focus:outline-none focus:ring focus:border-gray-500">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
