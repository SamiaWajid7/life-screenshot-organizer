import React from "react";

function ActionButton({ screenshots }) {
  const handleAction = () => {
    alert("Smart action executed! (Comparison table / notes placeholder)");
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={handleAction}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow"
      >
        Generate Smart Action
      </button>
    </div>
  );
}

export default ActionButton;
