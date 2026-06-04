"use client";

import { useState } from "react";

export default function TitleGeneratorPage() {
  const [eventType, setEventType] = useState("");
  const [title, setTitle] = useState("");

  const generateTitle = () => {
    setTitle(`Amazing ${eventType} Event 2026`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        AI Event Title Generator
      </h1>

      <input
        type="text"
        placeholder="Event Type"
        className="border p-3 rounded w-full mb-4"
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
      />

      <button
        onClick={generateTitle}
        className="bg-blue-600 text-white px-5 py-3 rounded"
      >
        Generate Title
      </button>

      {title && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          {title}
        </div>
      )}
    </div>
  );
}