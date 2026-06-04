import { useEventStore } from "./eventStore";

export const useEvents = () => {
  const {
    events,
    setEvents,
  } = useEventStore();

  return {
    events,
    setEvents,
  };
};