import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import AdminLogin from './pages/auth/adminLogin';
import Login from './components/userlogin';
import SignUp from './components/usersignup';
import LandingPage from './pages/landingPage';
import AdminDashboard from './pages/dashboard';
import Dashboard from './components/userdashboard';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500); 
  
      return () => clearTimeout(timer);
    
  }, []);

  return (
    <Router>
           
             
                <Routes>
                 
                  <Route path="/" element={<LandingPage/>} />
                  <Route path="/admin/login" element={<AdminLogin/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/signup" element={<SignUp/>} />
                  <Route path="/login" element={<AdminLogin/>} />
                  <Route path="/admin/dashboard" element={<AdminDashboard/>} />
                  <Route path="/admin/dashboard/:path" element={<AdminDashboard/>} />
                  <Route path="/user/dashboard" element={<Dashboard/>} />
           
                </Routes>

    
            
    </Router>   
  )
}

export default App
