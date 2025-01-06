import React, { useState, useEffect } from "react";
import { getPaginatedStands } from "../api/standCalls";

const ViewReports = () => {
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchReports = async (page) => {
    setLoading(true);
    try {
      const response = await getPaginatedStands(page); // API call for stands
      setReports(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching reports:", error);
      alert("Failed to load reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(page);
  }, [page]);

  const handlePageChange = (direction) => {
    if (direction === "next" && page < totalPages) {
      setPage(page + 1);
    } else if (direction === "prev" && page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Stand Reports</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : reports.length > 0 ? (
        <>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Generated At</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Scans</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report.standId} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{index+1}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(report.createdAt).toLocaleString()}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 ${
                      report.status === "linked" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {report.status.toUpperCase()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{report.type}</td>
                  <td className="border border-gray-300 px-4 py-2">{report.scanCount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={page === 1}
              onClick={() => handlePageChange("prev")}
              className={`px-4 py-2 rounded ${
                page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white"
              }`}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange("next")}
              className={`px-4 py-2 rounded ${
                page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No reports available.</p>
      )}
    </div>
  );
};

export default ViewReports;
