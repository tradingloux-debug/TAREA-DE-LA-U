import { Experience } from './experience';

export type TripPace = 'relajado' | 'equilibrado' | 'intenso';
export type TravelerType = 'solo' | 'pareja' | 'familia' | 'grupo';
export type TripStatus = 'DRAFT' | 'PLANNED' | 'BOOKING' | 'BOOKED' | 'COMPLETED';

export interface TripServicesSelection {
  lodging: boolean;
  transport: boolean;
  airportTransfer: boolean;
  certifiedGuide: boolean;
  dailyMeals: boolean;
  scheduledActivities: boolean;
}

export interface TripSpecialNeeds {
  childSafetySeats: boolean;
  wheelchairAccessibility: boolean;
  dietaryRestrictions: string;
  guideLanguage: 'es' | 'en';
  petFriendlyRequired: boolean;
}

export interface TripDayPlan {
  dayNumber: number;
  destination: string;
  themeEs: string;
  themeEn: string;
  themePt?: string;
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
  inspirationIntent?: string;
  childrenCount?: number;
  childrenAges?: string;
  servicesIncluded?: TripServicesSelection;
  specialNeeds?: TripSpecialNeeds;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
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
  inspirationIntent?: string;
  childrenCount?: number;
  childrenAges?: string;
  servicesIncluded?: TripServicesSelection;
  specialNeeds?: TripSpecialNeeds;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
}
