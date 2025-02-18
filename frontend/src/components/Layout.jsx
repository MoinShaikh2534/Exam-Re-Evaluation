import React from "react";
import Navbar from "./Navbar";
import Profile from "./Profile";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Profile Section */}
      <div className="min-h-20 flex flex-col bg-gray-100 mt-10 mx-10">
        <Profile />
      </div>

      {/* Main Content (Page Content) */}
      <main className="flex-grow p-8 max-w-6xl mx-auto mt-10">{children}</main>
    </div>
  );
};

export default Layout;