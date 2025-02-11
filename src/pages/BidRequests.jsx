import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const BidRequests = () => {
  const [bids, setBids] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBidData();
    }
  }, [user]);

  const fetchBidData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/bid-requests/${user?.email}`
      );
      console.log(data);
      setBids(data);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  // bid status funtion
  const handleStatus = async (id, prevStatus, status) => {
    if(prevStatus === status) return console.log('sorry')
    console.log(id, prevStatus, status);
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/bid/${id}`,
      { status }
    );
    console.log(data);
    fetchBidData()
  };
  return (
    <section className="container mx-auto p-4 sm:p-6 lg:p-8 pt-12">
      <div className="flex items-center gap-x-3 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Bid Requests</h2>
        <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full">
          {bids.length}
        </span>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Deadline
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bids.map((bid) => (
              <tr key={bid._id}>
                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                  {bid?.job_title}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                  {bid?.email}
                </td>

                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                  {new Date(bid.deadline).toLocaleDateString()}
                </td>

                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                  ${bid.price}
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-x-2">
                    <p
                      className={`px-3 py-1 rounded-full ${
                        bid.category === "Web Development" &&
                        "text-blue-500 bg-blue-100/60"
                      } ${
                        bid.category === "Graphics Design" &&
                        "text-emerald-500 bg-emerald-100/60"
                      } ${
                        bid.category === "Digital Marketing" &&
                        "text-pink-500 bg-pink-100/60"
                      } text-xs`}
                    >
                      {bid.category}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                      bid.status === "Pending" &&
                      "bg-yellow-100/60 text-yellow-500"
                    } ${
                      bid.status === "In Progress" &&
                      "bg-blue-100/60 text-blue-500"
                    } ${
                      bid.status === "Complete" &&
                      "bg-emerald-100/60 text-emerald-500"
                    } ${
                      bid.status === "Rejected" && "bg-red-100/60 text-red-500"
                    } `}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        bid.status === "Pending" && "bg-yellow-500"
                      } ${bid.status === "In Progress" && "bg-blue-500"} ${
                        bid.status === "Complete" && "bg-green-500"
                      } ${bid.status === "Rejected" && "bg-red-500"}  `}
                    ></span>
                    <h2 className="text-sm font-normal ">{bid.status}</h2>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-x-6">
                    {/* Accept Button: In Progress */}
                    <button
                      onClick={() =>
                        handleStatus(bid._id, bid.status, "In Progress")
                      }
                      disabled={bid.status === "Complete"}
                      className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
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
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </button>
                    {/* Reject Button */}
                    <button
                      onClick={() =>
                        handleStatus(bid._id, bid.status, "Rejected")
                      }
                      disabled={bid.status === "Complete"}
                      className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none"
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
                          d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BidRequests;
