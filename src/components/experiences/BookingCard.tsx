import React, { useState } from 'react';
import { Experience } from '../../types/experience';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { useBookingDraft } from '../../context/BookingDraftContext';
import { trackEvent } from '../../services/analytics';
import { AutoReserveModal } from '../booking/AutoReserveModal';
import { useLiveBookedCount } from '../../hooks/useLiveBookedCount';
import { Calendar, Users, Minus, Plus, ShieldCheck, ArrowRight, Flame } from 'lucide-react';

interface BookingCardProps {
  experience: Experience;
}

export const BookingCard: React.FC<BookingCardProps> = ({ experience }) => {
  const { navigate } = useRouter();
  const { language, t } = useLanguage();
  const { setDraft } = useBookingDraft();

  // Tomorrow as default date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState<string>(minDate);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [dateError, setDateError] = useState(false);
  const [showAutoReserve, setShowAutoReserve] = useState(false);

  const liveBookedCount = useLiveBookedCount(experience);
  const maxAllowedPeople = experience.isUnlimitedCapacity ? 99 : experience.maxPeople;

  const totalPeople = adults + children;
  const subtotal = experience.price * totalPeople;
  const total = subtotal;

  const experienceTitle = language === 'es' ? experience.titleEs : experience.titleEn;

  const handleContinueBooking = () => {
    if (!date) {
      setDateError(true);
      return;
    }

    trackEvent('booking_started', {
      experienceId: experience.id,
      title: experienceTitle,
      date,
      adults,
      children,
      total,
    });

    setDraft({
      experienceId: experience.id,
      experienceTitle,
      experienceSlug: experience.slug,
      experienceLocation: experience.location,
      experienceImage: experience.images?.[0],
      pricePerPerson: experience.price,
      date,
      adults,
      children,
    });

    navigate('/checkout');
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-md p-6 space-y-5">
      {/* Price header */}
      <div className="border-b border-neutral-100 pb-4">
        <span className="text-xs text-neutral-400 block mb-0.5">{t.card.from}</span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold text-neutral-900 font-mono">
            ${experience.price}
          </span>
          <span className="text-xs text-neutral-500 font-medium">{t.detail.perPersonSmall}</span>
        </div>
        <p className="text-[11px] text-teal-800 font-medium mt-1">
          {language === 'es'
            ? 'Tarifa oficial de tour operadora · Verificación directa'
            : 'Official tour operator rate · Direct verification'}
        </p>
      </div>

      {/* Live Unlimited Capacity & Dynamic Reservations Counter */}
      {experience.isUnlimitedCapacity ? (
        <div className="p-3.5 bg-gradient-to-r from-teal-50/90 via-sky-50/70 to-emerald-50/80 rounded-xl border border-teal-200 text-xs space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 font-bold text-teal-950 text-[11px] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Cupo Ilimitado</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-2 py-0.5 rounded-full">
              Abierto a grupos
            </span>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[11px] text-neutral-600 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Reservas confirmadas:</span>
            </span>
            <span className="font-mono font-extrabold text-xs text-teal-900 bg-white/80 px-2 py-0.5 rounded-md border border-teal-200">
              {liveBookedCount} personas
            </span>
          </div>

          <p className="text-[10px] text-neutral-500 leading-tight">
            Mínimo 1 persona. Este contador se actualiza en tiempo real cada vez que reservas.
          </p>
        </div>
      ) : (
        <div className="px-3 py-2 bg-neutral-50 rounded-xl border border-neutral-200/80 text-[11px] text-neutral-600 flex items-center justify-between">
          <span>Mínimo de personas:</span>
          <span className="font-bold text-neutral-900">1 persona</span>
        </div>
      )}

      {/* Date selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-teal-700" />
          <span>{t.detail.selectDate}</span>
        </label>
        <input
          type="date"
          min={minDate}
          value={date}
          onChange={e => {
            setDate(e.target.value);
            setDateError(false);
          }}
          className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
            dateError
              ? 'border-red-400 focus:ring-red-400'
              : 'border-neutral-200 focus:ring-teal-700'
          }`}
        />
        {dateError && (
          <p className="text-[11px] text-red-500">Por favor selecciona una fecha válida</p>
        )}
      </div>

      {/* Guests selector */}
      <div className="space-y-3">
        <span className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-teal-700" />
          <span>{t.detail.travelers} (Mínimo: 1 persona)</span>
        </span>

        {/* Adults */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
          <div>
            <p className="text-xs font-semibold text-neutral-900">{t.detail.adults}</p>
            <p className="text-[11px] text-neutral-500">12+ años (Mín. 1)</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={adults <= 1}
              onClick={() => setAdults(prev => Math.max(1, prev - 1))}
              className="w-7 h-7 rounded-lg bg-white border border-neutral-200 text-neutral-700 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 cursor-pointer"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-bold font-mono w-4 text-center">{adults}</span>
            <button
              type="button"
              disabled={adults + children >= maxAllowedPeople}
              onClick={() => setAdults(prev => prev + 1)}
              className="w-7 h-7 rounded-lg bg-white border border-neutral-200 text-neutral-700 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
          <div>
            <p className="text-xs font-semibold text-neutral-900">{t.detail.children}</p>
            <p className="text-[11px] text-neutral-500">3 - 11 años</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={children <= 0}
              onClick={() => setChildren(prev => Math.max(0, prev - 1))}
              className="w-7 h-7 rounded-lg bg-white border border-neutral-200 text-neutral-700 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 cursor-pointer"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-bold font-mono w-4 text-center">{children}</span>
            <button
              type="button"
              disabled={adults + children >= maxAllowedPeople}
              onClick={() => setChildren(prev => prev + 1)}
              className="w-7 h-7 rounded-lg bg-white border border-neutral-200 text-neutral-700 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Reactive price breakdown */}
      <div className="pt-3 border-t border-neutral-100 space-y-2 text-xs">
        <div className="flex items-center justify-between text-neutral-600">
          <span>
            ${experience.price} x {totalPeople} {totalPeople === 1 ? 'persona' : 'personas'}
          </span>
          <span className="font-mono font-medium">${subtotal}</span>
        </div>
        <div className="flex items-center justify-between text-sm font-bold text-neutral-900 pt-1 border-t border-dashed border-neutral-200">
          <span>{t.detail.totalEstimated}</span>
          <span className="font-mono text-base text-teal-900">${total} USD</span>
        </div>
      </div>

      {/* 24-Hour Payment Policy badge */}
      <div className="p-3 bg-teal-50/80 rounded-xl border border-teal-200/80 text-[11px] text-teal-950 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <div className="leading-snug">
          <p className="font-bold">Reserva inmediata con 24 horas para pagar</p>
          <p className="text-teal-800 text-[10px] mt-0.5">
            Tus cupos se bloquean automáticamente. Tienes un rango de 24 horas para pagar el 100% de la reservación.
          </p>
        </div>
      </div>

      {/* Primary CTA: Reservar Automáticamente */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setShowAutoReserve(true)}
          className="w-full py-3.5 bg-[#00A6A6] hover:bg-[#009191] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Reservar ahora (Reserva automática)</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleContinueBooking}
          className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-[11px] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Configurar con código promocional o créditos</span>
        </button>
      </div>

      {/* Contextual WhatsApp CTA */}
      <a
        href={`https://wa.me/50370119564?text=${encodeURIComponent(
          language === 'es'
            ? `Hola, me gustaría recibir información sobre ${experienceTitle}.`
            : `Hello, I would like more information about ${experienceTitle}.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2.5 px-3 rounded-xl border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/80 text-emerald-800 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366]" />
        <span>{language === 'es' ? 'Consultar por WhatsApp' : 'Inquire via WhatsApp'}</span>
      </a>

      {/* AutoReserveModal instance */}
      <AutoReserveModal
        isOpen={showAutoReserve}
        onClose={() => setShowAutoReserve(false)}
        experienceId={experience.id}
        experienceTitle={experienceTitle}
        experienceSlug={experience.slug}
        experienceLocation={experience.location}
        experienceImage={experience.images?.[0]}
        pricePerPerson={experience.price}
        initialDate={date}
        initialAdults={adults}
        initialChildren={children}
      />
    </div>
  );
};
