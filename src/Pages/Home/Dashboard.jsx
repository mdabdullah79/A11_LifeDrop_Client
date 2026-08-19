import React, { useState } from "react";
import {
  MdBloodtype,
  MdAdd,
  MdFavorite,
  MdVolunteerActivism,
  MdOutlineCancel,
  MdFileDownloadDone,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["recent-donation-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation_requests/recent/${user.email}`,
      );

      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e51e25",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/donation_requests/${id}`);
      console.log("Delete response:", res.data);

      if (res.data.deletedCount === 1) {
        await Swal.fire({
          title: "Deleted!",
          text: "Donation request has been deleted successfully.",
          icon: "success",
          confirmButtonColor: "#e51e25",
        });
        refetch();
      } else {
        Swal.fire({
          title: "Not Found!",
          text: "The donation request could not be found.",
          icon: "warning",
          confirmButtonColor: "#e51e25",
        });
      }
    } catch (error) {
      console.error("Delete failed:", error);
      console.error("Server response:", error.response?.data);

      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to delete the donation request.",
        icon: "error",
        confirmButtonColor: "#e51e25",
      });
    }
  };
  const [loading, setLoading] = useState(false);

  const handleStatus = async (id, status) => {
    console.log(id, status);

    try {
      setLoading(true);

      const updateInfo = {
        status: status,
      };

      const statusRes = await axiosSecure.patch(
        `update_donation_request/${id}`,
        updateInfo,
      );

      console.log(statusRes.data);

      if (statusRes.data.modifiedCount > 0) {
        await Swal.fire({
          title: "Status Updated!",
          text:
            status === "Done"
              ? "The donation request has been marked as completed."
              : "The donation request has been cancelled.",
          icon: "success",
          confirmButtonColor: "#e51e25",
          confirmButtonText: "Done",
        });

        window.location.reload();
      }
    } catch (error) {
      console.error("Status update failed:", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to update the donation request. Please try again.",
        icon: "error",
        confirmButtonColor: "#e51e25",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  //   const requests = [
  //     {
  //       name: "Rahim Ahmed",
  //       location: "Chattogram",
  //       blood: "O+",
  //       date: "12 Aug",
  //       status: "Pending",
  //       color: "yellow",
  //     },
  //     {
  //       name: "Nusrat Jahan",
  //       location: "Dhaka",
  //       blood: "A+",
  //       date: "13 Aug",
  //       status: "In Progress",
  //       color: "blue",
  //     },
  //     {
  //       name: "Karim Hasan",
  //       location: "Sylhet",
  //       blood: "B-",
  //       date: "15 Aug",
  //       status: "Done",
  //       color: "green",
  //     },
  //   ];

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#071b3a]">
      <div className="px-5 pb-10 pt-7 sm:px-8 lg:px-7">
        {/* ================= HEADER ================= */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your blood donation activities.
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard/create-donation-request")}
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
              Thank you for being part of the LifeDrop community. Every donation
              can save a life.
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
            icon={<MdBloodtype className="text-3xl text-pink-500" />}
            title="My Requests"
            value={requests.length}
          />

          <StatCard
            icon={<MdFavorite className="text-3xl text-pink-500" />}
            title="Successful Donations"
            value="8"
          />

          <StatCard
            icon={<MdVolunteerActivism className="text-3xl text-orange-400" />}
            title="Lives Helped"
            value="8+"
          />
        </section>

        {/* ================= BOTTOM CONTENT ================= */}

        <section className="grid grid-cols-1 gap-5">
          {/* ================= REQUESTS ================= */}

          <div className="overflow-hidden rounded-[18px] border border-gray-200 bg-white p-2">
            <div className="flex items-center justify-between px-5 py-6">
              <h3 className="font-bold">Recent Donation Requests</h3>
              <NavLink to="/dashboard/my-donation-requests">
                <button className="text-sm font-medium text-red-600 hover:text-red-700">
                  View All →
                </button>
              </NavLink>
            </div>

            {/* Desktop */}

            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white p-5">
              <table className="w-full min-w-[900px] border-collapse">
                {/* ================= TABLE HEADER ================= */}
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-3 pb-4 text-left text-[10px] font-semibold uppercase text-[#466383]">
                      Requester
                    </th>

                    <th className="px-3 pb-4 text-left text-[10px] font-semibold uppercase text-[#466383]">
                      Recipient
                    </th>

                    <th className="px-3 pb-4 text-left text-[10px] font-semibold uppercase text-[#466383]">
                      Location
                    </th>

                    <th className="px-3 pb-4 text-left text-[10px] font-semibold uppercase text-[#466383]">
                      Blood
                    </th>

                    <th className="px-3 pb-4 text-left text-[10px] font-semibold uppercase text-[#466383]">
                      Date
                    </th>

                    <th className="px-3 pb-4 text-left text-[10px] font-semibold uppercase text-[#466383]">
                      Status
                    </th>

                    <th className="px-3 pb-4 text-left text-[10px] font-semibold uppercase text-[#466383]">
                      Donor
                    </th>
                    <th className="px-3 pb-4 text-left text-[10px] font-semibold uppercase text-[#466383]">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* ================= TABLE BODY ================= */}
                <tbody>
                  {requests.length > 0 ? (
                    requests.map((request) => (
                      <tr
                        key={request._id}
                        className="border-b border-gray-100 last:border-0 transition hover:bg-gray-50/70"
                      >
                        {/* ================= REQUESTER ================= */}
                        <td className="px-3 py-4">
                          <div>
                            {/* Requester */}
                            <p className="text-xs font-semibold text-[#071b3a]">
                              {request.requesterName}
                            </p>

                            <p className="mt-0.5 text-[10px] text-gray-400">
                              {request.requesterEmail}
                            </p>
                          </div>
                        </td>

                        {/* ================= RECIPIENT ================= */}
                        <td className="px-3 py-4">
                          <p className="text-xs font-semibold text-[#071b3a]">
                            {request.recipientName}
                          </p>
                        </td>

                        {/* ================= LOCATION ================= */}
                        <td className="px-3 py-4">
                          <p className="text-xs font-medium text-[#071b3a]">
                            {request.district}
                          </p>

                          <p className="mt-0.5 text-[10px] text-gray-400">
                            {request.upazila}
                          </p>
                        </td>

                        {/* ================= BLOOD ================= */}
                        <td className="px-3 py-4">
                          <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                            {request.bloodGroup}
                          </span>
                        </td>

                        {/* ================= DATE ================= */}
                        <td className="px-3 py-4">
                          <p className="text-xs font-medium text-[#071b3a]">
                            {request.donationDate}
                          </p>

                          <p className="mt-0.5 text-[10px] text-gray-400">
                            {request.donationTime}
                          </p>
                        </td>

                        {/* ================= STATUS ================= */}
                        <td className="px-3 py-4">
                          <StatusBadge status={request.status} />
                        </td>

                        {/* ================= DONOR ================= */}
                        {request.status === "In Progress" ||
                        request.status === "Done" ? (
                          // ================= DONOR INFORMATION =================
                          <div
                            className={`m-3 rounded-xl border p-2 ${
                              request.status === "In Progress"
                                ? "border-blue-100 bg-blue-50"
                                : "border-green-100 bg-green-50"
                            }`}
                          >
                            <div className="mb-1.5 flex items-center gap-1.5">
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  request.status === "In Progress"
                                    ? "bg-blue-500"
                                    : "bg-green-500"
                                }`}
                              />

                              {request.status === "In Progress" ? (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600">
                                  Donor Assigned
                                </span>
                              ) : (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-green-600">
                                  Donation Completed
                                </span>
                              )}
                            </div>

                            <p className="text-[11px] font-bold text-[#071b3a]">
                              {request.donorName || "Unknown Donor"}
                            </p>

                            <p className="mt-0.5 text-[10px] text-gray-500">
                              {request.donorEmail || "No email available"}
                            </p>
                          </div>
                        ) : request.status === "Pending" ? (
                          // ================= PENDING =================
                          <div className="m-3 rounded-xl border border-yellow-100 bg-gradient-to-r from-yellow-50 to-orange-50 p-3">
                            <div className="flex items-center gap-2">
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-100">
                                <span className="text-sm">⏳</span>
                              </div>

                              <div>
                                <p className="text-[9px] font-bold uppercase tracking-wider text-yellow-700">
                                  Waiting for Donor
                                </p>

                                <p className="mt-0.5 text-[10px] text-gray-500">
                                  Your request is waiting for someone to donate.
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : request.status === "Cancelled" ? (
                          // ================= CANCELLED =================
                          <div className="m-3 rounded-xl border border-red-100 bg-gradient-to-r from-red-50 to-gray-50 p-3">
                            <div className="flex items-center gap-2">
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100">
                                <span className="text-sm">✕</span>
                              </div>

                              <div>
                                <p className="text-[9px] font-bold uppercase tracking-wider text-red-600">
                                  Request Cancelled
                                </p>

                                <p className="mt-0.5 text-[10px] text-gray-500">
                                  This donation request is no longer active.
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {/* ================= ACTIONS ================= */}
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-1.5">
                            {/* In Progress Actions */}
                            {request.status === "In Progress" && (
                              <>
                                {/* Done */}
                                <button
                                  onClick={() =>
                                    handleStatus(request._id, "Done")
                                  }
                                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-600 transition hover:bg-green-200"
                                  title="Complete Donation"
                                >
                                  <MdFileDownloadDone size={18} />
                                </button>

                                {/* Cancel */}
                                <button
                                  onClick={() =>
                                    handleStatus(request._id, "Canceled")
                                  }
                                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600 transition hover:bg-red-200"
                                  title="Cancel Donation"
                                >
                                  <MdOutlineCancel size={18} />
                                </button>
                              </>
                            )}

                            {/* Edit */}
                            <NavLink
                              to={`/dashboard/update-donation-request/${request._id}`}
                            >
                              <button
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition hover:bg-blue-200"
                                title="Edit"
                              >
                                <FaEdit size={16} />
                              </button>
                            </NavLink>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(request._id)}
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-red-100 hover:text-red-600"
                              title="Delete"
                            >
                              <MdOutlineDeleteOutline size={19} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-12 text-center">
                        <div className="flex flex-col items-center">
                          <MdBloodtype className="text-4xl text-gray-300" />

                          <p className="mt-2 text-sm font-semibold text-gray-500">
                            No donation requests found
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            Your donation requests will appear here.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
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
                        <p className="text-sm font-semibold">{request.name}</p>

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
                    <span className="text-sm">{request.date}</span>

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

          {/* <div className="rounded-[18px] border border-gray-200 bg-white">
            <div className="px-5 py-6">
              <h3 className="font-bold">Recent Activity</h3>
            </div>

            <div className="px-5 pb-6">
              <ActivityItem>
                You created a blood request for <strong>Rahim Ahmed.</strong>
                <span className="block text-xs text-gray-400">2 hours ago</span>
              </ActivityItem>

              <ActivityItem>
                Your donation status changed to <strong>In Progress.</strong>
                <span className="block text-xs text-gray-400">Yesterday</span>
              </ActivityItem>

              <ActivityItem>
                Donation successfully completed.
                <span className="block text-xs text-gray-400">3 days ago</span>
              </ActivityItem>
            </div>
          </div> */}
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
        <p className="text-xs text-[#466383]">{title}</p>

        <p className="mt-1 text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

/* ================================
   STATUS BADGE
================================ */

const StatusBadge = ({ status }) => {
  const statusStyle = {
    Pending: "bg-yellow-100 text-yellow-600",

    "In Progress": "bg-blue-100 text-blue-600",

    Done: "bg-green-100 text-green-600",

    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`
        inline-flex rounded-full px-3 py-1.5
        text-[10px] font-semibold
        ${statusStyle[status] || "bg-gray-100 text-gray-600"}
      `}
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

      <div className="text-sm leading-6">{children}</div>
    </div>
  );
};

export default Dashboard;
