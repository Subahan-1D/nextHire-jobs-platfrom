
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyPostedJobs = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    if (user) postedData();
  }, [user]);

  const postedData = async () => {
    const { data } = await axiosSecure(`/jobs/${user?.email}`);
    setPostedJobs(data);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axiosSecure.delete(`/job/${id}`);
      console.log(data);
      toast.success("Delete Successfully");
      postedData();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          My Posted Jobs
        </h2>
        <span className="px-3 py-1 text-xs sm:text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
          {postedJobs.length} Job
        </span>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Title",
                "Deadline",
                "Price Range",
                "Category",
                "Description",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-600 text-left uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {postedJobs.map((p) => (
              <tr
                key={p._id}
                className="hover:bg-gray-50 transition duration-300"
              >
                <td className="px-3 sm:px-6 py-2 sm:py-4 text-gray-800 font-medium">
                  {p.job_title}
                </td>
                <td className="px-3 sm:px-6 py-2 sm:py-4 text-gray-600">
                  {new Date(p.deadline).toLocaleDateString()}
                </td>
                <td className="px-3 sm:px-6 py-2 sm:py-4 text-gray-600">
                  ${p.min_price}-${p.max_price}
                </td>
                <td className="px-3 sm:px-6 py-2 sm:py-4">
                  <span className="inline-block max-w-[80px] sm:max-w-full truncate px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                    {p.category}
                  </span>
                </td>
                <td
                  title={p.description}
                  className="px-3 sm:px-6 py-2 sm:py-4 text-gray-600 truncate max-w-[100px] sm:max-w-xs"
                >
                  {p.description.substring(0, 50)}
                </td>
                <td className="px-3 sm:px-6 py-2 sm:py-4 flex gap-2 sm:gap-4">
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 />
                  </button>
                  <Link
                    to={`/update/${p._id}`}
                    className="text-yellow-500 hover:text-yellow-600 transition"
                  >
                    <Pencil />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyPostedJobs;
