import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Login from './Login';
import Signup from './Signup';

interface FormSubmission {
  _id: string;
  username: string;
  email: string;
  phonenumber: string;
  qualification: string;
  message: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [formData, setFormData] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/form-data-all`);
        if (Array.isArray(response.data)) {
          setFormData(response.data);
        } else {
          console.error('Received non-array data:', response.data);
          setFormData([]);
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
        setError('Failed to fetch form submissions');
        setFormData([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchFormData();
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setFormData([]);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-dashboard p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-6">Admin Dashboard</h1>
        <div>
          <button onClick={toggleForm} className="bg-blue-500 text-white rounded py-2 px-4 mb-4">
            {isLogin ? 'Switch to Signup' : 'Switch to Login'}
          </button>
          {isLogin ? <Login onLoginSuccess={handleLoginSuccess} /> : <Signup />}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="admin-dashboard p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white rounded py-2 px-4 hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
      
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Form Submissions</h2>
        {formData.length > 0 ? (
          <div className="overflow-x-auto bg-green-primary rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.map((submission) => (
                  <tr key={submission._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.phonenumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.qualification}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{submission.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-gray-500">No form submissions yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
