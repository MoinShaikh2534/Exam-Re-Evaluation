import React from "react";

const results = [
  { subject: "Data Structures", date: "Dec 15, 2023", score: "85/100", status: "pending" },
  { subject: "Algorithm", date: "Dec 18, 2023", score: "92/100", status: "reviewed" },
  { subject: "Java", date: "Dec 24, 2023", score: "90/100", status: "reviewed" },
  { subject: "Computer Network", date: "Dec 18, 2023", score: "92/100", status: "reviewed" },
  { subject: "Machine Learning", date: "Dec 18, 2023", score: "92/100", status: "pending" },
];

function Results() {
  return (
    <div className="bg-gray-100 px-6 py-4">
      {/* Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-0">
        {results.map((result, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-md border border-green-300 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <h3 className="text-xl font-bold text-green-900">{result.subject}</h3>
            <p className="text-gray-500 text-sm">{result.date}</p>

            <hr className="border-t border-gray-300 my-2" />

            <p className="text-lg font-semibold text-gray-800">Score: {result.score}</p>
            <p className={`text-sm font-semibold mt-1 ${result.status === "pending" ? "text-yellow-500" : "text-green-600"}`}>
              {result.status}
            </p>
            <button className="mt-4 px-5 py-2 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 hover:shadow-lg transition-all duration-300 cursor-pointer">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
