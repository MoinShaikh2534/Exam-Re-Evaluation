import React from "react";
import Navbar from "./Navbar";
import Profile from "./Profile";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content (Page Content) */}
      <main className="flex-grow p-8 max-w-6xl mx-auto mt-10">{children}</main>
    </div>
  );
};

export default Layout;