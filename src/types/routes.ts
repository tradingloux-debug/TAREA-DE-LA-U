import { Coordinates } from './experience';

export interface RouteItineraryDay {
  day: number;
  destination: string;
  department: string;
  coordinates: Coordinates;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  experienceIds: string[];
}

export interface TourRoute {
  id: string;
  slug: string;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  days: number;
  destinations: string[];
  departments: string[];
  experiences: string[];
  images: string[];
  virtualTour360Url?: string;
  has360?: boolean;
  price: number;
  currency: 'USD';
  includedEs: string[];
  includedEn: string[];
  notIncludedEs: string[];
  notIncludedEn: string[];
  recommendedForEs: string[];
  recommendedForEn: string[];
  itinerary: RouteItineraryDay[];
  active: boolean;
  featured?: boolean;
  packageStyleEs?: string;
  packageStyleEn?: string;
  accommodationEs?: string;
  accommodationEn?: string;
  mobilityEs?: string;
  mobilityEn?: string;
  mealsEs?: string;
  mealsEn?: string;
}
