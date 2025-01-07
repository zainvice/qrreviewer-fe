import React, { useState, useEffect } from "react";
import { getPaginatedStands } from "../api/standCalls";
import * as XLSX from "xlsx";


const ViewAllStands = () => {
  const [stands, setStands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchStands(currentPage);
  }, [currentPage]);

  const fetchStands = async (page) => {
    setIsLoading(true);
    try {
      const response = await getPaginatedStands(page);
      console.log(response)
      setStands(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching stands:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get human-readable stand IDs
  const getReadableStandId = (index) => {
    const standNames = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
    return standNames[index] || `Stand ${index + 1}`; // default to Stand 1, Stand 2, etc.
  };

 
  const handleExportToExcel = () => {
    // Prepare the data for export
    const data = stands.map((stand, index) => ({
      "Stand ID": getReadableStandId(index), 
      "Signup Link": stand.signupLink || "N/A",
      "QR Code": stand.qrCode ? `data:image/png;base64,${stand.qrCode}` : "QR Code Image", // Base64 QR Code
      "NFC URL": stand.nfcUrl || "N/A",
    }));
  
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
  

    XLSX.utils.book_append_sheet(workbook, worksheet, "Stands");
  

    XLSX.writeFile(workbook, `stands_page_${currentPage}.xlsx`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md h-[590px] max-h-[590px] overflow-y-auto">
      <div className="flex w-full justify-between mb-6">
        <h2 className="text-2xl font-bold my-auto">View All Stands</h2>
        <button
          onClick={handleExportToExcel}
          className="my-auto px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Export to Excel
        </button>
      </div>
      {isLoading ? (
        <p>Loading stands...</p>
      ) : stands.length > 0 ? (
        <>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Signup Link</th>
                <th className="border border-gray-300 px-4 py-2">QR Code</th>
                <th className="border border-gray-300 px-4 py-2">NFC URL</th>
              </tr>
            </thead>
            <tbody>
              {stands.map((stand, index) => (
                <tr key={stand.standId} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{index+1}</td>
                  <td className="border border-gray-300 px-4 py-2">{stand.signupLink || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{stand.qrCode ? (
                    <img src={`data:image/png;base64,${stand.qrCode}`} alt="QR Code" className="w-24 h-16 mx-auto" />
                  ) : (
                    "N/A"
                  )}</td>
                  <td className="border border-gray-300 px-4 py-2">{stand.nfcUrl || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-white bg-blue-500 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-white bg-blue-500 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No stands available.</p>
      )}
    </div>
  );
};

export default ViewAllStands;
