"use client";

import { useState, useEffect } from "react";
import { useAuth, useEvents } from "@/app/hooks";
import Loader from "@/app/components/ui/Loader";
import Button from "@/app/components/ui/Button";

/**
 * Example Component - Shows how to use useAuth and useEvents hooks
 * 
 * Features demonstrated:
 * - Using custom hooks
 * - Error handling
 * - Loading states
 * - Data fetching
 * - Form submission
 */

interface AuthEvent {
  id: string;
  title: string;
  date: string;
  location: string;
}

export default function ExampleComponent() {
  // Using useAuth hook
  const { user, isAuthenticated, login, logout, isLoading: authLoading } = useAuth();

  // Using useEvents hook
  const {
    events,
    isLoading: eventsLoading,
    error: eventsError,
    getEvents,
    createEvent,
  } = useEvents();

  // Local form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: 100,
    price: 1000,
  });

  // Fetch events when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      getEvents();
    }
  }, [isAuthenticated, getEvents]);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      // Reset form
      setFormData({ email: "", password: "" });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // Handle create event
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEvent({
        title: eventForm.title,
        description: eventForm.description,
        date: eventForm.date,
        location: eventForm.location,
        capacity: eventForm.capacity,
        price: eventForm.price,
      });
      // Reset form
      setEventForm({
        title: "",
        description: "",
        date: "",
        location: "",
        capacity: 100,
        price: 1000,
      });
      alert("Event created successfully!");
    } catch (err) {
      console.error("Failed to create event:", err);
    }
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
            required
          />
          <Button
            text="Login"
            variant="primary"
            size="lg"
            fullWidth={true}
            loading={authLoading}
            type="submit"
          />
        </form>
      </div>
    );
  }

  // Show authenticated content
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* User Info */}
      <div className="bg-blue-50 p-4 rounded mb-6">
        <p className="text-lg">
          Welcome, <strong>{user?.fullName}</strong>!
        </p>
        <p className="text-sm text-gray-600">Email: {user?.email}</p>
        <Button
          text="Logout"
          variant="danger"
          size="md"
          onClick={logout}
        />
      </div>

      {/* Create Event Form */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">Create Event</h2>
        <form onSubmit={handleCreateEvent}>
          <input
            type="text"
            placeholder="Event Title"
            value={eventForm.title}
            onChange={(e) =>
              setEventForm({ ...eventForm, title: e.target.value })
            }
            className="w-full p-2 border rounded mb-3"
            required
          />
          <textarea
            placeholder="Description"
            value={eventForm.description}
            onChange={(e) =>
              setEventForm({ ...eventForm, description: e.target.value })
            }
            className="w-full p-2 border rounded mb-3 h-20"
            required
          />
          <input
            type="date"
            value={eventForm.date}
            onChange={(e) =>
              setEventForm({ ...eventForm, date: e.target.value })
            }
            className="w-full p-2 border rounded mb-3"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={eventForm.location}
            onChange={(e) =>
              setEventForm({ ...eventForm, location: e.target.value })
            }
            className="w-full p-2 border rounded mb-3"
            required
          />
          <input
            type="number"
            placeholder="Capacity"
            value={eventForm.capacity}
            onChange={(e) =>
              setEventForm({ ...eventForm, capacity: parseInt(e.target.value) })
            }
            className="w-full p-2 border rounded mb-3"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={eventForm.price}
            onChange={(e) =>
              setEventForm({ ...eventForm, price: parseInt(e.target.value) })
            }
            className="w-full p-2 border rounded mb-4"
            required
          />
          <Button
            text="Create Event"
            variant="success"
            size="lg"
            fullWidth={true}
            loading={eventsLoading}
            type="submit"
          />
        </form>
      </div>

      {/* Events List */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Your Events</h2>

        {eventsError && (
          <div className="bg-red-50 p-4 rounded mb-4 text-red-700">
            {eventsError}
          </div>
        )}

        {eventsLoading ? (
          <Loader size="lg" message="Loading events..." />
        ) : events.length === 0 ? (
          <p className="text-gray-600">No events yet. Create one above!</p>
        ) : (
          <div className="grid gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 border rounded hover:shadow-lg transition"
              >
                <h3 className="font-bold text-lg">{event.title}</h3>
                <p className="text-gray-600 text-sm">
                  📅 {event.date} | 📍 {event.location}
                </p>
                <p className="text-gray-700 mt-2">{event.description}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Capacity: {event.capacity} | Price: ₹{event.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
