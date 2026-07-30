'use client';

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Wand2, BarChart3, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const mainMenuItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/events", label: "Explore Events", icon: "📅" },
    { href: "/bookings", label: "My Bookings", icon: "🎫" },
    { href: "/profile", label: "Profile", icon: "👤" },
  ];

  const aiToolsItems = [
    { href: "/ai-tools/title-generator", label: "Title Generator", icon: "✨" },
    { href: "/ai-tools/description-generator", label: "Description", icon: "📝" },
    { href: "/ai-tools/budget-planner", label: "Budget Planner", icon: "💰" },
    { href: "/ai-tools/schedule-planner", label: "Schedule", icon: "⏰" },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const menuVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  const SidebarContent = () => (
    <div className="p-6 space-y-8 h-full overflow-y-auto">
      {/* Main Menu */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 px-2">
          Main
        </h3>
        <nav className="space-y-1">
          {mainMenuItems.map((item, i) => (
            <motion.div key={item.href} custom={i} variants={menuVariants} initial="hidden" animate="visible">
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-gradient-primary text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                {isActive(item.href) && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Create Event Button */}
      <Link
        href="/events/create"
        onClick={() => setIsOpen(false)}
        className="block w-full px-4 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-center text-sm flex items-center justify-center gap-2"
      >
        <Zap size={16} />
        Create Event
      </Link>

      {/* AI Tools */}
      <div>
        <div className="flex items-center gap-2 px-2 mb-3">
          <Wand2 size={16} className="text-primary-600 dark:text-primary-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            AI Tools
          </h3>
        </div>
        <nav className="space-y-1">
          {aiToolsItems.map((item, i) => (
            <motion.div key={item.href} custom={i + mainMenuItems.length + 1} variants={menuVariants} initial="hidden" animate="visible">
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                    : "text-gray-600 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Quick Stats */}
      <div className="hidden lg:block p-4 bg-gradient-to-br from-primary-50 dark:from-primary-900/20 to-secondary-50 dark:to-secondary-900/20 rounded-xl border border-primary-100 dark:border-primary-900/50">
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">💡 Tip</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Use AI tools to generate event titles, descriptions, and schedules automatically!
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 sticky top-16 h-[calc(100vh-4rem)] shadow-soft">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Toggle */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/30 z-30 mt-16"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="lg:hidden fixed left-0 top-16 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-premium z-40 border-r border-gray-200 dark:border-gray-800"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile FAB (Floating Action Button) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-primary text-white shadow-premium hover:shadow-lg"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.1 }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>
    </>
  );
}