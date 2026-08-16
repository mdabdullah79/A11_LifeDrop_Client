import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiDonateBlood } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { MdBloodtype } from "react-icons/md";
import { Navigate, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const navigate =useNavigate();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-[#fffafa] to-[#fff0f1]">
      {/* Main */}
      <main className="flex min-h-screen items-center justify-center px-5 py-10">
        {/* Login Card */}
        <div
          className="
            w-full max-w-[460px]
            rounded-[24px]
            bg-white
            px-6 py-8
            shadow-[0_20px_60px_rgba(229,38,46,0.10)]

            sm:px-10
            sm:py-10
          "
        >
          {/* Logo / Blood Drop */}
          <div className="mb-5 flex justify-center">
            <div
              className="
                flex h-16 w-16
                items-center justify-center
                rounded-full
                bg-[#fff1f3]
              "
            >
              <MdBloodtype className="text-5xl text-red-500 font-bold shadow-base-100" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1
              className="
                text-3xl
                font-extrabold
                tracking-tight
                text-[#111827]

                sm:text-[36px]
              "
            >
              Welcome Back
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#64748b]">
              Sign in to continue helping save lives.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
            {/* Email */}
            <div className="mb-5">
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
                {...register("email")}
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="
                  h-[52px]
                  w-full
                  rounded-[10px]
                  border
                  border-[#d9dee7]
                  bg-white
                  px-4
                  text-sm
                  text-[#111827]
                  outline-none
                  transition

                  placeholder:text-[#9ca3af]

                  focus:border-[#e5252a]
                  focus:ring-2
                  focus:ring-[#e5252a]/10
                "
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="
                    text-sm
                    font-semibold
                    text-[#1f2937]
                  "
                >
                  Password
                </label>

                <button
                  type="button"
                  className="
                    text-xs
                    font-semibold
                    text-[#e5252a]
                    hover:underline
                  "
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <input
                  {...register("password", { required: true, minLength: 6 })}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="
                    h-[52px]
                    w-full
                    rounded-[10px]
                    border
                    border-[#d9dee7]
                    bg-white
                    px-4
                    pr-12
                    text-sm
                    text-[#111827]
                    outline-none
                    transition

                    placeholder:text-[#9ca3af]

                    focus:border-[#e5252a]
                    focus:ring-2
                    focus:ring-[#e5252a]/10
                  "
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="text-red-500 text-sm">
                    Password is required
                  </span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span className="text-red-500 text-sm">
                    Password must be at least 6 characters
                  </span>
                )}

                {/* Show Password */}
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

            {/* Login Button */}
            <button
              type="submit"
              className="
                mt-6
                h-[52px]
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
              Sign In
            </button>
          </form>

          {/* Register */}
          <p className="mt-7 text-center text-sm text-[#64748b]">
            Don't have an account?
            <button
              className="
                ml-1
                font-bold
                text-[#e5252a]
                hover:underline
              "
            >
              <NavLink to="/register">Create Account</NavLink>
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
