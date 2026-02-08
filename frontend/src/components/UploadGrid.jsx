import React, { useEffect } from "react";
import ScreenshotCard from "./ScreenshotCard";

function UploadGrid({ screenshots }) {
  useEffect(() => {
    console.log('hello')
console.log(screenshots)
  }, [])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {screenshots.map((shot) => (
        <ScreenshotCard key={shot.id} shot={shot} />
      ))}
    </div>
  );
}

export default UploadGrid;
