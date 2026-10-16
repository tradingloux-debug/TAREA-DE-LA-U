import { MyTrip, TripDayPlan } from '../types/trip';

const TRIPS_STORAGE_KEY = 'gia_saved_trips_v1';

export const tripStorage = {
  getTrips(): MyTrip[] {
    try {
      const raw = localStorage.getItem(TRIPS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  getTripById(id: string): MyTrip | null {
    const trips = this.getTrips();
    return trips.find(t => t.id === id) || null;
  },

  saveTrip(trip: MyTrip): MyTrip {
    const trips = this.getTrips();
    const updated = [trip, ...trips.filter(t => t.id !== trip.id)];
    try {
      localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving trip', e);
    }
    return trip;
  },

  deleteTrip(id: string): void {
    const trips = this.getTrips().filter(t => t.id !== id);
    try {
      localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
    } catch (e) {
      // Ignore
    }
  }
};
