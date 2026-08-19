"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/app/components/layout/Navbar";
import Sidebar from "@/app/components/layout/Sidebar";
import Footer from "@/app/components/layout/Footer";
import eventService from "@/app/services/eventService";
import bookingService from "@/app/services/bookingService";
import { useBookings } from "@/app/hooks/useBookings";

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
  status?:  "cancelled";
  organizer?: {
    _id?: string;
    id: string;
    name: string;
    email: string;
  };
  createdAt?: string;
}

interface AttendeeInfo {
  name: string;
  email: string;
  phone: string;
}

const CATEGORY_ICONS: Record<string, string> = {
  Conference: "🎤",
  Workshop: "🛠️",
  Seminar: "📚",
  Festival: "🎉",
  Concert: "🎵",
  Meetup: "🤝",
};

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ticketCount, setTicketCount] = useState(1);
  const [attendeeInfo, setAttendeeInfo] = useState<AttendeeInfo[]>([
    { name: "", email: "", phone: "" },
  ]);
  const [bookingStep, setBookingStep] = useState<"quantity" | "attendees" | "payment">("quantity");
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState("");

  useEffect(() => {
    setAttendeeInfo((prev) => {
      const desiredLength = Math.max(1, ticketCount);
      if (prev.length === desiredLength) return prev;
      if (prev.length < desiredLength) {
        return [
          ...prev,
          ...Array.from({ length: desiredLength - prev.length }, () => ({ name: "", email: "", phone: "" })),
        ];
      }
      return prev.slice(0, desiredLength);
    });
  }, [ticketCount]);

  const { createBooking } = useBookings();

  const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

  const fetchEventDetails = useCallback(async () => {
    setLoading(true);
    setError("");

    if (!isValidObjectId(eventId)) {
      setError("Invalid event identifier. Please select a valid event.");
      setLoading(false);
      return;
    }

    try {
      const data = await eventService.getEvent(eventId);
      if (data.success) {
        // Map API response to Event type
        const mappedEvent: Event = {
          ...data.data,
          _id: (data.data as any)._id || data.data.id,
          status: (data.data as any).status || "",
          category: (data.data as any).category || "Conference",
          eventDate: (data.data as any).eventDate || (data.data as any).date,
          ticketPrice: (data.data as any).ticketPrice || (data.data as any).price || 0,
          totalSeats: (data.data as any).totalSeats || (data.data as any).capacity || 200,
          availableSeats: (data.data as any).availableSeats || ((data.data as any).capacity || 200),
        } as Event;
        setEvent(mappedEvent);
      } else {
        setError("Failed to load event details");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Cannot load event details. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  const updateAttendeeInfo = (index: number, field: keyof AttendeeInfo, value: string) => {
    const updated = [...attendeeInfo];
    updated[index] = { ...updated[index], [field]: value };
    setAttendeeInfo(updated);
  };

  const handleBooking = async () => {
    if (!event) return;

    // Validate attendee info
    const validAttendees = attendeeInfo.slice(0, ticketCount);
    for (const attendee of validAttendees) {
      if (!attendee.name || !attendee.email || !attendee.phone) {
        setError("Please fill in all attendee information");
        return;
      }
    }

    setIsBooking(true);
    setError("");

    try {
      const bookingData = {
        eventId: event._id,
        ticketCount,
        attendeeInfo: validAttendees,
      };

      const response = await createBooking(bookingData);
      setBookingSuccess(true);
      setBookingReference(response.bookingReference || response.id);
      setBookingStep("payment");

      // Reset form after success
      setTimeout(() => {
        router.push(`/bookings`);
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Booking failed. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex flex-col lg:flex-row flex-1">
          <Sidebar />
          <main className="flex-1 w-full">
            <div className="p-8 flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500">Loading event details...</p>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event || error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex flex-col lg:flex-row flex-1">
          <Sidebar />
          <main className="flex-1 w-full">
            <div className="p-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-center">
                <p className="font-semibold mb-4">❌ {error || "Event not found"}</p>
                <button
                  onClick={() => router.push("/events")}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Back to Events
                </button>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  const totalPrice = event.ticketPrice * ticketCount;
  const occupancyPercent = ((event.totalSeats - event.availableSeats) / event.totalSeats) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-col lg:flex-row flex-1">
        <Sidebar />

        <main className="flex-1 w-full">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Back Button */}
            <button
              onClick={() => router.push("/events")}
              className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              ← Back to Events
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Event Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Event Banner */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-64 bg-linear-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-6xl relative">
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
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-white text-gray-800 capitalize">
                      {event.status}
                    </span>
                  </div>

                  {/* Event Title & Category */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                        {event.category}
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                        {event.availableSeats} seats left
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.title}</h1>

                    {/* Organizer Info */}
                    {event.organizer && (
                      <div className="text-sm text-gray-600 mb-4">
                        <p>
                          <span className="font-semibold">Organized by:</span> {event.organizer.name}
                        </p>
                        <p className="text-gray-500">{event.organizer.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Event Details Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date & Time */}
                  <div className="bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📅</span>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Date & Time</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {new Date(event.eventDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(event.eventDate).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="bg-white rounded-lg shadow p-5 border-l-4 border-red-500">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📍</span>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Location</p>
                        <p className="text-lg font-semibold text-gray-800">{event.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="bg-white rounded-lg shadow p-5 border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🎫</span>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Ticket Price</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {event.ticketPrice === 0 ? "FREE" : `₹${event.ticketPrice.toLocaleString()}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="bg-white rounded-lg shadow p-5 border-l-4 border-purple-500">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">👥</span>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Availability</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {event.availableSeats} / {event.totalSeats}
                        </p>
                        <div className="mt-2 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${occupancyPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Description */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">About This Event</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{event.description}</p>
                </div>
              </div>

              {/* Right Column - Booking Form */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 space-y-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Book Tickets</h3>

                  {bookingSuccess ? (
                    <div className="text-center py-8">
                      <p className="text-4xl mb-3">✅</p>
                      <p className="text-green-700 font-semibold mb-2">Booking Confirmed!</p>
                      <p className="text-sm text-gray-600 mb-4">
                        Reference: <span className="font-mono font-semibold">{bookingReference}</span>
                      </p>
                      <p className="text-xs text-gray-500 mb-6">Redirecting to bookings...</p>
                      <button
                        onClick={() => router.push("/bookings")}
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                      >
                        View My Bookings
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Step 1: Select Tickets */}
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">
                          Number of Tickets
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                            disabled={ticketCount <= 1}
                            className="px-3 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 disabled:opacity-50"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="1"
                            max={event.availableSeats}
                            value={ticketCount}
                            onChange={(e) => setTicketCount(Math.min(event.availableSeats, Math.max(1, parseInt(e.target.value) || 1)))}
                            className="flex-1 text-black text-center border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => setTicketCount(Math.min(event.availableSeats, ticketCount + 1))}
                            disabled={ticketCount >= event.availableSeats}
                            className="px-3 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                        {ticketCount > event.availableSeats && (
                          <p className="text-xs text-black text-red-600 mt-2">Only {event.availableSeats} seats available</p>
                        )}
                      </div>

                      {/* Attendees Info */}
                      {ticketCount > 0 && (
                        <div>
                          <label className="block text-sm font-semibold text-black mb-3">
                            Attendee Information
                          </label>
                          <div className="space-y-3 max-h-96 overflow-y-auto">
                            {attendeeInfo.slice(0, ticketCount).map((attendee, idx) => (
                              <div key={idx} className="bg-gray-50 p-3 rounded-lg space-y-2 border border-gray-200">
                                <p className="text-xs font-semibold text-black">Ticket #{idx + 1}</p>
                                <input
                                  type="text"
                                  placeholder="Full Name...."
                                  value={attendee.name}
                                  onChange={(e) => updateAttendeeInfo(idx, "name", e.target.value)}
                                  className="w-full px-2 py-1.5 border border-black rounded text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                  type="email"
                                  placeholder="Email...."
                                  value={attendee.email}
                                  onChange={(e) => updateAttendeeInfo(idx, "email", e.target.value)}
                                  className="w-full px-2 py-1.5 border border-black rounded text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                  type="tel"
                                  placeholder="Phone....."
                                  value={attendee.phone}
                                  onChange={(e) => updateAttendeeInfo(idx, "phone", e.target.value)}
                                  className="w-full px-2 py-1.5 border border-black rounded text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Price Breakdown */}
                      <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {ticketCount} ticket{ticketCount !== 1 ? "s" : ""} ×{" "}
                            {event.ticketPrice === 0 ? "FREE" : `₹${event.ticketPrice}`}
                          </span>
                          <span className="font-semibold text-gray-800">
                            {totalPrice === 0 ? "FREE" : `₹${totalPrice.toLocaleString()}`}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Convenience Fee</span>
                          <span>{totalPrice === 0 ? "-" : "₹99"}</span>
                        </div>
                        <div className="border-t border-black pt-2 flex justify-between font-bold text-lg">
                          <span className="text-black">Total</span>
                          <span className="text-blue-600">
                            {totalPrice === 0 ? "FREE" : `₹${(totalPrice + 99).toLocaleString()}`}
                          </span>
                        </div>
                      </div>

                      {/* Error Message */}
                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                          {error}
                        </div>
                      )}

                      {/* Book Button */}
                      <button
                        onClick={handleBooking}
                        disabled={isBooking || event.availableSeats < ticketCount || event.status === "cancelled"}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isBooking ? "Processing..." : `Book Now - ${totalPrice === 0 ? "FREE" : `₹${(totalPrice + 99).toLocaleString()}`}`}
                      </button>

                      {event.status === "cancelled" && (
                        <p className="text-xs text-red-600 text-center">This event has been cancelled</p>
                      )}
                    </>
                  )}

                  {/* Booking Info */}
                  <div className="bg-blue-50 rounded-lg p-4 mt-6 border-l-4 border-blue-500">
                    <p className="text-xs font-semibold text-blue-900 mb-2">ℹ️ Booking Information</p>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>✓ Secure booking process</li>
                      <li>✓ Instant confirmation</li>
                      <li>✓ Digital ticket delivery</li>
                      <li>✓ Easy cancellation policy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
