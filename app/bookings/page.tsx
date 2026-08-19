"use client";

import Navbar from "@/app/components/layout/Navbar";
import Sidebar from "@/app/components/layout/Sidebar";
import Footer from "@/app/components/layout/Footer";
import Button from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";
import bookingService, { Booking as ServiceBooking } from "@/app/services/bookingService";
import razorpayService from "@/app/services/razorpay/razorpayService";
import { useRazorpayPayment } from "@/app/hooks/useRazorpayPayment";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import { TicketDesign } from "@/app/components/ui/TicketDesign";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Booking = ServiceBooking & {
  userName?: string;
  userEmail?: string;
};

export default function BookingsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useContext(AuthContext);
  const { openRazorpayCheckout } = useRazorpayPayment();
  const [filterStatus, setFilterStatus] = useState<"all" | "Confirmed" | "Pending" | "Cancelled">("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingBooking, setDownloadingBooking] = useState<Booking | null>(null);
  const [paymentModalBooking, setPaymentModalBooking] = useState<Booking | null>(null);
  const [detailModalBooking, setDetailModalBooking] = useState<Booking | null>(null);
  const [processingBookings, setProcessingBookings] = useState<Record<string, boolean>>({});
  const [paymentMessage, setPaymentMessage] = useState<string>("");
  const [qrPayload, setQrPayload] = useState<{ qrDataURL: string; upiString: string; amount: number } | null>(null);

  const fetchBookings = useCallback(async () => {
    console.log("BOOKINGS: fetching bookings...");
    setLoading(true);
    setError("");
    try {
      const data = user
        ? user.role === "admin"
          ? await bookingService.getBookings()
          : await bookingService.getMyBookings()
        : await bookingService.getBookings();

      if (data.success) {
        const mapped = (data.data || []).map((b: any) => ({
          ...b,
          id: b.id || b._id,
          status: b.bookingStatus
            ? b.bookingStatus.charAt(0).toUpperCase() + b.bookingStatus.slice(1)
            : b.status || "Pending",
          eventTitle: b.eventTitle || (b.event && b.event.title) || "Unknown Event",
          eventDate: b.eventDate || (b.event && b.event.eventDate) || "",
          eventLocation: b.eventLocation || (b.event && b.event.location) || "",
          ticketCount: b.ticketCount || b.quantity || 1,
          totalPrice: b.totalPrice || b.totalAmount || 0,
          bookingReference: b.bookingReference || b._id || b.id,
          bookingDate: b.bookingDate || b.createdAt || "",
          userName:
            b.user?.fullName || b.user?.name || b.userName || "",
          userEmail: b.user?.email || b.userEmail || "",
          paymentStatus: b.paymentStatus || "pending",
        }));
        console.log("BOOKINGS: received", mapped);
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
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      fetchBookings();
    }
  }, [authLoading, user, fetchBookings]);

  const ticketRef = useRef<HTMLDivElement>(null);

  const isPaymentPaid = (paymentStatus?: string) =>
    paymentStatus === "success" || paymentStatus === "Paid";

  const generateTicketPDF = async (booking: Booking) => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`ticket-${booking.bookingReference}.pdf`);
    }
  };

  const isBookingProcessing = (bookingId: string) => !!processingBookings[bookingId];

  const handleDownloadTicket = async (booking: Booking) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    setProcessingBookings((prev) => ({ ...prev, [booking.id]: true }));
    console.log("PROCESSING ID:", booking.id);

    try {
      if (!isPaymentPaid(booking.paymentStatus)) {
        const paid = await openRazorpayCheckout({
          bookingId: booking.id,
          eventTitle: booking.eventTitle,
          userName: user?.fullName,
          userEmail: user?.email,
        });

        if (!paid) {
          return;
        }

        await fetchBookings();
        booking = { ...booking, paymentStatus: "Paid", status: "Confirmed" } as Booking;
      }

      setDownloadingBooking(booking);

      await new Promise((resolve) => setTimeout(resolve, 500));
      await generateTicketPDF(booking);
    } catch (error: any) {
      console.error("Download error", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setDownloadingBooking(null);
      setProcessingBookings((prev) => {
        const next = { ...prev };
        delete next[booking.id];
        return next;
      });
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    setProcessingBookings((prev) => ({ ...prev, [bookingId]: true }));
    try {
      await bookingService.cancelBooking(bookingId);
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "Cancelled", paymentStatus: booking.paymentStatus }
            : booking
        )
      );
      setError("Booking cancelled successfully.");
    } catch (err: any) {
      console.error("Cancel error", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setProcessingBookings((prev) => {
        const next = { ...prev };
        delete next[bookingId];
        return next;
      });
    }
  };

  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  const openPaymentModal = async (booking: Booking) => {
    console.log("SELECTED BOOKING:", booking);
    setProcessingBookings((prev) => ({ ...prev, [booking.id]: true }));
    setPaymentMessage("");

    try {
      // Call the QR endpoint (GET /api/razorpay/qr/:bookingId)
      const response = await razorpayService.getQR(booking.id);

      const payload = response?.success ? response.data : null;

      if (!payload) throw new Error("Invalid QR response from server");

      setQrPayload({
        qrDataURL: payload.qrDataURL || "",
        upiString: payload.upiString || "",
        amount: payload.amount || 0,
      });
      setPaymentModalBooking(booking);
    } catch (err: any) {
      console.error("Failed to generate payment QR", err);
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : err?.response?.data?.message || "Failed to generate payment QR";
      setError(message);
    } finally {
      setProcessingBookings((prev) => {
        const next = { ...prev };
        delete next[booking.id];
        return next;
      });
    }
  };

  const closePaymentModal = () => {
    setPaymentModalBooking(null);
    setQrPayload(null);
    setPaymentMessage("");
  };

  const handleCancelPayment = () => {
    if (paymentModalBooking) {
      setPaymentMessage("Payment cancelled.");
      setPaymentModalBooking(null);
      setPaymentMessage("");
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setDetailModalBooking(booking);
  };

  const handleSimulatePayment = async (booking: Booking) => {
    setProcessingBookings((prev) => ({ ...prev, [booking.id]: true }));
    setPaymentMessage("Processing payment...");
    console.log("PROCESSING ID:", booking.id);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const updatedBooking: Booking = {
        ...booking,
        paymentStatus: "Paid" as const,
        status: "Confirmed" as const,
      };

      setBookings((prev) =>
        prev.map((item) =>
          item.id === booking.id ? updatedBooking : item
        ) as Booking[]
      );

      setPaymentMessage("Payment successful! Your ticket is confirmed.");
      closePaymentModal();

      setDownloadingBooking(updatedBooking);
      await new Promise((resolve) => setTimeout(resolve, 200));
      await generateTicketPDF(updatedBooking);
    } catch (err: any) {
      console.error("Payment simulation error", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setProcessingBookings((prev) => {
        const next = { ...prev };
        delete next[booking.id];
        return next;
      });
      setDownloadingBooking(null);
    }
  };

  const handlePayWithRazorpay = async () => {
    if (!paymentModalBooking) return;
    const booking = paymentModalBooking;
    setProcessingBookings((prev) => ({ ...prev, [booking.id]: true }));
    setPaymentMessage("Opening Razorpay checkout...");

    try {
      const result = await openRazorpayCheckout({
        bookingId: booking.id,
        eventTitle: booking.eventTitle,
        userName: user?.fullName,
        userEmail: user?.email,
        userPhone: (user as any)?.phone,
      });

      if (!result) {
        setPaymentMessage("Payment not completed or was dismissed.");
        return;
      }

      // result expected: { payment, booking }
      const payment = result.payment;

      // refresh bookings and show success UI
      await fetchBookings();
      setPaymentMessage("Payment verified successfully.");
      setPaymentModalBooking(null);

      // navigate to professional receipt page
      if (payment && payment._id) {
        router.push(`/payment-receipt?paymentId=${payment._id}`);
      }
    } catch (err: any) {
      console.error("Razorpay checkout error", err);
      const message =
        err instanceof Error
          ? err.message
          : err?.response?.data?.message || "Payment failed. Please try again.";
      setPaymentMessage(message);
    } finally {
      setProcessingBookings((prev) => {
        const next = { ...prev };
        delete next[booking.id];
        return next;
      });
    }
  };

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
              <p className="text-whi mt-2">View and manage your event bookings</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className={`${stat.color} text-white w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-3`}>
                    📊
                  </div>
                  <p className="text-whi text-sm mb-1">{stat.label}</p>
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
                        <p className="text-sm text-white">Booking Reference</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {booking.bookingReference}
                        </p>
                        <p className="text-sm text-whi mt-2">
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
                          <span
                            className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
                              isPaymentPaid(booking.paymentStatus)
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {isPaymentPaid(booking.paymentStatus) ? "Paid" : "Unpaid"}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-whi">
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
                        onClick={() => handleViewDetails(booking)}
                      />
                      {booking.status === "Pending" && (
                        <>
                          <Button
                            text={isBookingProcessing(booking.id) ? "Processing..." : "Confirm"}
                            variant="success"
                            size="md"
                            onClick={() => openPaymentModal(booking)}
                            disabled={isBookingProcessing(booking.id)}
                          />
                          <Button
                            text={isBookingProcessing(booking.id) ? "Processing..." : "Cancel"}
                            variant="danger"
                            size="md"
                            onClick={() => handleCancelBooking(booking.id)}
                            disabled={isBookingProcessing(booking.id)}
                          />
                        </>
                      )}
                      {booking.status === "Confirmed" && (
                        <Button
                          text={isBookingProcessing(booking.id) ? "Processing..." : "Download Ticket"}
                          variant="secondary"
                          size="md"
                          onClick={() => handleDownloadTicket(booking)}
                          disabled={isBookingProcessing(booking.id)}
                        />
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
                  <p className="text-whi text-lg">No bookings found</p>
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

      <Modal
        isOpen={!!paymentModalBooking}
        onClose={handleCancelPayment}
        title="QR Payment"
        showFooter={false}
      >
        {paymentModalBooking ? (
          <div className="space-y-5">
            <div className="rounded-2xl bg-slate-100 p-5 border border-slate-200">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Payment simulation</p>
              <h2 className="text-xl font-semibold text-slate-900 mt-2">{paymentModalBooking.eventTitle}</h2>
              <p className="text-sm text-slate-600">Booking ID: {paymentModalBooking.bookingReference}</p>
              <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-slate-700">
                <div className="space-y-1">
                  <p className="text-slate-500">Tickets</p>
                  <p>{paymentModalBooking.ticketCount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500">Total</p>
                  <p>₹{paymentModalBooking.totalPrice}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 text-center text-slate-100">
              <div className="mx-auto mb-4 h-48 w-48 rounded-3xl bg-white border border-slate-300 flex items-center justify-center">
                {qrPayload ? (
                  <img
                    src={qrPayload.qrDataURL}
                    alt="UPI Payment QR"
                    className="h-48 w-48 object-contain"
                  />
                ) : (
                  <span className="text-slate-500">Generating QR...</span>
                )}
              </div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-1">Scan QR to pay</p>
              <p className="text-xs text-slate-400">Scan using PhonePe, Google Pay, Paytm, or BHIM.</p>
              {qrPayload && (
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 text-left text-slate-700 mt-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">UPI ID</p>
                  <p className="text-sm font-semibold text-slate-900 break-all">
                    {qrPayload.upiString.match(/pa=([^&]+)/)?.[1] || "N/A"}
                  </p>
                </div>
              )}
            </div>

            {paymentMessage && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-emerald-800">
                {paymentMessage}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                text="Cancel"
                variant="secondary"
                size="md"
                onClick={handleCancelPayment}
                disabled={paymentModalBooking && isBookingProcessing(paymentModalBooking.id)}
              />
              <Button
                text={paymentModalBooking && isBookingProcessing(paymentModalBooking.id) ? "Processing payment..." : "Pay with Razorpay"}
                variant="success"
                size="md"
                onClick={handlePayWithRazorpay}
                disabled={paymentModalBooking && isBookingProcessing(paymentModalBooking.id)}
              />
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal
        isOpen={!!detailModalBooking}
        onClose={() => setDetailModalBooking(null)}
        title="Booking Details"
        showFooter={false}
      >
        {detailModalBooking ? (
          <div className="space-y-4 text-sm text-slate-700">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Event</p>
                <p className="text-base font-semibold text-white">{detailModalBooking.eventTitle}</p>
                <p>{detailModalBooking.eventLocation}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">User</p>
                <p className="text-base font-semibold text-white">{detailModalBooking.userName || "-"}</p>
                <p>{detailModalBooking.userEmail || "-"}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Booking ID</p>
                <p className="font-semibold text-white">{detailModalBooking.bookingReference}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Status</p>
                <p className="font-semibold text-white">{detailModalBooking.status}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Quantity</p>
                <p className="font-semibold text-white">{detailModalBooking.ticketCount}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Amount</p>
                <p className="font-semibold text-white">₹{detailModalBooking.totalPrice}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Payment Status</p>
                <p className="font-semibold text-white">{detailModalBooking.paymentStatus}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Booked on</p>
                <p className="font-semibold text-white">{detailModalBooking.bookingDate}</p>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Event date</p>
              <p className="font-semibold text-white">{detailModalBooking.eventDate}</p>
            </div>
          </div>
        ) : null}
      </Modal>

      {/* Hidden container for ticket generation */}
      {downloadingBooking && (
        <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', opacity: 0 }}>
          <TicketDesign ref={ticketRef} booking={downloadingBooking} />
        </div>
      )}
    </div>
  );
}