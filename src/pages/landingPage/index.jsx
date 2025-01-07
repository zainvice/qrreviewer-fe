import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
          <div className="text-2xl font-bold text-gray-800"> <img src="/logo-z.png" alt="Logo" className="h-8 hidden lg:block" /><img src="/favicon.png" alt="Logo" className="h-6 block lg:hidden" /></div>
          <div className="space-x-6">
            <Link to="/login" className="text-gray-600 hover:text-gray-800">
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto text-center py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Manage Your NFC and QR Stands Seamlessly
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-500">
            Connect your business effortlessly with our smart stand management platform. 
            Onboard your business, and reset stands in just a few clicks!
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/signup"
              className="px-8 py-3 bg-black text-white rounded-lg shadow hover:bg-gray-700"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="px-8 py-3 bg-gray-100 text-black rounded-lg shadow hover:bg-gray-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose Zepto Cards?</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature
              title="Easy QR & NFC Management"
              description="Generate unique QR and NFC codes with ease."
              icon="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            />
            <Feature
              title="Seamless Business Onboarding"
              description="Quickly connect your business and manage stands."
              icon="https://cdn-icons-png.flaticon.com/512/1485/1485092.png"
            />
            <Feature
              title="Reset Stands Anytime"
              description="Easily reset stands and reassign codes on the fly."
              icon="https://cdn-icons-png.flaticon.com/512/159/159604.png"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 Zepto Cards. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const Feature = ({ title, description, icon }) => (
  <div className="flex flex-col items-center">
    <img src={icon} alt="" className="w-16 h-16 mb-4" />
    <h3 className="text-xl font-bold text-gray-700">{title}</h3>
    <p className="text-gray-500 mt-2">{description}</p>
  </div>
);

export default LandingPage;
