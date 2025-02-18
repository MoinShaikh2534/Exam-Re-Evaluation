import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-lg">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        {/* Title */}
        <div className="text-blue-700 text-xl font-bold">
          Exam Re-evaluation System
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex justify-end">
          <ul className="flex space-x-2 text-lg font-medium">
            <li>
              <a
                href="/home"
                className="text-black hover:bg-gray-200 py-2 px-4 rounded-lg transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/result"
                className="text-black hover:bg-gray-200 py-2 px-4 rounded-lg transition duration-300"
              >
                Result
              </a>
            </li>
            <li>
              <a
                href="/re-evaluation"
                className="text-black hover:bg-gray-200 py-2 px-4 rounded-lg transition duration-300"
              >
                Re-evaluation
              </a>
            </li>
            <li>
              <a
                href="/logout"
                className="text-red-600 hover:bg-red-200 py-2 px-4 rounded-lg transition duration-300"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;