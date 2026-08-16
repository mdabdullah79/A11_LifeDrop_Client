import React from "react";
import {
  MdBloodtype,
  MdAdd,
  MdFavorite,
  MdVolunteerActivism,
} from "react-icons/md";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const requests = [
    {
      name: "Rahim Ahmed",
      location: "Chattogram",
      blood: "O+",
      date: "12 Aug",
      status: "Pending",
      color: "yellow",
    },
    {
      name: "Nusrat Jahan",
      location: "Dhaka",
      blood: "A+",
      date: "13 Aug",
      status: "In Progress",
      color: "blue",
    },
    {
      name: "Karim Hasan",
      location: "Sylhet",
      blood: "B-",
      date: "15 Aug",
      status: "Done",
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#071b3a]">
      <div className="px-5 pb-10 pt-7 sm:px-8 lg:px-7">

        {/* ================= HEADER ================= */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your blood donation activities.
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/dashboard/create-donation-request")
            }
            className="flex w-fit items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <MdAdd size={19} />
            Create Request
          </button>
        </div>

        {/* ================= WELCOME BANNER ================= */}

        <section className="relative mb-6 overflow-hidden rounded-[20px] bg-gradient-to-r from-[#e51e25] to-[#a9161b] px-7 py-12 text-white sm:px-8">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold sm:text-[25px]">
              Welcome back, {user?.displayName || "User"}!
            </h2>

            <p className="mt-2 max-w-xl text-sm text-white/90">
              Thank you for being part of the LifeDrop community.
              Every donation can save a life.
            </p>
          </div>

          <MdBloodtype
            className="
              absolute
              right-12
              top-1/2
              hidden
              -translate-y-1/2
              text-[90px]
              text-white/10
              lg:block
            "
          />
        </section>

        {/* ================= STATISTICS ================= */}

        <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">

          <StatCard
            icon={
              <MdBloodtype className="text-3xl text-pink-500" />
            }
            title="My Requests"
            value="12"
          />

          <StatCard
            icon={
              <MdFavorite className="text-3xl text-pink-500" />
            }
            title="Successful Donations"
            value="8"
          />

          <StatCard
            icon={
              <MdVolunteerActivism className="text-3xl text-orange-400" />
            }
            title="Lives Helped"
            value="8+"
          />

        </section>

        {/* ================= BOTTOM CONTENT ================= */}

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(330px,1fr)]">

          {/* ================= REQUESTS ================= */}

          <div className="overflow-hidden rounded-[18px] border border-gray-200 bg-white">

            <div className="flex items-center justify-between px-5 py-6">
              <h3 className="font-bold">
                Recent Donation Requests
              </h3>

              <button
                onClick={() =>
                  navigate("/dashboard/my-donation-requests")
                }
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                View All →
              </button>
            </div>

            {/* Desktop */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">

                <thead>
                  <tr className="border-b border-gray-200 text-left text-[10px] font-semibold uppercase text-[#466383]">

                    <th className="px-8 pb-3">
                      Recipient
                    </th>

                    <th className="px-4 pb-3">
                      Location
                    </th>

                    <th className="px-4 pb-3">
                      Blood
                    </th>

                    <th className="px-4 pb-3">
                      Date
                    </th>

                    <th className="px-4 pb-3">
                      Status
                    </th>

                    <th className="px-4 pb-3">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {requests.map((request) => (
                    <tr
                      key={request.name}
                      className="border-b border-gray-100 last:border-0"
                    >

                      {/* Recipient */}

                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100">
                            <MdBloodtype className="text-lg text-red-500" />
                          </div>

                          <div>
                            <p className="text-sm font-semibold">
                              {request.name}
                            </p>

                            <p className="text-[10px] text-gray-400">
                              Recipient
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm">
                        {request.location}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium text-red-600">
                        {request.blood}
                      </td>

                      <td className="px-4 py-4 text-sm">
                        {request.date}
                      </td>

                      <td className="px-4 py-4">
                        <StatusBadge
                          status={request.status}
                          color={request.color}
                        />
                      </td>

                      <td className="px-4 py-4">
                        <button className="rounded-lg bg-red-100 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-200">
                          View
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* Mobile */}

            <div className="space-y-3 px-4 pb-5 md:hidden">
              {requests.map((request) => (
                <div
                  key={request.name}
                  className="rounded-xl border border-gray-100 p-4"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                        <MdBloodtype className="text-xl text-red-500" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          {request.name}
                        </p>

                        <p className="text-xs text-gray-400">
                          {request.location}
                        </p>
                      </div>

                    </div>

                    <span className="font-semibold text-red-600">
                      {request.blood}
                    </span>

                  </div>

                  <div className="mt-4 flex items-center justify-between">

                    <span className="text-sm">
                      {request.date}
                    </span>

                    <StatusBadge
                      status={request.status}
                      color={request.color}
                    />

                    <button className="rounded-lg bg-red-100 px-3 py-2 text-xs font-semibold text-red-600">
                      View
                    </button>

                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* ================= RECENT ACTIVITY ================= */}

          <div className="rounded-[18px] border border-gray-200 bg-white">

            <div className="px-5 py-6">
              <h3 className="font-bold">
                Recent Activity
              </h3>
            </div>

            <div className="px-5 pb-6">

              <ActivityItem>
                You created a blood request for{" "}
                <strong>Rahim Ahmed.</strong>
                <span className="block text-xs text-gray-400">
                  2 hours ago
                </span>
              </ActivityItem>

              <ActivityItem>
                Your donation status changed to{" "}
                <strong>In Progress.</strong>
                <span className="block text-xs text-gray-400">
                  Yesterday
                </span>
              </ActivityItem>

              <ActivityItem>
                Donation successfully completed.
                <span className="block text-xs text-gray-400">
                  3 days ago
                </span>
              </ActivityItem>

            </div>
          </div>

        </section>
      </div>
    </div>
  );
};

/* ================================
   STAT CARD
================================ */

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="flex items-center gap-4 rounded-[18px] border border-gray-200 bg-white px-5 py-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100">
        {icon}
      </div>

      <div>
        <p className="text-xs text-[#466383]">
          {title}
        </p>

        <p className="mt-1 text-2xl font-bold">
          {value}
        </p>
      </div>

    </div>
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
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-semibold ${colors[color]}`}
    >
      {status}
    </span>
  );
};

/* ================================
   ACTIVITY ITEM
================================ */

const ActivityItem = ({ children }) => {
  return (
    <div className="relative flex gap-3 border-l border-gray-100 pb-6 pl-5 last:pb-0">

      <span className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-red-600" />

      <div className="text-sm leading-6">
        {children}
      </div>

    </div>
  );
};

export default Dashboard;