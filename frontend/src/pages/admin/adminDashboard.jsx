import React, { useState, useEffect } from 'react';
import imageDashboard from "../../assets/image-login1.jpg";

const AdminDashboard = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Welcome, {userName || 'User'} as Admin! Here you can manage the system.</p>
        {/* Add your image below the welcome message */}
        <img
          src={imageDashboard} // Replace with your image path
          alt="Admin Illustration"
          className="mt-4 w-1/2 h-auto rounded-lg " // Adjust width and styles as needed
        />
      </div>
    </>
  );
};

export default AdminDashboard;