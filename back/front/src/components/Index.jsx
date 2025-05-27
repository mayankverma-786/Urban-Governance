import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route
              path="/"
              element={
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-2xl text-center shadow-md">
                  <h2 className="text-3xl md:text-4xl text-blue-700 font-bold mb-4">
                    Your Gateway to Smarter City Living
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
                    Access all municipal services in one convenient platform
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                      to="/services"
                      className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-700 transition"
                    >
                      Explore Services
                    </Link>
                    <Link
                      to="/contact"
                      className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition"
                    >
                      Get Help
                    </Link>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Home;
