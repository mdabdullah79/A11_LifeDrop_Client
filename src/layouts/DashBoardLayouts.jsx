import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  MdDashboard,
  MdBloodtype,
  MdAdd,
  MdSearch,
  MdPeople,
  MdAssignment,
  MdAccountBalanceWallet,
  MdPerson,
  MdLogout,
  MdFavorite,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import useRole from "../hooks/useRole";

const DashBoardLayouts = () => {
  const { role } = useRole();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: MdDashboard,
      path: "/dashboard",
    },
    {
      name: "My Donation Requests",
      icon: MdBloodtype,
      path: "/dashboard/my-donation-requests",
    },
    {
      name: "Create Request",
      icon: MdAdd,
      path: "/dashboard/create-donation-request",
    },
    {
      name: "Search Donors",
      icon: MdSearch,
      path: "/dashboard/search-donors",
    },

    ...(role?.role === "Admin"
      ? [
          {
            name: "All Users",
            icon: MdPeople,
            path: "/dashboard/all-users",
          },
        ]
      : []),

    ...(role?.role === "Admin"
      ? [
          {
            name: "Blood Requests",
            icon: MdAssignment,
            path: "/dashboard/blood-requests",
          },
        ]
      : []),
    {
      name: "Funding",
      icon: MdAccountBalanceWallet,
      path: "/dashboard/funding",
    },
    {
      name: "Profile",
      icon: MdPerson,
      path: "/dashboard/profile",
    },
  ];

  const sidebarVariants = {
    hidden: {
      x: -280,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const menuContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const menuItem = {
    hidden: {
      opacity: 0,
      x: -15,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#071b3a]">
      {/* ================= MOBILE HEADER ================= */}

      <motion.div
        initial={{ y: -70 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-5 lg:hidden"
      >
        <NavLink to="/">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.05 }}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100"
            >
              <MdBloodtype className="text-xl text-red-500" />
            </motion.div>

            <span className="text-lg font-bold">LifeDrop</span>
          </div>
        </NavLink>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          {sidebarOpen ? <MdClose size={25} /> : <MdMenu size={25} />}
        </motion.button>
      </motion.div>

      {/* ================= MOBILE OVERLAY ================= */}

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ================= SIDEBAR ================= */}

      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className={`
          fixed left-0 top-0 z-50 h-screen w-[260px]
          border-r border-gray-200 bg-white
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col px-4 py-7">
          {/* ================= LOGO ================= */}

          <NavLink to="/" onClick={() => setSidebarOpen(false)}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 flex items-center gap-3 px-3"
            >
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: 5,
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100"
              >
                <MdBloodtype className="text-2xl text-red-500" />
              </motion.div>

              <div>
                <h2 className="text-lg font-bold">LifeDrop</h2>

                <p className="text-[10px] text-gray-400">BLOOD DONATION</p>
              </div>
            </motion.div>
          </NavLink>

          {/* ================= MAIN MENU ================= */}

          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-3 px-2 text-[11px] font-bold tracking-widest text-gray-400"
            >
              MAIN MENU
            </motion.p>

            <motion.nav
              variants={menuContainer}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div key={item.name} variants={menuItem}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/dashboard"}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `
                        group flex w-full items-center gap-4
                        rounded-xl px-4 py-3
                        text-sm transition-all duration-200
                        ${
                          isActive
                            ? "bg-red-100 font-medium text-red-600 shadow-sm"
                            : "text-[#29476b] hover:bg-gray-50"
                        }
                        `
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                            }}
                          >
                            <Icon
                              size={18}
                              className={
                                isActive ? "text-red-500" : "text-[#426080]"
                              }
                            />
                          </motion.div>

                          <span>{item.name}</span>

                          {isActive && (
                            <motion.span
                              layoutId="activeMenu"
                              className="ml-auto h-2 w-2 rounded-full bg-red-500"
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                );
              })}
            </motion.nav>
          </div>

          {/* ================= ACCOUNT ================= */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <p className="mb-3 px-2 text-[11px] font-bold tracking-widest text-gray-400">
              ACCOUNT
            </p>

            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm text-[#29476b] transition hover:bg-gray-50"
            >
              <MdLogout size={18} />
              Logout
            </motion.button>
          </motion.div>

          {/* ================= BOTTOM CARD ================= */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.5,
            }}
            className="mt-auto px-3 pb-3"
          >
            <motion.div
              whileHover={{
                scale: 1.02,
                y: -2,
              }}
              className="rounded-xl bg-red-50 p-4"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                >
                  <MdFavorite className="text-lg text-red-500" />
                </motion.div>

                <span className="text-sm font-semibold text-red-600">
                  Save a Life
                </span>
              </div>

              <p className="mt-1 text-xs text-gray-500">
                Every donation matters.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.aside>

      {/* ================= MAIN CONTENT ================= */}

      <motion.main
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.15,
        }}
        className="min-h-screen pt-16 lg:ml-[260px] lg:pt-0"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

/* ================================
   STAT CARD
================================ */

const StatCard = ({ icon, title, value }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-4 rounded-[18px] border border-gray-200 bg-white px-5 py-6"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100">
        {icon}
      </div>

      <div>
        <p className="text-xs text-[#466383]">{title}</p>

        <p className="mt-1 text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
};

/* ================================
   STATUS BADGE
================================ */

const StatusBadge = ({ status, color }) => {
  const colors = {
    yellow: "bg-yellow-100 text-yellow-700",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-semibold ${colors[color]}`}
    >
      {status}
    </motion.span>
  );
};

/* ================================
   ACTIVITY ITEM
================================ */

const ActivityItem = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex gap-3 border-l border-gray-100 pb-6 pl-5 last:pb-0"
    >
      <span className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-red-600" />

      <div className="text-sm leading-6">{children}</div>
    </motion.div>
  );
};

export default DashBoardLayouts;
