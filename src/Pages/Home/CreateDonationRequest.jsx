import React from "react";
import { useForm } from "react-hook-form";
import { MdBloodtype } from "react-icons/md";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router";

const CreateDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      requesterName: user?.displayName || "",
      requesterEmail: user?.email || "",
      recipientName: "",
      bloodGroup: "",
      district: "",
      upazila: "",
      hospitalName: "",
      fullAddress: "",
      donationDate: "",
      donationTime: "",
      message: "",
    },
  });

const onSubmit = async (data) => {
  const result = await Swal.fire({
    title: "Submit Donation Request?",
    text: "Please confirm that you want to submit this blood donation request.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#e51e25",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Submit",
    cancelButtonText: "Cancel",
  });

  // User clicked Cancel
  if (!result.isConfirmed) return;

  try {
    const response = await axiosSecure.post("/donation_requests", {
      ...data,
      status: "Pending",
      donarName:"",
      donarEmail:"",
    });

    if (response.data.insertedId) {
      Swal.fire({
        title: "Request Submitted!",
        text: "Your donation request has been submitted successfully.",
        icon: "success",
        confirmButtonColor: "#e51e25",
      });
      navigate("/dashboard/my-donation-requests");
    }
  } catch (error) {
    console.error("Error submitting donation request:", error);

    Swal.fire({
      title: "Submission Failed!",
      text:
        error.response?.data?.message ||
        "Something went wrong while submitting your donation request.",
      icon: "error",
      confirmButtonColor: "#e51e25",
    });
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#f8f9fb] py-7 px-5 pb-10 pt-24 sm:px-8 lg:px-7 lg:pt-7"
    >
      {/* ================= HEADER ================= */}

      <motion.div
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5"
      >
        <h1 className="text-2xl font-bold text-[#071b3a] sm:text-3xl">
          Create Donation Request
        </h1>

        <p className="mt-1 text-xs text-[#466383]">
          Provide the information needed for a blood donation request.
        </p>
      </motion.div>

      {/* ================= FORM CARD ================= */}

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.15,
        }}
        className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
      >
        {/* ==============================
            REQUESTER INFORMATION
        ============================== */}

        <SectionTitle>
          Requester Information
        </SectionTitle>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            label="Requester Name"
            name="requesterName"
            placeholder="Requester name"
            register={register}
            errors={errors}
            validation={{
              required: "Requester name is required",
            }}
          />

          <FormInput
            label="Requester Email"
            name="requesterEmail"
            type="email"
            placeholder="example@gmail.com"
            register={register}
            errors={errors}
            validation={{
              required: "Requester email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            }}
          />
        </div>

        {/* ==============================
            RECIPIENT INFORMATION
        ============================== */}

        <SectionTitle>
          Recipient Information
        </SectionTitle>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            label="Recipient Name"
            name="recipientName"
            placeholder="Recipient name"
            register={register}
            errors={errors}
            validation={{
              required: "Recipient name is required",
            }}
          />

          <FormSelect
            label="Blood Group"
            name="bloodGroup"
            register={register}
            errors={errors}
            validation={{
              required: "Please select blood group",
            }}
            options={[
              "A+",
              "A-",
              "B+",
              "B-",
              "AB+",
              "AB-",
              "O+",
              "O-",
            ]}
          />

          <FormSelect
            label="District"
            name="district"
            register={register}
            errors={errors}
            validation={{
              required: "Please select district",
            }}
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

          <FormSelect
            label="Upazila"
            name="upazila"
            register={register}
            errors={errors}
            validation={{
              required: "Please select upazila",
            }}
            options={[
              "Panchlaish",
              "Kotwali",
              "Double Mooring",
              "Halishahar",
              "Pahartali",
            ]}
          />

          <FormInput
            label="Hospital Name"
            name="hospitalName"
            placeholder="Hospital name"
            register={register}
            errors={errors}
            validation={{
              required: "Hospital name is required",
            }}
          />

          <FormInput
            label="Full Address"
            name="fullAddress"
            placeholder="Full address line"
            register={register}
            errors={errors}
            validation={{
              required: "Address is required",
            }}
          />

          <FormInput
            label="Donation Date"
            name="donationDate"
            type="date"
            register={register}
            errors={errors}
            validation={{
              required: "Donation date is required",
            }}
          />

          <FormInput
            label="Donation Time"
            name="donationTime"
            type="time"
            register={register}
            errors={errors}
            validation={{
              required: "Donation time is required",
            }}
          />
        </div>

        {/* ==============================
            REQUEST MESSAGE
        ============================== */}

        <SectionTitle>
          Request Message
        </SectionTitle>

        <label className="mb-1 block text-[10px] font-semibold text-[#071b3a]">
          Why is blood needed?
        </label>

        <motion.textarea
          whileFocus={{
            scale: 1.005,
          }}
          transition={{
            duration: 0.2,
          }}
          {...register("message", {
            required: "Please provide a reason",
            minLength: {
              value: 10,
              message: "Message should be at least 10 characters",
            },
          })}
          rows={4}
          placeholder="Write the reason and any important details..."
          className={`
            w-full resize-y rounded-lg border px-3 py-3
            text-sm outline-none transition
            ${
              errors.message
                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            }
          `}
        />

        {errors.message && (
          <p className="mt-1 text-xs text-red-500">
            {errors.message.message}
          </p>
        )}

        {/* ==============================
            SUBMIT
        ============================== */}

        <motion.button
          type="submit"
          whileHover={{
            scale: 1.03,
            y: -2,
          }}
          whileTap={{
            scale: 0.96,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          className="mt-4 flex items-center gap-2 rounded-lg bg-[#e51e25] px-4 py-3 text-xs font-semibold text-white shadow-sm shadow-red-200 transition hover:bg-[#c9181e]"
        >
          <motion.span
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <MdBloodtype size={17} />
          </motion.span>

          Submit Donation Request
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

/* =========================================
   SECTION TITLE
========================================= */

const SectionTitle = ({ children }) => {
  return (
    <motion.h2
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-1 mt-3 text-sm font-bold text-[#071b3a] first:mt-0"
    >
      {children}
    </motion.h2>
  );
};

/* =========================================
   INPUT COMPONENT
========================================= */

const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  errors,
  validation,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <label className="mb-1 block text-[10px] font-semibold text-[#071b3a]">
        {label}
      </label>

      <motion.input
        whileFocus={{
          scale: 1.01,
        }}
        transition={{
          duration: 0.2,
        }}
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        className={`
          h-[40px] w-full rounded-lg border px-3
          text-sm outline-none transition
          ${
            errors[name]
              ? "border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
          }
        `}
      />

      {errors[name] && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-[11px] text-red-500"
        >
          {errors[name].message}
        </motion.p>
      )}
    </motion.div>
  );
};

/* =========================================
   SELECT COMPONENT
========================================= */

const FormSelect = ({
  label,
  name,
  register,
  errors,
  validation,
  options,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <label className="mb-1 block text-[10px] font-semibold text-[#071b3a]">
        {label}
      </label>

      <motion.select
        whileFocus={{
          scale: 1.01,
        }}
        transition={{
          duration: 0.2,
        }}
        {...register(name, validation)}
        className={`
          h-[40px] w-full rounded-lg border
          bg-white px-3 text-sm outline-none transition
          ${
            errors[name]
              ? "border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
          }
        `}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </motion.select>

      {errors[name] && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-[11px] text-red-500"
        >
          {errors[name].message}
        </motion.p>
      )}
    </motion.div>
  );
};

export default CreateDonationRequest;