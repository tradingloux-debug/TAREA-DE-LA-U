import { Experience } from './experience';

export type TripPace = 'relajado' | 'equilibrado' | 'intenso';
export type TravelerType = 'solo' | 'pareja' | 'familia' | 'grupo';
export type TripStatus = 'DRAFT' | 'PLANNED' | 'BOOKING' | 'BOOKED' | 'COMPLETED';

export interface TripDayPlan {
  dayNumber: number;
  destination: string;
  themeEs: string;
  themeEn: string;
  experiences: Experience[];
  notes?: string;
  isFreeDay?: boolean;
}

export interface MyTrip {
  id: string;
  userId?: string;
  title: string;
  startDate?: string;
  endDate?: string;
  daysCount: number;
  travelersCount: number;
  travelerType: TravelerType;
  budgetTier?: 'economico' | 'equilibrado' | 'premium';
  pace: TripPace;
  interests: string[];
  destinations: string[];
  days: TripDayPlan[];
  estimatedTotal: number;
  currency: 'USD';
  status: TripStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PlannerPreferences {
  daysCount: number;
  dates?: string;
  travelersCount: number;
  travelerType: TravelerType;
  interests: string[];
  budgetTier: 'economico' | 'equilibrado' | 'premium';
  pace: TripPace;
  restrictions?: string;
  dislikes?: string;
}
