import React, { createContext, useContext, useState } from 'react';
import { Booking, BookingDraft } from '../types/booking';

interface BookingDraftContextType {
  draft: BookingDraft | null;
  setDraft: (draft: BookingDraft | null) => void;
  lastConfirmedBooking: Booking | null;
  setLastConfirmedBooking: (booking: Booking | null) => void;
  favorites: string[];
  toggleFavorite: (experienceId: string) => void;
  isFavorite: (experienceId: string) => boolean;
}

const BookingDraftContext = createContext<BookingDraftContextType | undefined>(undefined);

export const BookingDraftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [draft, setDraft] = useState<BookingDraft | null>(() => {
    try {
      const saved = sessionStorage.getItem('gia_booking_draft');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [lastConfirmedBooking, setLastConfirmedBooking] = useState<Booking | null>(() => {
    try {
      const saved = sessionStorage.getItem('gia_last_confirmed');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gia_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const handleSetDraft = (newDraft: BookingDraft | null) => {
    setDraft(newDraft);
    try {
      if (newDraft) {
        sessionStorage.setItem('gia_booking_draft', JSON.stringify(newDraft));
      } else {
        sessionStorage.removeItem('gia_booking_draft');
      }
    } catch (e) {
      // Ignore
    }
  };

  const handleSetLastConfirmed = (booking: Booking | null) => {
    setLastConfirmedBooking(booking);
    try {
      if (booking) {
        sessionStorage.setItem('gia_last_confirmed', JSON.stringify(booking));
      } else {
        sessionStorage.removeItem('gia_last_confirmed');
      }
    } catch (e) {
      // Ignore
    }
  };

  const toggleFavorite = (experienceId: string) => {
    setFavorites(prev => {
      const next = prev.includes(experienceId)
        ? prev.filter(id => id !== experienceId)
        : [...prev, experienceId];
      try {
        localStorage.setItem('gia_favorites', JSON.stringify(next));
      } catch (e) {
        // Ignore
      }
      return next;
    });
  };

  const isFavorite = (experienceId: string) => favorites.includes(experienceId);

  return (
    <BookingDraftContext.Provider
      value={{
        draft,
        setDraft: handleSetDraft,
        lastConfirmedBooking,
        setLastConfirmedBooking: handleSetLastConfirmed,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </BookingDraftContext.Provider>
  );
};

export function useBookingDraft() {
  const context = useContext(BookingDraftContext);
  if (!context) {
    throw new Error('useBookingDraft must be used within a BookingDraftProvider');
  }
  return context;
}
