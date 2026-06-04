import { create } from "zustand";

export interface Event {
  _id: string;
  title: string;
  location: string;
  date: string;
  budget: number;
}

interface EventStore {
  events: Event[];

  setEvents: (
    events: Event[]
  ) => void;

  addEvent: (
    event: Event
  ) => void;

  removeEvent: (
    id: string
  ) => void;
}

export const useEventStore =
  create<EventStore>((set) => ({
    events: [],

    setEvents: (events) =>
      set({
        events,
      }),

    addEvent: (event) =>
      set((state) => ({
        events: [
          ...state.events,
          event,
        ],
      })),

    removeEvent: (id) =>
      set((state) => ({
        events:
          state.events.filter(
            (event) =>
              event._id !== id
          ),
      })),
  }));