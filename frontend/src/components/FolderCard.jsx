// src/components/FolderCard.jsx
import React from "react";

const FolderCard = ({ folder, onClick }) => {
  const colors = [
    "from-yellow-400 to-yellow-500",
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-teal-500 to-teal-600",
    "from-pink-500 to-pink-600",
  ];

  // Convert UUID → numeric hash
  const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const color = colors[hashString(folder.id) % colors.length];

    const formatDate = (dateString) => {
    const d = new Date(dateString);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`; // DD/MM/YYYY
  };

  return (
<div
  onClick={onClick}
  className="
    cursor-pointer 
    bg-white 
    border border-gray-200 
    rounded-2xl 
    p-5 
    shadow-sm 
    hover:shadow-lg 
    hover:-translate-y-1 
    transition-all duration-300
  "
>
  {/* Folder Icon */}
  <div
    className="
      h-12 w-12 
      rounded-xl 
      bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600
      flex items-center justify-center 
      shadow-md
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7h4l2 2h11v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7z"
      />
    </svg>
  </div>

  {/* Folder Name */}
  <h3 className="mt-4 text-lg font-semibold text-gray-800">
    {folder.name}
  </h3>

  {/* Created Date */}
  <p className="text-gray-400 text-xs mt-1">
    Created: {formatDate(folder.created_at)}
  </p>
</div>

  );
};

export default FolderCard;
