import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDashboard = (req,res) => {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const id=req.user.id;
                const token = localStorage.getItem('token');
                console.log("done");
                const response = await axios.get('http://localhost:4000/issue/get-issue', id ,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("done");
                setReports(response.data);
            } catch (err) {
                console.error('Error fetching reports:', err);
            }
        };

        fetchReports();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">User Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
            <p>Here are your submitted reports:</p>
            <ul>
                {reports.map((report) => (
                    <li key={report._id} className="border p-4 mb-2 rounded">
                        <h3 className="font-bold">{report.title}</h3>
                        <p>{report.description}</p>
                        <p>Status: {report.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;
