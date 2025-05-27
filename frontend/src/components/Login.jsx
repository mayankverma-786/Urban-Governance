// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post('http://localhost:4000/auth/login', formData);
      setToken(data.jwtToken);
      localStorage.setItem('token', data.jwtToken);
      localStorage.setItem('role', data.role);
      navigate(data.role === 'admin' ? '/admin-dashboard' : '/user-dashboard');
    } catch {
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Login failed: ${err.response.data.message}`);
      } else {
        setError('Login failed. Please check your credentials.');
      }
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex w-full max-w-7xl">

        {/* Image Section */}
        <div className="w-1/2 h-full relative hidden lg:block">
          <img
            src="/aerial-view-city_1048944-25076897.jpg"
            alt="Login visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-opacity-60 flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold">Welcome Back</h2>
          </div>
        </div>

        {/* Form Section */}
        <div className=" bg-indigo-50 p-10 shadow-lg w-full lg:w-1/2 rounded-r-lg">
              <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border">
                <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Login to Your Account</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
        
                <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
        
                <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                  className="w-full mb-6 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
        
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                  Sign In
                </button>
        
                <p className="text-center mt-4 text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-amber-500 font-semibold hover:underline">
                    Create one
                  </Link>
                </p>
              </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
