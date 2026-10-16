import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storage';
import { Booking } from '../types/booking';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  ArrowRight,
  Mail,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { Countdown24h } from '../components/booking/Countdown24h';
import { PaymentModal } from '../components/booking/PaymentModal';
import { BackButton } from '../components/common/BackButton';

export const MyBookingsPage: React.FC = () => {
  const { navigate } = useRouter();
  const { t, language } = useLanguage();

  const [searchCode, setSearchCode] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchedBooking, setSearchedBooking] = useState<Booking | null | 'not_found'>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBookingForPayment, setSelectedBookingForPayment] = useState<Booking | null>(null);

  useEffect(() => {
    storageService.listRecentBookings().then(list => {
      setRecentBookings(list);
    });
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    setIsSearching(true);
    const result = await storageService.getBookingByCode(searchCode, searchEmail);
    setSearchedBooking(result || 'not_found');
    setIsSearching(false);
  };

  const getStatusBadge = (b: Booking) => {
    if (b.paymentStatus === 'PAID') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
          ✓ Pagada 100% · Confirmada
        </span>
      );
    }

    switch (b.status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300">
            ⏳ Reservada · 24h para pagar
          </span>
        );
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            {t.myBookings.statusConfirmed}
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
            {t.myBookings.statusCancelled}
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
            {t.myBookings.statusCompleted}
          </span>
        );
    }
  };

  const renderBookingCard = (b: Booking) => (
    <div
      key={b.id}
      className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6 shadow-2xs space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
        <div>
          <span className="text-[11px] text-neutral-400 font-mono uppercase block">{language === 'es' ? 'Código' : 'Code'}</span>
          <span className="text-lg font-bold font-mono text-neutral-900 tracking-wider">
            {b.bookingCode}
          </span>
        </div>
        <div>{getStatusBadge(b)}</div>
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-bold text-neutral-900">
          {b.experienceTitle}
        </h3>
        <p className="text-xs text-neutral-500 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span>{b.experienceLocation}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
        <div className="p-2.5 bg-neutral-50 rounded-xl">
          <span className="text-[11px] text-neutral-400 block">{t.myBookings.dateBooked}</span>
          <span className="font-semibold text-neutral-900 font-mono flex items-center gap-1 mt-0.5">
            <Calendar className="w-3.5 h-3.5 text-teal-700" />
            {b.date}
          </span>
        </div>

        <div className="p-2.5 bg-neutral-50 rounded-xl">
          <span className="text-[11px] text-neutral-400 block">{t.myBookings.guests}</span>
          <span className="font-semibold text-neutral-900 flex items-center gap-1 mt-0.5">
            <Users className="w-3.5 h-3.5 text-teal-700" />
            {b.adults + b.children} {language === 'es' ? 'personas' : 'people'}
          </span>
        </div>

        <div className="p-2.5 bg-neutral-50 rounded-xl col-span-2 sm:col-span-1">
          <span className="text-[11px] text-neutral-400 block">{language === 'es' ? 'Total (100%)' : 'Total (100%)'}</span>
          <span className="font-bold text-teal-900 font-mono text-sm mt-0.5 block">
            ${b.total} USD
          </span>
        </div>
      </div>

      {/* 24-Hour Countdown and Pay Button for unpaid bookings */}
      {b.paymentStatus !== 'PAID' ? (
        <div className="p-4 bg-gradient-to-r from-teal-50/90 to-sky-50/80 rounded-xl border border-teal-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-xs font-bold text-teal-950 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-700" />
                <span>Rango de 24 horas para pagar el 100%</span>
              </p>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                Tus cupos están reservados temporalmente. Completa el pago antes del vencimiento.
              </p>
            </div>
            <Countdown24h expiresAt={b.expiresAt} compact />
          </div>

          <button
            type="button"
            onClick={() => setSelectedBookingForPayment(b)}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#00A6A6] hover:bg-[#009191] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pagar 100% ahora (${b.total} USD)</span>
          </button>
        </div>
      ) : (
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Pago del 100% registrado exitosamente</span>
          </div>
          {b.paymentDetails?.transactionId && (
            <span className="font-mono text-[11px] font-bold text-emerald-800">
              {b.paymentDetails.transactionId}
            </span>
          )}
        </div>
      )}

      <div className="pt-2 text-xs text-neutral-500 flex items-center justify-between border-t border-neutral-100">
        <span>{language === 'es' ? 'Contacto' : 'Contact'}: {b.customerFirstName} {b.customerLastName} ({b.email})</span>
        <button
          type="button"
          onClick={() => navigate(`/experiencias/${b.experienceSlug}`)}
          className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1"
        >
          <span>{language === 'es' ? 'Ver experiencia' : 'View experience'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-neutral-50/60 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back navigation */}
        <div>
          <BackButton
            fallbackPath="/experiencias"
            label={language === 'es' ? 'Volver al catálogo' : 'Back to catalog'}
          />
        </div>

        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 font-display">
            {t.myBookings.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl">
            {t.myBookings.subtitle}
          </p>
        </div>

        {/* Search by code and email box */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-neutral-900 font-display flex items-center gap-2">
            <Search className="w-4 h-4 text-teal-700" />
            <span>{t.myBookings.searchFormTitle}</span>
          </h2>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                {language === 'es' ? 'Código de reserva' : 'Booking code'} *
              </label>
              <input
                type="text"
                value={searchCode}
                onChange={e => setSearchCode(e.target.value.toUpperCase())}
                placeholder={t.myBookings.bookingCodePlaceholder}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:ring-2 focus:ring-teal-700 uppercase font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                {language === 'es' ? 'Correo electrónico (opcional)' : 'Email address (optional)'}
              </label>
              <input
                type="email"
                value={searchEmail}
                onChange={e => setSearchEmail(e.target.value)}
                placeholder={t.myBookings.emailPlaceholder}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:ring-2 focus:ring-teal-700"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {t.myBookings.searchBtn}
              </button>
            </div>
          </form>

          {/* Searched Booking Result */}
          {searchedBooking === 'not_found' && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5 mt-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">{t.myBookings.noBookingsFoundTitle}</p>
                <p className="text-amber-800">{t.myBookings.noBookingsFoundDesc}</p>
                <p className="pt-1 text-[11px] text-amber-900">
                  {language === 'es' ? '¿Dudas con tu código? Contáctanos a ' : 'Questions about your code? Contact us at '}
                  <a href="mailto:guiaexperiencessv@gmail.com" className="font-bold underline text-[#00A6A6]">
                    guiaexperiencessv@gmail.com
                  </a>
                </p>
              </div>
            </div>
          )}

          {searchedBooking && searchedBooking !== 'not_found' && (
            <div className="mt-4 pt-4 border-t border-neutral-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-3">
                {language === 'es' ? 'Resultado de búsqueda' : 'Search result'}
              </h3>
              {renderBookingCard(searchedBooking)}
            </div>
          )}
        </div>

        {/* Recent bookings list on this device */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-neutral-900 font-display flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-700" />
            <span>{t.myBookings.recentBookingsTitle}</span>
          </h2>

          {recentBookings.length > 0 ? (
            <div className="space-y-4">
              {recentBookings.map(b => renderBookingCard(b))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-8 text-center text-xs text-neutral-500">
              <p>{language === 'es' ? 'Aún no has registrado ninguna solicitud de reserva en este navegador.' : 'You have not registered any booking requests in this browser yet.'}</p>
              <button
                type="button"
                onClick={() => navigate('/experiencias')}
                className="mt-3 px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors inline-block"
              >
                {language === 'es' ? 'Explorar experiencias disponibles' : 'Explore available experiences'}
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedBookingForPayment && (
        <PaymentModal
          booking={selectedBookingForPayment}
          isOpen={true}
          onClose={() => setSelectedBookingForPayment(null)}
          onPaymentSuccess={updated => {
            setRecentBookings(prev => prev.map(item => item.id === updated.id ? updated : item));
            if (searchedBooking && typeof searchedBooking === 'object' && searchedBooking.id === updated.id) {
              setSearchedBooking(updated);
            }
            setSelectedBookingForPayment(null);
          }}
        />
      )}
    </div>
  );
};
