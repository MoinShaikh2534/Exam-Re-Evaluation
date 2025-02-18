import React, { useState } from "react";

const ReEvaluation = () => {
  const [subjects, setSubjects] = useState({
    Mathematics: false,
    Physics: false,
    Chemistry: false,
    Biology: false,
    English: false,
    History: false,
    Geography: false,
    ComputerScience: false,
  });
  const [transactionId, setTransactionId] = useState('');
  const [name] = useState('MOIN SHAIKH');
  const [prn] = useState('22UCS119');
  const [branch] = useState('Computer Science and Department');

  const handleSubjectChange = (e) => {
    setSubjects({
      ...subjects,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedSubjects = Object.keys(subjects).filter(subject => subjects[subject]);
    alert(`Re-evaluation requested for ${selectedSubjects.join(', ')} with Transaction ID: ${transactionId}`);
    setSubjects({
      Mathematics: false,
      Physics: false,
      Chemistry: false,
      Biology: false,
      English: false,
      History: false,
      Geography: false,
      ComputerScience: false,
    });
    setTransactionId('');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-left mb-2 text-gray-700">Name:</label>
          <input type="text" value={name} readOnly className="border p-2 rounded w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-left mb-2 text-gray-700">PRN:</label>
          <input type="text" value={prn} readOnly className="border p-2 rounded w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-left mb-2 text-gray-700">Branch:</label>
          <input type="text" value={branch} readOnly className="border p-2 rounded w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-left mb-2 text-gray-700">Subjects:</label>
          <div className="flex flex-wrap items-start">
            {Object.keys(subjects).map((subject) => (
              <label key={subject} className="mb-2 flex items-center mr-4">
                <input
                  type="checkbox"
                  name={subject}
                  checked={subjects[subject]}
                  onChange={handleSubjectChange}
                  className="mr-2"
                />
                {subject.replace(/([A-Z])/g, ' $1').trim()}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-left mb-2 text-gray-700">QR Code for Payment:</label>
          <img
            src="QR.jpg" // Replace with the actual path to your QR code image
            alt="QR Code"
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-left mb-2 text-gray-700">Transaction ID:</label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-800">
          Request Re-evaluation
        </button>
      </form>
    </div>
  );
};

export default ReEvaluation;