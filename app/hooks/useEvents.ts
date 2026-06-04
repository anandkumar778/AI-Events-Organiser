"use client";

import { useState, useCallback, useEffect } from "react";
import { useEventStore } from "@/app/features/events/eventStore";
import eventService, {
  Event,
  CreateEventData,
  EventsResponse,
} from "@/app/services/eventService";

interface UseEventsReturn {
  // State
  events: Event[];
  currentEvent: Event | null;
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;

  // Methods
  getEvents: (query?: {
    page?: number;
    limit?: number;
    search?: string;
    location?: string;
    sortBy?: string;
  }) => Promise<void>;
  getEvent: (id: string) => Promise<void>;
  createEvent: (data: CreateEventData) => Promise<void>;
  updateEvent: (id: string, data: Partial<CreateEventData>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  getMyEvents: () => Promise<void>;
  searchEvents: (query: string) => Promise<void>;
  getEventsByLocation: (location: string) => Promise<void>;
  clearError: () => void;
  setCurrentEvent: (event: Event | null) => void;
}

export const useEvents = (): UseEventsReturn => {
  const { events, setEvents } = useEventStore();
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const clearError = useCallback(() => setError(null), []);

  const getEvents = useCallback(
    async (query?: {
      page?: number;
      limit?: number;
      search?: string;
      location?: string;
      sortBy?: string;
    }) => {
      setIsLoading(true);
      setError(null);
      try {
        const response: EventsResponse = await eventService.getEvents(query);
        setEvents(response.data || []);
        setTotal(response.total || 0);
        setPage(response.page || 1);
      } catch (err: any) {
        setError(err.message || "Failed to fetch events");
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    },
    [setEvents]
  );

  const getEvent = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await eventService.getEvent(id);
      setCurrentEvent(response.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch event");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createEvent = useCallback(
    async (data: CreateEventData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await eventService.createEvent(data);
        setEvents([response.data, ...events]);
        setCurrentEvent(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to create event");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [events, setEvents]
  );

  const updateEvent = useCallback(
    async (id: string, data: Partial<CreateEventData>) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await eventService.updateEvent(id, data);
        const updatedEvents = events.map((e) =>
          e.id === id ? response.data : e
        );
        setEvents(updatedEvents);
        setCurrentEvent(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to update event");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [events, setEvents]
  );

  const deleteEvent = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await eventService.deleteEvent(id);
        const updatedEvents = events.filter((e) => e.id !== id);
        setEvents(updatedEvents);
        if (currentEvent?.id === id) {
          setCurrentEvent(null);
        }
      } catch (err: any) {
        setError(err.message || "Failed to delete event");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [events, currentEvent, setEvents]
  );

  const getMyEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: EventsResponse = await eventService.getMyEvents();
      setEvents(response.data || []);
      setTotal(response.total || 0);
    } catch (err: any) {
      setError(err.message || "Failed to fetch your events");
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, [setEvents]);

  const searchEvents = useCallback(
    async (query: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response: EventsResponse = await eventService.searchEvents(query);
        setEvents(response.data || []);
        setTotal(response.total || 0);
      } catch (err: any) {
        setError(err.message || "Failed to search events");
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    },
    [setEvents]
  );

  const getEventsByLocation = useCallback(
    async (location: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response: EventsResponse = await eventService.getEventsByLocation(
          location
        );
        setEvents(response.data || []);
        setTotal(response.total || 0);
      } catch (err: any) {
        setError(err.message || "Failed to fetch events");
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    },
    [setEvents]
  );

  return {
    events,
    currentEvent,
    isLoading,
    error,
    total,
    page,
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    getMyEvents,
    searchEvents,
    getEventsByLocation,
    clearError,
    setCurrentEvent,
  };
};
