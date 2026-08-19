"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

import Navbar from "@/app/components/layout/Navbar";
import Sidebar from "@/app/components/layout/Sidebar";
import Footer from "@/app/components/layout/Footer";

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

  // ==========================================
  // FETCH EVENTS
  // ==========================================

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await eventService.getEvents();

      if (data.success) {
        const mappedEvents = (data.data || []).map((e: any) => ({
          ...e,
          _id: e._id || e.id,
          status: e.status || "upcoming",
          category: e.category || "Conference",
        }));

        setEvents(mappedEvents as Event[]);
      } else {
        setError("Failed to load events");
      }
    } catch (err: any) {
      console.error(err);

      setError(
        err?.message ||
          "Cannot connect to server. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // ==========================================
  // SEARCH
  // ==========================================

  const filtered = events.filter((event) => {
    const searchText = search.toLowerCase();

    return (
      event.title?.toLowerCase().includes(searchText) ||
      event.location?.toLowerCase().includes(searchText) ||
      event.category?.toLowerCase().includes(searchText)
    );
  });

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  // ==========================================
  // EVENT IMAGE
  // ==========================================

  const getEventImage = (event: Event) => {
    if (event.bannerImage) {
      return event.bannerImage;
    }

    return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=700&fit=crop";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080909] text-white">

      {/* ======================================
          NAVBAR
      ====================================== */}

      <Navbar />

      <div className="flex flex-col lg:flex-row flex-1">

        {/* ======================================
            SIDEBAR
        ====================================== */}

        <Sidebar />

        {/* ======================================
            MAIN
        ====================================== */}

        <main className="flex-1 w-full">

          <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

            {/* ======================================
                HEADER
            ====================================== */}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-8">

              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Explore Events
                </h1>

                <p className="text-gray-400 mt-2">
                  Discover amazing events and book your tickets
                </p>

                <div className="mt-4 inline-flex items-center px-4 py-2 bg-white/10 border border-white/10 rounded-full text-sm text-gray-300">
                  {events.length} event
                  {events.length !== 1 ? "s" : ""} available
                </div>
              </div>

              <Link
                href="/events/create"
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  hover:from-cyan-400
                  hover:to-blue-500
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  font-semibold
                  shadow-lg
                  shadow-blue-500/20
                  transition-all
                "
              >
                <span className="text-xl">+</span>
                Create Event
              </Link>
            </div>

            {/* ======================================
                SEARCH
            ====================================== */}

            <div className="mb-8">

              <div className="relative max-w-xl">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search events..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                    w-full
                    bg-[#151515]
                    border
                    border-white/10
                    text-white
                    placeholder:text-gray-500
                    rounded-xl
                    pl-12
                    pr-12
                    py-3.5
                    focus:outline-none
                    focus:ring-2
                    focus:ring-cyan-500/50
                    focus:border-cyan-500/50
                    transition
                  "
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                      hover:text-white
                    "
                  >
                    ✕
                  </button>
                )}

              </div>

            </div>

            {/* ======================================
                LOADING
            ====================================== */}

            {loading && (
              <div className="flex items-center justify-center py-24">

                <div className="text-center">

                  <div
                    className="
                      animate-spin
                      w-12
                      h-12
                      border-4
                      border-cyan-500
                      border-t-transparent
                      rounded-full
                      mx-auto
                      mb-5
                    "
                  />

                  <p className="text-gray-400">
                    Loading events...
                  </p>

                </div>

              </div>
            )}

            {/* ======================================
                ERROR
            ====================================== */}

            {error && !loading && (
              <div
                className="
                  max-w-xl
                  mx-auto
                  p-8
                  bg-[#151515]
                  border
                  border-red-500/20
                  rounded-2xl
                  text-center
                "
              >

                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center text-3xl">
                  ⚠️
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  Something went wrong
                </h3>

                <p className="text-red-400 text-sm mb-5">
                  {error}
                </p>

                <button
                  onClick={fetchEvents}
                  className="
                    px-5
                    py-2.5
                    bg-red-600
                    text-white
                    rounded-xl
                    text-sm
                    font-semibold
                    hover:bg-red-700
                  "
                >
                  🔄 Retry
                </button>

              </div>
            )}

            {/* ======================================
                EMPTY
            ====================================== */}

            {!loading && !error && filtered.length === 0 && (
              <div className="text-center py-24">

                <div
                  className="
                    w-24
                    h-24
                    mx-auto
                    mb-6
                    rounded-full
                    bg-cyan-500/10
                    flex
                    items-center
                    justify-center
                    text-5xl
                  "
                >
                  📅
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {search
                    ? "No events found"
                    : "No events available"}
                </h3>

                <p className="text-gray-500 mb-7">
                  {search
                    ? "Try searching with a different title, location, or category."
                    : "Create your first event and start managing your event bookings."}
                </p>

                {!search && (
                  <Link
                    href="/events/create"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      bg-cyan-600
                      text-white
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                      hover:bg-cyan-500
                    "
                  >
                    + Create First Event
                  </Link>
                )}

              </div>
            )}

            {/* ======================================
                EVENTS GRID
            ====================================== */}

            {!loading &&
              !error &&
              filtered.length > 0 && (

                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-5
                    max-w-[1200px]
                  "
                >

                  {filtered.map((event) => (

                    <Link
                      href={`/events/${event._id}`}
                      key={event._id}
                      className="group block"
                    >

                      {/* ======================================
                          FULL IMAGE CARD
                      ====================================== */}

                      <div
                        className="
                          relative
                          w-full
                          h-[328px]
                          sm:h-[340px]
                          overflow-hidden
                          rounded-[24px]
                          bg-[#103f3a]
                          border
                          border-white/10
                          hover:border-[#54e6d0]
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]
                        "
                      >

                        {/* ==================================
                            FULL CARD IMAGE
                        ================================== */}

                        <img
                          src={getEventImage(event)}
                          alt={event.title}
                          className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-105
                          "
                          onError={(e) => {
                            const img =
                              e.target as HTMLImageElement;

                            img.src =
                              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=700&fit=crop";
                          }}
                        />

                        {/* ==================================
                            DARK OVERLAY
                        ================================== */}

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/90
                            via-black/35
                            to-black/10
                          "
                        />

                        {/* ==================================
                            TOP CATEGORY
                        ================================== */}

                        <div
                          className="
                            absolute
                            top-4
                            left-4
                            z-10
                          "
                        >

                          <span
                            className="
                              inline-flex
                              items-center
                              gap-2
                              px-3
                              py-1.5
                              rounded-full
                              bg-black/45
                              backdrop-blur-md
                              border
                              border-white/20
                              text-white
                              text-xs
                              font-semibold
                            "
                          >
                            <span>
                              {CATEGORY_ICONS[event.category] || "📅"}
                            </span>

                            {event.category}
                          </span>

                        </div>

                        {/* ==================================
                            TOP RIGHT STATUS
                        ================================== */}

                        <div
                          className="
                            absolute
                            top-4
                            right-4
                            z-10
                          "
                        >

                          <span
                            className={`
                              inline-flex
                              px-3
                              py-1.5
                              rounded-full
                              backdrop-blur-md
                              text-xs
                              font-bold
                              capitalize
                              border
                              ${
                                event.status === "completed"
                                  ? "bg-gray-800/70 border-gray-500/30 text-gray-200"
                                  : event.status === "cancelled"
                                  ? "bg-red-500/30 border-red-400/40 text-red-200"
                                  : "bg-green-500/30 border-green-400/40 text-green-200"
                              }
                            `}
                          >
                            {event.status || "upcoming"}
                          </span>

                        </div>

                        {/* ==================================
                            CENTER PLAY / VIEW ICON
                            OPTIONAL
                        ================================== */}

                        <div
                          className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            pointer-events-none
                          "
                        >

                          <div
                            className="
                              w-16
                              h-16
                              rounded-full
                              bg-black/25
                              backdrop-blur-sm
                              border
                              border-white/20
                              flex
                              items-center
                              justify-center
                              opacity-0
                              group-hover:opacity-100
                              scale-90
                              group-hover:scale-100
                              transition-all
                            "
                          >

                            <span className="text-white text-2xl">
                              →
                            </span>

                          </div>

                        </div>

                        {/* ==================================
                            BOTTOM CONTENT
                        ================================== */}

                        <div
                          className="
                            absolute
                            left-5
                            right-5
                            bottom-5
                            z-10
                          "
                        >

                          {/* Title */}

                          <h2
                            className="
                              text-white
                              text-xl
                              sm:text-2xl
                              font-bold
                              tracking-tight
                              line-clamp-1
                              drop-shadow-lg
                              group-hover:text-[#61ead6]
                              transition-colors
                            "
                          >
                            {event.title}
                          </h2>

                          {/* Description */}

                          <p
                            className="
                              text-white/70
                              text-sm
                              mt-1
                              line-clamp-1
                            "
                          >
                            {event.description}
                          </p>

                          {/* Event Info */}

                          <div
                            className="
                              mt-3
                              flex
                              flex-wrap
                              items-center
                              gap-x-4
                              gap-y-2
                              text-xs
                              sm:text-sm
                              text-white/80
                            "
                          >

                            <span className="flex items-center gap-1">
                              📍 {event.location}
                            </span>

                            <span className="flex items-center gap-1">
                              📅 {formatDate(event.eventDate)}
                            </span>

                            <span
                              className="
                                font-bold
                                text-[#5be4d0]
                              "
                            >
                              {event.ticketPrice === 0
                                ? "Free"
                                : `₹${event.ticketPrice.toLocaleString()}`}
                            </span>

                          </div>

                        </div>

                      </div>

                    </Link>

                  ))}

                </div>
              )}

          </div>

        </main>
      </div>

      {/* ======================================
          FOOTER
      ====================================== */}

      <Footer />

    </div>
  );
}