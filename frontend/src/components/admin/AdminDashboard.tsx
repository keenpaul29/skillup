import React, { useState } from 'react';
import useFetchFormData from '../../hooks/useFetchFormData';
import Login from './Login';
import Signup from './Signup';

const AdminDashboard = () => {
    const { formData, loading, error } = useFetchFormData();
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
    const [isLogin, setIsLogin] = useState(true); // State to manage toggle

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const toggleForm = () => {
        setIsLogin(!isLogin); // Toggle between login and signup
    };

    return (
        <div className="admin-dashboard p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">Admin Dashboard</h1>
            {isAuthenticated ? (
                <div>
                    <button onClick={handleLogout} className="bg-red-500 text-white rounded py-2 px-4 mb-4">
                        Sign Out
                    </button>
                    <table className="min-w-full bg-green-primary shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="px-4 py-2">Username</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Phone Number</th>
                                <th className="px-4 py-2">Qualification</th>
                                <th className="px-4 py-2">Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.map((submission) => (
                                <tr key={submission._id} className="hover:bg-gray-200">
                                    <td className="border px-4 py-2">{submission.username}</td>
                                    <td className="border px-4 py-2">{submission.email}</td>
                                    <td className="border px-4 py-2">{submission.phonenumber}</td>
                                    <td className="border px-4 py-2">{submission.qualification}</td>
                                    <td className="border px-4 py-2">{submission.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <button onClick={toggleForm} className="bg-blue-500 text-white rounded py-2 px-4 mb-4">
                        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
                    </button>
                    {isLogin ? <Login onLoginSuccess={handleLoginSuccess} /> : <Signup />} {/* Conditional rendering */}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
