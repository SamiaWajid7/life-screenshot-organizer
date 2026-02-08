import React from "react";

function ScreenShotCard({ shot }) {
  return (
    <div className="bg-white shadow rounded-lg p-3 flex flex-col items-center">
      <img
        src={shot.url}
        alt={shot.name}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <p className="text-gray-700 font-semibold">{shot.name}</p>
      <p className="text-blue-500 mt-1">Intent: {shot.intent}</p>
    </div>
  );
}

export default ScreenShotCard;
