import React from "react";
import {
  MdBloodtype,
  MdLocationOn,
  MdCalendarToday,
  MdAccessTime,
  MdArrowForward,
} from "react-icons/md";
import { motion } from "framer-motion";
import DonationRequestDetails from "../Pages/Home/DonationRequestDetails";
import { Link, useNavigate } from "react-router";

const DonationRequestCard = ({ request, index = 0}) => {
const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      whileHover={{
        y: -7,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[22px]
        border
        border-gray-100
        bg-white
        shadow-[0_8px_30px_rgba(7,27,58,0.05)]
        transition-all
        duration-300
        hover:border-red-100
        hover:shadow-[0_18px_45px_rgba(229,30,37,0.12)]
      "
    >
      {/* =========================================
          TOP RED ACCENT
      ========================================= */}

      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#991b1b] via-[#e51e25] to-[#f87171]" />

      {/* =========================================
          CARD HEADER
      ========================================= */}

      <div className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-br from-[#fff7f7] via-white to-[#fffafa] px-5 pb-5 pt-6">
        {/* Decorative Blood Icon */}

        <MdBloodtype
          className="
            absolute
            -right-4
            -top-5
            text-[100px]
            text-red-50
            transition-transform
            duration-500
            group-hover:rotate-12
            group-hover:scale-110
          "
        />

        <div className="relative flex items-start justify-between gap-4">
          {/* Recipient */}

          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-500">
                Blood Needed
              </p>
            </div>

            <h2 className="truncate text-xl font-extrabold text-[#071b3a]">
              {request.recipientName}
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Urgent donation request
            </p>
          </div>

          {/* Blood Group */}

          <motion.div
            whileHover={{
              scale: 1.08,
              rotate: 3,
            }}
            className="
              relative
              flex
              h-[62px]
              w-[62px]
              shrink-0
              flex-col
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-[#fee2e2]
              to-[#fecaca]
              shadow-sm
            "
          >
            <MdBloodtype className="text-xl text-red-500" />

            <span className="text-sm font-extrabold text-red-600">
              {request.bloodGroup}
            </span>
          </motion.div>
        </div>

        {/* Status */}

        <div className="relative mt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1.5 text-[10px] font-bold text-yellow-700 ring-1 ring-yellow-100">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
            {request.status || "Pending"}
          </span>
        </div>
      </div>

      {/* =========================================
          CARD BODY
      ========================================= */}

      <div className="p-5">
        {/* Location */}

        <div className="flex items-center gap-3 rounded-xl bg-[#f8f9fb] p-3.5 transition-colors duration-300 group-hover:bg-red-50/50">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
            <MdLocationOn className="text-xl text-blue-500" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              Location
            </p>

            <p className="mt-0.5 truncate text-sm font-bold text-[#29476b]">
              {request.district}, {request.upazila}
            </p>
          </div>
        </div>

        {/* Date & Time */}

        <div className="mt-3 grid grid-cols-2 gap-3">
          <InfoItem
            icon={<MdCalendarToday />}
            label="Date"
            value={request.donationDate}
          />

          <InfoItem
            icon={<MdAccessTime />}
            label="Time"
            value={request.donationTime}
          />
        </div>

        {/* =========================================
            VIEW BUTTON
        ========================================= */}

      <Link to={`/blood_requests_details/${request._id}`}>
        <motion.button
          type="button"
          whileTap={{
            scale: 0.97,
          }}
          className="
            mt-5
            flex
            h-[48px]
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-[#e51e25]
            to-[#c9181e]
            text-sm
            font-bold
            text-white
            shadow-[0_6px_18px_rgba(229,30,37,0.2)]
            transition-all
            duration-300
            hover:shadow-[0_8px_25px_rgba(229,30,37,0.3)]
          "
        >
          View Request

          <MdArrowForward
            className="
              text-lg
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </motion.button>
      </Link>
      </div>
    </motion.div>
  );
};

/* =========================================
   INFO ITEM
========================================= */

const InfoItem = ({ icon, label, value }) => {
  return (
    <div
      className="
        rounded-xl
        border
        border-gray-100
        bg-white
        p-3
        transition
        duration-300
        hover:border-red-100
        hover:bg-red-50/30
      "
    >
      <div className="flex items-center gap-1.5">
        <span className="text-base text-red-400">
          {icon}
        </span>

        <span className="text-[9px] font-bold uppercase tracking-wide text-gray-400">
          {label}
        </span>
      </div>

      <p className="mt-1.5 truncate text-xs font-bold text-[#29476b]">
        {value || "Not specified"}
      </p>
    </div>
  );
};

export default DonationRequestCard;