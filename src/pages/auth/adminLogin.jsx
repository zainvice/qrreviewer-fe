import React, { useState } from "react";
import { loginUser } from "../../api/userCalls";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      window.location.href = `/${decoded.role}/dashboard`;
    }

  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser({ email, password });

      const {token, user} = response
        
      localStorage.setItem("token", token)
    
      //setError(response.message || "Login Done!");
      window.location.href = `/${user.role}/dashboard`;
      
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1628611225356-badd4521f0cf?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
       <div className="absolute inset-0 bg-black opacity-50"></div>
       <div className="bg-white z-10 p-8 shadow-md rounded-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-16" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
          
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="mb-4">
     
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-lg shadow hover:bg-gray-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
         
       
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
