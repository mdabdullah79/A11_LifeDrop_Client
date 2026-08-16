import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllBloodDonationRequests = () => {
  
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const {data: requests = []} = useQuery({
    queryKey: ["users",user?.email],
    queryFn: async ()=>{
        const res = await axiosSecure.get(`/donation_requests?email=${user?.email}`)
        return res.data
    }

  });
  const [statusFilter, setStatusFilter] = useState("All Status");

  const donationrequests = [
    {
      id: 1,
      requester: "Mahin",
      recipient: "Rahim Ahmed",
      location: "Chattogram, Panchlaish",
      blood: "O+",
      date: "12 Aug",
      status: "Pending",
    },
    {
      id: 2,
      requester: "Nusrat",
      recipient: "Nusrat Jahan",
      location: "Dhaka, Dhanmondi",
      blood: "A+",
      date: "13 Aug",
      status: "In Progress",
    },
    {
      id: 3,
      requester: "Karim",
      recipient: "Karim Hasan",
      location: "Sylhet, Zindabazar",
      blood: "B-",
      date: "15 Aug",
      status: "Done",
    },
  ];

  const filteredRequests =
    statusFilter === "All Status"
      ? requests
      : requests.filter(
          (request) => request.status === statusFilter
        );

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-7 px-5 pb-10 pt-24 sm:px-8 lg:px-7 lg:pt-7">

      {/* ================= HEADER ================= */}

      <div className="mb-7">
        <h1 className="text-3xl font-bold text-[#071b3a]">
          All Blood Donation Requests {requests.length}
        </h1>

        <p className="mt-1 text-sm text-[#466383]">
          Manage all users' blood donation requests.
        </p>
      </div>


      {/* ================= FILTER ================= */}

      <div className="mb-5 flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4">

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-[37px] rounded-lg border border-gray-200 bg-white px-4 text-xs outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <span className="text-xs text-[#466383]">
          {statusFilter === "All Status"
            ? "All requests"
            : `${filteredRequests.length} request${
                filteredRequests.length !== 1 ? "s" : ""
              }`}
        </span>

      </div>


      {/* ================= TABLE ================= */}

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white p-5">

        <table className="w-full min-w-[850px] border-collapse">

          {/* Header */}

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
                Actions
              </th>

            </tr>
          </thead>


          {/* Body */}

          <tbody>

            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-gray-100 last:border-0"
                >

                  {/* Requester */}

                  <td className="px-3 py-4 text-xs text-[#071b3a]">
                    {request.requesterName}
                  </td>


                  {/* Recipient */}

                  <td className="px-3 py-4 text-xs text-[#071b3a]">
                    {request.recipientName}
                  </td>


                  {/* Location */}

                  <td className="px-3 py-4 text-xs text-[#071b3a]">
                    {request.district},{request.upazila}
                  </td>


                  {/* Blood */}

                  <td className=" px-3 py-4 text-xs font-bold text-red-500">
                    {request.bloodGroup}
                  </td>


                  {/* Date */}

                  <td className="px-3 py-4 text-xs text-[#071b3a]">
                    {request.donationDate}
                  </td>


                  {/* Status */}

                  <td className="px-3 py-4">
                    <StatusBadge status={request.status} />
                  </td>


                  {/* Action */}

                  <td className="px-3 py-4">

                    {request.status === "In Progress" ? (
                      <button
                        onClick={() =>
                          console.log("Update:", request)
                        }
                        className="rounded-lg bg-green-100 px-4 py-2 text-[10px] font-semibold text-green-600 transition hover:bg-green-200"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          console.log("View:", request)
                        }
                        className="rounded-lg bg-red-100 px-4 py-2 text-[10px] font-semibold text-red-600 transition hover:bg-red-200"
                      >
                        View
                      </button>
                    )}

                  </td>

                </tr>
              ))
            ) : (

              <tr>
                <td
                  colSpan="7"
                  className="py-10 text-center text-sm text-gray-400"
                >
                  No donation requests found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};


/* =========================================
   STATUS BADGE
========================================= */

const StatusBadge = ({ status }) => {

  const statusStyle = {
    Pending: "bg-yellow-100 text-yellow-600",
    "In Progress": "bg-blue-100 text-blue-600",
    Done: "bg-green-100 text-green-600",
  };

  return (
    <span
      className={`
        inline-flex rounded-full px-3 py-1.5
        text-[10px] font-semibold
        ${statusStyle[status]}
      `}
    >
      {status}
    </span>
  );
};

export default AllBloodDonationRequests;