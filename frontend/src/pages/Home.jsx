import React from 'react';
import SubjectCard from "../components/SubjectCard";

const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'History',
  'Geography',
  'Computer Science'
];

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 w-full max-w-[90%]">
        {subjects.map((subject, index) => (
          <SubjectCard key={index} subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default Home;