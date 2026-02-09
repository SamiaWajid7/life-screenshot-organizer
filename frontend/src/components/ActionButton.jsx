import React, { useState } from "react";

export default function ActionButton({ screenshots }) {
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    // Filter only BUY items
    const buyItems = screenshots
      .filter((shot) => shot.intent.toUpperCase() === "BUY")
      .map((shot) => ({
        name: shot.name,
        category: shot.category || "unknown",
        intent: shot.intent.toUpperCase(), 
      }));

    if (buyItems.length < 2) {
      alert("Need at least 2 BUY screenshots to compare.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: buyItems }),
      });

      const data = await res.json();
      setComparison(data.table); // JSON table returned from backend
    } catch (err) {
      console.error("Comparison error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 text-center">
      <button
        onClick={handleCompare}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow"
      >
        {loading ? "Generating Comparison..." : "Generate Comparison"}
      </button>

      {comparison && Array.isArray(comparison) && comparison.length > 0 && (
        <table className="mt-4 border-collapse border border-gray-300 w-full text-left">
          <thead>
            <tr>
              {Object.keys(comparison[0]).map((key) => (
                <th key={key} className="border p-2 bg-gray-100">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((val, i) => (
                  <td key={i} className="border p-2">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
