"use client";

import Navbar from "@/app/components/layout/Navbar";
import Sidebar from "@/app/components/layout/Sidebar";
import Footer from "@/app/components/layout/Footer";
import Button from "@/app/components/ui/Button";
import bookingService, { Booking as ServiceBooking } from "@/app/services/bookingService";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { TicketDesign } from "@/app/components/ui/TicketDesign";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Booking extends Omit<ServiceBooking, 'id'|'status'> {
  id: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

export default function BookingsPage() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [filterStatus, setFilterStatus] = useState<"all" | "Confirmed" | "Pending" | "Cancelled">("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading) {
      fetchBookings();
    }
  }, [authLoading, user]);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      // If logged in as admin: all bookings, logged in user: my bookings, guest: all bookings
      const data = user
        ? user.role === "admin"
          ? await bookingService.getBookings()
          : await bookingService.getMyBookings()
        : await bookingService.getBookings();

      if (data.success) {
        const mapped = (data.data || []).map((b: any) => ({
          ...b,
          id: b.id || b._id,
          // Backend sends 'bookingStatus', normalize to 'status'
          status: b.bookingStatus
            ? b.bookingStatus.charAt(0).toUpperCase() + b.bookingStatus.slice(1)
            : b.status || "Pending",
          // Backend sends event as populated object with title
          eventTitle: b.eventTitle || (b.event && b.event.title) || "Unknown Event",
          eventDate: b.eventDate || (b.event && b.event.eventDate) || "",
          eventLocation: b.eventLocation || (b.event && b.event.location) || "",
          ticketCount: b.ticketCount || b.quantity || 1,
          totalPrice: b.totalPrice || b.totalAmount || 0,
          bookingReference: b.bookingReference || b._id || b.id,
        }));
        setBookings(mapped as Booking[]);
      } else {
        setError("Failed to load bookings");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const ticketRef = useRef<HTMLDivElement>(null);
  const [downloadingBooking, setDownloadingBooking] = useState<Booking | null>(null);

  const handleDownloadTicket = async (booking: Booking) => {
    setDownloadingBooking(booking);
    
    // Wait for state to update and component to render
    setTimeout(async () => {
      if (ticketRef.current) {
        try {
          const canvas = await html2canvas(ticketRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
          const imgData = canvas.toDataURL('image/png');
          
          // PDF dimensions based on the canvas (landscape)
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width / 2, canvas.height / 2]
          });
          
          pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
          pdf.save(`ticket-${booking.bookingReference}.pdf`);
        } catch (error) {
          console.error("Error generating PDF", error);
          alert("Error generating PDF ticket. Falling back to backend ticket.");
          // Fallback
          try {
            const blob = await bookingService.downloadTicket(booking.id);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `ticket-${booking.id}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          } catch(fallbackErr: any) {
            alert("Fallback failed: " + fallbackErr.message);
          }
        } finally {
          setDownloadingBooking(null);
        }
      }
    }, 500);
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await bookingService.cancelBooking(bookingId);
      fetchBookings();
    } catch (err: any) {
      alert("Failed to cancel booking: " + err.message);
    }
  };

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

            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading bookings...</p>
                </div>
              </div>
            )}

            {error && !loading && (
              <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center mb-6">
                <p className="font-medium">❌ {error}</p>
                <button
                  onClick={fetchBookings}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Bookings List */}
            {!loading && !error && (
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
                          onClick={() => handleDownloadTicket(booking)}
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
                            onClick={() => handleCancelBooking(booking.id)}
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
            )}
          </div>
        </main>
      </div>

      <Footer />

      {/* Hidden container for ticket generation */}
      {downloadingBooking && (
        <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', opacity: 0 }}>
          <TicketDesign ref={ticketRef} booking={downloadingBooking} />
        </div>
      )}
    </div>
  );
}
