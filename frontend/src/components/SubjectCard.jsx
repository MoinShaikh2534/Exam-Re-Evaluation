import React from 'react';

const SubjectCard = ({ subject }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-white p-10 shadow-lg rounded-xl w-[300px] h-[350px] transition-transform transform hover:scale-105 hover:shadow-2xl gap-20 mb-8 mx-4">
      <span className="text-2xl font-bold text-gray-900">{subject}</span>
      <p className="text-center text-gray-600 mt-2">
        Click to review your answer sheet for {subject}
      </p>
      <button className="mt-4 bg-blue-500 text-white px-8 py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all">
        View
      </button>
    </div>
  );
};

export default SubjectCard;