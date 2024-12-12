import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
      <p className="text-2xl font-semibold text-gray-600 mt-4">
        Oops! Page not found
      </p>
      <p className="text-gray-500 mt-2">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 text-white bg-black hover:bg-blue-700 hover:text-white rounded-md shadow-lg transition"
      >
        Back to Home
      </a>
    </div>
  );
}
