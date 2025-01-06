import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { linkBusinessToStand } from "../api/standCalls";
import { getStandDetails } from "../api/standCalls";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Manage Business");
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stand, setStand] = useState(null)
  const navigate = useNavigate()

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setSearchResults([]);
  
    try {
      // Call the API endpoint using Axios
      const response = await axiosInstance.get('/search', {
        params: {
          query: searchQuery,
        },
      });
  
      // Handle the response data
      setSearchResults(response.data.results || []);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    const decoded = jwtDecode(token);
    setUserData(decoded);
  }, []);

  useEffect(() => {
    const getStandData = async(standId) => {
        try {
            const response = await getStandDetails(standId)
            console.log("STAND",response)
            setStand(response)
        } catch (error) {
          console.error("ERROR", error)
        }
    }
    if(userData?.stands?.length > 0){
        const standId =  userData?.stands[0]
        getStandData(standId)
    }
   
  }, [userData]);
  const handleLink = async(placeData) => {
    try {
      const standId = userData?.stands[0]
      const businessData = {
        name: placeData.name, address: placeData.formatted_address, googlePlaceId: placeData.place_id, ownerId: userData.id, 
        googleReviewLink: `https://www.google.com/maps/place/?q=place_id:${placeData.place_id}`
      }
      const response = await linkBusinessToStand(standId, businessData)
      console.log(response)
      
    } catch (error) {
      console.error("ERROR", error)
    }

  }
  const handleUnlink = async(placeData) => {
    try {
      const standId = userData?.stands[0]
      const businessData = {
        name: placeData.name, address: placeData.formatted_address, googlePlaceId: placeData.place_id, ownerId: userData.id, 
        googleReviewLink: `https://www.google.com/maps/place/?q=place_id:${placeData.place_id}`
      }
      const response = await linkBusinessToStand(standId, businessData)
      console.log(response)
      
    } catch (error) {
      console.error("ERROR", error)
    }

  }


  const renderContent = () => {
    switch (activeTab) {
      case "Manage Business":
        return (
          <div className="flex flex-col flex-grow">
            <h2 className="text-xl font-semibold mb-4">Manage Business</h2>
            <p className="mb-4">{stand?.linkedBusiness? 'Business Linked' : 'Search and link your business here.'}</p>
            {stand?.linkedBusiness ? (
               <div
                  key={stand?.linkedBusiness}
                  className="p-4 flex flex-col lg:flex-row justify-between bg-gray-100 rounded-lg shadow duration-300 hover:bg-gray-200 cursor-pointer"
                >
                <div className="flex flex-col lg:w-1/2"> 
                    <strong className="my-auto">{stand?.linkedBusiness.name}</strong>
                    <p className="my-auto text-sm text-gray-600">{stand?.linkedBusiness.address}</p>
                </div>
                  <div className="flex space-x-2 mt-4 lg:mt-0">
                    <a
                      href={`${stand?.linkedBusiness.googleReviewLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="my-auto flex space-x-2 bg-black text-white duration-300 hover:bg-gray-800 p-2 px-3 rounded-lg"
                    >
                      <img src="/google-map-icon.png" alt="maps-icon" className="h-6"/>
                      <span className="hidden lg:block">View on Maps</span>
                    </a>
                    <button className="my-auto bg-black text-white duration-300 hover:bg-gray-800 p-2 px-3 rounded-lg" disabled>Linked</button>
                  </div>
             </div>
            ): (
              <>
              <div className="mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter business name"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                />
                <button
                  onClick={handleSearch}
                  className="mt-2 w-full bg-black text-white py-2 px-4 rounded-lg duration-300 hover:bg-gray-800 flex justify-center items-center"
                >
                  {isLoading ? (
                    <span className="loader"></span>
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
              <div className="mt-4 h-48 overflow-y-auto">
                {isLoading && <p className="text-black">Loading results...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {searchResults.length > 0 ? (
                  <ul className="space-y-2">
                    {searchResults.map((result, index) => (
                      <li
                        key={index}
                        className="p-4 flex flex-col lg:flex-row justify-between bg-gray-100 rounded-lg shadow duration-300 hover:bg-gray-200 cursor-pointer"
                      >
                      <div className="flex flex-col w-1/4"> 
                          <strong className="my-auto">{result.name}</strong>
                          <p className="my-auto text-sm text-gray-600">{result.formatted_address}</p>
                      </div>
                        <div className="flex space-x-2">
                          <a
                            href={`https://www.google.com/maps/place/?q=place_id:${result.place_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="my-auto flex space-x-2 bg-black text-white duration-300 hover:bg-gray-800 p-2 px-3 rounded-lg"
                          >
                            <img src="/google-map-icon.png" alt="maps-icon" className="h-6"/>
                            <span>View on Maps</span>
                          </a>
                          <button className="my-auto bg-black text-white duration-300 hover:bg-gray-800 p-2 px-3 rounded-lg" onClick={(e)=> handleLink(result)}>Link to Stand</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  !isLoading && !error && (
                    <p className="text-gray-500">No results found. Try searching for a business.</p>
                  )
                )}
              </div>
              </>
            )}
            <div className="mt-4 flex items-center justify-center">
              <span className="text-sm text-gray-600">Powered by</span>
              <img src="/google_logo.png" alt="Google" className="ml-2 h-4" />
            </div>
          </div>
        );
      case "Reset Stand":
        return (
          <div className="flex flex-col flex-grow">
            <h2 className="text-xl font-semibold mb-4">Reset Stand</h2>
            <p className="mb-4">Reset your stand and relink to a new business.</p>
            {stand?.linkedBusiness && (
               <div
                  key={stand?.linkedBusiness}
                  className="p-4 flex flex-col lg:flex-row justify-between bg-gray-100 rounded-lg shadow duration-300 hover:bg-gray-200 cursor-pointer"
                >
                <div className="flex flex-col lg:w-1/2"> 
                    <strong className="my-auto">{stand?.linkedBusiness.name}</strong>
                    <p className="my-auto text-sm text-gray-600">{stand?.linkedBusiness.address}</p>
                </div>
                  <div className="flex space-x-2 mt-4 lg:mt-0">
                    <a
                      href={`${stand?.linkedBusiness.googleReviewLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="my-auto flex space-x-2 bg-black text-white duration-300 hover:bg-gray-800 p-2 px-3 rounded-lg"
                    >
                      <img src="/google-map-icon.png" alt="maps-icon" className="h-6"/>
                      <span className="lg:block hidden">View on Maps</span>
                    </a>
                    <button className="my-auto bg-red-600 text-white duration-300 hover:bg-red-700 p-2 px-3 rounded-lg" >Unlink</button>
                  </div>
             </div>
            )}
            <div className="mt-4 flex items-center justify-center">
              <span className="text-sm text-gray-600">Powered by</span>
              <img src="/favicon.png" alt="Google" className="ml-2 h-4" />
            </div>
          </div>
        );
      case "Analytics":
        return (
          <div className="flex flex-col flex-grow">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            <p>View QR/NFC usage statistics and performance data of your stand.</p>
            <div>
            <table className="w-full border-collapse border border-gray-200 my-4">
              <thead>
                <tr className="bg-black text-white">
                 
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Scans</th>
                </tr>
              </thead>
              <tbody>
                <tr key={stand.standId} className="hover:bg-gray-50">
                     
                      <td
                        className={`border border-gray-300 px-4 font-bold py-2 ${
                          stand.status === "linked" ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {stand.status.toUpperCase()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{stand.type === "Both" ? 'QR + NFC' : stand.type}</td>
                      <td className="border border-gray-300 px-4 py-2">{stand.scanCount}</td>
                </tr>
              </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <span className="text-sm text-gray-600">Powered by</span>
              <img src="/favicon.png" alt="Google" className="ml-2 h-4" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const menuItems = [
    { name: "Manage Business", icon: "business" },
    { name: "Reset Stand", icon: "restart_alt" },
    { name: "Analytics", icon: "bar_chart" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col overflow-y-auto bg-gray-50">
      <header className="bg-white shadow-md text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo-z.png" alt="Logo" className="h-8" />
            <h1 className="text-2xl font-bold">User Dashboard</h1>
          </div>
          <button
             onClick={handleLogout}
            className="py-2 px-4 bg-white shadow-sm text-black hover:text-white border rounded-lg duration-300 hover:bg-red-600 flex items-center"
          >
            <span className="material-symbols-outlined m-auto lg:mr-2">logout</span> <span className="hidden lg:block">Logout</span>
          </button>
        </div>
      </header>
      <main className="container flex flex-col flex-grow mx-auto px-4 py-6">
        <h1 className="mb-2">Welcome, <span className="font-bold">{userData?.name}</span></h1>
        <div className="flex space-x-4 mb-6">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`py-2 px-4 rounded-lg flex items-center space-x-2 ${
                activeTab === item.name
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-800"
              } duration-300 hover:bg-gray-800 duration-300 hover:text-white`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="hidden lg:block">{item.name}</span>
            </button>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-grow">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;