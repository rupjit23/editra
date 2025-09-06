// assets/Components/Pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../HomePageComponents/Navbar"; // adjust the path if needed

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      {/* Navbar at the top */}
      <Navbar />

      {/* Content */}
      <div className="flex flex-col flex-grow items-center justify-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition"
        >
          Go back Home
        </Link>
      </div>
    </div>
  );
}
