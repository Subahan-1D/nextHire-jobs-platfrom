/* eslint-disable react/prop-types */
import { Calendar, DollarSign } from "lucide-react";

const JobCard = ({ job }) => {
  const { job_title, category, min_price, max_price } = job || {};
  return (
    <div className="w-full max-w-sm p-5 bg-white rounded-xl shadow-lg border hover:shadow-2xl hover:scale-[1.05] transition-all duration-300">
      {/* Header Section */}
      <div className="flex items-center justify-between text-gray-700">
        <span className="flex items-center gap-2 text-xs font-medium text-gray-600">
          <Calendar size={14} /> Deadline: 20/12/2024
        </span>
        <span className="px-3 py-1 text-xs font-semibold text-blue-800 uppercase bg-blue-200 rounded-full">
          {category}
        </span>
      </div>

      {/* Job Info */}
      <div className="mt-3">
        <h1 className="text-xl font-semibold text-gray-900">{job_title}</h1>

        <p className="mt-2 text-sm text-gray-600">
          Design and develop an interactive website using React and Tailwind.
        </p>
        <p className="mt-2 flex items-center gap-2 text-sm font-bold text-gray-700">
          <DollarSign size={14} className="text-green-500" /> Range: $
          {min_price} - ${max_price}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
