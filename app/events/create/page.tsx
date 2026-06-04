"use client";

import Navbar from "@/app/components/layout/Navbar";
import Sidebar from "@/app/components/layout/Sidebar";
import Footer from "@/app/components/layout/Footer";
import EventForm from "@/app/components/event/EventForm";

export default function CreateEventPage() {
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
                Create New Event
              </h1>
              <p className="text-gray-600 mt-2">
                Fill in the details to create your event
              </p>
            </div>

            {/* Form */}
            <EventForm />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
