import { useState, useEffect } from 'react';
import { storageService } from '../services/storage';
import { Experience } from '../types/experience';

/**
 * Returns the dynamic number of booked participants for an experience.
 * Automatically updates whenever any new booking is registered in the app.
 */
export function useLiveBookedCount(experience: Experience): number {
  const baseline = experience.initialBookedCount || 24;

  const [count, setCount] = useState<number>(() => {
    return storageService.getBookedParticipantsCount(experience.id, baseline);
  });

  useEffect(() => {
    const updateCount = () => {
      const fresh = storageService.getBookedParticipantsCount(experience.id, baseline);
      setCount(fresh);
    };

    updateCount();

    const handleCustomBooking = () => {
      updateCount();
    };

    window.addEventListener('gia_booking_saved', handleCustomBooking);
    window.addEventListener('storage', handleCustomBooking);

    return () => {
      window.removeEventListener('gia_booking_saved', handleCustomBooking);
      window.removeEventListener('storage', handleCustomBooking);
    };
  }, [experience.id, baseline]);

  return count;
}
