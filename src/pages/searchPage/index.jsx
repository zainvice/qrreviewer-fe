import React, { useState } from "react";
/* import { generateAssets } from "../../api/userCalls"; // Ensure this is implemented in your backend */

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatedAssets, setGeneratedAssets] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const mockGoogleApiResponse = () => {
    return [
      {
        place_id: "ChIJN1t_tDeuEmsRUsoyG83frY4",
        name: "Mock Business One",
        formatted_address: "123 Mock Street, Mock City",
      },
      {
        place_id: "ChIJN1t_tDeuEmsRU1213ws1313frY4",
        name: "Mock Business Two",
        formatted_address: "456 Example Ave, Testville",
      },
    ];
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const mockResults = mockGoogleApiResponse().map((place) => ({
        id: place.place_id,
        name: place.name,
        location: place.formatted_address,
      }));
      setBusinesses(mockResults);
      setLoading(false);
    }, 1000);
  };

  const handleRequest = async (businessId, type) => {
    const business = businesses.find((b) => b.id === businessId);
    if (!business) return alert("Business not found.");

    const requestData = {
      placeId: business.id,
      name: business.name,
      address: business.location,
      googleUrl: `https://maps.google.com/?cid=${business.id}`,
      assetType: type,
    };

    try {
      const response = await generateAssets(requestData); // API call
      setGeneratedAssets(response);
      setSelectedBusiness(business);
    } catch (error) {
      console.error("Error generating assets:", error);
    }
  };

  return (
    <div className="flex flex-col items-center py-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between w-[90%]">
        <div className="w-14 flex">
          <img src='https://cdn-icons-png.flaticon.com/512/1482/1482742.png' alt=""/>
          <p className="my-auto ml-2 font-bold">Zepto Cards</p>
        </div>
        <div className="my-auto flex space-x-4">
          <a href="" className="hover:font-semibold duration-300">Home</a>
          <a href="" className="hover:font-semibold duration-300">About Us</a>
          <a href="" className="hover:font-semibold duration-300">Contact</a>
        </div>
        <div className="my-auto">
          <button className="bg-black w-24 text-white border border-black py-1 px-3 mx-2 hover:bg-white hover:text-black duration-300 rounded-[10px]">Login</button>
          <button className="bg-black w-24 text-white border border-black py-1 px-3 mx-2 hover:bg-white hover:text-black duration-300 rounded-[10px]">Signup</button>
        </div>
      </header>
      <div className="h-80 bg-black text-white w-full flex justify-center flex-col items-center mt-8">
        <h1 className="text-4xl font-bold mb-6">Generate QR and NFCs in seconds</h1>
        <h1 className="text-xl font-bold mb-6">Find Your Business</h1>
        <div className="flex w-full max-w-lg mb-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 text-black border rounded-l-lg focus:outline-none focus:ring focus:ring-white"
            placeholder="Search for your business..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-black border border-white text-white rounded-r-lg hover:bg-white duration-300 font-semibold hover:text-black"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* Display selected business or search results */}
      {selectedBusiness ? (
        <div className="w-full w-[90%] h-[400px] bg-white flex flex-col items-center justify-center shadow-md rounded-lg p-4 mt-6">
          <div className="flex w-full justify-between">
            <div>
              <h3 className="font-semibold text-gray-700">{selectedBusiness.name}</h3>
              <p className="text-sm text-gray-500">{selectedBusiness.location}</p>
            </div>
            <div className="flex space-x-2">
              {generatedAssets.assetType === "QR" ? 
                <button
                className="bg-black w-44 text-white border border-black py-1 px-3 mx-2 hover:bg-white hover:text-black duration-300 rounded-[10px]"
                onClick={() => handleRequest(selectedBusiness.id, "NFC")}
              >
                Request NFC
              </button>
              : (
                <button
                className="bg-black w-44 text-white border border-black py-1 px-3 mx-2 hover:bg-white hover:text-black duration-300 rounded-[10px]"
                onClick={() => handleRequest(selectedBusiness.id, "QR")}
              >
                Request QR
              </button>
              )}
                  
                    
                  </div>
          </div>

          {/* Show generated asset */}
          {generatedAssets && (
            <div className="mt-4">
              {generatedAssets.assetType === "QR" ? (
                <div>
                  <h4 className="font-semibold">Generated QR Code:</h4>
                  <img src={generatedAssets.qrCodeData} alt="QR Code" className="mt-2" />
                </div>
              ) : (
                <div>
                  <h4 className="font-semibold">Generated NFC Tag URL:</h4>
                  <p>{generatedAssets.trackingUrl}</p>
                </div>
              )}
            </div>
          )}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              setSelectedBusiness(null);
              setGeneratedAssets(null);
            }}
          >
            Back to Search
          </button>
        </div>
      ) : (
        businesses.length > 0 && (
          <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-4 mt-6">
            {businesses.map((business) => (
              <div key={business.id} className="flex justify-between items-center border-b py-3">
                <div>
                  <p className="font-semibold text-gray-700">{business.name}</p>
                  <p className="text-sm text-gray-500">{business.location}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleRequest(business.id, "QR")}
                  >
                    Request QR
                  </button>
                  <button
                    className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                    onClick={() => handleRequest(business.id, "NFC")}
                  >
                    Request NFC
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {!loading && businesses.length === 0 && !selectedBusiness && (
        <p className="text-gray-500 mt-6">No businesses found. Try searching for a different name.</p>
      )}
    </div>
  );
};

export default SearchPage;
