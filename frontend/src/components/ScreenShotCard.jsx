import React from "react";

function ScreenshotCard({ shot }) {
  return (
    <div className="bg-white shadow rounded-lg p-3 flex flex-col items-center">
      <img
        src={shot.url}
        alt={shot.name}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <p className="text-gray-700 font-semibold">{shot.name}</p>
      <p className="text-blue-500 mt-1">Intent: {shot.intent}</p>
      {shot.category && (
        <p className="text-green-500 mt-1 text-sm">Category: {shot.category}</p>
      )}
      {shot.cluster && (
        <p className="text-purple-500 mt-1 text-sm">Cluster: {shot.cluster}</p>
      )}
    </div>
  );
}

export default ScreenshotCard;
