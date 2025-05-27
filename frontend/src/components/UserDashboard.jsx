import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/+esm';
import Chatbot from './Chatbot';

const UserDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const decoded = jwt_decode(token);
        setUserId(decoded.id || decoded._id || null);

        const response = await axios.get('http://localhost:4000/issue/get-issue', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReports(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error in fetchReports:', err);
        setError('Failed to fetch reports.');
        setLoading(false);
      }
    };

    fetchReports();
  }, [navigate]);

  if (loading) {
    return <div className="p-6">Loading your reports...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  function handleAddReport() {
    // open form/modal or navigate to "new report" page
  }

  function handleUpdate(reportId) {
    // open edit form/modal
  }

  function handleDelete(reportId) {
    if (confirm('Are you sure you want to delete this report?')) {
      // call delete API
    }
  }

  function handleViewDetails(reportId) {
    // show more detailed view or navigate to detailed page
  }

  return (
    <div className="p-6 bg-[#183a37] min-h-screen text-[#efd6ac]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#efd6ac]">User Dashboard</h1>
        <button
          className="bg-[#c44900] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition font-semibold shadow-md"
          onClick={() => setShowChatbot(!showChatbot)}
        >
          {showChatbot ? 'Close Help Chatbot' : 'Open Help Chatbot'}
        </button>
      </div>

      <p className="mb-4 text-[#efd6ac]/80">
        Your User ID: <span className="font-semibold text-white">{userId}</span>
      </p>

      {showChatbot ? (
        <Chatbot />
      ) : reports.length === 0 ? (
        <p className="text-[#efd6ac]/70 italic">No reports found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => {
            const hasImage = report.imageURLs && report.imageURLs.length > 0;
            const imageUrl = hasImage
              ? `http://localhost:4000/file/${report.imageURLs[0]}`
              : '/404-error-with-tired-person-concept-illustration_114360-7899.jpg'; // Ensure this file exists in /public/images/

            return (
              <div
                key={report._id}
                className="bg-[#C6EBBE] text-[#04151f] rounded-lg shadow-md border border-[#432534]/20 flex flex-col h-[420px] overflow-hidden"
              >
                {/* Top Image Section */}
                <img
                  src={imageUrl}
                  alt="Report"
                  className="h-32 w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  onError={(e) => (e.currentTarget.src = '/404-error-with-tired-person-concept-illustration_114360-7899.jpg')}
                />

                {/* Content Section */}
                <div className="flex flex-col justify-between p-4 flex-1">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{report.title}</h3>
                    <p className="text-sm text-[#432534] mb-2">{report.description}</p>

                    <div className="flex items-center mb-2">
                      <span className="font-semibold mr-2 text-sm">Status:</span>
                      <span
                      className={`
                          px-2 py-1 rounded-full text-xs font-bold tracking-wide
                          ${report.status === 'Pending' ? 'bg-[#c44900]/20 text-[#c44900]' : ''}
                          ${report.status === 'Resolved' ? 'bg-green-200 text-green-800' : ''}
                          ${report.status === 'In Progress' ? 'bg-[#432534]/20 text-[#432534]' : ''}
                          ${!['Pending', 'Resolved', 'In Progress'].includes(report.status) ? 'bg-gray-300 text-gray-700' : ''}
                        `}
                      >
                        {report.status}
                      </span>
                    </div>

                    <p className="text-sm">
                      <span className="font-semibold">Location:</span> {report.location}
                    </p>
                  </div>

                  {/* Buttons at Bottom */}
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex justify-between gap-2">
                      <button
                        onClick={() => handleUpdate(report._id)}
                        className="flex-1 text-sm bg-[#432534] text-[#efd6ac] px-4 py-2 rounded hover:bg-opacity-90 transition font-semibold"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(report._id)}
                        className="flex-1 text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                    <button
                      onClick={() => handleViewDetails(report._id)}
                      className="flex-1 text-sm bg-[#432534] text-[#efd6ac] px-4 py-2 rounded hover:bg-opacity-90 transition font-semibold"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
  )}
    </div>
  );
};

export default UserDashboard;
