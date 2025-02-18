import React, { useState } from 'react';

const Result = () => {
  const [results] = useState([
    { courseCode: "MATH101", subject: "Mathematics", marks: 85, maxMarks: 100 },
    { courseCode: "PHY101", subject: "Physics", marks: 78, maxMarks: 100 },
    { courseCode: "CHEM101", subject: "Chemistry", marks: 88, maxMarks: 100 },
    { courseCode: "BIO101", subject: "Biology", marks: 90, maxMarks: 100 },
    { courseCode: "ENG101", subject: "English", marks: 82, maxMarks: 100 },
    { courseCode: "HIST101", subject: "History", marks: 76, maxMarks: 100 },
    { courseCode: "GEO101", subject: "Geography", marks: 80, maxMarks: 100 },
    { courseCode: "CS101", subject: "Computer Science", marks: 92, maxMarks: 100 },
  ]);

  const totalMarksObtained = results.reduce((total, result) => total + result.marks, 0);
  const totalMaxMarks = results.reduce((total, result) => total + result.maxMarks, 0);
  const percentage = ((totalMarksObtained / totalMaxMarks) * 100).toFixed(2);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">Exam Results</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3">Course Code</th>
            <th className="p-3">Subject</th>
            <th className="p-3">Obtained Marks</th>
            <th className="p-3">Max Marks</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} className="border-b text-center">
              <td className="p-3">{result.courseCode}</td>
              <td className="p-3">{result.subject}</td>
              <td className="p-3">{result.marks}</td>
              <td className="p-3">{result.maxMarks}</td>
            </tr>
          ))}
          <tr className="font-bold text-center">
            <td className="p-3" colSpan="2">Total</td>
            <td className="p-3">{totalMarksObtained}</td>
            <td className="p-3">{totalMaxMarks}</td>
          </tr>
        </tbody>
      </table>
      <div className="text-right mt-4">
        <span className="text-xl font-semibold">Percentage: {percentage}%</span>
      </div>
    </div>
  );
};

export default Result;