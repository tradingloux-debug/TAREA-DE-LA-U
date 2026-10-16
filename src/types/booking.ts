export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
export type PaymentStatus = 'PENDING' | 'PAID';

export interface PaymentDetails {
  method: 'card' | 'wompi' | 'transfer' | 'chivo';
  amount: number;
  percentagePaid: number; // e.g. 100
  paidAt: string;
  transactionId: string;
  cardHolder?: string;
  cardLast4?: string;
  cardBrand?: string;
  bankName?: string;
  transferReference?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  experienceId: string;
  experienceTitle: string;
  experienceSlug: string;
  experienceLocation: string;
  experienceImage?: string;
  date: string;
  adults: number;
  children: number;
  pricePerPerson: number;
  subtotal: number;
  total: number;
  currency: 'USD';
  customerFirstName: string;
  customerLastName: string;
  email: string;
  phone: string;
  country: string;
  notes?: string;
  status: BookingStatus;
  paymentStatus?: PaymentStatus;
  paymentDetails?: PaymentDetails;
  createdAt: string;
  expiresAt: string; // Exactly 24 hours after reservation creation
}

export interface BookingDraft {
  experienceId: string;
  experienceTitle: string;
  experienceSlug: string;
  experienceLocation: string;
  experienceImage?: string;
  pricePerPerson: number;
  date: string;
  adults: number;
  children: number;
}
