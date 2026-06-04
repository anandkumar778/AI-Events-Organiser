"use client";

import { useState } from "react";

export default function DescriptionGeneratorPage() {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");

  const generateDescription = () => {
    setDescription(
      `${eventName} is a professionally organized event designed to deliver a memorable experience for all attendees.`
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        AI Description Generator
      </h1>

      <input
        type="text"
        placeholder="Event Name"
        className="border p-3 rounded w-full mb-4"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />

      <button
        onClick={generateDescription}
        className="bg-green-600 text-white px-5 py-3 rounded"
      >
        Generate Description
      </button>

      {description && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          {description}
        </div>
      )}
    </div>
  );
}