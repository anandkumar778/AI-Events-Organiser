"use client";

import { useState } from "react";

export default function SchedulePlannerPage() {
  const [eventName, setEventName] = useState("");
  const [schedule, setSchedule] = useState("");

  const generateSchedule = () => {
    setSchedule(`
09:00 AM - Registration
10:00 AM - Opening Ceremony
12:00 PM - Lunch Break
02:00 PM - Main Event
05:00 PM - Closing Ceremony
    `);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        AI Schedule Planner
      </h1>

      <input
        type="text"
        placeholder="Event Name"
        className="border p-3 rounded w-full mb-4"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />

      <button
        onClick={generateSchedule}
        className="bg-orange-600 text-white px-5 py-3 rounded"
      >
        Generate Schedule
      </button>

      {schedule && (
        <pre className="mt-6 bg-white p-4 rounded shadow whitespace-pre-wrap">
          {schedule}
        </pre>
      )}
    </div>
  );
}