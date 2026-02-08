import React, { useState, useEffect } from "react";
import UploadGrid from "./components/UploadGrid";
import ActionButton from "./components/ActionButton";

function App() {
  const [screenshots, setScreenshots] = useState([]);

  // Load screenshots from localStorage on page load
  useEffect(() => {
    const savedShots = localStorage.getItem("screenshots");
    if (savedShots) {
      setScreenshots(JSON.parse(savedShots));
    }
  }, []);

  // Save screenshots to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("screenshots", JSON.stringify(screenshots));
  }, [screenshots]);

  const handleUpload = (files) => {
    const newShots = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      url: URL.createObjectURL(file), // This will still reset on refresh
      intent: "Loading...",
    }));
    setScreenshots([...screenshots, ...newShots]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center my-6">
        Life Screenshot Organizer MVP
      </h1>

      <div className="flex justify-center mb-6">
        <label className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded cursor-pointer shadow">
          Choose File
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleUpload(e.target.files)}
            className="hidden"
          />
        </label>
      </div>

      <UploadGrid screenshots={screenshots} />

      {screenshots.length > 1 && <ActionButton screenshots={screenshots} />}
    </div>
  );
}

export default App;
