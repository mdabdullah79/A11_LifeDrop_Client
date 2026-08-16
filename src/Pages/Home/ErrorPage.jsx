import React from "react";
import {
  MdErrorOutline,
  MdHome,
  MdLogin,
  MdArrowBack,
} from "react-icons/md";
import { NavLink } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fb] px-5">

      <div className="w-full max-w-lg text-center">

        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <MdErrorOutline className="text-6xl text-[#e51e25]" />
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-extrabold tracking-tight text-[#e51e25]">
          500
        </h1>

        {/* Title */}
        <h2 className="mt-3 text-2xl font-bold text-[#071b3a]">
          Something Went Wrong
        </h2>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#466383]">
          We're sorry, but something went wrong while processing
          your request. Please try again later.
        </p>

        {/* Buttons */}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

          {/* Home */}
          <NavLink
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#e51e25] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c9181e]"
          >
            <MdHome size={19} />
            Go to Home
          </NavLink>

          {/* Login */}
          <NavLink
            to="/login"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-[#071b3a] transition hover:border-red-300 hover:bg-red-50 hover:text-[#e51e25]"
          >
            <MdLogin size={19} />
            Login
          </NavLink>

        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mx-auto mt-6 flex items-center gap-2 text-xs font-medium text-[#466383] transition hover:text-[#e51e25]"
        >
          <MdArrowBack size={16} />
          Go Back
        </button>

      </div>

    </div>
  );
};

export default ErrorPage;