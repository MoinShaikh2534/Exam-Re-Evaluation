import React from "react";
import { MdDashboard } from "react-icons/md";
import { HiDocumentText } from "react-icons/hi";
import { TbArrowsExchange } from "react-icons/tb";
import { FaSignOutAlt } from "react-icons/fa";

function Navbar() {
 
  const student = {
    profilePic: "", 
    name: "Revati Khasnis",
    class: "TY CSE",
    rollNo: "22UCS109",
  };

  return (
    <div className="bg-gray-100 text-[#2C3E50]">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-[#2E593A] to-[#3C7D50] text-white py-4 px-8 flex justify-between items-center shadow-lg rounded-b-xl">
        <div className="flex gap-8 text-lg">
          <a href="#" className="flex items-center gap-2 hover:text-[#95cfa6] transition-all duration-300">
            <MdDashboard size={20} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-[#95cfa6] transition-all duration-300">
            <HiDocumentText size={20} /> Results
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-[#95cfa6] transition-all duration-300">
            <TbArrowsExchange size={20} /> Re-evaluation
          </a>
        </div>
        <button className="flex items-center gap-2 bg-[#FF6B6B] px-4 py-2 rounded-lg hover:bg-[#E04A4A] transition-all duration-300 shadow-md">
          <FaSignOutAlt size={18} /> Logout
        </button>
      </nav>

      <div className="relative bg-white/80 backdrop-blur-lg p-4 rounded-xl mt-6 shadow-md flex items-center gap-4 border border-[#A2D9B1] max-w-md mx-auto">
      
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center border-2 border-[#A2D9B1] shadow-md overflow-hidden">
          {student.profilePic ? (
            <img src={student.profilePic} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl text-gray-500">👤</span>
          )}
        </div>
      
        <div>
          <h2 className="text-xl font-semibold text-[#2E593A]">{student.name}</h2>
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Class:</span> {student.class}
          </p>
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Roll No:</span> {student.rollNo}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
