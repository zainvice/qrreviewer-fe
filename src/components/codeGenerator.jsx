import React, { useState } from "react";
import { generateBulkStands } from "../api/standCalls";

const CodeGenerator = () => {
  const [quantity, setQuantity] = useState(0); 
  const [type, setType] = useState("QR"); 
  const [isLoading, setIsLoading] = useState(false); 
  const [generatedCodes, setGeneratedCodes] = useState([]); 
  const [error, setError] = useState(null); 
  
  const handleGenerate = async () => {
    if (quantity <= 0) {
      alert("Please enter a valid batch size!");
      return;
    }

    setIsLoading(true);
    setError(null); // Reset error state
    try {
      const response = await generateBulkStands({ quantity, type });
      console.log(response.data)
      setGeneratedCodes(response.data); // Assume `data` contains generated codes
    } catch (err) {
      console.error("Error generating codes:", err);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
      <div className="p-6 bg-white shadow-lg rounded-lg w-full h-[590px] max-h-[590px] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
          <span className="material-symbols-outlined mr-2">qr_code_scanner</span>
          Generate QR and NFC Codes for Stands
        </h2>

        <div className="mb-6">
          <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
            Batch Size
          </label>
          <input
            id="quantity"
            type="number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter the number of codes to generate"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Code Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="QR"
                checked={type === "QR"}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              QR Code
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="NFC"
                checked={type === "NFC"}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              NFC Tag
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Both"
                checked={type === "Both"}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              Both
            </label>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className={`w-full py-3 text-white rounded-lg font-semibold transition text-lg flex items-center justify-center ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <span className="material-symbols-outlined animate-spin mr-2">sync</span>
              Generating...
            </span>
          ) : (
            <>
              <span className="material-symbols-outlined mr-2">qr_code_2</span>
              Generate {type} Codes
            </>
          )}
        </button>

        {/* Error Handling */}
        {error && <div className="mt-4 text-red-500 font-medium">{error}</div>}

        {/* Display Generated Codes */}
        {generatedCodes.length > 0 && (
          <div className="mt-8 h-[30%] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Generated {type} Codes
            </h3>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Stand ID</th>
                  <th className="border border-gray-300 px-4 py-2">Signup Link</th>
                  <th className="border border-gray-300 px-4 py-2">QR Code</th>
                  <th className="border border-gray-300 px-4 py-2">NFC URL</th>
                </tr>
              </thead>
              <tbody>
                {generatedCodes.map((code, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{code.standId}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a href={code.signupLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {code.signupLink}
                      </a>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {code.qrCodeData ? (
                        <img src={`data:image/png;base64,${code.qrCodeData}`} alt="QR Code" className="w-16 h-16 mx-auto" />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{code.nfcUrl || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
   
  );
};

export default CodeGenerator;
