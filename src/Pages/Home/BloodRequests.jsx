import React from "react";
import { MdBloodtype, MdLocationOn, MdCalendarToday, MdAccessTime } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Loading from "../../Components/Loading";
import DonationRequestCard from "../../Components/DonationRequestCard";

const BloodRequests = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: requests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pending-donation-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/donation_requests?status=Pending"
      );

      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fb]">
        <Loading></Loading>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fb] px-5">
        <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <MdBloodtype className="mx-auto text-5xl text-red-500 opacity-70" />

          <h2 className="mt-3 text-xl font-bold text-[#071b3a]">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Unable to load blood donation requests.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] px-5 py-10 sm:px-8 lg:px-10">
      {/* ================= HEADER ================= */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-8 max-w-7xl"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                <MdBloodtype className="text-2xl text-red-500" />
              </div>

              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                Urgent Blood Needs
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#071b3a] sm:text-4xl">
              Blood Donation Requests
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#466383] sm:text-base">
              Find people who currently need blood and help save a life by
              becoming a donor.
            </p>
          </div>

          {/* Request Count */}

          <div className="w-fit rounded-2xl border border-red-100 bg-white px-5 py-3 shadow-sm">
            <p className="text-xs font-medium text-gray-400">
              Pending Requests
            </p>

            <p className="mt-1 text-2xl font-bold text-red-600">
              {requests.length}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ================= REQUESTS ================= */}

      <div className="mx-auto max-w-7xl">
        {requests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm"
          >
            <MdBloodtype className="mx-auto text-6xl text-red-400 opacity-60" />

            <h2 className="mt-4 text-xl font-bold text-[#071b3a]">
              No Pending Requests
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              There are currently no pending blood donation requests.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {requests.map((request, index) => (
              <DonationRequestCard
                key={request._id}
                request={request}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


/* =========================================
   INFO ITEM
========================================= */

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="rounded-xl bg-[#f8f9fb] p-3">
      <div className="flex items-center gap-2 text-gray-400">
        <span className="text-base text-red-400">{icon}</span>

        <span className="text-[10px] font-medium">
          {label}
        </span>
      </div>

      <p className="mt-1 text-xs font-semibold text-[#29476b]">
        {value || "Not specified"}
      </p>
    </div>
  );
};

export default BloodRequests;