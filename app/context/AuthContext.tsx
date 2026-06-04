import React, { createContext, useEffect, useState } from 'react';
// Inline minimal type definitions to avoid missing ../types module
export interface User {
  id?: string;
  name?: string;
  email?: string;
}

export interface Event {
  id?: string;
  title?: string;
  date?: string; // ISO string
  description?: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  user: User | null;
  events: Event[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  events: [],
  login: async () => {},
  logout: async () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data.events ?? []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/logout');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, events, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;