'use client';

import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const router = useRouter();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/events", label: "Events" },
    { href: "/bookings", label: "Bookings" },
    { href: "/profile", label: "Profile" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="text-lg sm:text-xl font-bold whitespace-nowrap"
          >
            🎯 AI Events
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:bg-blue-700 px-3 py-2 rounded transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <div className="flex items-center gap-3 ml-2 border-l border-blue-500 pl-3">
                <span className="text-blue-100 text-sm">
                  Hi, {user?.name?.split(" ")[0] || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2 border-l border-blue-500 pl-3">
                <Link
                  href="/auth/login"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded hover:bg-blue-700 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-blue-500 pt-2 mt-2">
              {isLoggedIn ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Logout ({user?.name?.split(" ")[0]})
                </button>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}