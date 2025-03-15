import axios from "axios";
import { useEffect, useState } from "react";
import JobCard from "../components/Tab/JobCard";

const AllJobs = () => {
  const [itemPerPage, setItemPerPage] = useState(8);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-jobs?page=${currentPage}&size=${itemPerPage}&filter=${filter}&sort=${sort}&search=${search}`
      );
      setJobs(data);
    };
    getData();
  }, [currentPage, itemPerPage, filter, sort, search]);

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/jobs-count?filter=${filter}&search=${search}`
      );
      setCount(data.count);
    };
    getCount();
  }, [filter, search]);

  const numberOfPages = Math.ceil(count / itemPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  const handleReset = () => {
    setFilter("");
    setSort("");
    setSearch("");
    setSearchText("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 p-4 bg-gray-100 shadow-md rounded-lg">
        <select
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          value={filter}
          className="border p-3 rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-300"
        >
          <option value="">Filter By Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Graphics Design">Graphics Design</option>
          <option value="Digital Marketing">Digital Marketing</option>
        </select>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder="Enter Job Title"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Search</button>
        </form>

        <select
          onChange={(e) => {
            setSort(e.target.value);
            setCurrentPage(1);
          }}
          value={sort}
          className="border p-3 rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-300"
        >
          <option value="">Sort By Deadline</option>
          <option value="dsc">Descending Order</option>
          <option value="asc">Ascending Order</option>
        </select>
        
        <button onClick={handleReset} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Reset</button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>

      <div className="flex justify-center mt-12 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-blue-500 hover:text-white disabled:opacity-50"
        >
          Previous
        </button>

        {pages.map((btnNum) => (
          <button
            key={btnNum}
            onClick={() => handlePaginationButton(btnNum)}
            className={`px-4 py-2 rounded-lg ${currentPage === btnNum ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-500 hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-blue-500 hover:text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllJobs;
