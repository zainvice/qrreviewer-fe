import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "./loader";
import { handleStandRedirection } from "../api/standCalls";
import { registerUser } from "../api/userCalls";

const SignUp = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const standId = queryParams.get('standId'); 

  const [loading, setLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false); // For register button
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const redirectUser = async () => {
      try {
        const response = await handleStandRedirection(standId);
        console.log(response);
        if(!response.googleReviewLink){
          setLoading(false);
        }
        window.location.href = response.googleReviewLink;
      } catch (error) {
        console.error("ERROR: ", error);
        setLoading(false);
      }
    };
    redirectUser();
  }, [standId]);

  const handleRegister = async () => {
    setRegisterLoading(true); // Start register loading
    setError(""); // Clear previous error
    try {
      // Include standId in the formData
      const dataToSend = { ...formData, standId };

      // Call registerUser function
      const response = await registerUser(dataToSend);

      console.log(response)

      const {token, user} = response
        
      localStorage.setItem("token", token)
    
      //setError(response.message || "Sign up Done!");
      window.location.href = "/user/dashboard";
      
     /*  if (response.success) {
        navigate("/login"); // Redirect on successful registration
      } else {
        setError(response.message || "Something went wrong!");
      } */
    } catch (err) {
      setError(err.response?.data?.message || "Server error. Try again later.");
    } finally {
      setRegisterLoading(false); // End register loading
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(); // Call the register handler
  };

  if (loading) {
    return <Loader />;
  }

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
          Create Account
        </h2>
        {error && (
          <p className="text-sm text-red-500 mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />
          <button
            type="submit"
            disabled={registerLoading} // Disable button during loading
            className={`w-full py-3 ${
              registerLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-700"
            } text-white rounded-lg shadow`}
          >
            {registerLoading ? "Registering..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
