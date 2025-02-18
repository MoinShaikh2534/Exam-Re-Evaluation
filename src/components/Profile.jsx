import React from "react";

const Profile = () => {
  return (
    <div className="flex items-center w-full bg-gray-800 text-white rounded-lg p-6 shadow-lg">
      {/* Left Section - Profile Image & Name */}
      <div className="w-1/4 flex items-center justify-center bg-gradient-to-b from-yellow-500 to-yellow-700 p-6 rounded-l-xl">
        <img
          className="w-24 h-24 rounded-full border-4 border-white"
          src="/path-to-your-image.jpg" // Replace with actual image path
          alt="Profile"
        />
        <h2 className="text-lg font-semibold ml-4">MOIN SHAIKH</h2>
      </div>

      {/* Right Section - Profile Details */}
      <div className="flex-1 p-6 flex justify-end">
        <div>
          <p className="text-gray-100 text-lg">22UCS119</p>
          <p className="text-gray-100 text-lg">Computer Science and Department</p>
          <p className="text-gray-100 text-lg">B.Tech-UCS</p>
          <div className="flex space-x-4">
            <p className="text-gray-300 text-lg">SEM: <span className="text-gray-100 text-l">06</span></p>
            <p className="text-gray-300 text-lg">SEC: <span className="text-gray-100 text-l">B</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;