const BidRequests = () => {
  return (
    <section className="container mx-auto p-4 sm:p-6 lg:p-8 pt-12">
      <div className="flex items-center gap-x-3 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Bid Requests</h2>
        <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full">
          05 Requests
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
            <tr>
              <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                Build Dynamic Website
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                example@gmail.com
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                10/04/2024
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                $200
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                  Web Development
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-yellow-600 bg-yellow-100 rounded-full">
                  <span className="h-2 w-2 mr-1 bg-yellow-600 rounded-full"></span>
                  Pending
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-4">
                  <button className="text-green-500 hover:text-green-700 transition-colors duration-200 focus:outline-none">
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
                  <button className="text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none">
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
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BidRequests;
