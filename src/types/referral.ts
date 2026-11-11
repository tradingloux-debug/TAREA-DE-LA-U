export interface ReferralCode {
  id: string;
  userId: string;
  code: string; // e.g. GIA-CLIENTE25
  discountType: 'percentage' | 'fixed';
  discountValue: number; // 5 (%) for friends
  secondTripDiscountValue: number; // 10 (%) for owner second trip
  active: boolean;
  createdAt: string;
}

export type GiaPremiaBenefitStatus = 'available' | 'used' | 'pending_first_trip';

export interface Referral {
  id: string;
  referrerUserId: string;
  referrerCode: string;
  referredName: string;
  referredEmail: string;
  bookingId: string;
  experienceTitle: string;
  daysCount: number;
  rewardAmount: number; // Calculated according to duration table (up to $5)
  status: 'PENDING' | 'APPROVED' | 'CANCELLED';
  createdAt: string;
  completedAt?: string;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'EARNED' | 'REDEEMED' | 'PENDING';
  source: string;
  bookingId?: string;
  referralId?: string;
  createdAt: string;
}

export interface ReferralProgramState {
  currentCode: ReferralCode | null;
  secondTripDiscountStatus: GiaPremiaBenefitStatus;
  secondTripDiscountUsedAt?: string;
  invitedCount: number;
  completedBookingsCount: number;
  creditsBalance: number; // Available confirmed credit
  pendingCredits: number; // Pending completion of referred trips
  referrals: Referral[];
  transactions: CreditTransaction[];
}

export interface GiaPremiaExperienceSettings {
  experienceId: string;
  participates: boolean;
  marginPercent: number; // e.g. 25%
  maxRewardUSD: number;
}

// Fixed duration rewards table mandated by GIA Premia
export const GIA_PREMIA_DURATION_REWARDS: Record<number, number> = {
  1: 0.5,
  2: 1.0,
  3: 1.5,
  4: 2.0,
  5: 3.0,
  6: 4.0,
  7: 5.0, // 7 days or more -> $5.00
};

export const calculateGiaPremiaReward = (daysCount: number = 1): number => {
  const days = Math.max(1, Math.floor(daysCount));
  if (days >= 7) return 5.0;
  return GIA_PREMIA_DURATION_REWARDS[days] ?? 0.5;
};
