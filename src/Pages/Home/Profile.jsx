import React, { useState } from "react";
import { MdPerson, MdEdit, MdSave } from "react-icons/md";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Mahin",
    email: "mahin@example.com",
    bloodGroup: "O+",
    district: "Chattogram",
    upazila: "Panchlaish",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);

    console.log("Updated Profile:", profile);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#f8f9fb] px-5 pb-10 pt-24 sm:px-8 lg:px-7 lg:pt-7"
    >
      {/* ================= HEADER ================= */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-[#071b3a] sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-[#466383]">
            View and update your personal information.
          </p>
        </div>

        {!isEditing ? (
          <motion.button
            onClick={handleEdit}
            whileHover={{
              scale: 1.03,
              y: -2,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="flex w-fit items-center gap-2 rounded-xl bg-[#e51e25] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-red-200 transition hover:bg-[#c9181e]"
          >
            <MdEdit size={18} />
            Edit Profile
          </motion.button>
        ) : (
          <motion.button
            onClick={handleSave}
            whileHover={{
              scale: 1.03,
              y: -2,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="flex w-fit items-center gap-2 rounded-xl bg-[#e51e25] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-red-200 transition hover:bg-[#c9181e]"
          >
            <MdSave size={18} />
            Save Changes
          </motion.button>
        )}
      </motion.div>

      {/* ================= PROFILE CARD ================= */}

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.55,
          delay: 0.1,
        }}
        className="overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-sm"
      >
        {/* ================= RED COVER ================= */}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="h-[82px] origin-left bg-gradient-to-r from-[#a9161b] to-[#e51e25]"
        />

        <div className="px-5 pb-10 sm:px-8">
          {/* ================= PROFILE IMAGE ================= */}
          <div className="relative h-[106px] w-[106px]">
            {/* Animated outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
      absolute
      inset-0
      rounded-full
      bg-[conic-gradient(from_0deg,#ef4444,#fca5a5,#fee2e2,#ef4444)]
      p-[3px]
    "
            >
              {/* White gap between ring and image */}
              <div className="h-full w-full rounded-full bg-white p-[3px]">
                <div className="h-full w-full rounded-full bg-red-100" />
              </div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{
                opacity: 0,
                y: -25,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.25,
                type: "spring",
                stiffness: 180,
              }}
              whileHover={{
                scale: 1.06,
              }}
              className="
      absolute
      left-1/2
      top-1/2
      flex
      h-[92px]
      w-[92px]
      -translate-x-1/2
      -translate-y-1/2
      items-center
      justify-center
      overflow-hidden
      rounded-full
      border-4
      border-white
      bg-red-100
      shadow-[0_8px_25px_rgba(229,30,37,0.25)]
    "
            >
              <img
                src={user.photoURL}
                alt={user.displayName || "Profile"}
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Small online indicator */}
            <motion.span
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
      absolute
      bottom-1
      right-1
      z-10
      h-5
      w-5
      rounded-full
      border-[3px]
      border-white
      bg-green-500
      shadow-sm
    "
            />
          </div>

          {/* ================= USER INFORMATION ================= */}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.35,
            }}
            className="mt-4"
          >
            <h2 className="text-2xl font-bold text-[#071b3a]">
              {user.displayName}
            </h2>

            <p className="mt-1 text-xs text-[#466383]">Donor · Active member</p>
          </motion.div>

          {/* ================= FORM ================= */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.4,
                },
              },
            }}
            className="mt-7 grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2"
          >
            {/* Name */}

            <InputField
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
            />

            {/* Email */}

            <InputField
              label="Email"
              name="email"
              value={profile.email}
              disabled={true}
            />

            {/* Blood Group */}

            <SelectField
              label="Blood Group"
              name="bloodGroup"
              value={profile.bloodGroup}
              onChange={handleChange}
              disabled={!isEditing}
              options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
            />

            {/* District */}

            <SelectField
              label="District"
              name="district"
              value={profile.district}
              onChange={handleChange}
              disabled={!isEditing}
              options={[
                "Chattogram",
                "Dhaka",
                "Sylhet",
                "Rajshahi",
                "Khulna",
                "Barishal",
                "Rangpur",
                "Mymensingh",
              ]}
            />

            {/* Upazila */}

            <SelectField
              label="Upazila"
              name="upazila"
              value={profile.upazila}
              onChange={handleChange}
              disabled={!isEditing}
              options={[
                "Panchlaish",
                "Kotwali",
                "Double Mooring",
                "Halishahar",
                "Pahartali",
              ]}
            />
          </motion.div>

          {/* ================= EDITING NOTICE ================= */}

          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-7 overflow-hidden rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              You can update your name, blood group, district, and upazila.
              Email cannot be changed.
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* =========================================
   INPUT FIELD
========================================= */

const InputField = ({ label, name, value, onChange, disabled }) => {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 15,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      transition={{
        duration: 0.35,
      }}
    >
      <label className="mb-2 block text-xs font-semibold text-[#071b3a]">
        {label}
      </label>

      <motion.input
        whileFocus={
          !disabled
            ? {
                scale: 1.01,
              }
            : {}
        }
        transition={{
          duration: 0.2,
        }}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          h-[54px] w-full rounded-xl border px-4 text-sm outline-none
          transition
          ${
            disabled
              ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400"
              : "border-gray-300 bg-white text-gray-800 focus:border-red-500 focus:ring-2 focus:ring-red-100"
          }
        `}
      />
    </motion.div>
  );
};

/* =========================================
   SELECT FIELD
========================================= */

const SelectField = ({ label, name, value, onChange, disabled, options }) => {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 15,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      transition={{
        duration: 0.35,
      }}
    >
      <label className="mb-2 block text-xs font-semibold text-[#071b3a]">
        {label}
      </label>

      <motion.select
        whileFocus={
          !disabled
            ? {
                scale: 1.01,
              }
            : {}
        }
        transition={{
          duration: 0.2,
        }}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          h-[54px] w-full rounded-xl border px-4 text-sm outline-none
          transition
          ${
            disabled
              ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400"
              : "border-gray-300 bg-white text-gray-800 focus:border-red-500 focus:ring-2 focus:ring-red-100"
          }
        `}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </motion.select>
    </motion.div>
  );
};

export default Profile;
