/* eslint-disable react/prop-types */
import { Calendar, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const {
    _id,
    job_title,
    category,
    min_price,
    max_price,
    deadline,
    description,
  } = job || {};
  return (
    <Link
      to={`/job/${_id}`}
      className="w-full max-w-sm p-5 bg-white rounded-xl shadow-lg border hover:shadow-2xl hover:scale-[1.05] transition-all duration-300"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between text-gray-700">
        <span className="flex items-center gap-2 text-xs font-medium text-gray-600">
          <Calendar size={14} /> {new Date(deadline).toLocaleDateString()}
        </span>
        <span className="px-3 py-1 text-xs font-semibold text-blue-800 uppercase bg-blue-200 rounded-full">
          {category}
        </span>
      </div>

      {/* Job Info */}
      <div className="mt-3">
        <h1 className="text-xl font-semibold text-gray-900">{job_title}</h1>

        <p title={description} className="mt-2 text-sm text-gray-600">
          {description.substring(0,50)}...
        </p>
        <p className="mt-2 flex items-center gap-2 text-sm font-bold text-gray-700">
          <DollarSign size={14} className="text-green-500" /> Range: $
          {min_price} - ${max_price}
        </p>
      </div>
    </Link>
  );
};

export default JobCard;
