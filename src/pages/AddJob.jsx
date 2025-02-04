import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddJob = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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
      buyer :{
        email,
        name: user?.displayName,
        photo:user?.photoURL
      }
    };
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/job`,
        jobData
      );
      console.log(data);
      toast.success(" Save Data Successful")
      navigate('/my-posted-jobs')
    } catch (err) {
      console.log(err);
      toast.error("Problem Server")
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <section className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🚀 Post a Job
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 font-medium" htmlFor="job_title">
                Job Title
              </label>
              <input
                id="job_title"
                name="job_title"
                type="text"
                placeholder="Enter job title"
                className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div>
              <label
                className="text-gray-700 font-medium"
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
                className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium mr-2">Deadline</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium" htmlFor="category">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                <option value="Web Development">Web Development</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-medium" htmlFor="min_price">
                Minimum Price
              </label>
              <input
                id="min_price"
                name="min_price"
                type="number"
                placeholder="e.g. 100"
                className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium" htmlFor="max_price">
                Maximum Price
              </label>
              <input
                id="max_price"
                name="max_price"
                type="number"
                placeholder="e.g. 500"
                className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="text-gray-700 font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="4"
              placeholder="Provide a detailed job description..."
              className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              ✅ Submit Job
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
