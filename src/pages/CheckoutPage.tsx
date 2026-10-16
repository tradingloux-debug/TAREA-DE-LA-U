import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { useBookingDraft } from '../context/BookingDraftContext';
import { useAccount } from '../context/AccountContext';
import { storageService } from '../services/storage';
import { referralService } from '../services/referralService';
import { trackEvent } from '../services/analytics';
import { Booking } from '../types/booking';
import {
  Calendar,
  Users,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Info,
  Clock,
  MapPin,
  Lock,
  Tag,
  Coins,
  Check,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { navigate, goBack } = useRouter();
  const { language, t } = useLanguage();
  const { draft, setLastConfirmedBooking } = useBookingDraft();
  const { profile } = useAccount();

  // If no draft exists, redirect gracefully to catalog
  if (!draft) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
          <Info className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-neutral-900 mb-1">
          No tienes una experiencia seleccionada
        </h2>
        <p className="text-xs text-neutral-500 mb-5">
          Elige una experiencia en nuestro catálogo para iniciar el proceso de reserva.
        </p>
        <button
          type="button"
          onClick={() => navigate('/experiencias')}
          className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg"
        >
          Explorar experiencias
        </button>
      </div>
    );
  }

  // Form state for traveler details
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    country: profile?.country || '',
    notes: '',
    agreeTerms: false,
  });

  // Referral code & GIA credits state
  const referralState = referralService.getState();
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
  } | null>(null);
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [useCredits, setUseCredits] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPeople = draft.adults + draft.children;
  const isRouteBooking = draft.experienceId.startsWith('route-');
  const subtotal = draft.pricePerPerson * totalPeople;

  // Calculate discount from promo code
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * appliedPromo.discountValue) / 100);
    } else {
      discountAmount = Math.min(subtotal, appliedPromo.discountValue);
    }
  }

  // Calculate credits discount
  const availableCredits = referralState.creditsBalance;
  const remainingBeforeCredits = Math.max(0, subtotal - discountAmount);
  const creditsAmount = useCredits ? Math.min(remainingBeforeCredits, availableCredits) : 0;

  const total = Math.max(0, remainingBeforeCredits - creditsAmount);

  const handleApplyPromo = () => {
    setPromoMessage(null);
    if (!promoCodeInput.trim()) return;

    const result = referralService.validateCode(promoCodeInput, referralState.currentCode?.code, language);
    if (result.valid && result.discountType && result.discountValue) {
      setAppliedPromo({
        code: promoCodeInput.trim().toUpperCase(),
        discountType: result.discountType,
        discountValue: result.discountValue,
      });
      setPromoMessage({ type: 'success', text: result.message || 'Código aplicado con éxito' });
      trackEvent('referral_code_used', { code: promoCodeInput.trim().toUpperCase() });
    } else {
      setAppliedPromo(null);
      setPromoMessage({ type: 'error', text: result.message || 'Código inválido' });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.firstName.trim()) errs.firstName = 'Ingresa tu nombre';
    if (!formData.lastName.trim()) errs.lastName = 'Ingresa tu apellido';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Ingresa un correo electrónico válido';
    }
    if (!formData.phone.trim()) errs.phone = language === 'es' ? 'Ingresa tu teléfono o WhatsApp' : 'Please enter your phone or WhatsApp';
    if (!formData.country.trim()) errs.country = language === 'es' ? 'Ingresa tu país de procedencia' : 'Please enter your country';
    if (!formData.agreeTerms) {
      errs.agreeTerms =
        language === 'es'
          ? 'Debes aceptar los Términos y Condiciones y la Política de Privacidad'
          : 'You must accept the Terms and Conditions and the Privacy Policy';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const generateBookingCode = () => {
    const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
    return `GIA-${randomSixDigits}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    trackEvent('booking_form_completed', { experienceId: draft.experienceId });

    // Generate unique MVP booking code
    const code = generateBookingCode();

    // If credits were used, redeem them from wallet
    if (creditsAmount > 0) {
      referralService.redeemCredits(creditsAmount, code, language);
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

    const newBooking: Booking = {
      id: 'book_' + Date.now(),
      bookingCode: code,
      experienceId: draft.experienceId,
      experienceTitle: draft.experienceTitle,
      experienceSlug: draft.experienceSlug,
      experienceLocation: draft.experienceLocation,
      experienceImage: draft.experienceImage,
      date: draft.date,
      adults: draft.adults,
      children: draft.children,
      pricePerPerson: draft.pricePerPerson,
      subtotal,
      total,
      currency: 'USD',
      customerFirstName: formData.firstName.trim(),
      customerLastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      country: formData.country.trim(),
      notes: formData.notes.trim() || undefined,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      createdAt: now.toISOString(),
      expiresAt,
    };

    try {
      await storageService.saveBooking(newBooking);
      if (profile && profile.email.trim().toLowerCase() === newBooking.email.trim().toLowerCase()) {
        const bookings = await storageService.listRecentBookings();
        referralService.unlockAfterFirstBooking(profile, bookings);
      }
      setLastConfirmedBooking(newBooking);

      trackEvent('booking_confirmed', {
        bookingCode: code,
        experienceId: draft.experienceId,
        total,
        promoCodeUsed: appliedPromo?.code,
      });

      navigate('/reserva-confirmada');
    } catch (err) {
      console.error('Error saving booking', err);
      setErrors({ form: language === 'es' ? 'No se pudo registrar la reserva. Intenta nuevamente.' : 'We could not save your booking. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="bg-neutral-50/60 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back navigation */}
        <div>
          <button
            type="button"
            onClick={() => goBack(isRouteBooking ? `/rutas/${draft.experienceSlug}` : `/experiencias/${draft.experienceSlug}`)}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-neutral-100 text-xs font-bold text-neutral-700 hover:text-[#063A5B] border border-neutral-200/90 shadow-2xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00A6A6] group-hover:-translate-x-0.5 transition-transform" />
            <span>{language === 'es' ? `Atrás: Volver al detalle ${isRouteBooking ? 'del tour' : 'de la experiencia'}` : `Back to ${isRouteBooking ? 'tour' : 'experience'} details`}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-display">
          {t.checkout.title}
        </h1>

        {/* Guaranteed Booking Notice Box */}
        <div className="mb-8 p-4 bg-gradient-to-r from-teal-50 to-sky-50 border border-teal-200 rounded-2xl flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <div className="text-xs text-teal-950">
            <p className="font-bold flex items-center gap-2">
              <span>{language === 'es' ? 'Reserva Automática y Rango de Pago de 24 Horas' : 'Automatic Reservation & 24-Hour Payment Window'}</span>
              <span className="text-[10px] bg-teal-800 text-white font-mono px-2 py-0.5 rounded-full">100% de la experiencia</span>
            </p>
            <p className="mt-1 leading-relaxed text-teal-900/90">
              {language === 'es'
                ? 'Al confirmar, tu experiencia se reserva automáticamente con código oficial. Cuentas con un rango de tiempo de 24 horas después de hacer tu reservación para pagar el 100% mediante tarjeta o transferencia y asegurar tus cupos definitivamente.'
                : 'Upon confirming, your experience is automatically reserved with an official code. You have a 24-hour window after reserving to complete 100% payment via card or bank transfer.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1: Datos de reserva */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-2xs">
            <h2 className="text-base font-bold text-neutral-900 mb-4 pb-3 border-b border-neutral-100 font-display">
              {t.checkout.step1Title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[11px] text-neutral-400 block mb-0.5">{language === 'es' ? (isRouteBooking ? 'Tour completo' : 'Experiencia') : (isRouteBooking ? 'Complete tour' : 'Experience')}</span>
                <p className="text-xs font-bold text-neutral-900 leading-snug">
                  {draft.experienceTitle}
                </p>
                <p className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  {draft.experienceLocation}
                </p>
              </div>

              <div>
                <span className="text-[11px] text-neutral-400 block mb-0.5">{t.checkout.dateLabel}</span>
                <p className="text-xs font-bold text-neutral-900 flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-teal-700" />
                  {draft.date}
                </p>
              </div>

              <div>
                <span className="text-[11px] text-neutral-400 block mb-0.5">{t.checkout.guestsLabel}</span>
                <p className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-teal-700" />
                  <span>
                    {draft.adults} {language === 'es' ? 'adultos' : 'adults'} {draft.children > 0 && `· ${draft.children} ${language === 'es' ? 'niños' : 'children'}`}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* STEP 2: Información del viajero */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-neutral-900 pb-3 border-b border-neutral-100 font-display">
              {t.checkout.step2Title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {t.checkout.firstName} *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder={language === 'es' ? 'Ej. Sofía' : 'E.g. Sophia'}
                  className={`w-full px-3.5 py-2 text-xs rounded-xl border bg-neutral-50/50 focus:bg-white focus:outline-hidden focus:ring-2 ${
                    errors.firstName ? 'border-red-400 focus:ring-red-300' : 'border-neutral-200 focus:ring-teal-700'
                  }`}
                />
                {errors.firstName && <p className="text-[11px] text-red-500 mt-1">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {t.checkout.lastName} *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder={language === 'es' ? 'Ej. Martínez' : 'E.g. Martinez'}
                  className={`w-full px-3.5 py-2 text-xs rounded-xl border bg-neutral-50/50 focus:bg-white focus:outline-hidden focus:ring-2 ${
                    errors.lastName ? 'border-red-400 focus:ring-red-300' : 'border-neutral-200 focus:ring-teal-700'
                  }`}
                />
                {errors.lastName && <p className="text-[11px] text-red-500 mt-1">{errors.lastName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {t.checkout.email} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sofia@ejemplo.com"
                  className={`w-full px-3.5 py-2 text-xs rounded-xl border bg-neutral-50/50 focus:bg-white focus:outline-hidden focus:ring-2 ${
                    errors.email ? 'border-red-400 focus:ring-red-300' : 'border-neutral-200 focus:ring-teal-700'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {t.checkout.phone} *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000 / +503 ..."
                  className={`w-full px-3.5 py-2 text-xs rounded-xl border bg-neutral-50/50 focus:bg-white focus:outline-hidden focus:ring-2 ${
                    errors.phone ? 'border-red-400 focus:ring-red-300' : 'border-neutral-200 focus:ring-teal-700'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
              </div>

              {/* Country */}
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {t.checkout.country} *
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={e => setFormData({ ...formData, country: e.target.value })}
                  placeholder={language === 'es' ? 'Ej. Estados Unidos, Canadá, España, El Salvador...' : 'E.g. United States, Canada, Spain, El Salvador...'}
                  className={`w-full px-3.5 py-2 text-xs rounded-xl border bg-neutral-50/50 focus:bg-white focus:outline-hidden focus:ring-2 ${
                    errors.country ? 'border-red-400 focus:ring-red-300' : 'border-neutral-200 focus:ring-teal-700'
                  }`}
                />
                {errors.country && <p className="text-[11px] text-red-500 mt-1">{errors.country}</p>}
              </div>

              {/* Special notes */}
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  {t.checkout.specialNotes}
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={t.checkout.specialNotesPlaceholder}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-700"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: Resumen y confirmación */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 pb-3 border-b border-neutral-100 font-display">
              {t.checkout.step3Title}
            </h2>

            {/* Promo Code & Referral Field */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-teal-700" />
                <span>{language === 'es' ? '¿Tienes un código GIA o de recomendación?' : 'Do you have a GIA or referral code?'}</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={e => setPromoCodeInput(e.target.value.toUpperCase())}
                  placeholder={language === 'es' ? 'Ej. BIENVENIDO5' : 'E.g. BIENVENIDO5'}
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-neutral-200 bg-white font-mono uppercase focus:ring-2 focus:ring-teal-700"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  {language === 'es' ? 'Aplicar' : 'Apply'}
                </button>
              </div>

              {promoMessage && (
                <p
                  className={`text-[11px] font-medium flex items-center gap-1 ${
                    promoMessage.type === 'success' ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  {promoMessage.type === 'success' ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-rose-600" />
                  )}
                  <span>{promoMessage.text}</span>
                </p>
              )}

              {/* Use GIA Credits Checkbox if user has balance */}
              {availableCredits > 0 && (
                <div className="pt-2 mt-2 border-t border-neutral-200/60 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800">
                    <input
                      type="checkbox"
                      checked={useCredits}
                      onChange={e => setUseCredits(e.target.checked)}
                      className="rounded text-teal-800 focus:ring-teal-700"
                    />
                    <Coins className="w-3.5 h-3.5 text-amber-500" />
                    <span>{language === 'es' ? `Usar mis Créditos GIA ($${availableCredits} USD disponibles)` : `Use my GIA Credits ($${availableCredits} USD available)`}</span>
                  </label>
                  {useCredits && (
                    <span className="text-xs font-mono font-bold text-emerald-700">
                      -${creditsAmount} USD
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-neutral-600">
                <span>{t.checkout.pricePerPerson}</span>
                <span className="font-mono">${draft.pricePerPerson} USD</span>
              </div>
              <div className="flex items-center justify-between text-neutral-600">
                <span>{language === 'es' ? 'Total de viajeros' : 'Total travelers'}</span>
                <span className="font-mono">{totalPeople}</span>
              </div>
              <div className="flex items-center justify-between text-neutral-600">
                <span>{t.checkout.subtotal}</span>
                <span className="font-mono">${subtotal} USD</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-semibold">
                  <span>{language === 'es' ? 'Descuento' : 'Discount'} ({appliedPromo?.code})</span>
                  <span className="font-mono">-${discountAmount} USD</span>
                </div>
              )}

              {creditsAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-semibold">
                  <span>{language === 'es' ? 'Créditos GIA aplicados' : 'GIA Credits applied'}</span>
                  <span className="font-mono">-${creditsAmount} USD</span>
                </div>
              )}

              <div className="flex items-center justify-between text-base font-extrabold text-neutral-900 pt-3 border-t border-neutral-200">
                <span>{t.checkout.total}</span>
                <span className="font-mono text-xl text-teal-900">${total} USD</span>
              </div>
            </div>


            {/* Terms & Privacy checkbox mandatory */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={e => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5 rounded border-neutral-300 text-teal-800 focus:ring-teal-700 cursor-pointer shrink-0"
                />
                <span className="text-xs text-neutral-600 select-none leading-relaxed">
                  {language === 'es' ? (
                    <>
                      He leído y acepto los{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate('/terminos-y-condiciones');
                        }}
                        className="text-[#00A6A6] font-bold underline hover:text-[#063A5B] cursor-pointer"
                      >
                        Términos y Condiciones
                      </button>{' '}
                      y la{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate('/politica-de-privacidad');
                        }}
                        className="text-[#00A6A6] font-bold underline hover:text-[#063A5B] cursor-pointer"
                      >
                        Política de Privacidad
                      </button>
                      .
                    </>
                  ) : (
                    <>
                      I have read and accept the{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate('/terms-and-conditions');
                        }}
                        className="text-[#00A6A6] font-bold underline hover:text-[#063A5B] cursor-pointer"
                      >
                        Terms and Conditions
                      </button>{' '}
                      and the{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate('/privacy-policy');
                        }}
                        className="text-[#00A6A6] font-bold underline hover:text-[#063A5B] cursor-pointer"
                      >
                        Privacy Policy
                      </button>
                      .
                    </>
                  )}
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-[11px] text-red-500 mt-1">{errors.agreeTerms}</p>
              )}
            </div>

            {/* General form error if any */}
            {errors.form && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            {/* 24-Hour Payment Window Notice */}
            <div className="p-3.5 bg-teal-50/90 rounded-xl border border-teal-200/90 flex items-start gap-3">
              <Clock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div className="text-xs text-teal-950">
                <p className="font-bold">
                  {language === 'es' ? 'Garantía de Reserva Inmediata · 24 Horas para Pagar el 100%' : 'Instant Reservation Guarantee · 24 Hours to Pay 100%'}
                </p>
                <p className="text-[11px] text-teal-800 mt-0.5 leading-relaxed">
                  {language === 'es'
                    ? 'Tu cupo se reserva automáticamente al enviar. Podrás realizar el pago del 100% de inmediato o dentro de las próximas 24 horas para asegurar tu fecha.'
                    : 'Your spot is automatically reserved upon submission. You can pay 100% immediately or within the next 24 hours to secure your date.'}
                </p>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#00A6A6] hover:bg-[#009191] disabled:bg-neutral-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
            >
              <Lock className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? (language === 'es' ? 'Creando tu reserva automática...' : 'Creating your automatic reservation...')
                  : (language === 'es' ? 'Reservar Ahora (Pagar 100% en hasta 24h)' : 'Reserve Now (Pay 100% within 24h)')}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
