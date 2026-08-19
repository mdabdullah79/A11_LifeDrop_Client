import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdBloodtype,
  MdPerson,
  MdEmail,
  MdLocationOn,
  MdLocalHospital,
  MdHome,
  MdCalendarToday,
  MdAccessTime,
  MdDescription,
  MdClose,
  MdVolunteerActivism,
} from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);

  const {
    data: request = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation_requests_datails/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] px-5 py-10 lg:ml-[260px]">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="h-40 rounded-3xl bg-gray-200" />

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="h-52 rounded-2xl bg-gray-200" />
            <div className="h-52 rounded-2xl bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !request._id) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] px-5 pb-12 pt-24 sm:px-8 lg:px-7 lg:pt-7">
        <div className="text-center">
          <MdBloodtype className="mx-auto text-6xl text-red-200" />

          <h2 className="mt-3 text-xl font-bold text-gray-700">
            Request Not Found
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            This donation request could not be found.
          </p>
        </div>
      </div>
    );
  }

  const handleDonate = () => {
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] px-5 pb-12 pt-24 sm:px-8 lg:px-7 lg:pt-7">
      <div className="mx-auto max-w-5xl">
        {/* ================= HEADER ================= */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
              <MdBloodtype className="text-3xl text-red-500" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#071b3a] sm:text-3xl">
                Donation Request Details
              </h1>

              <p className="mt-1 text-sm text-[#466383]">
                Help {request.recipientName} by donating blood.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ================= MAIN CARD ================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
        >
          {/* ================= TOP BANNER ================= */}

          <div className="relative overflow-hidden bg-gradient-to-r from-[#991b1b] via-[#dc2626] to-[#ef4444] px-6 py-8 text-white sm:px-8">
            {/* Decorative circles */}

            <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/10" />

            <div className="absolute -bottom-20 right-24 h-48 w-48 rounded-full bg-white/5" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[2px] text-red-100">
                  Blood Needed For
                </p>

                <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                  {request.recipientName}
                </h2>

                <div className="mt-3 flex items-center gap-2 text-sm text-red-100">
                  <MdLocationOn />
                  {request.district}, {request.upazila}
                </div>
              </div>

              {/* Blood Group */}

              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-3xl bg-white shadow-xl"
              >
                <MdBloodtype className="text-3xl text-red-500" />

                <span className="mt-1 text-2xl font-black text-red-600">
                  {request.bloodGroup}
                </span>
              </motion.div>
            </div>
          </div>

          {/* ================= CONTENT ================= */}

          <div className="p-6 sm:p-8">
            {/* Status */}

            <div className="mb-7 flex items-center justify-between rounded-2xl bg-yellow-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />

                <span className="text-sm font-semibold text-yellow-700">
                  Donation Request Status
                </span>
              </div>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                {request.status || "Pending"}
              </span>
            </div>

            {/* ================= INFORMATION GRID ================= */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <InfoCard
                icon={<MdPerson />}
                title="Recipient Name"
                value={request.recipientName}
              />

              <InfoCard
                icon={<MdBloodtype />}
                title="Blood Group"
                value={request.bloodGroup}
                blood
              />

              <InfoCard
                icon={<MdLocationOn />}
                title="Location"
                value={`${request.district}, ${request.upazila}`}
              />

              <InfoCard
                icon={<MdLocalHospital />}
                title="Hospital"
                value={request.hospitalName}
              />

              <InfoCard
                icon={<MdHome />}
                title="Full Address"
                value={request.fullAddress}
              />

              <InfoCard
                icon={<MdCalendarToday />}
                title="Donation Date"
                value={request.donationDate}
              />

              <InfoCard
                icon={<MdAccessTime />}
                title="Donation Time"
                value={request.donationTime}
              />

              <InfoCard
                icon={<MdEmail />}
                title="Requester Email"
                value={request.requesterEmail}
              />
            </div>

            {/* ================= MESSAGE ================= */}

            <div className="mt-5 rounded-2xl border border-red-100 bg-[#fffafa] p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100">
                  <MdDescription className="text-xl text-red-500" />
                </div>

                <h3 className="font-bold text-[#071b3a]">Request Message</h3>
              </div>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                {request.message}
              </p>
            </div>

            {/* ================= DONATE BUTTON ================= */}

            <motion.button
              whileHover={{
                scale: request.status === "In Progress" ? 1 : 1.01,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (request.status === "In Progress") {
                  Swal.fire({
                    title: "Already In Progress",
                    text: "This donation request has already been accepted by a donor.",
                    icon: "info",
                    confirmButtonColor: "#e51e25",
                    confirmButtonText: "Okay",
                  });
                  return;
                }

                handleDonate();
              }}
              className={`mt-7 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-bold text-white shadow-lg transition ${
                request.status === "In Progress"
                  ? "cursor-not-allowed bg-gray-400 shadow-gray-200"
                  : "bg-[#e51e25] shadow-red-200 hover:bg-[#c9181e]"
              }`}
            >
              <MdVolunteerActivism className="text-xl" />

              {request.status === "In Progress"
                ? "Donation In Progress"
                : "Donate Now"}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ================= DONATION MODAL ================= */}

      <AnimatePresence>
        {showModal && (
          <DonationModal
            request={request}
            user={user}
            axiosSecure={axiosSecure}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* =========================================
   INFORMATION CARD
========================================= */

const InfoCard = ({ icon, title, value, blood }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#fafbfc] p-4 transition hover:border-red-100 hover:shadow-md"
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          blood ? "bg-red-100" : "bg-gray-100"
        }`}
      >
        <span
          className={`text-xl ${blood ? "text-red-500" : "text-[#466383]"}`}
        >
          {icon}
        </span>
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-medium text-gray-400">{title}</p>

        <p className="mt-1 truncate text-sm font-bold text-[#29476b]">
          {value}
        </p>
      </div>
    </motion.div>
  );
};

/* =========================================
   DONATION MODAL
========================================= */

const DonationModal = ({ request, user, axiosSecure, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirmDonation = async () => {
    console.log(request._id);

    try {
      setLoading(true);

      const updateInfo = {
        status: "In Progress",
        donorName: user?.displayName,
        donorEmail: user?.email,
      };

      const statusRes = await axiosSecure.patch(
        `update_donation_request/${request._id}`,
        updateInfo,
      );

      console.log(statusRes.data);

      if (statusRes.data.modifiedCount > 0) {
        await Swal.fire({
          title: "Donation Confirmed!",
          text: "You have successfully accepted this blood donation request.",
          icon: "success",
          confirmButtonColor: "#e51e25",
          confirmButtonText: "Done",
        });

        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Donation failed:", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to confirm the donation. Please try again.",
        icon: "error",
        confirmButtonColor: "#e51e25",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 250 }}
        className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* Modal Header */}

        <div className="relative bg-gradient-to-r from-[#991b1b] to-[#e51e25] px-6 py-6 text-white">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 transition hover:bg-white/10"
          >
            <MdClose size={22} />
          </button>

          <MdVolunteerActivism className="text-4xl" />

          <h2 className="mt-2 text-xl font-bold">Confirm Donation</h2>

          <p className="mt-1 text-xs text-red-100">
            Your information will be shared with the requester.
          </p>
        </div>

        {/* Modal Body */}

        <div className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-xs font-semibold text-[#071b3a]">
              Donor Name
            </label>

            <input
              value={user?.displayName || ""}
              readOnly
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-[#071b3a]">
              Donor Email
            </label>

            <input
              value={user?.email || ""}
              readOnly
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500 outline-none"
            />
          </div>

          <div className="rounded-xl bg-red-50 p-4 text-xs leading-5 text-red-600">
            By confirming, you agree to donate blood for{" "}
            <strong>{request.recipientName}</strong>.
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirmDonation}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#e51e25] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#c9181e] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              <MdVolunteerActivism />

              {loading ? "Confirming..." : "Confirm Donation"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DonationRequestDetails;
