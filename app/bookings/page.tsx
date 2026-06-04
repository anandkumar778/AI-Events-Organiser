"use client";

import Navbar from "@/app/components/layout/Navbar";
import Sidebar from "@/app/components/layout/Sidebar";
import Footer from "@/app/components/layout/Footer";
import Button from "@/app/components/ui/Button";
import { useState } from "react";

interface Booking {
  id: number;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  bookingDate: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  ticketCount: number;
  totalPrice: number;
  bookingReference: string;
}

export default function BookingsPage() {
  const [filterStatus, setFilterStatus] = useState<"all" | "Confirmed" | "Pending" | "Cancelled">("all");

  const bookings: Booking[] = [
    {
      id: 1,
      eventTitle: "Tech Conference 2026",
      eventDate: "10 June 2026",
      eventLocation: "Lucknow",
      bookingDate: "1 June 2026",
      status: "Confirmed",
      ticketCount: 2,
      totalPrice: 3000,
      bookingReference: "BOOK-001-2026",
    },
    {
      id: 2,
      eventTitle: "AI Workshop",
      eventDate: "28 June 2026",
      eventLocation: "Lucknow",
      bookingDate: "2 June 2026",
      status: "Confirmed",
      ticketCount: 1,
      totalPrice: 500,
      bookingReference: "BOOK-002-2026",
    },
    {
      id: 3,
      eventTitle: "Wedding Event",
      eventDate: "20 June 2026",
      eventLocation: "Kanpur",
      bookingDate: "3 June 2026",
      status: "Pending",
      ticketCount: 5,
      totalPrice: 10000,
      bookingReference: "BOOK-003-2026",
    },
    {
      id: 4,
      eventTitle: "Business Networking",
      eventDate: "25 June 2026",
      eventLocation: "Delhi",
      bookingDate: "4 June 2026",
      status: "Cancelled",
      ticketCount: 3,
      totalPrice: 2997,
      bookingReference: "BOOK-004-2026",
    },
    {
      id: 5,
      eventTitle: "Corporate Summit",
      eventDate: "5 July 2026",
      eventLocation: "Mumbai",
      bookingDate: "28 May 2026",
      status: "Confirmed",
      ticketCount: 4,
      totalPrice: 12000,
      bookingReference: "BOOK-005-2026",
    },
    {
      id: 6,
      eventTitle: "Community Meetup",
      eventDate: "12 July 2026",
      eventLocation: "Bangalore",
      bookingDate: "31 May 2026",
      status: "Confirmed",
      ticketCount: 1,
      totalPrice: 0,
      bookingReference: "BOOK-006-2026",
    },
  ];

  // Filter bookings
  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = [
    { label: "Total Bookings", value: bookings.length, color: "bg-blue-500" },
    {
      label: "Confirmed",
      value: bookings.filter((b) => b.status === "Confirmed").length,
      color: "bg-green-500",
    },
    {
      label: "Pending",
      value: bookings.filter((b) => b.status === "Pending").length,
      color: "bg-yellow-500",
    },
    {
      label: "Cancelled",
      value: bookings.filter((b) => b.status === "Cancelled").length,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                My Bookings
              </h1>
              <p className="text-gray-600 mt-2">View and manage your event bookings</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className={`${stat.color} text-white w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-3`}>
                    📊
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Filter Buttons */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter</h3>
              <div className="flex flex-wrap gap-2">
                {["all", "Confirmed", "Pending", "Cancelled"].map((status) => (
                  <button
                    key={status}
                    onClick={() =>
                      setFilterStatus(
                        status === "all"
                          ? "all"
                          : (status as "Confirmed" | "Pending" | "Cancelled")
                      )
                    }
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterStatus === status
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {status === "all" ? "All" : status}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {/* Event Info */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {booking.eventTitle}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          📅 {booking.eventDate}
                        </p>
                        <p className="text-gray-600 text-sm">
                          📍 {booking.eventLocation}
                        </p>
                      </div>

                      {/* Booking Details */}
                      <div>
                        <p className="text-sm text-gray-600">Booking Reference</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {booking.bookingReference}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          Booked on: {booking.bookingDate}
                        </p>
                      </div>

                      {/* Status & Price */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            {booking.ticketCount} ticket(s) - ₹{booking.totalPrice}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                      <Button
                        text="View Details"
                        variant="primary"
                        size="md"
                      />
                      {booking.status === "Confirmed" && (
                        <Button
                          text="Download Ticket"
                          variant="secondary"
                          size="md"
                        />
                      )}
                      {booking.status === "Pending" && (
                        <>
                          <Button
                            text="Confirm"
                            variant="success"
                            size="md"
                          />
                          <Button
                            text="Cancel"
                            variant="danger"
                            size="md"
                          />
                        </>
                      )}
                      {booking.status === "Cancelled" && (
                        <Button
                          text="Rebook"
                          variant="secondary"
                          size="md"
                        />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <p className="text-gray-600 text-lg">No bookings found</p>
                  <p className="text-gray-500 mt-2">
                    You haven't made any bookings yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
