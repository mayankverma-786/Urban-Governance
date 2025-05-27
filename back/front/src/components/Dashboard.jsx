import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ token }) => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get('http://localhost:4000/issues', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIssues(response.data);
            } catch (err) {
                console.error(err);
                alert('Failed to fetch issues');
            }
        };
        fetchIssues();
    }, [token]);

    return (
        <div>
            <h1>Reported Issues</h1>
            <ul>
                {issues.map((issue) => (
                    <li key={issue._id}>
                        <h3>{issue.title}</h3>
                        <p>{issue.description}</p>
                        <p>Category: {issue.category}</p>
                        <p>Location: {issue.location}</p>
                        <p>Reported By: {issue.reportedBy.name} (ID: {issue.reportedBy._id})</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;