'use client';

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/events", label: "Events", icon: "📅" },
    { href: "/events/create", label: "Create Event", icon: "➕" },
    { href: "/bookings", label: "Bookings", icon: "🎫" },
    { href: "/profile", label: "Profile", icon: "👤" },
    { href: "/ai-tools/title-generator", label: "AI Title", icon: "✨" },
    { href: "/ai-tools/description-generator", label: "AI Description", icon: "📝" },
    { href: "/ai-tools/budget-planner", label: "AI Budget", icon: "💰" },
    { href: "/ai-tools/schedule-planner", label: "AI Schedule", icon: "⏰" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white shadow min-h-screen border-r">
        <div className="p-5">
          <h2 className="font-bold text-xl mb-6 text-blue-600">Menu</h2>

          <div className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-gray-700 hover:text-blue-600 flex items-center gap-3 font-medium"
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsOpen(false)}
          />

          {/* Mobile Menu */}
          <aside className="lg:hidden fixed left-0 top-16 bottom-0 w-64 bg-white shadow z-30 overflow-y-auto">
            <div className="p-5">
              <h2 className="font-bold text-xl mb-6 text-blue-600">Menu</h2>

              <div className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-gray-700 hover:text-blue-600 flex items-center gap-3 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}