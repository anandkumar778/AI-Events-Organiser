"use client";

import Navbar from "@/app/components/layout/Navbar";
import Sidebar from "@/app/components/layout/Sidebar";
import Footer from "@/app/components/layout/Footer";
import Link from "next/link";

interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
  link?: string;
}

export default function DashboardPage() {
  const stats: StatCard[] = [
    {
      title: "Total Events",
      value: "12",
      icon: "📅",
      color: "bg-blue-500",
      link: "/events",
    },
    {
      title: "Bookings",
      value: "45",
      icon: "🎫",
      color: "bg-green-500",
      link: "/bookings",
    },
    {
      title: "Revenue",
      value: "₹25,000",
      icon: "💰",
      color: "bg-purple-500",
      link: "#",
    },
    {
      title: "Upcoming Events",
      value: "5",
      icon: "🚀",
      color: "bg-orange-500",
      link: "/events",
    },
  ];

  const recentEvents = [
    { id: 1, title: "Tech Conference 2026", date: "10 June", status: "Active" },
    { id: 2, title: "Wedding Event", date: "20 June", status: "Upcoming" },
    { id: 3, title: "Business Networking", date: "25 June", status: "Upcoming" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-col lg:flex-row flex-1">
        <Sidebar />

        <main className="flex-1 w-full">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                Dashboard
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-2">Welcome back! Here's your event overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Link
                  key={index}
                  href={stat.link || "#"}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-4 sm:p-6">
                    <div className={`${stat.color} text-white w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4`}>
                      {stat.icon}
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-1">
                      {stat.title}
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Recent Events */}
            {/* <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Recent Events
                  </h2>
                  <Link
                    href="/events/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    + New Event
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Event Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEvents.map((event) => (
                      <tr
                        key={event.id}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                          {event.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {event.date}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              event.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/events/${event.id}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div> */}

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
  <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
    Recent Events
  </h2>

  <Link
    href="/events/create"
    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
  >
    + New Event
  </Link>
</div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}