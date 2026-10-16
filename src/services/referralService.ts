import { Booking } from '../types/booking';
import { ReferralProgramState } from '../types/referral';
import { UserProfile } from '../types/account';
import { SupportedLanguage } from '../types/i18n';

const REFERRAL_STORAGE_KEY = 'gia_referral_program_v2';

const EMPTY_STATE: ReferralProgramState = {
  currentCode: null,
  invitedCount: 0,
  completedBookingsCount: 0,
  creditsBalance: 0,
  transactions: [],
};

const cleanCodePart = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

const createReferralCode = (profile: UserProfile) => {
  const name = cleanCodePart(profile.firstName).slice(0, 7) || 'GIA';
  return `${name}${String(Date.now()).slice(-4)}`;
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

  unlockAfterFirstBooking(profile: UserProfile, bookings: Booking[]): ReferralProgramState {
    const state = this.getState();
    if (state.currentCode) return state;
    const hasBooking = bookings.some(
      booking => booking.email.trim().toLowerCase() === profile.email.trim().toLowerCase()
    );
    if (!hasBooking) return state;

    const next: ReferralProgramState = {
      ...state,
      currentCode: {
        id: `ref_${Date.now()}`,
        userId: profile.id,
        code: createReferralCode(profile),
        discountType: 'percentage',
        discountValue: 5,
        rewardType: 'credits',
        rewardValue: 10,
        active: true,
        createdAt: new Date().toISOString(),
      },
    };
    this.saveState(next);
    return next;
  },

  validateCode(code: string, currentUserCode?: string, language: SupportedLanguage = 'es') {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      return {
        valid: false,
        message: language === 'pt' ? 'Insira um código.' : language === 'es' ? 'Ingresa un código.' : 'Enter a code.',
      };
    }

    const ownCode = currentUserCode || this.getState().currentCode?.code;
    if (ownCode && clean === ownCode.toUpperCase()) {
      return {
        valid: false,
        message:
          language === 'pt'
            ? 'Você não pode usar seu próprio código de indicação.'
            : language === 'es'
            ? 'No puedes utilizar tu propio código de recomendación.'
            : 'You cannot use your own referral code.',
      };
    }

    const publicPromos: Record<string, { type: 'percentage' | 'fixed'; value: number }> = {
      BIENVENIDO5: { type: 'percentage', value: 5 },
      SURFCITY15: { type: 'fixed', value: 15 },
      EXPLORAGIA: { type: 'percentage', value: 8 },
    };
    const promo = publicPromos[clean];
    if (promo) {
      const discountMsg =
        promo.type === 'percentage'
          ? language === 'pt'
            ? `Código aplicado! ${promo.value}% de desconto.`
            : language === 'es'
            ? `¡Código aplicado! ${promo.value}% de descuento.`
            : `Code applied! ${promo.value}% off.`
          : language === 'pt'
          ? `Código aplicado! $${promo.value} USD de desconto.`
          : language === 'es'
          ? `¡Código aplicado! $${promo.value} USD de descuento.`
          : `Code applied! $${promo.value} USD off.`;
      return {
        valid: true,
        discountType: promo.type,
        discountValue: promo.value,
        message: discountMsg,
      };
    }
    return {
      valid: false,
      message:
        language === 'pt'
          ? 'Código inválido ou não reconhecido. Verifique o código e tente novamente.'
          : language === 'es'
          ? 'Código inválido o no reconocido. Verifica el código e intenta nuevamente.'
          : 'Invalid or unrecognized code. Check it and try again.',
    };
  },

  redeemCredits(amountToRedeem: number, bookingId?: string, language: SupportedLanguage = 'es'): boolean {
    const state = this.getState();
    if (amountToRedeem <= 0 || amountToRedeem > state.creditsBalance) return false;
    this.saveState({
      ...state,
      creditsBalance: state.creditsBalance - amountToRedeem,
      transactions: [{
        id: `tx_${Date.now()}`,
        userId: state.currentCode?.userId || 'local-user',
        amount: amountToRedeem,
        type: 'REDEEMED',
        source: language === 'pt' ? 'Desconto aplicado na reserva' : language === 'es' ? 'Descuento aplicado en reserva' : 'Booking discount applied',
        bookingId,
        createdAt: new Date().toISOString(),
      }, ...state.transactions],
    });
    return true;
  },
};
