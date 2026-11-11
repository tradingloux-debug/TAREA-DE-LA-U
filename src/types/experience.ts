export type Category =
  | 'cultura'
  | 'gastronomia'
  | 'naturaleza'
  | 'aventura'
  | 'playa'
  | 'comunitario'
  | 'especial'
  | 'paquetes';

export type DurationType = 'hours' | 'half_day' | 'full_day' | 'multi_day';

export type PackageDurationTier = '1_dia' | '2d_1n' | '3d_2n' | '5d_4n' | '7d_6n';

export type GroupType = 'individual' | 'parejas' | 'familias' | 'grupos';

export type TravelerProfile =
  | 'individual'
  | 'parejas'
  | 'familias'
  | 'grupos'
  | 'adultos_mayores'
  | 'aventura'
  | 'gastronomia'
  | 'premium';

export type PriceRange = 'economico' | 'medio' | 'premium';

export type ComfortLevel = 'economico' | 'estandar' | 'premium';

export type Region = 'Occidente' | 'Centro' | 'Costa Pacífico' | 'Oriente';

export type AvailabilityStatus = 'disponible_inmediato' | 'propuesta_a_medida';

export type DifficultyLevel = 'facil' | 'moderado' | 'exigente';

export interface PackageServices {
  transportIncluded: boolean;
  accommodationIncluded: boolean;
  mealsIncluded: boolean;
  guidesIncluded: boolean;
  ticketsIncluded: boolean;
  communityVisit: boolean;
}

export interface DayByDayPlan {
  dayNumber: number;
  titleEs: string;
  titleEn: string;
  destinationEs: string;
  destinationEn: string;
  transitTimeEs?: string;
  transitTimeEn?: string;
  activitiesEs: string[];
  activitiesEn: string[];
  mealsIncludedEs: string;
  mealsIncludedEn: string;
  lodgingEs: string;
  lodgingEn: string;
}

export interface CustomizationOption {
  id: string;
  labelEs: string;
  labelEn: string;
  descriptionEs?: string;
  descriptionEn?: string;
  priceDiff?: number;
  category: 'alojamiento' | 'transporte' | 'actividad' | 'alimentacion';
}

export interface AccommodationDetails {
  typeEs: string;
  typeEn: string;
  detailsEs: string;
  detailsEn: string;
  comfortTier?: ComfortLevel;
}

export interface TransportDetails {
  modeEs: string;
  modeEn: string;
  airportTransfer: boolean;
  pickupNotesEs?: string;
  pickupNotesEn?: string;
}

export interface MealPlanDetails {
  summaryEs: string;
  summaryEn: string;
  breakfastCount: number;
  lunchCount: number;
  dinnerCount: number;
}

export interface ItineraryItem {
  time: string;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface HostStory {
  name: string;
  community: string;
  storyEs: string;
  storyEn: string;
  photoUrl?: string;
  impactEs: string;
  impactEn: string;
}

export interface PhotoCredit {
  author: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  caption?: string;
}

export type LocalCategory =
  | 'gastronomia_local'
  | 'cocina_tradicional'
  | 'cafe'
  | 'cacao'
  | 'agricultura'
  | 'artesanias'
  | 'arte'
  | 'tradiciones'
  | 'historia_local'
  | 'experiencias_rurales';

export interface Experience {
  id: string;
  slug: string;
  titleEs: string;
  titleEn: string;
  shortDescriptionEs: string;
  shortDescriptionEn: string;
  descriptionEs: string;
  descriptionEn: string;
  category: Category;
  region?: Region;
  location: string;
  department: string;
  coordinates: Coordinates;
  meetingPointEs: string;
  meetingPointEn: string;
  price: number;
  currency: 'USD';
  priceRange: PriceRange;
  duration: string;
  durationHours: number;
  durationType: DurationType;
  languages: ('ES' | 'EN')[];
  groupType: GroupType[];
  minPeople: number;
  maxPeople: number;
  images: string[];
  imageCredits?: PhotoCredit[];
  includedEs: string[];
  includedEn: string[];
  notIncludedEs: string[];
  notIncludedEn: string[];
  requirementsEs: string[];
  requirementsEn: string[];
  itinerary: ItineraryItem[];
  featured: boolean;
  active: boolean;
  demoRating?: number;
  demoReviewsCount?: number;
  // Interactive panoramic media
  virtualTour360Url?: string;
  has360?: boolean;
  // Strategic Local Experience extensions
  isLocalExperience?: boolean;
  localCategory?: LocalCategory;
  hostStory?: HostStory;
  // Extended packages & status
  availabilityStatus?: AvailabilityStatus;
  difficulty?: DifficultyLevel;
  isPackage?: boolean;
  packageDays?: number;
  packageNights?: number;
  packageDurationTier?: PackageDurationTier;
  durationBadgeEs?: string;
  durationBadgeEn?: string;
  travelerProfiles?: TravelerProfile[];
  comfortLevel?: ComfortLevel;
  isPriceOnQuote?: boolean;
  priceNoteEs?: string;
  priceNoteEn?: string;
  destinationsCovered?: string[];
  accommodationDetails?: AccommodationDetails;
  transportDetails?: TransportDetails;
  mealPlan?: MealPlanDetails;
  dayByDayItinerary?: DayByDayPlan[];
  customizationOptions?: CustomizationOption[];
  packageServices?: PackageServices;
  proposalNoteEs?: string;
  proposalNoteEn?: string;
  isUnlimitedCapacity?: boolean;
  initialBookedCount?: number;
  participatesInGiaPremia?: boolean;
  marginPercent?: number;
  // 4 Strategic Pillars
  pillarCategory?: 'imperdibles' | 'en_tendencia' | 'poco_conocido' | 'familiar';
  trendingReasonEs?: string;
  trendingReasonEn?: string;
  trendingReasonPt?: string;
  recommendedAgesEs?: string;
  recommendedAgesEn?: string;
  recommendedAgesPt?: string;
  accessibilityNotesEs?: string;
  accessibilityNotesEn?: string;
  accessibilityNotesPt?: string;
  titlePt?: string;
  shortDescriptionPt?: string;
  descriptionPt?: string;
  pricingStatus?: 'confirmed' | 'on_quote' | 'in_development';
}

export interface ExperienceFilterState {
  searchQuery: string;
  category: Category | 'all';
  pillarCategory?: 'all' | 'imperdibles' | 'en_tendencia' | 'poco_conocido' | 'familiar';
  department: string;
  region?: string;
  priceRange: PriceRange | 'all';
  durationType: DurationType | 'all';
  packageDurationTier?: PackageDurationTier | 'all';
  travelerProfile?: TravelerProfile | 'all';
  comfortLevel?: ComfortLevel | 'all';
  groupType: GroupType | 'all';
  sortBy: 'recommended' | 'price_asc' | 'price_desc' | 'duration_asc';
  onlyLocal?: boolean;
  only360?: boolean;
  onlyPackages?: boolean;
  availabilityFilter?: 'all' | 'disponible_inmediato' | 'propuesta_a_medida';
  difficulty?: DifficultyLevel | 'all';
}


