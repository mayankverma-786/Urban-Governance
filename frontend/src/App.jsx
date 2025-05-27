import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Index from './components/Index';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import PrivateRoute from './components/PrivateRoute';
import Services from './components/Services';
import Contact from './components/Contact';
import Complaint from './components/Complaint';

const App = () => {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken && storedToken !== 'null' ? storedToken : null;
  });

  const [user, setUser] = useState({
    name: '',
    isLoggedIn: false,
    avatar: '👨‍💼',
  });

  // Clear token once on first load if no token exists
//   useEffect(() => {
//     if (!localStorage.getItem('token')) {
//       localStorage.setItem('token', 'null');
//       setToken(null);
//     }
//   }, []);

  // Fetch user if token exists
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(token);
        
        const response = await axios.get('http://localhost:4000/auth/get-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.name) {
          setUser({
            name: response.data.name,
            isLoggedIn: true,
            avatar: '👨‍💼',
          });
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
        // localStorage.setItem('token', 'null');
        // setToken(null);
      }
    };

    if (token && token !== 'null') {
      fetchUser();
    }
  }, [token]);

  // Clear token on page unload
  useEffect(() => {
    const handleUnload = () => {
        // if(token==='null' || !isLoggedIn){
            localStorage.clear();
        // }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">

        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md p-4 md:p-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🏛️</div>
              <div>
                <h1 className="text-xl font-bold">UrbanConnect</h1>
                <p className="text-sm opacity-90">Smart Governance for Modern Cities</p>
              </div>
            </div>

            {user.isLoggedIn && (
              <div className="flex items-center gap-3 bg-white bg-opacity-20 px-4 py-2 rounded-full hover:bg-opacity-30 transition cursor-pointer">
                <div className="text-xl">{user.avatar}</div>
                <div className="flex flex-col text-sm">
                  <span className="opacity-80">Welcome back</span>
                  <span className="font-semibold">{user.name}</span>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white shadow-sm p-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 flex-wrap justify-center">
              <Link to="/" className="text-gray-800 hover:text-blue-600 font-medium">Home</Link>
              <Link to="/services" className="text-gray-800 hover:text-blue-600 font-medium">Services</Link>
              <Link to="/complaints" className="text-gray-800 hover:text-blue-600 font-medium">Complaints</Link>
              <Link to="/contact" className="text-gray-800 hover:text-blue-600 font-medium">Contact</Link>
            </div>
            <div>
            {user.isLoggedIn ? (
              <button
                onClick={() => {
                  setUser({ ...user, isLoggedIn: false });
                  localStorage.clear();
                  setToken(null);
                }}
                className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-600 hover:text-white transition"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition"
              >
                Login
              </Link>
            )}
            </div>
          </div>
        </nav>

        {/* Main Routing */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="*" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/Complaints" element={<Complaint token={token} />} />
              <Route path="/Dashboard" element={<UserDashboard token={token} />} />
              <Route
                path="/admin-dashboard"
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user-dashboard"
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white p-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🏛️</div>
              <h3 className="text-xl font-semibold">UrbanConnect</h3>
            </div>
            <div className="flex flex-wrap gap-12">
              <div>
                <h4 className="text-lg font-semibold mb-2">Services</h4>
                <Link to="/services" className="block text-gray-400 hover:text-white">All Services</Link>
                <Link to="/complaints" className="block text-gray-400 hover:text-white">File Complaint</Link>
                <Link to="/contact" className="block text-gray-400 hover:text-white">Request Help</Link>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Information</h4>
                <Link to="/about" className="block text-gray-400 hover:text-white">About Us</Link>
                <Link to="/news" className="block text-gray-400 hover:text-white">News</Link>
                <Link to="/faq" className="block text-gray-400 hover:text-white">FAQ</Link>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Legal</h4>
                <Link to="/privacy" className="block text-gray-400 hover:text-white">Privacy Policy</Link>
                <Link to="/terms" className="block text-gray-400 hover:text-white">Terms of Use</Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-6 pt-6 border-t border-gray-700 text-sm text-gray-400">
            © {new Date().getFullYear()} UrbanConnect Municipal Services. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
