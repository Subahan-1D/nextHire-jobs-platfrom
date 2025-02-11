import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const JobDetails = () => {
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState(new Date());
  const job = useLoaderData();
  const { user } = useAuth();
  const {
    _id,
    job_title,
    category,
    min_price,
    max_price,
    deadline,
    description,
    buyer,
  } = job || {};

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (user?.email === buyer?.email)
      return toast.error("Action Not Permitted!");

    const form = e.target;
    const price = parseFloat(form.price.value);
    if (price < parseFloat(min_price)) {
      return toast.error("Offer more or at least equal to minimum price");
    }

    const bidData = {
      jobId: _id,
      price,
      buyer_email: buyer?.email,
      status: "Pending",
      email: user?.email,
      comment: form.comment.value,
      deadline: startDate,
      job_title,
      category,
      buyer,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/bid`,
        bidData
      );
      console.log(data);
      toast.success("Bid placed successfully!");
      navigate('/my-bids')
    } catch (err) {
      console.log(err);
      toast.error("Failed to place bid.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-around gap-6 items-start min-h-screen p-4 md:p-8 lg:p-12 bg-gray-50">
      {/* Job Details */}
      <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 md:p-8 lg:p-10 space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            Deadline: {new Date(deadline).toLocaleDateString()}
          </span>
          <span className="px-4 py-1 text-xs text-white bg-blue-600 rounded-full">
            {category}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800">{job_title}</h1>
        <p className="text-gray-700 leading-relaxed text-justify">
          {description}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Buyer Details:
            </h3>
            <p className="text-gray-600">Name: {buyer?.name}</p>
            <p className="text-gray-600">Email: {buyer?.email}</p>
          </div>
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src={buyer?.photo || "https://via.placeholder.com/150"}
              alt="Buyer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <p className="text-lg font-semibold text-gray-800">
          Budget Range: ${min_price} - ${max_price}
        </p>
      </div>

      {/* Place A Bid Form */}
      <section className="flex-1 bg-white shadow-xl rounded-2xl p-6 md:p-8 lg:p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Place A Bid</h2>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              type="number"
              name="price"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium"
              htmlFor="emailAddress"
            >
              Email Address
            </label>
            <input
              id="emailAddress"
              type="email"
              name="email"
              disabled
              value={user?.email || ""}
              className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-100 focus:outline-none"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              rows="3"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Deadline</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Place Bid
          </button>
        </form>
      </section>
    </div>
  );
};

export default JobDetails;