import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { MdBloodtype, MdSearch } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const SearchDonors = () => {
  const { register, handleSubmit } = useForm();

  const axiosSecure = useAxiosSecure();

  const [searchData, setSearchData] = useState(null);

  const {
    data: donors = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["donors", searchData],
    enabled: !!searchData,

    queryFn: async () => {
      const res = await axiosSecure.get("/donors/search", {
        params: searchData,
      });

      return res.data;
    },
  });

  const handleSearch = (data) => {
    setSearchData(data);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] px-5 py-7 sm:px-7">
      {/* HEADER */}
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-[#071b3a]">Search Donors</h1>

        <p className="mt-1 text-sm text-[#466383]">
          Find active donors by blood group and location.
        </p>
      </div>

      {/* SEARCH FORM */}
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="relative overflow-hidden rounded-2xl border border-red-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-50/70" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-36 w-36 rounded-full bg-red-50/40" />

        <div className="relative grid grid-cols-1 items-end gap-5 md:grid-cols-[1fr_1fr_1fr_auto]">
          {/* Blood Group */}
          <div>
            <label className="mb-2.5 flex items-center gap-2 text-xs font-bold text-[#071b3a]">
              <span className="h-2 w-2 rounded-full bg-[#e51e25]" />
              Blood Group
            </label>

            <select
              {...register("bloodGroup")}
              className="h-[48px] w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50/70 px-4 text-sm font-medium text-gray-700 shadow-sm outline-none transition-all duration-200 hover:border-red-200 hover:bg-white focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-50"
            >
              <option value="">All</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* District */}
          <div>
            <label className="mb-2.5 flex items-center gap-2 text-xs font-bold text-[#071b3a]">
              <span className="h-2 w-2 rounded-full bg-[#e51e25]" />
              District
            </label>

            <select
              {...register("district")}
              className="h-[48px] w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50/70 px-4 text-sm font-medium text-gray-700 shadow-sm outline-none transition-all duration-200 hover:border-red-200 hover:bg-white focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-50"
            >
              <option value="">All</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Khulna">Khulna</option>
              <option value="Barishal">Barishal</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label className="mb-2.5 flex items-center gap-2 text-xs font-bold text-[#071b3a]">
              <span className="h-2 w-2 rounded-full bg-[#e51e25]" />
              Upazila
            </label>

            <select
              {...register("upazila")}
              className="h-[48px] w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50/70 px-4 text-sm font-medium text-gray-700 shadow-sm outline-none transition-all duration-200 hover:border-red-200 hover:bg-white focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-50"
            >
              <option value="">All</option>
              <option value="Panchlaish">Panchlaish</option>
              <option value="Kotwali">Kotwali</option>
              <option value="Double Mooring">Double Mooring</option>
              <option value="Halishahar">Halishahar</option>
              <option value="Pahartali">Pahartali</option>
            </select>
          </div>

          {/* Search */}
          <button
            type="submit"
            className="group flex h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#e51e25] to-[#c9181e] px-7 text-sm font-bold text-white shadow-md shadow-red-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-200 active:translate-y-0 active:scale-[0.98]"
          >
            <MdSearch
              size={21}
              className="transition-transform duration-200 group-hover:scale-110"
            />

            <span>{isFetching ? "Searching..." : "Search"}</span>
          </button>
        </div>
      </form>

      {/* RESULTS */}
      <div className="mt-8">
        {isLoading || isFetching ? (
          <div className="py-10 text-center text-gray-500">
            Searching donors...
          </div>
        ) : searchData && donors.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <h3 className="font-semibold text-gray-700">No donors found</h3>

            <p className="mt-1 text-sm text-gray-500">
              Try another blood group or location.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="group overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Top Red Section */}
                <div className="relative bg-gradient-to-r from-[#991B1B] to-[#e51e25] px-5 py-5 text-white">
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10" />
                  <div className="absolute -bottom-10 right-10 h-20 w-20 rounded-full bg-white/5" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Blood Icon */}
                      <motion.div
                        animate={{
                          y: [0, -5, 0],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <MdBloodtype
                          className="
                            text-5xl
                            text-red-500
                            opacity-70
                            drop-shadow-[0_5px_10px_rgba(229,30,37,0.3)]
                            "
                        />
                      </motion.div>

                      <div>
                        <h3 className="text-lg font-bold">{donor.name}</h3>

                        <p className="text-xs text-red-100">Blood Donor</p>
                      </div>
                    </div>

                    {/* Blood Group */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-extrabold text-[#c9181e] shadow-md">
                      {donor.bloodGroup}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  {/* Location */}
                  <div className="mb-4 rounded-xl bg-red-50 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">
                      Location
                    </p>

                    <div className="flex items-center gap-2 text-sm font-semibold text-[#071b3a]">
                      <span className="text-lg">📍</span>

                      <span>
                        {donor.upazila}, {donor.district}
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                      ✉️
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                        Email
                      </p>

                      <p className="truncate text-sm font-medium text-gray-700">
                        {donor.email}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-4 border-t border-gray-100" />

                  {/* Bottom */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Available
                    </span>

                    <button
                      className="rounded-xl bg-[#e51e25] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#c9181e] hover:shadow-md active:scale-95"
                      onClick={() => console.log("Contact:", donor.email)}
                    >
                      Contact Donor
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDonors;
