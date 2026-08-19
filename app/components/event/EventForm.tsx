"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Categories MUST match the backend enum exactly
const CATEGORIES = [
  "Conference",
  "Workshop",
  "Seminar",
  "Festival",
  "Concert",
  "Meetup",
];

export default function EventForm() {
  const { token, user } = useContext(AuthContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    eventDate: "",
    location: "",
    ticketPrice: "",
    totalSeats: "",
    availableSeats: "",
    bannerImage: "",
    status: "upcoming",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate required fields
    if (!formData.title || !formData.description || !formData.category || !formData.eventDate || !formData.location || !formData.totalSeats) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!token) {
      setError("You must be logged in to create an event. Please login first.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        eventDate: new Date(formData.eventDate).toISOString(),
        location: formData.location,
        ticketPrice: Number(formData.ticketPrice) || 0,
        totalSeats: Number(formData.totalSeats),
        availableSeats: Number(formData.availableSeats) || Number(formData.totalSeats),
        bannerImage: formData.bannerImage || "",
        status: formData.status,
        organizer: user?.id,
      };

      const response = await fetch(`${API_BASE}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("✅ Event created successfully!");
        // Reset form
        setFormData({
          title: "",
          description: "",
          category: "",
          eventDate: "",
          location: "",
          ticketPrice: "",
          totalSeats: "",
          availableSeats: "",
          bannerImage: "",
          status: "upcoming",
        });
        // Redirect after 1.5 seconds
        setTimeout(() => {
          router.push("/events");
        }, 1500);
      } else {
        setError(data.message || "Failed to create event. Please try again.");
      }
    } catch (err) {
      console.error("Create event error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">Create Event</h2>
      <p className="text-gray-500 mb-6">Fill in the details below to publish your event</p>

      {/* Error / Success Banners */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm">
          ❌ {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg text-green-700 text-sm">
          {success}
        </div>
      )}

      {!token && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-yellow-700 text-sm">
          ⚠️ You are not logged in. Please{" "}
          <a href="/auth/login" className="underline font-semibold">login</a>{" "}
          to create an event.
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Event Title"
            required
          />
        </div>

        {/* Category - matches backend enum */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your event..."
            required
          />
        </div>

        {/* Event Date */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Event Date & Time <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="City, Venue"
            required
          />
        </div>

        {/* Ticket Price */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Ticket Price (₹)
          </label>
          <input
            type="number"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0 for free"
            min="0"
          />
        </div>

        {/* Total Seats */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Total Seats <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="totalSeats"
            value={formData.totalSeats}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="100"
            min="1"
            required
          />
        </div>

        {/* Available Seats */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Available Seats
          </label>
          <input
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Leave blank to match Total Seats"
            min="0"
          />
        </div>

        {/* Banner Image */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Banner Image URL
          </label>
          <input
            type="text"
            name="bannerImage"
            value={formData.bannerImage}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading || !token}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {loading ? "Creating Event..." : "🚀 Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
}