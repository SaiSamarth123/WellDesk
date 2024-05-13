import React from "react";
import "./Popup.css"; // Style your component with Tailwind classes

function Popup() {
  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div>
        <div className="text-xl font-medium text-black">
          Welcome to the Mental Health Extension
        </div>
        <p className="text-gray-500">Your daily dose of well-being.</p>
      </div>
    </div>
  );
}

export default Popup;
