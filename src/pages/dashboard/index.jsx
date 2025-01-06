import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CodeGenerator from "../../components/codeGenerator";
import ViewReports from "../../components/reports";
import ViewAllStands from "../../components/viewStands";
import { jwtDecode } from "jwt-decode";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { path } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    const decoded = jwtDecode(token);
    setUserData(decoded);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-red-600 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
      </header>

      {/* Sidebar and Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-lg transition-all relative ${
            isSidebarOpen ? "w-64" : "w-20"
          }`}
        >
          <button
            className="absolute -top-2 right-8 flex items-center justify-center py-4 hover:bg-gray-200 transition"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span className="material-symbols-outlined">
              {isSidebarOpen ? "menu_open" : "menu"}
            </span>
          </button>
          <nav className="flex flex-col space-y-4 px-4 mt-10">
            <button
              onClick={() => handleNavigation("/admin/dashboard/generate-qrcodes")}
              className="flex items-center space-x-4 py-2 px-2 rounded hover:bg-gray-100 transition"
            >
              <span className="material-symbols-outlined">qr_code</span>
              {isSidebarOpen && <span>Generate Stands</span>}
            </button>
            <button
              onClick={() => handleNavigation("/admin/dashboard/view-stands")}
              className="flex items-center space-x-4 py-2 px-2 rounded hover:bg-gray-100 transition"
            >
              <span className="material-symbols-outlined">lightning_stand</span>
              {isSidebarOpen && <span>View All Stands</span>}
            </button>
            <button
              onClick={() => handleNavigation("/admin/dashboard/view-reports")}
              className="flex items-center space-x-4 py-2 px-2 rounded hover:bg-gray-100 transition"
            >
              <span className="material-symbols-outlined">bar_chart</span>
              {isSidebarOpen && <span>View Reports</span>}
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 overflow-hidden">
          {!path && (
            <>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {userData?.name}</h2>
              <p className="text-gray-600">
                Use the sidebar to navigate through the available options. You can:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mt-4">
                <li>Generate unique QR codes for manufacturing stands.</li>
               {/*  <li>Assign QR codes to businesses.</li> */}
                <li>View reports and monitor activity.</li>
              </ul>
            </>
          )}
          {path === "generate-qrcodes" && <CodeGenerator />}
          {path === "view-stands" && <ViewAllStands />}
          {path === "view-reports" && <ViewReports />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
