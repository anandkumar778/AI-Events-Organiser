import Link from "next/link";

interface EventCardProps {
  id?: number;
  title: string;
  date: string;
  location: string;
  description?: string;
  imageUrl?: string;
}

export default function EventCard({
  id = 1,
  title,
  date,
  location,
  description,
  imageUrl,
}: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
      {/* Image */}
      {imageUrl && (
        <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Meta Information */}
        <div className="space-y-2 mb-4 flex-grow">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
            </svg>
            <span>{date}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L8.707 10.707a1 1 0 00-1.414 1.414l7.071 7.071a9 9 0 11-12.73-12.73zm1.414 1.414a5 5 0 017.756 7.756L5.464 5.464z" clipRule="evenodd" />
            </svg>
            <span>{location}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/events/${id}`}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}