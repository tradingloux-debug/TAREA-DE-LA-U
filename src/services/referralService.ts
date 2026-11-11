import { Booking } from '../types/booking';
import {
  ReferralProgramState,
  calculateGiaPremiaReward,
  GiaPremiaExperienceSettings,
} from '../types/referral';
import { UserProfile } from '../types/account';
import { SupportedLanguage } from '../types/i18n';
import { DEMO_EXPERIENCES } from '../data/experiences';

const REFERRAL_STORAGE_KEY = 'gia_premia_program_v3';
const SETTINGS_STORAGE_KEY = 'gia_premia_settings_v3';

const EMPTY_STATE: ReferralProgramState = {
  currentCode: null,
  secondTripDiscountStatus: 'pending_first_trip',
  invitedCount: 0,
  completedBookingsCount: 0,
  creditsBalance: 0,
  pendingCredits: 0,
  referrals: [],
  transactions: [],
};

const cleanCodePart = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

export const createGiaPremiaCode = (profile: UserProfile): string => {
  const name = cleanCodePart(profile.firstName || 'CLIENTE').slice(0, 7);
  const randomSuffix = Math.floor(10 + Math.random() * 90);
  return `GIA-${name}${randomSuffix}`;
};

export const referralService = {
  getState(): ReferralProgramState {
    try {
      const raw = localStorage.getItem(REFERRAL_STORAGE_KEY);
      return raw ? { ...EMPTY_STATE, ...JSON.parse(raw) } : EMPTY_STATE;
    } catch {
      return EMPTY_STATE;
    }
  },

  saveState(state: ReferralProgramState): void {
    localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(state));
  },

  // Experience Settings & Margins for GIA Premia Admin
  getExperienceSettings(): Record<string, GiaPremiaExperienceSettings> {
    try {
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    // Default: All multi-day and featured tours participate with standard 25% margin
    const initial: Record<string, GiaPremiaExperienceSettings> = {};
    DEMO_EXPERIENCES.forEach((exp) => {
      initial[exp.id] = {
        experienceId: exp.id,
        participates: exp.participatesInGiaPremia ?? true,
        marginPercent: exp.marginPercent ?? 25,
        maxRewardUSD: 5.0,
      };
    });
    return initial;
  },

  saveExperienceSettings(settings: Record<string, GiaPremiaExperienceSettings>): void {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  },

  toggleExperienceParticipation(experienceId: string, participates: boolean): void {
    const settings = this.getExperienceSettings();
    if (settings[experienceId]) {
      settings[experienceId].participates = participates;
      this.saveExperienceSettings(settings);
    }
  },

  isExperienceEligible(experienceId?: string): boolean {
    if (!experienceId) return true;
    const settings = this.getExperienceSettings();
    const config = settings[experienceId];
    return config ? config.participates : true;
  },

  // Margin safeguard calculation
  checkMarginSafeguard(
    experienceId: string,
    discountAmount: number,
    rewardAmount: number,
    basePrice: number
  ): { safe: boolean; netMarginUSD: number; marginPercent: number } {
    const settings = this.getExperienceSettings();
    const config = settings[experienceId] || { marginPercent: 25 };
    const grossMargin = (basePrice * config.marginPercent) / 100;
    const netMarginUSD = grossMargin - (discountAmount + rewardAmount);
    return {
      safe: netMarginUSD > 0,
      netMarginUSD: Math.round(netMarginUSD * 100) / 100,
      marginPercent: config.marginPercent,
    };
  },

  // Synchronize customer status after bookings
  unlockAfterFirstBooking(profile: UserProfile, bookings: Booking[]): ReferralProgramState {
    const state = this.getState();
    const ownBookings = bookings.filter(
      (b) => b.email.trim().toLowerCase() === profile.email.trim().toLowerCase()
    );

    const next = { ...state };

    // 1. Generate code if not generated yet
    if (!next.currentCode) {
      next.currentCode = {
        id: `ref_${Date.now()}`,
        userId: profile.id,
        code: createGiaPremiaCode(profile),
        discountType: 'percentage',
        discountValue: 5, // 5% for friends
        secondTripDiscountValue: 10, // 10% on second booking
        active: true,
        createdAt: new Date().toISOString(),
      };
    }

    // 2. Determine 10% 2nd trip benefit status
    if (next.secondTripDiscountStatus !== 'used') {
      if (ownBookings.length === 1) {
        next.secondTripDiscountStatus = 'available';
      } else if (ownBookings.length === 0) {
        next.secondTripDiscountStatus = 'pending_first_trip';
      }
    }

    next.completedBookingsCount = ownBookings.length;
    this.saveState(next);
    return next;
  },

  // Mark 10% discount as used when customer books their 2nd trip
  markSecondTripDiscountUsed(): void {
    const state = this.getState();
    state.secondTripDiscountStatus = 'used';
    state.secondTripDiscountUsedAt = new Date().toISOString();
    this.saveState(state);
  },

  // Validate referral or personal discount code at checkout
  validateCode(
    code: string,
    currentUserCode?: string,
    currentUserEmail?: string,
    experienceId?: string,
    experienceDurationDays: number = 1,
    language: SupportedLanguage = 'es'
  ) {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      return {
        valid: false,
        message: language === 'es' ? 'Ingresa un código.' : 'Enter a code.',
      };
    }

    // Check if the experience participates in GIA Premia
    if (experienceId && !this.isExperienceEligible(experienceId)) {
      return {
        valid: false,
        message:
          language === 'es'
            ? 'Esta experiencia no participa en las promociones de GIA Premia.'
            : 'This experience is not eligible for GIA Premia promotions.',
      };
    }

    const state = this.getState();
    const ownCode = (currentUserCode || state.currentCode?.code || '').toUpperCase();

    // CASE 1: The user enters THEIR OWN CODE
    if (ownCode && clean === ownCode) {
      if (state.secondTripDiscountStatus === 'available') {
        return {
          valid: true,
          isPersonalSecondTrip: true,
          discountType: 'percentage' as const,
          discountValue: 10,
          rewardAmount: 0,
          message:
            language === 'es'
              ? '¡GIA Premia Personal! 10% de descuento aplicado en tu segunda experiencia.'
              : 'GIA Premia Personal! 10% off applied on your second experience.',
        };
      }
      if (state.secondTripDiscountStatus === 'used') {
        return {
          valid: false,
          message:
            language === 'es'
              ? 'Ya utilizaste tu beneficio del 10% de segunda experiencia. Comparte tu código con amigos para acumular recompensas.'
              : 'You already used your 10% second-trip discount. Share your code with friends to earn credits.',
        };
      }
      return {
        valid: false,
        message:
          language === 'es'
            ? 'No puedes referirte a ti mismo. Tu 10% personal estará disponible en tu segunda reserva tras completar la primera.'
            : 'You cannot refer yourself. Your 10% discount unlocks on your second booking.',
      };
    }

    // CASE 2: The user is entering a FRIEND'S GIA Premia code (Format: GIA-XXXXX)
    if (clean.startsWith('GIA-')) {
      const reward = calculateGiaPremiaReward(experienceDurationDays);
      return {
        valid: true,
        isReferralFromFriend: true,
        referrerCode: clean,
        discountType: 'percentage' as const,
        discountValue: 5, // 5% for the referred friend
        rewardAmount: reward,
        message:
          language === 'es'
            ? `¡Código GIA Premia aceptado! 5% de descuento en tu primera experiencia.`
            : `GIA Premia code accepted! 5% off on your first experience.`,
      };
    }

    // Public promotional campaigns
    const publicPromos: Record<string, { type: 'percentage' | 'fixed'; value: number }> = {
      BIENVENIDO5: { type: 'percentage', value: 5 },
      SURFCITY15: { type: 'fixed', value: 15 },
      EXPLORAGIA: { type: 'percentage', value: 8 },
    };
    const promo = publicPromos[clean];
    if (promo) {
      const discountMsg =
        promo.type === 'percentage'
          ? language === 'es'
            ? `¡Código aplicado! ${promo.value}% de descuento.`
            : `Code applied! ${promo.value}% off.`
          : language === 'es'
          ? `¡Código aplicado! $${promo.value} USD de descuento.`
          : `Code applied! $${promo.value} USD off.`;
      return {
        valid: true,
        discountType: promo.type,
        discountValue: promo.value,
        rewardAmount: 0,
        message: discountMsg,
      };
    }

    return {
      valid: false,
      message:
        language === 'es'
          ? 'Código inválido o no reconocido. Verifica el código e intenta nuevamente.'
          : 'Invalid or unrecognized code. Check it and try again.',
    };
  },

  // Record a friend referral booking (status PENDING until trip completed)
  registerReferredBooking(
    referrerCode: string,
    referredName: string,
    referredEmail: string,
    bookingId: string,
    experienceTitle: string,
    daysCount: number
  ): void {
    const state = this.getState();
    const rewardAmount = calculateGiaPremiaReward(daysCount);

    const referralItem = {
      id: `ref_${Date.now()}`,
      referrerUserId: state.currentCode?.userId || 'owner',
      referrerCode,
      referredName,
      referredEmail,
      bookingId,
      experienceTitle,
      daysCount,
      rewardAmount,
      status: 'PENDING' as const,
      createdAt: new Date().toISOString(),
    };

    const next: ReferralProgramState = {
      ...state,
      invitedCount: state.invitedCount + 1,
      pendingCredits: Math.round((state.pendingCredits + rewardAmount) * 100) / 100,
      referrals: [referralItem, ...state.referrals],
      transactions: [
        {
          id: `tx_${Date.now()}`,
          userId: state.currentCode?.userId || 'local-user',
          amount: rewardAmount,
          type: 'PENDING',
          source: `Recompensa pendiente: ${referredName} (${experienceTitle})`,
          bookingId,
          referralId: referralItem.id,
          createdAt: new Date().toISOString(),
        },
        ...state.transactions,
      ],
    };
    this.saveState(next);
  },

  // Mark referral as completed and credit approved amount
  approveReferral(referralId: string): void {
    const state = this.getState();
    const item = state.referrals.find((r) => r.id === referralId);
    if (!item || item.status === 'APPROVED') return;

    item.status = 'APPROVED';
    item.completedAt = new Date().toISOString();

    const next: ReferralProgramState = {
      ...state,
      pendingCredits: Math.max(0, Math.round((state.pendingCredits - item.rewardAmount) * 100) / 100),
      creditsBalance: Math.round((state.creditsBalance + item.rewardAmount) * 100) / 100,
      transactions: [
        {
          id: `tx_${Date.now()}`,
          userId: state.currentCode?.userId || 'local-user',
          amount: item.rewardAmount,
          type: 'EARNED',
          source: `Recompensa acreditada: Viaje completado de ${item.referredName}`,
          bookingId: item.bookingId,
          referralId: item.id,
          createdAt: new Date().toISOString(),
        },
        ...state.transactions,
      ],
    };
    this.saveState(next);
  },

  // Redeem promotional credits on checkout
  redeemCredits(amountToRedeem: number, bookingId?: string, language: SupportedLanguage = 'es'): boolean {
    const state = this.getState();
    if (amountToRedeem <= 0 || amountToRedeem > state.creditsBalance) return false;
    this.saveState({
      ...state,
      creditsBalance: Math.round((state.creditsBalance - amountToRedeem) * 100) / 100,
      transactions: [
        {
          id: `tx_${Date.now()}`,
          userId: state.currentCode?.userId || 'local-user',
          amount: amountToRedeem,
          type: 'REDEEMED',
          source: language === 'es' ? 'Crédito GIA aplicado en reserva' : 'GIA Credit applied on booking',
          bookingId,
          createdAt: new Date().toISOString(),
        },
        ...state.transactions,
      ],
    });
    return true;
  },

  // Admin audit summary
  getAdminAuditSummary() {
    const state = this.getState();
    const settings = this.getExperienceSettings();
    const totalEligible = Object.values(settings).filter((s) => s.participates).length;
    const totalPending = state.referrals.filter((r) => r.status === 'PENDING').length;
    const totalApproved = state.referrals.filter((r) => r.status === 'APPROVED').length;
    const totalRewardsUSD = state.referrals
      .filter((r) => r.status === 'APPROVED')
      .reduce((acc, curr) => acc + curr.rewardAmount, 0);

    return {
      totalEligibleExperiences: totalEligible,
      totalRegisteredCodes: state.currentCode ? 1 : 0,
      totalReferredTrips: state.referrals.length,
      pendingReferralsCount: totalPending,
      approvedReferralsCount: totalApproved,
      totalPromotionalCostUSD: Math.round(totalRewardsUSD * 100) / 100,
      currentPendingCreditsUSD: state.pendingCredits,
      currentAvailableCreditsUSD: state.creditsBalance,
    };
  },
};
