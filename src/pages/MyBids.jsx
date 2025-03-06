import { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user) {
      fetchBidData();
    }
  }, [user]);

  const fetchBidData = async () => {
    try {
      const { data } = await axiosSecure.get(`/my-bids/${user?.email}`);
      setBids(data);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  // bid status funtion
  const handleStatus = async (id) => {
    const { data } = await axiosSecure.patch(`/bid/${id}`, {
      status: "Complete",
    });
    console.log(data);
    fetchBidData();
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Bids</h2>
        <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full">
          {bids.length} {bids.length === 1 ? "Bid" : "Bids"}
        </span>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Title",
                "Deadline",
                "Price",
                "Category",
                "Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-sm font-medium text-left text-gray-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bids.map((bid) => (
              <tr key={bid._id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {bid.job_title}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {new Date(bid.deadline).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  ${bid.price}
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      bid.category === "Web Development"
                        ? "text-blue-500 bg-blue-100"
                        : bid.category === "Graphics Design"
                        ? "text-emerald-500 bg-emerald-100"
                        : bid.category === "Digital Marketing"
                        ? "text-pink-500 bg-pink-100"
                        : "text-gray-500 bg-gray-100"
                    }`}
                  >
                    {bid.category}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full gap-2 ${
                      bid.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : bid.status === "In Progress"
                        ? "bg-blue-100 text-blue-600"
                        : bid.status === "Complete"
                        ? "bg-emerald-100 text-emerald-600"
                        : bid.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        bid.status === "Pending"
                          ? "bg-yellow-600"
                          : bid.status === "In Progress"
                          ? "bg-blue-600"
                          : bid.status === "Complete"
                          ? "bg-emerald-600"
                          : bid.status === "Rejected"
                          ? "bg-red-600"
                          : "bg-gray-600"
                      }`}
                    />
                    {bid.status}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-center whitespace-nowrap">
                  <button
                    disabled={bid.status !== "In Progress"}
                    onClick={() => handleStatus(bid._id)}
                    title="Mark Complete"
                    className="text-gray-500 hover:text-emerald-500 focus:outline-none disabled:text-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyBids;
