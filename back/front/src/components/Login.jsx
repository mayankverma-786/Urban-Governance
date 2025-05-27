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
      navigate(data.role === 'admin' ? '/admin-dashboard' : '/');
    } catch {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-50 font-inter px-4">
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
  );
};

export default Login;
