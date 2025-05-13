import React from 'react';
import errorImg from '../assets/error.png';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white text-gray-800">
      <img
        src={errorImg}
        alt="Page not found"
        className="w-1/2 md:w-full max-w-min mb-8"
      />
      <h1 className="text-xl md:text-4xl font-bold mb-4">
        Oops! Page Not Found
      </h1>
      <p className="md:text-lg mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <button className="bg-red-400 hover:bg-red-500 text-white font-semibold px-3 py-2 md:px-6 md:py-3 rounded-lg transition-all shadow-md cursor-pointer">
          Return to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
