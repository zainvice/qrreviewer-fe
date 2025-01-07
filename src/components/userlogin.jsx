import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userCalls";

const Login = () => {

  const [email, setEmail] = useState("");
  const navigate = useNavigate()
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

        
      console.log(response)
      const {token, user} = response
        
      localStorage.setItem("token", token)
    
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
        backgroundImage: `url('https://images.unsplash.com/photo-1550482781-48d477e61c72?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
       <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white z-10 p-8 shadow-md rounded-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-16" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        {error && (
          <p className="text-sm text-red-500 mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email Address"
              required
            />
        <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              required
            />
           <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-lg shadow hover:bg-gray-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
