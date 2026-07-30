import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "gradient" | "glass" | "elevated";
  onClick?: () => void;
}

export function Card({ children, className, hover = false, variant = "default", onClick }: CardProps) {
  const variants = {
    default: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
    gradient: "bg-gradient-to-br from-white dark:from-gray-900 to-gray-50 dark:to-gray-800",
    glass: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-800/50",
    elevated: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-premium",
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" } : undefined}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`
        rounded-xl p-6 transition-all duration-300
        ${variants[variant]}
        ${hover ? "cursor-pointer" : ""}
        ${className || ""}
      `}
    >
      {children}
    </motion.div>
  );
}

interface StatCardProps {
  icon?: ReactNode;
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatCard({ icon, label, value, change, changeLabel, trend = "neutral", className }: StatCardProps) {
  const trendColor = {
    up: "text-green-600 dark:text-green-400",
    down: "text-red-600 dark:text-red-400",
    neutral: "text-gray-600 dark:text-gray-400",
  };

  return (
    <Card className={className}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {change !== undefined && (
            <p className={`text-xs font-semibold mt-2 ${trendColor[trend]}`}>
              {trend === "up" && "↑"} {trend === "down" && "↓"} {change}% {changeLabel}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-3xl sm:text-4xl p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

interface EventCardProps {
  title: string;
  description: string;
  image?: string;
  category?: string;
  date?: string;
  location?: string;
  price?: number;
  seats?: { available: number; total: number };
  status?: "upcoming" | "completed" | "cancelled";
  onClick?: () => void;
  className?: string;
}

export function EventCard({
  title,
  description,
  image,
  category,
  date,
  location,
  price,
  seats,
  status = "upcoming",
  onClick,
  className,
}: EventCardProps) {
  const statusColors = {
    upcoming: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    completed: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
    cancelled: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  };

  return (
    <Card hover variant="elevated" onClick={onClick} className={className}>
      {image && (
        <div className="w-full h-40 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg mb-4 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {category && (
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              {category}
            </span>
          )}
          <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusColors[status]}`}>
            {status}
          </span>
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{description}</p>
      <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400 mb-4">
        {date && (
          <p className="flex items-center gap-2">
            📅 {date}
          </p>
        )}
        {location && (
          <p className="flex items-center gap-2">
            📍 {location}
          </p>
        )}
        {price !== undefined && (
          <p className="flex items-center gap-2">
            🎫 {price === 0 ? "FREE" : `₹${price.toLocaleString()}`}
            {seats && ` • ${seats.available} seats left`}
          </p>
        )}
      </div>
    </Card>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, badge, className }: FeatureCardProps) {
  return (
    <Card variant="glass" className={className}>
      <div className="text-4xl mb-4">{icon}</div>
      {badge && (
        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-3 inline-block">
          {badge}
        </span>
      )}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </Card>
  );
}
