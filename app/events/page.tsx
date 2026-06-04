"use client";

import Navbar from "@/app/components/layout/Navbar";
import Sidebar from "@/app/components/layout/Sidebar";
import Footer from "@/app/components/layout/Footer";
import EventList from "@/app/components/event/EventList";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Link from "next/link";
import { useState } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  capacity: number;
  registered: number;
  price: number;
  imageUrl?: string;
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLocation, setFilterLocation] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const allEvents: Event[] = [
    {
      id: 1,
      title: "Tech Conference 2026",
      date: "10 June 2026",
      location: "Lucknow",
      description: "Join us for the biggest tech conference of the year",
      capacity: 500,
      registered: 320,
      price: 1500,
    },
    {
      id: 2,
      title: "Wedding Event",
      date: "20 June 2026",
      location: "Kanpur",
      description: "Celebrate the special day with us",
      capacity: 200,
      registered: 150,
      price: 2000,
    },
    {
      id: 3,
      title: "Business Networking",
      date: "25 June 2026",
      location: "Delhi",
      description: "Connect with industry professionals and expand your network",
      capacity: 300,
      registered: 180,
      price: 999,
    },
    {
      id: 4,
      title: "AI Workshop",
      date: "28 June 2026",
      location: "Lucknow",
      description: "Learn AI and Machine Learning from experts",
      capacity: 100,
      registered: 85,
      price: 500,
    },
    {
      id: 5,
      title: "Corporate Summit",
      date: "5 July 2026",
      location: "Mumbai",
      description: "Annual corporate summit for business leaders",
      capacity: 600,
      registered: 450,
      price: 3000,
    },
    {
      id: 6,
      title: "Community Meetup",
      date: "12 July 2026",
      location: "Bangalore",
      description: "Casual meetup for tech enthusiasts",
      capacity: 150,
      registered: 100,
      price: 0,
    },
  ];

  // Filter events
  let filteredEvents = allEvents.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      filterLocation === "all" || event.location === filterLocation;
    return matchesSearch && matchesLocation;
  });

  // Sort events
  if (sortBy === "newest") {
    filteredEvents.sort((a, b) => b.id - a.id);
  } else if (sortBy === "price-low") {
    filteredEvents.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredEvents.sort((a, b) => b.price - a.price);
  }

  const uniqueLocations = Array.from(
    new Set(allEvents.map((e) => e.location))
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                    Events
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Browse and manage all events
                  </p>
                </div>
                <Link href="/events/create">
                  <Button
                    text="+ Create Event"
                    variant="primary"
                    size="lg"
                  />
                </Link>
              </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="lg:col-span-2">
                  <Input
                    label="Search Events"
                    placeholder="Search by name or description"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Locations</option>
                    {uniqueLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredEvents.length}</span> events
              </p>
            </div>

            {/* Events List */}
            {filteredEvents.length > 0 ? (
              <EventList events={filteredEvents} />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg">No events found</p>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
