import React, { useState, useEffect } from "react";
import UploadGrid from "./components/UploadGrid";
import ActionButton from "./components/ActionButton";

function App() {
  const [screenshots, setScreenshots] = useState([]);
  const handleUpload = async (files) => {
    const fileArray = Array.from(files); // Create preview objects first
    const newShots = fileArray.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      url: URL.createObjectURL(file),
      intent: "Analyzing...",
      file: file, // store original file for sending to backend
    }));
    setScreenshots((prev) => [...prev, ...newShots]);
    // Prepare FormData
    const formData = new FormData();
    fileArray.forEach((file) => {
      formData.append("screenshots", file);
    });
    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await response.json(); // Update screenshots with real intents
      setScreenshots((prev) =>
        prev.map((shot, index) => {
          if (index >= prev.length - data.length) {
            const result = data[index - (prev.length - data.length)];
            return {
              ...shot,
              intent: result.intent?.toUpperCase() || "UNKNOWN",
              category: result.category || "unknown",
            };
          }
          return shot;
        }),
      );
    } catch (error) {
      console.error("Error analyzing screenshots:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center my-6">
        {" "}
        Life Screenshot Organizer MVP{" "}
      </h1>
      <div className="flex justify-center mb-6">
        <label className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded cursor-pointer shadow">
          {" "}
          Choose File{" "}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleUpload(e.target.files)}
            className="hidden"
          />{" "}
        </label>
      </div>{" "}
      <UploadGrid screenshots={screenshots} />
      {screenshots.length > 1 && (
        <ActionButton screenshots={screenshots} />
      )}{" "}
    </div>
  );
}
export default App;
