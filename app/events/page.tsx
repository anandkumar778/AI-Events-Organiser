"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Sidebar from "@/app/components/layout/Sidebar";
import Footer from "@/app/components/layout/Footer";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
import eventService from "@/app/services/eventService";

interface Event {
  _id: string;
  id?: string;
  title: string;
  description: string;
  category: string;
  eventDate: string;
  location: string;
  ticketPrice: number;
  totalSeats: number;
  availableSeats: number;
  bannerImage?: string;
  status?: "upcoming" | "completed" | "cancelled";
  organizer?: {
    _id?: string;
    id: string;
    name: string;
    email: string;
  };
  createdAt?: string;
}

const STATUS_COLORS: Record<string, string> = {
  upcoming: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-700",
};

const CATEGORY_ICONS: Record<string, string> = {
  Conference: "🎤",
  Workshop: "🛠️",
  Seminar: "📚",
  Festival: "🎉",
  Concert: "🎵",
  Meetup: "🤝",
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await eventService.getEvents();
      if (data.success) {
        // Map id to _id and ensure status is set if missing
        const mappedEvents = (data.data || []).map((e: any) => ({
          ...e,
          _id: e._id || e.id,
          status: e.status || "upcoming",
          category: e.category || "Conference"
        }));
        setEvents(mappedEvents as Event[]);
      } else {
        setError("Failed to load events");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Cannot connect to server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.location.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-col lg:flex-row flex-1">
        <Sidebar />

        <main className="flex-1 w-full">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Events</h1>
                <p className="text-gray-500 mt-1 text-sm">
                  {events.length} event{events.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <Link
                href="/events/create"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap"
              >
                + Create Event
              </Link>
            </div>

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="🔍  Search events by title, location, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-lg border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading events...</p>
                </div>
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
                <p className="font-medium">❌ {error}</p>
                <button
                  onClick={fetchEvents}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-6xl mb-4">📅</p>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {search ? "No events match your search" : "No events yet"}
                </h3>
                <p className="text-gray-500 mb-6">
                  {search
                    ? "Try a different search term"
                    : "Create your first event to get started!"}
                </p>
                {!search && (
                  <Link
                    href="/events/create"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Create First Event
                  </Link>
                )}
              </div>
            )}

            {/* Events Grid */}
            {!loading && !error && filtered.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200 overflow-hidden"
                  >
                    {/* Banner */}
                    <div className="h-40 bg-linear-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-5xl relative">
                      {event.bannerImage ? (
                        <img
                          src={event.bannerImage}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <span>{CATEGORY_ICONS[event.category] || "📅"}</span>
                      )}

                      {/* Status Badge */}
                      <span
                        className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[event.status ?? "upcoming"] || "bg-gray-100 text-gray-600"}`}
                      >
                        {event.status}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          {event.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                        {event.title}
                      </h3>

                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-1.5 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <span>📍</span>
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>📅</span>
                          <span>
                            {new Date(event.eventDate).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>🎫</span>
                          <span>
                            {event.ticketPrice === 0
                              ? "Free"
                              : `₹${event.ticketPrice.toLocaleString()}`}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span>{event.availableSeats} seats left</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/events/${event._id}`}
                          className="flex-1 text-center py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          View Details
                        </Link>
                        <button
                          className="py-2 px-3 border border-gray-200 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-600 transition-colors"
                        >
                          🔖 Save
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}