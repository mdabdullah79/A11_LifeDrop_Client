import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImEye } from "react-icons/im";
import { MdBloodtype } from "react-icons/md";
import { TbEyeClosed } from "react-icons/tb";
import { useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function Register() {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();

  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const data = useLoaderData();

  const [selectedDistrict, setSelectedDistrict] = useState("");

  const districts = [...new Set(data.map((item) => item.district))];

  const filteredUpazilas = data.filter(
    (item) => item.district === selectedDistrict,
  );

  const handleRegister = (data) => {
    console.log(data);
    const profileImage = data.photo?.[0]; // Get the first file from the FileList

    registerUser(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User registered:", user);

        axiosSecure
          .post("/users", {
            email: data.email,
            name: data.name,
            bloodGroup: data.bloodGroup,
            district: data.district,
            upazila: data.upazila,
            role: "Donor", // Set the role as "user" for registered users
            status: "Active", // Set the status as "active" for registered users
          })
          .then((response) => {
            console.log("User added to database:", response.data);
          })
          .catch((error) => {
            console.error("Error adding user to database:", error);
          });

        //name update in firebase
        const userProfile = {
          displayName: data.name,
        };

        //3. Update the user name in firebase
        updateUserProfile(userProfile)
          .then(() => {
            console.log("User profile updated successfully");
          })
          .catch((error) => {
            console.error("Error updating user profile:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error registering user:", errorCode, errorMessage);
      });

    //1. store the image in form data
    const formdata = new FormData();
    formdata.append("image", profileImage);

    //2. Upload the image to imgbb
    const imgbbApiKey = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_imagebb_api_key}`;
    console.log("API KEY:", import.meta.env.VITE_imagebb_api_key);

    axios
      .post(imgbbApiKey, formdata)
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
        const userProfile = {
          photoURL: response.data.data.url,
        };

        //3. Update the user profile in firebase with the uploaded image URL
        updateUserProfile(userProfile)
          .then(() => {
            console.log("User profile updated successfully");
          })
          .catch((error) => {
            console.error("Error updating user profile:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error registering user:", errorCode, errorMessage);
        console.log("STATUS:", error.response?.status);
        console.log("IMG BB RESPONSE:", error.response?.data);
        console.log("MESSAGE:", error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-[#fffafa] to-[#fff0f1]">
      {/* Main */}
      <main className="flex min-h-screen items-center justify-center px-5 py-10">
        {/* Register Card */}
        <div
          className="
            w-full max-w-[460px]
            rounded-[24px]
            bg-white
            px-6 py-8
            shadow-[0_20px_60px_rgba(229,38,46,0.10)]

            sm:px-10
            sm:py-9
          "
        >
          {/* ================= LOGO ================= */}
          <div className="mb-4 flex justify-center">
            <div
              className="
                flex h-14 w-14
                items-center justify-center
                rounded-full
                bg-[#fff1f3]
              "
            >
              <MdBloodtype className="text-5xl text-red-500 font-bold shadow-base-100" />
            </div>
          </div>

          {/* ================= HEADING ================= */}
          <div className="text-center">
            <h1
              className="
                text-3xl
                font-extrabold
                tracking-tight
                text-[#111827]
                sm:text-[34px]
              "
            >
              Create Account
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#64748b]">
              Join our community and help save lives.
            </p>
          </div>

          {/* ================= DIVIDER ================= */}
          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#e5e7eb]" />

            <span className="text-xs font-medium text-[#94a3b8]">OR</span>

            <div className="h-px flex-1 bg-[#e5e7eb]" />
          </div>

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="grid grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#1f2937]
                "
                >
                  Full Name
                </label>

                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="
                  h-[50px]
                  w-full
                  rounded-[10px]
                  border
                  border-[#d9dee7]
                  px-4
                  text-sm
                  outline-none
                  transition

                  placeholder:text-[#9ca3af]

                  focus:border-[#e5252a]
                  focus:ring-2
                  focus:ring-[#e5252a]/10
                "
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#1f2937]
                "
                >
                  Email Address
                </label>

                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="
                  h-[50px]
                  w-full
                  rounded-[10px]
                  border
                  border-[#d9dee7]
                  px-4
                  text-sm
                  outline-none
                  transition

                  placeholder:text-[#9ca3af]

                  focus:border-[#e5252a]
                  focus:ring-2
                  focus:ring-[#e5252a]/10
                "
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Photo */}
              <div className="mb-4">
                <label
                  htmlFor="photo"
                  className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#1f2937]
                "
                >
                  Photo
                </label>
                <input
                  {...register("photo", {
                    required: "Please select a profile image",
                    validate: {
                      fileType: (files) =>
                        files?.[0]?.type?.startsWith("image/") ||
                        "Please select an image file",
                      fileSize: (files) =>
                        files?.[0]?.size <= 2 * 1024 * 1024 ||
                        "Image must be less than 2MB",
                    },
                  })}
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="file-input"
                />

                {errors.photo && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.photo.message}
                  </p>
                )}
              </div>
              {/*  */}
              <div className="mb-4">
                <label
                  htmlFor="bloodGroup"
                  className="mb-2 block text-sm font-semibold text-[#1f2937]"
                >
                  Blood Group
                </label>

                <select
                  id="bloodGroup"
                  {...register("bloodGroup", {
                    required: "Please select your blood group",
                  })}
                  className="h-[50px] w-full rounded-[10px] border border-[#d9dee7] px-4 text-sm outline-none focus:border-[#e5252a] focus:ring-2 focus:ring-[#e5252a]/10"
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>

                {errors.bloodGroup && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.bloodGroup.message}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label className="mb-2 block font-semibold">District</label>

                <select
                  {...register("district", {
                    required: "Please select a district",
                  })}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);

                    // Reset upazila when district changes
                    setValue("upazila", "");
                  }}
                  className="h-[50px] w-full rounded-[10px] border border-[#d9dee7] px-4 text-sm outline-none focus:border-[#e5252a] focus:ring-2 focus:ring-[#e5252a]/10"
                >
                  <option value="">Select District</option>

                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>

                {errors.district && (
                  <p className="text-sm text-red-500">
                    {errors.district.message}
                  </p>
                )}
              </div>

              {/* Upazila */}
              <div>
                <label className="mb-2 block font-semibold">Upazila</label>

                <select
                  {...register("upazila", {
                    required: "Please select an upazila",
                  })}
                  disabled={!selectedDistrict}
                  className="h-[50px] w-full rounded-[10px] border border-[#d9dee7] px-4 text-sm outline-none focus:border-[#e5252a] focus:ring-2 focus:ring-[#e5252a]/10"
                >
                  <option value="">
                    {selectedDistrict
                      ? "Select Upazila"
                      : "Select District First"}
                  </option>

                  {filteredUpazilas.map((item) => (
                    <option key={item.upazila} value={item.upazila}>
                      {item.upazila}
                    </option>
                  ))}
                </select>

                {errors.upazila && (
                  <p className="text-sm text-red-500">
                    {errors.upazila.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#1f2937]
                "
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    required
                    className="
                    h-[50px]
                    w-full
                    rounded-[10px]
                    border
                    border-[#d9dee7]
                    px-4
                    pr-12
                    text-sm
                    outline-none
                    transition

                    placeholder:text-[#9ca3af]

                    focus:border-[#e5252a]
                    focus:ring-2
                    focus:ring-[#e5252a]/10
                  "
                  />

                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-lg
                    text-[#64748b]
                    hover:text-[#e5252a]
                  "
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-2">
                <label
                  htmlFor="confirmPassword"
                  className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#1f2937]
                "
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value == password || "Passwords do not match",
                    })}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    required
                    className="
                    h-[50px]
                    w-full
                    rounded-[10px]
                    border
                    border-[#d9dee7]
                    px-4
                    pr-12
                    text-sm
                    outline-none
                    transition

                    placeholder:text-[#9ca3af]

                    focus:border-[#e5252a]
                    focus:ring-2
                    focus:ring-[#e5252a]/10
                  "
                  />

                  {errors.confirmPassword && (
                    <p>{errors.confirmPassword.message}</p>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-lg
                    text-[#64748b]
                    hover:text-[#e5252a]
                  "
                  >
                    {showConfirmPassword ? <TbEyeClosed /> : <ImEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="mt-4 flex items-start gap-2">
              <input
                type="checkbox"
                required
                className="
                  mt-1
                  h-4
                  w-4
                  accent-[#e5252a]
                "
              />

              <p className="text-xs leading-5 text-[#64748b]">
                I agree to the{" "}
                <button
                  type="button"
                  className="font-semibold text-[#e5252a] hover:underline"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="font-semibold text-[#e5252a] hover:underline"
                >
                  Privacy Policy
                </button>
              </p>
            </div>

            {/* Create Account */}
            <button
              type="submit"
              className="
                mt-5
                h-[50px]
                w-full
                rounded-[10px]
                bg-[#e5252a]
                text-[15px]
                font-bold
                text-white
                transition

                hover:-translate-y-0.5
                hover:bg-[#c91d23]
                hover:shadow-lg
              "
            >
              Create Account
            </button>
          </form>

          {/* ================= LOGIN ================= */}
          <p className="mt-6 text-center text-sm text-[#64748b]">
            Already have an account?
            <button
              type="button"
              className="
                ml-1
                font-bold
                text-[#e5252a]
                hover:underline
              "
            >
              Sign In
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Register;
