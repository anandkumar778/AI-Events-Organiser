import Link from "next/link";
import { Mail, Phone, MapPin,} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Events", href: "/events" },
      { label: "Bookings", href: "/bookings" },
      { label: "Create Event", href: "/events/create" },
    ],
    aiTools: [
      { label: "Title Generator", href: "/ai-tools/title-generator" },
      { label: "Description Generator", href: "/ai-tools/description-generator" },
      { label: "Budget Planner", href: "/ai-tools/budget-planner" },
      { label: "Schedule Planner", href: "/ai-tools/schedule-planner" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-4 sm:px-6 lg:px-8 py-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="p-2 rounded-lg bg-gradient-primary text-white font-bold text-lg group-hover:shadow-lg transition-all">
                🎯
              </div>
              <span className="font-bold text-lg">AI Events</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              AI-powered event management platform to create, manage, and organize events effortlessly.
            </p>
            {/* <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg hover:bg-gray-800 transition-colors" aria-label="Twitter">
                <Twitter size={16} />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-gray-800 transition-colors" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-gray-800 transition-colors" aria-label="GitHub">
                <Github size={16} />
              </a>
            </div> */}
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Tools Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4">
              AI Tools
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.aiTools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-primary-400" />
                <a href="mailto:anandkkumar7777@gmail.com" className="hover:text-white transition-colors">
                  anandkkumar7777@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-primary-400" />
                <a href="tel:+917275567974" className="hover:text-white transition-colors">
                  +91-7275567974
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-primary-400" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="px-4 sm:px-6 lg:px-8 border-t border-gray-800" />

        {/* Bottom Footer */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} AI Events Organiser. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}