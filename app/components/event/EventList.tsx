import EventCard from "./EventCard";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description?: string;
}

interface EventListProps {
  events?: Event[];
  loading?: boolean;
}

export default function EventList({
  events = [
    {
      id: 1,
      title: "Tech Conference 2026",
      date: "10 June 2026",
      location: "Lucknow",
      description: "Join us for the biggest tech conference of the year",
    },
    {
      id: 2,
      title: "Wedding Event",
      date: "20 June 2026",
      location: "Kanpur",
      description: "Celebrate the special day with us",
    },
    {
      id: 3,
      title: "Business Networking",
      date: "25 June 2026",
      location: "Delhi",
      description: "Connect with industry professionals and expand your network",
    },
  ],
  loading = false,
}: EventListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-lg h-64 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No events found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          location={event.location}
          description={event.description}
        />
      ))}
    </div>
  );
}