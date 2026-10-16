import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAccount } from '../../context/AccountContext';
import { useBookingDraft } from '../../context/BookingDraftContext';
import { storageService } from '../../services/storage';
import { trackEvent } from '../../services/analytics';
import { Booking } from '../../types/booking';
import { Countdown24h } from './Countdown24h';
import { PaymentModal } from './PaymentModal';
import {
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  X,
  Lock,
  Sparkles,
} from 'lucide-react';

interface AutoReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  experienceId: string;
  experienceTitle: string;
  experienceSlug: string;
  experienceLocation: string;
  experienceImage?: string;
  pricePerPerson: number;
  initialDate?: string;
  initialAdults?: number;
  initialChildren?: number;
  isRoute?: boolean;
}

export const AutoReserveModal: React.FC<AutoReserveModalProps> = ({
  isOpen,
  onClose,
  experienceId,
  experienceTitle,
  experienceSlug,
  experienceLocation,
  experienceImage,
  pricePerPerson,
  initialDate,
  initialAdults = 2,
  initialChildren = 0,
  isRoute = false,
}) => {
  const { navigate } = useRouter();
  const { profile } = useAccount();
  const { setLastConfirmedBooking, setDraft } = useBookingDraft();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(initialDate || minDate);
  const [adults, setAdults] = useState(Math.max(1, initialAdults));
  const [children, setChildren] = useState(initialChildren || 0);

  const [firstName, setFirstName] = useState(profile?.firstName || '');
  const [lastName, setLastName] = useState(profile?.lastName || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [country, setCountry] = useState(profile?.country || 'El Salvador');

  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [isReserving, setIsReserving] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const totalPeople = adults + children;
  const subtotal = pricePerPerson * totalPeople;
  const total = subtotal;

  const generateBookingCode = () => {
    const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
    return `GIA-${randomSixDigits}`;
  };

  const handleAutoReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!date) {
      setErrorMsg('Por favor selecciona una fecha válida.');
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      setErrorMsg('Por favor ingresa tu nombre y apellido.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Por favor ingresa un correo electrónico válido.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Por favor ingresa tu número de WhatsApp o teléfono.');
      return;
    }

    setIsReserving(true);

    try {
      const code = generateBookingCode();
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

      const newBooking: Booking = {
        id: 'book_' + Date.now(),
        bookingCode: code,
        experienceId,
        experienceTitle,
        experienceSlug,
        experienceLocation,
        experienceImage,
        date,
        adults,
        children,
        pricePerPerson,
        subtotal,
        total,
        currency: 'USD',
        customerFirstName: firstName.trim(),
        customerLastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        country: country.trim() || 'El Salvador',
        status: 'PENDING',
        paymentStatus: 'PENDING',
        createdAt: now.toISOString(),
        expiresAt,
      };

      await storageService.saveBooking(newBooking);
      setLastConfirmedBooking(newBooking);
      setCreatedBooking(newBooking);

      trackEvent('auto_reservation_created', {
        bookingCode: code,
        experienceId,
        total,
      });
    } catch (err) {
      console.error('Error reserving automatically', err);
      setErrorMsg('Ocurrió un error al reservar. Por favor intenta nuevamente.');
    } finally {
      setIsReserving(false);
    }
  };

  const handleGoToConfirmed = () => {
    onClose();
    navigate('/reserva-confirmada');
  };

  const handleGoToMyBookings = () => {
    onClose();
    navigate('/mis-reservas');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
        <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#063A5B] to-[#00A6A6] text-white p-5 sm:p-6 relative">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold inline-block mb-1.5">
              {isRoute ? 'Tour Recorrido GIA' : 'Experiencia Oficial'}
            </span>

            <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight">
              {createdBooking ? '¡Experiencia Reservada!' : 'Reservar este Recorrido'}
            </h2>
            <p className="text-xs text-teal-100 mt-1 line-clamp-1">
              {experienceTitle}
            </p>
          </div>

          <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto space-y-5">
            {createdBooking ? (
              /* RESERVED STATE: SHOW AUTOMATIC RESERVATION SUCCESS + 24H COUNTDOWN + BOTON DE PAGAR */
              <div className="space-y-5">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-neutral-900 font-display">
                    ¡Tu reservación ha sido creada automáticamente!
                  </h3>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                    Tus cupos están temporalmente bloqueados y garantizados.
                  </p>
                </div>

                {/* Reservation code badge */}
                <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-4 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                    Código de reserva oficial
                  </span>
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-teal-900">
                    {createdBooking.bookingCode}
                  </span>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Reservada · Pendiente de pago 100%</span>
                  </div>
                </div>

                {/* 24h Countdown Clock Component */}
                <Countdown24h expiresAt={createdBooking.expiresAt} />

                {/* Payment Policy Explanation */}
                <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 text-xs text-teal-950 space-y-1.5">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-700" />
                    <span>Rango de 24 horas para pagar el 100%</span>
                  </p>
                  <p className="text-[11px] text-teal-900/90 leading-relaxed">
                    Tienes un plazo de <strong>24 horas exactas</strong> después de reservar para pagar el <strong>100%</strong> (${createdBooking.total} USD). Puedes realizar el pago en este momento con el botón de pagar o pagarlo más tarde desde "Mis Reservas" con tu código.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-2.5">
                  {/* Primary: BOTON DE PAGAR 100% */}
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full py-3.5 bg-[#00A6A6] hover:bg-[#009191] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pagar 100% ahora (${createdBooking.total} USD)</span>
                  </button>

                  {/* Secondary: Pagar más tarde */}
                  <button
                    type="button"
                    onClick={handleGoToConfirmed}
                    className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Pagar más tarde (Guardar reserva)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* AUTOMATIC RESERVATION FORM */
              <form onSubmit={handleAutoReserve} className="space-y-4">
                <div className="p-3 bg-teal-50/80 rounded-2xl border border-teal-200 text-xs text-teal-950 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Reserva automática inmediata</p>
                    <p className="text-[11px] text-teal-900 mt-0.5">
                      Al presionar <strong>Reservar</strong> se te asignará tu código de reserva de inmediato y tendrás <strong>24 horas</strong> para pagar el 100%.
                    </p>
                  </div>
                </div>

                {/* Date & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                      Fecha del recorrido *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        min={minDate}
                        value={date}
                        required
                        onChange={e => setDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                      Viajeros ({totalPeople} {totalPeople === 1 ? 'persona' : 'personas'})
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={adults}
                          onChange={e => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
                        />
                      </div>
                      <span className="text-[10px] text-neutral-500 font-medium">adultos</span>
                    </div>
                  </div>
                </div>

                {/* Traveler contact details */}
                <div className="space-y-3 pt-1 border-t border-neutral-100">
                  <span className="text-[11px] font-bold text-neutral-700 block">
                    Datos para registrar tu reserva automática:
                  </span>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="ej. Carlos"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        placeholder="ej. Rivas"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="tucorreo@ejemplo.com"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-neutral-600 block mb-1">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+503 7000-0000"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
                      />
                    </div>
                  </div>
                </div>

                {/* Price summary */}
                <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/90 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[11px]">Total del recorrido (100%)</span>
                    <span className="text-xl font-black font-mono text-teal-900">
                      ${total} USD
                    </span>
                  </div>
                  <div className="text-right text-[10px] text-neutral-500">
                    <span className="font-semibold text-neutral-800 block">${pricePerPerson} x {totalPeople} pers.</span>
                    <span>Retención por 24 horas</span>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                    {errorMsg}
                  </div>
                )}

                {/* CTA */}
                <button
                  type="submit"
                  disabled={isReserving}
                  className="w-full py-3.5 bg-[#00A6A6] hover:bg-[#009191] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isReserving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Reservando automáticamente...</span>
                    </>
                  ) : (
                    <>
                      <span>Reservar ahora (Bloquear cupos por 24 horas)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal if user clicked "Pagar 100% ahora" */}
      {createdBooking && (
        <PaymentModal
          booking={createdBooking}
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={updated => {
            setCreatedBooking(updated);
          }}
        />
      )}
    </>
  );
};
