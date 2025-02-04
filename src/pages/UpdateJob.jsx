import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const UpdateJob = () => {
  const job = useLoaderData();
  const {
    _id,
    job_title,
    category,
    deadline,
    min_price,
    max_price,
    description,
  } = job || {};
  const [startDate, setStartDate] = useState(new Date(deadline));
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const job_title = form.job_title.value;
    const email = user?.email;
    const deadline = startDate;
    const category = form.category.value;
    const description = form.description.value;
    const min_price = parseFloat(form.min_price.value);
    const max_price = parseFloat(form.max_price.value);
    const jobData = {
      job_title,
      email,
      deadline,
      category,
      description,
      min_price,
      max_price,
      buyer: {
        email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
    };
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/job/${_id}`,
        jobData
      );
      console.log(data);
      toast.success("Job data updated successfully!");
      navigate("/my-posted-jobs");
    } catch (err) {
      console.error(err);
      toast.error("Request Failed With Status 404");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <section className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 md:p-10">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Update Job Details
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-gray-700 font-medium"
                htmlFor="job_title"
              >
                Job Title
              </label>
              <input
                id="job_title"
                name="job_title"
                type="text"
                defaultValue={job_title}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
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
                defaultValue={user?.email}
                className="w-full mt-2 p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Deadline
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium"
                htmlFor="category"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                defaultValue={category}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Web Development">Web Development</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium"
                htmlFor="min_price"
              >
                Minimum Price
              </label>
              <input
                id="min_price"
                name="min_price"
                type="number"
                defaultValue={min_price}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium"
                htmlFor="max_price"
              >
                Maximum Price
              </label>
              <input
                id="max_price"
                name="max_price"
                type="number"
                defaultValue={max_price}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="5"
              defaultValue={description}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateJob;
