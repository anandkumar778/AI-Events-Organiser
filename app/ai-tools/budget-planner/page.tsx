"use client";

import { useState } from "react";

export default function BudgetPlannerPage() {
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");

  const calculateBudget = () => {
    const total = Number(guests) * 1000;
    setBudget(`Estimated Budget: ₹${total}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        AI Budget Planner
      </h1>

      <input
        type="number"
        placeholder="Number of Guests"
        className="border p-3 rounded w-full mb-4"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      />

      <button
        onClick={calculateBudget}
        className="bg-purple-600 text-white px-5 py-3 rounded"
      >
        Calculate Budget
      </button>

      {budget && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          {budget}
        </div>
      )}
    </div>
  );
}