import React, { useState, useEffect } from 'react';
import imageDashboard from "../../../assets/image-login1.jpg";

const ManajerDashboard = () => {
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
        <h1 className="text-2xl font-bold">Manajer Dashboard</h1>
        <p>Welcome, {userName || 'User'} as Manajer! Here you can manage the system.</p>
        <img
          src={imageDashboard}
          alt="Admin Illustration"
          className="mt-4 w-1/2 h-auto rounded-lg "
        />
      </div>
    </>
  );
};

export default ManajerDashboard;