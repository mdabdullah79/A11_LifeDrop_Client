import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { MdPerson, MdMoreHoriz } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { user } = useAuth();
  console.log(user);
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (users) => {
    const roleInfo = { role: "Admin" };
    Swal.fire({
      title: `Are you sure make Admin ${users.name}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axiosSecure.patch(`users/${users._id}`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
          }
        });
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied)
        Swal.fire("Changes are not saved", "", "info");
    });
  };

  const handleMakeDonor = (users) => {
    const roleInfo = { role: "Donor" };
    axiosSecure.patch(`users/${users._id}`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "User Marked as Donor",
          icon: "success",
          draggable: true,
        });
      }
    });
  };

  const handleMakeVolunteer = (users) => {
    const roleInfo = { role: "Volunteer" };
    Swal.fire({
      title: `Are you sure make Volunteer ${users.name}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axiosSecure.patch(`users/${users._id}`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
          }
        });
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied)
        Swal.fire("Changes are not saved", "", "info");
    });
  };

  const handleStatus = (user) => {
    const status =
      user.status === "Active" ? { status: "Blocked" } : { status: "Active" };

    Swal.fire({
      title: `Are you sure you want to ${
        user.status === "Active" ? "block" : "activate"
      } this user?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user._id}`, status)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();

              Swal.fire({
                title: "Success!",
                text: `User is now ${
                  status.status === "Active" ? "Active" : "Blocked"
                }.`,
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error(error);

            Swal.fire({
              title: "Error!",
              text: "Failed to update user status.",
              icon: "error",
            });
          });
      }
    });
  };

  const [statusFilter, setStatusFilter] = useState("Active");
  const [search, setSearch] = useState("");

  const sampleusers = [
    {
      id: 1,
      name: "Mahin",
      email: "mahin@example.com",
      role: "Donor",
      type: "Donor",
      status: "Active",
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      email: "nusrat@example.com",
      role: "Volunteer",
      type: "Volunteer",
      status: "Active",
    },
  ];

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;

    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-7 px-5 pb-10 pt-24 sm:px-8 lg:px-7 lg:pt-7">
      {/* ================= HEADER ================= */}
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-[#071b3a]">
          All Users: {users.length}
        </h1>

        <p className="mt-1 text-sm text-[#466383]">
          Manage donors, volunteers and administrators.
        </p>
      </div>

      {/* ================= FILTER ================= */}
      <div className="mb-5 flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center">
        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-[38px] w-fit rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none focus:border-red-400"
        >
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
          <option value="All">All</option>
        </select>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="h-[40px] w-full rounded-lg border border-gray-200 px-4 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100 sm:w-[172px]"
        />
      </div>

      {/* ================= USERS TABLE ================= */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white p-5">
        <table className="w-full min-w-[750px] border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-2 pb-4 text-left text-[10px] font-semibold uppercase text-[#466383]">
                User
              </th>

              <th className="px-2 pb-4 text-left text-[10px] font-semibold uppercase text-[#466383]">
                Email
              </th>

              <th className="px-2 pb-4 text-left text-[10px] font-semibold uppercase text-[#466383]">
                Role
              </th>

              <th className="px-2 pb-4 text-left text-[10px] font-semibold uppercase text-[#466383]">
                Status
              </th>

              <th className="px-2 pb-4 text-left text-[10px] font-semibold uppercase text-[#466383]">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  {/* USER */}
                  <td className="px-2 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                        <MdPerson size={18} className="text-[#49317c]" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-[#071b3a]">
                          {user.name}
                        </p>

                        <p className="mt-1 text-[9px] text-[#466383]">
                          {user.type}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="px-2 py-4 text-xs text-[#071b3a]">
                    {user.email}
                  </td>

                  {/* ROLE */}
                  <td className="px-2 py-4 text-xs text-[#071b3a]">
                    {user.role}
                  </td>

                  {/* STATUS */}
                  <td className="px-2 py-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-2 py-4">
                    <button
                      type="button"
                      className="flex h-6 w-8 items-center justify-center rounded-lg bg-red-100 text-black transition hover:bg-red-200"
                      onClick={() => console.log("Selected:", user)}
                    >
                      <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn">
                          <MdMoreHoriz size={20} />
                        </div>
                        <ul
                          tabIndex="-1"
                          className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm"
                        >
                          {user.role !== "Admin" ? (
                            <li>
                              <a onClick={() => handleMakeAdmin(user)}>
                                Make Admin
                              </a>
                            </li>
                          ) : (
                            <li>
                              <a onClick={() => handleMakeDonor(user)}>
                                Remove From Admin
                              </a>
                            </li>
                          )}
                          {user.role === "Donor" ? (
                            <li>
                              <a onClick={() => handleMakeVolunteer(user)}>
                                Make Volunteer
                              </a>
                            </li>
                          ) : (
                            <li>
                              <a onClick={() => handleMakeDonor(user)}>
                                Make Donor
                              </a>
                            </li>
                          )}

                          <li>
                            <a onClick={() => handleStatus(user)}>
                              {user.status == "Active" ? "Blocked" : "Active"}{" "}
                              User
                            </a>
                          </li>
                        </ul>
                      </div>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-10 text-center text-sm text-gray-400"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
