import React from "react";
import { MdBloodtype } from "react-icons/md";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

const Banner = () => {
  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const leftVariants = {
    hidden: {
      opacity: 0,
      x: -60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const rightVariants = {
    hidden: {
      opacity: 0,
      x: 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-r from-white via-[#fffafa] to-[#fff0f1]">
      {/* ================= HERO ================= */}
      <main
        className="
          mx-auto
          flex
          min-h-[640px]
          max-w-[1200px]
          flex-col
          items-center
          justify-center
          gap-12
          px-5
          py-12

          sm:px-8
          md:gap-16

          lg:flex-row
          lg:justify-between
          lg:gap-20
          lg:px-8
          lg:py-16
        "
      >
        {/* ================= LEFT CONTENT ================= */}
        <motion.section
          className="w-full lg:w-[58%]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#fff3c4]
              px-3
              py-1.5
              text-[10px]
              font-bold
              text-orange-500
              sm:text-[11px]
            "
          >
            <span>💗</span>
            Every Drop Matters
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={leftVariants}
            className="
              mb-5
              text-[44px]
              font-extrabold
              leading-[1.05]
              tracking-[-1.5px]
              text-[#111827]

              sm:text-[52px]
              md:text-[60px]
              lg:text-[68px]
              lg:tracking-[-2px]
            "
          >
            Give Blood.
            <br />
            <span className="text-[#e3262e]">Save Lives.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="
              mb-7
              max-w-[610px]
              text-[15px]
              leading-7
              text-[#52647a]

              sm:text-[16px]
              md:text-[17px]
            "
          >
            Connect with blood donors, find urgent blood requests, and become
            part of a community that helps save lives.
          </motion.p>

          {/* ================= BUTTONS ================= */}
          <motion.div
            variants={itemVariants}
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
            "
          >
            {/* Join Donor */}
            <motion.button
              whileHover={{
                y: -4,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.96,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="
                flex
                h-[52px]
                w-full
                items-center
                justify-center
                rounded-[10px]
                bg-[#e5252a]
                px-6
                text-[15px]
                font-bold
                text-white
                shadow-md
                shadow-red-200
                transition
                duration-200

                hover:bg-[#c91d23]

                sm:w-auto
                sm:text-[16px]
              "
            >
              <span className="mr-2">💧</span>
              <NavLink to="/register">Join as a Donor</NavLink>
            </motion.button>

            {/* Search Donors */}
            <NavLink to="search_donors">
              <motion.button
                whileHover={{
                  y: -4,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
                className="
                  flex
                  h-[52px]
                  w-full
                  items-center
                  justify-center
                  rounded-[10px]
                  border-[1.5px]
                  border-[#e5252a]
                  bg-white
                  px-6
                  text-[15px]
                  font-bold
                  text-[#e5252a]
                  transition
                  duration-200

                  hover:bg-[#fff3f3]

                  sm:w-auto
                  sm:text-[16px]
                "
              >
                <span className="mr-2">🔎</span>
                Search Donors
              </motion.button>
            </NavLink>
          </motion.div>
        </motion.section>

        {/* ================= RIGHT CARD ================= */}
        <motion.section
          variants={rightVariants}
          initial="hidden"
          animate="visible"
          className="
            flex
            h-[380px]
            w-full
            max-w-[505px]
            flex-col
            justify-end
            rounded-[24px]
            bg-white
            px-5
            pb-5
            pt-8
            shadow-[0_20px_50px_rgba(229,38,46,0.08)]

            sm:h-[410px]
            sm:px-7
            sm:pb-7

            md:h-[430px]

            lg:h-[447px]
            lg:px-8
            lg:pb-8
            lg:pt-11
          "
        >
          {/* ================= BLOOD DROP ================= */}
          <motion.div
            className="
              flex
              flex-1
              items-center
              justify-center
            "
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MdBloodtype className="text-[200px] font-bold text-red-500" />
            </motion.div>
          </motion.div>

          {/* ================= ACTIVE DONORS ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.6,
            }}
            whileHover={{
              scale: 1.02,
            }}
            className="
              mb-3
              flex
              h-14
              items-center
              justify-between
              rounded-[10px]
              bg-[#f7f9fb]
              px-4
              text-[14px]

              sm:text-[15px]
              md:text-[16px]
            "
          >
            <span>Active Donors</span>

            <strong className="text-[#ed242b]">2,480+</strong>
          </motion.div>

          {/* ================= LIVES HELPED ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1,
              duration: 0.6,
            }}
            whileHover={{
              scale: 1.02,
            }}
            className="
              flex
              h-14
              items-center
              justify-between
              rounded-[10px]
              bg-[#f7f9fb]
              px-4
              text-[14px]

              sm:text-[15px]
              md:text-[16px]
            "
          >
            <span>Lives Helped</span>

            <strong className="text-[#ed242b]">5,200+</strong>
          </motion.div>
        </motion.section>
      </main>

      {/* ================= FOOTER ================= */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="h-[52px] bg-[#f7f9fb]"
      />
    </div>
  );
};

export default Banner;