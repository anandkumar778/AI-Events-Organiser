import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">AI Events Organiser</h3>
            <p className="text-gray-400 text-sm">
              AI-powered event management platform to create and manage events effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="text-gray-400 hover:text-white transition-colors">
                  Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h4 className="text-lg font-bold mb-4">AI Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ai-tools/title-generator" className="text-gray-400 hover:text-white transition-colors">
                  Title Generator
                </Link>
              </li>
              <li>
                <Link href="/ai-tools/budget-planner" className="text-gray-400 hover:text-white transition-colors">
                  Budget Planner
                </Link>
              </li>
              <li>
                <Link href="/ai-tools/schedule-planner" className="text-gray-400 hover:text-white transition-colors">
                  Schedule Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: anandkkumar7777@gmail.com</li>
              <li>Phone: +91-7275567974</li>
              <li>Available 24/7</li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {currentYear} AI Events Organiser. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}