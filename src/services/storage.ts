import { Booking, PaymentDetails } from '../types/booking';

const LOCAL_STORAGE_KEY = 'gia_experiences_bookings_v1';

export interface StorageService {
  saveBooking(booking: Booking): Promise<Booking>;
  getBookingByCode(code: string, email?: string): Promise<Booking | null>;
  listRecentBookings(): Promise<Booking[]>;
  updateBookingStatus(id: string, status: Booking['status']): Promise<Booking | null>;
  updateBookingPayment(id: string, paymentDetails: PaymentDetails): Promise<Booking | null>;
  getBookedParticipantsCount(experienceIdOrSlug: string, initialBaseline?: number): number;
}

/**
 * Local storage adapter ready to be swapped with Firestore in Sprint 2.
 * Mirrors async collection queries so components require zero changes when Firestore is activated.
 */
class LocalStorageService implements StorageService {
  private getStored(): Booking[] {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Could not read bookings from local storage', e);
      return [];
    }
  }

  private setStored(bookings: Booking[]): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error('Could not save bookings to local storage', e);
    }
  }

  getBookedParticipantsCount(experienceIdOrSlug: string, initialBaseline: number = 0): number {
    const current = this.getStored();
    const matching = current.filter(
      b => b.experienceId === experienceIdOrSlug || b.experienceSlug === experienceIdOrSlug
    );
    const addedPeople = matching.reduce((sum, b) => sum + (b.adults || 1) + (b.children || 0), 0);
    return Math.max(initialBaseline, initialBaseline + addedPeople);
  }

  async saveBooking(booking: Booking): Promise<Booking> {
    const current = this.getStored();
    // Ensure expiresAt is set to 24 hours if not present
    if (!booking.expiresAt) {
      const createdTime = booking.createdAt ? new Date(booking.createdAt).getTime() : Date.now();
      booking.expiresAt = new Date(createdTime + 24 * 60 * 60 * 1000).toISOString();
    }
    if (!booking.paymentStatus) {
      booking.paymentStatus = 'PENDING';
    }

    // Prepend so latest is first
    const updated = [booking, ...current.filter(b => b.id !== booking.id)];
    this.setStored(updated);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gia_booking_saved', { detail: booking }));
    }

    return booking;
  }

  async getBookingByCode(code: string, email?: string): Promise<Booking | null> {
    const current = this.getStored();
    const cleanCode = code.trim().toUpperCase();
    const cleanEmail = email?.trim().toLowerCase();

    const found = current.find(b => {
      const codeMatches = b.bookingCode.toUpperCase() === cleanCode;
      if (!codeMatches) return false;
      if (cleanEmail) {
        return b.email.toLowerCase() === cleanEmail;
      }
      return true;
    });

    return found || null;
  }

  async listRecentBookings(): Promise<Booking[]> {
    return this.getStored();
  }

  async updateBookingStatus(id: string, status: Booking['status']): Promise<Booking | null> {
    const current = this.getStored();
    let updatedBooking: Booking | null = null;
    const next = current.map(b => {
      if (b.id === id) {
        updatedBooking = { ...b, status };
        return updatedBooking;
      }
      return b;
    });
    this.setStored(next);
    return updatedBooking;
  }

  async updateBookingPayment(id: string, paymentDetails: PaymentDetails): Promise<Booking | null> {
    const current = this.getStored();
    let updatedBooking: Booking | null = null;
    const next = current.map(b => {
      if (b.id === id || b.bookingCode === id) {
        updatedBooking = {
          ...b,
          status: 'CONFIRMED' as const,
          paymentStatus: 'PAID' as const,
          paymentDetails,
        };
        return updatedBooking;
      }
      return b;
    });
    this.setStored(next);
    return updatedBooking;
  }
}

export const storageService = new LocalStorageService();
