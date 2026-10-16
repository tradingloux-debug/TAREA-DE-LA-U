export interface ReferralCode {
  id: string;
  userId: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 10 (%) or 15 (USD)
  rewardType: 'credits';
  rewardValue: number; // e.g. 15 credits
  active: boolean;
  createdAt: string;
}

export interface Referral {
  id: string;
  referrerUserId: string;
  referredUserId: string;
  codeUsed: string;
  bookingId: string;
  status: 'PENDING' | 'APPROVED' | 'CANCELLED';
  rewardAmount: number;
  createdAt: string;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'EARNED' | 'REDEEMED';
  source: string;
  bookingId?: string;
  createdAt: string;
}

export interface ReferralProgramState {
  currentCode: ReferralCode | null;
  invitedCount: number;
  completedBookingsCount: number;
  creditsBalance: number;
  transactions: CreditTransaction[];
}
