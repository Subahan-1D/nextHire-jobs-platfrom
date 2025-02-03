import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import axios from "axios";
const TabCategories = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const setData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/jobs`);
      setJobs(data);
    };
    setData();
  }, []);
  return (
    <Tabs selectedTabClassName="border-b-4 border-blue-500 text-blue-500">
      <div className="container mx-auto px-6 py-10">
        {/* Section Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 capitalize lg:text-4xl">
          Browse Jobs By Categories
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-600 mb-5">
          Three categories are available for now: Web Development, Graphics
          Design, and Digital Marketing. Click on the tabs below to browse them.
        </p>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center">
          <TabList className="flex space-x-4 bg-gray-100 p-2 rounded-lg shadow-md text-gray-800">
            <Tab className="px-6 py-2 text-lg font-medium text-gray-600 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white focus:outline-none">
              Digital Marketing
            </Tab>
            <Tab className="px-6 py-2 text-lg font-medium text-gray-600 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white focus:outline-none">
              Web Development
            </Tab>
            <Tab className="px-6 py-2 text-lg font-medium text-gray-600 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white focus:outline-none">
              Graphics Design
            </Tab>
          </TabList>
        </div>

        {/* Tab Panels */}
        <div className="mt-6">
          <TabPanel>
            <div className="grid sm:grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 my-4 mt-8">
              {jobs
                .filter((j) => j.category === "Digital Marketing")
                .map((job) => (
                  <JobCard key={job._id} job={job}></JobCard>
                ))}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="grid sm:grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 my-4 mt-8">
              {jobs
                .filter((j) => j.category === "Web Development")
                .map((job) => (
                  <JobCard key={job._id} job={job}></JobCard>
                ))}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="grid sm:grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 my-4 mt-8">
              {jobs
                .filter((j) => j.category === "Graphics Design")
                .map((job) => (
                  <JobCard key={job._id} job={job}></JobCard>
                ))}
            </div>
          </TabPanel>
        </div>
      </div>
    </Tabs>
  );
};

export default TabCategories;
