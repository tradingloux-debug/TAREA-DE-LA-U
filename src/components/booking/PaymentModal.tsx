import React, { useState } from 'react';
import { Booking, PaymentDetails } from '../../types/booking';
import { storageService } from '../../services/storage';
import { useBookingDraft } from '../../context/BookingDraftContext';
import { Countdown24h } from './Countdown24h';
import {
  CreditCard,
  Lock,
  ShieldCheck,
  CheckCircle2,
  X,
  AlertCircle,
  Building,
  QrCode,
  DollarSign,
  Clock,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
} from 'lucide-react';

interface PaymentModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess?: (updatedBooking: Booking) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  booking,
  isOpen,
  onClose,
  onPaymentSuccess,
}) => {
  const { setLastConfirmedBooking } = useBookingDraft();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'wompi'>('card');
  const [cardHolder, setCardHolder] = useState(
    `${booking.customerFirstName} ${booking.customerLastName}`.trim()
  );
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [emailReceipt, setEmailReceipt] = useState(booking.email);
  const [postalCode, setPostalCode] = useState('');
  const [transferRef, setTransferRef] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);
  const [copiedBank, setCopiedBank] = useState(false);

  if (!isOpen) return null;

  // Format card number with spaces (16 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const parts = raw.match(/.{1,4}/g);
    setCardNumber(parts ? parts.join(' ') : raw);
  };

  // Format expiry MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setExpiry(raw);
  };

  // Detect card brand
  const getCardBrand = () => {
    const clean = cardNumber.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (clean.startsWith('5')) return 'Mastercard';
    if (clean.startsWith('3')) return 'Amex';
    return 'Tarjeta';
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (paymentMethod === 'card') {
      const cleanCard = cardNumber.replace(/\s/g, '');
      if (cleanCard.length < 15) {
        setErrorMsg('Por favor ingresa un número de tarjeta válido (16 dígitos).');
        return;
      }
      if (!cardHolder.trim()) {
        setErrorMsg('Ingresa el nombre del titular de la tarjeta.');
        return;
      }
      if (expiry.length < 5) {
        setErrorMsg('Ingresa una fecha de expiración válida (MM/AA).');
        return;
      }
      if (cvv.length < 3) {
        setErrorMsg('Ingresa el código CVV (3 o 4 dígitos).');
        return;
      }
    } else if (paymentMethod === 'transfer' && !transferRef.trim()) {
      setErrorMsg('Ingresa el número de comprobante o referencia de tu transferencia.');
      return;
    }

    setIsProcessing(true);

    try {
      // Realistic simulation of bank gateway verification
      await new Promise(resolve => setTimeout(resolve, 1400));

      const cleanCard = cardNumber.replace(/\s/g, '');
      const paymentDetails: PaymentDetails = {
        method: paymentMethod === 'card' ? 'card' : paymentMethod === 'transfer' ? 'transfer' : 'wompi',
        amount: booking.total,
        percentagePaid: 100,
        paidAt: new Date().toISOString(),
        transactionId: `TXN-GIA-${Math.floor(1000000 + Math.random() * 9000000)}`,
        cardHolder: cardHolder.trim(),
        cardLast4: cleanCard.length >= 4 ? cleanCard.slice(-4) : '4242',
        cardBrand: getCardBrand(),
        bankName: paymentMethod === 'transfer' ? 'Banco Agrícola SV' : undefined,
        transferReference: transferRef.trim() || undefined,
      };

      const updated = await storageService.updateBookingPayment(booking.id, paymentDetails);
      if (updated) {
        setCompletedBooking(updated);
        setLastConfirmedBooking(updated);
        setPaymentCompleted(true);
        if (onPaymentSuccess) {
          onPaymentSuccess(updated);
        }
      }
    } catch (err) {
      console.error('Error processing payment', err);
      setErrorMsg('Ocurrió un error al procesar el pago. Por favor intenta de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyBankDetails = () => {
    navigator.clipboard?.writeText('Banco Agrícola - Cta Corriente USD: 0054-019283-91 a nombre de GIA Experiences SV');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-6">
        {/* Top Header */}
        <div className="bg-linear-to-r from-[#063A5B] to-[#00A6A6] text-white p-5 sm:p-6 relative">
          <div className="flex items-center justify-between gap-3 mb-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Atrás</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white font-bold">
              Reserva {booking.bookingCode}
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950">
              Pago del 100%
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight">
            Pagar Experiencia Reservada
          </h2>
          <p className="text-xs text-teal-100 mt-1 line-clamp-1">
            {booking.experienceTitle}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto space-y-5">
          {paymentCompleted && completedBooking ? (
            /* SUCCESS STATE */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-black text-neutral-900 font-display">
                  ¡Pago del 100% Completado con Éxito!
                </h3>
                <p className="text-xs text-neutral-600 mt-1 max-w-sm mx-auto">
                  Tu reservación ha sido formalmente pagada y confirmada al 100%. Tus cupos y logística quedan completamente asegurados.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-4 text-left text-xs space-y-2.5 font-mono">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                  <span className="text-neutral-500 font-sans">N° de Transacción</span>
                  <span className="font-bold text-teal-900">
                    {completedBooking.paymentDetails?.transactionId}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 font-sans">Monto pagado (100%)</span>
                  <span className="font-bold text-base text-emerald-700">
                    ${completedBooking.total} USD
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 font-sans">Método</span>
                  <span className="text-neutral-800 font-sans font-medium">
                    {completedBooking.paymentDetails?.method === 'card'
                      ? `Tarjeta ${completedBooking.paymentDetails?.cardBrand} •••• ${completedBooking.paymentDetails?.cardLast4}`
                      : 'Transferencia bancaria directa'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 font-sans">Fecha y hora</span>
                  <span className="text-neutral-700">
                    {new Date(completedBooking.paymentDetails?.paidAt || Date.now()).toLocaleString('es-SV')}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Hemos enviado tu comprobante oficial de pago a <strong>{completedBooking.email}</strong>.
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 bg-[#063A5B] hover:bg-[#052d47] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Aceptar y ver mi reserva
              </button>
            </div>
          ) : (
            /* PAYMENT FORM STATE */
            <>
              {/* 24h Countdown & Rule notice */}
              <Countdown24h expiresAt={booking.expiresAt} />

              {/* Total & 100% Policy banner */}
              <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-teal-800 uppercase block">
                    Total a pagar ahora (100%)
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-black font-mono text-teal-950">
                      ${booking.total}
                    </span>
                    <span className="text-xs text-teal-800 font-bold">USD</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#00A6A6] text-white">
                    100% Cobertura Total
                  </span>
                  <p className="text-[10px] text-teal-800 mt-1">
                    {booking.adults + booking.children} {booking.adults + booking.children === 1 ? 'persona' : 'personas'} · {booking.date}
                  </p>
                </div>
              </div>

              {/* Method selector */}
              <div>
                <label className="text-xs font-bold text-neutral-800 block mb-2">
                  Selecciona tu forma de pago
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'card'
                        ? 'border-[#00A6A6] bg-teal-50/60 ring-2 ring-[#00A6A6]/20'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-teal-700 mb-2" />
                    <div>
                      <span className="text-xs font-bold text-neutral-900 block">Tarjeta</span>
                      <span className="text-[10px] text-neutral-500">Crédito o Débito</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'transfer'
                        ? 'border-[#00A6A6] bg-teal-50/60 ring-2 ring-[#00A6A6]/20'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <Building className="w-4 h-4 text-teal-700 mb-2" />
                    <div>
                      <span className="text-xs font-bold text-neutral-900 block">Transferencia</span>
                      <span className="text-[10px] text-neutral-500">Banco Agrícola / BAC</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wompi')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between col-span-2 sm:col-span-1 ${
                      paymentMethod === 'wompi'
                        ? 'border-[#00A6A6] bg-teal-50/60 ring-2 ring-[#00A6A6]/20'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-teal-700 mb-2" />
                    <div>
                      <span className="text-xs font-bold text-neutral-900 block">Wompi / Link</span>
                      <span className="text-[10px] text-neutral-500">Pago local SV</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Payment Details Form */}
              <form onSubmit={handleProcessPayment} className="space-y-4">
                {paymentMethod === 'card' && (
                  <div className="space-y-3.5 bg-neutral-50/70 p-4 rounded-2xl border border-neutral-200/90">
                    <div>
                      <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                        Nombre en la tarjeta *
                      </label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={e => setCardHolder(e.target.value)}
                        placeholder="Como aparece en el plástico"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-neutral-700 flex justify-between items-center mb-1">
                        <span>Número de tarjeta *</span>
                        <span className="text-[10px] text-teal-800 font-mono font-bold">
                          {getCardBrand()}
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          maxLength={19}
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4242 4242 4242 4242"
                          className="w-full px-3.5 py-2 pl-9 font-mono text-xs rounded-xl border border-neutral-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
                        />
                        <CreditCard className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                          Vencimiento *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={expiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/AA"
                          className="w-full px-3.5 py-2 font-mono text-xs rounded-xl border border-neutral-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-neutral-700 flex justify-between items-center mb-1">
                          <span>CVV / CVC *</span>
                          <span className="text-[10px] text-neutral-400">3-4 dígitos</span>
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            required
                            maxLength={4}
                            value={cvv}
                            onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            placeholder="•••"
                            className="w-full px-3.5 py-2 pl-8 font-mono text-xs rounded-xl border border-neutral-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
                          />
                          <Lock className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                          Correo para comprobante *
                        </label>
                        <input
                          type="email"
                          required
                          value={emailReceipt}
                          onChange={e => setEmailReceipt(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                          Código Postal / Ciudad
                        </label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={e => setPostalCode(e.target.value)}
                          placeholder="ej. CP 1101"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'transfer' && (
                  <div className="space-y-3.5 bg-neutral-50/70 p-4 rounded-2xl border border-neutral-200/90 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-neutral-200 space-y-1">
                      <p className="font-bold text-neutral-900">Datos bancarios oficiales para pago 100%:</p>
                      <p className="text-neutral-600"><strong>Banco:</strong> Banco Agrícola El Salvador (USD)</p>
                      <p className="text-neutral-600"><strong>Cuenta Corriente:</strong> 0054-019283-91</p>
                      <p className="text-neutral-600"><strong>A nombre de:</strong> GIA Experiences SV, S.A. de C.V.</p>
                      <p className="text-neutral-600"><strong>Concepto:</strong> {booking.bookingCode}</p>
                      <button
                        type="button"
                        onClick={copyBankDetails}
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#00A6A6] hover:text-[#063A5B]"
                      >
                        {copiedBank ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedBank ? 'Datos copiados' : 'Copiar datos de cuenta'}</span>
                      </button>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                        Número de referencia de transferencia *
                      </label>
                      <input
                        type="text"
                        required
                        value={transferRef}
                        onChange={e => setTransferRef(e.target.value)}
                        placeholder="ej. REF-9847123"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'wompi' && (
                  <div className="space-y-3.5 bg-neutral-50/70 p-4 rounded-2xl border border-neutral-200/90 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-neutral-200 space-y-1.5">
                      <p className="font-bold text-neutral-900">Enlace directo de pago Wompi / QR:</p>
                      <p className="text-neutral-600 text-[11px]">
                        Puedes pagar con tarjetas locales de El Salvador a través de Wompi. Tu pago del 100% quedará registrado de inmediato con tu referencia.
                      </p>
                      <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-800 text-[11px] font-mono">
                        Referencia de pago: {booking.bookingCode} · Monto: ${booking.total} USD
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                        Número de aprobación / referencia Wompi
                      </label>
                      <input
                        type="text"
                        value={transferRef}
                        onChange={e => setTransferRef(e.target.value)}
                        placeholder="ej. WMP-482910"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
                      />
                    </div>
                  </div>
                )}

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 bg-[#00A6A6] hover:bg-[#009191] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Procesando pago del 100% (${booking.total} USD)...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Pagar 100% ahora (${booking.total} USD)</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs rounded-xl transition-colors text-center cursor-pointer"
                  >
                    Pagar más tarde (Tienes 24 horas para completar el pago)
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 text-center pt-1">
                  <Lock className="w-3 h-3 text-neutral-500" />
                  <span>Transacción segura y encriptada SSL de 256 bits · GIA Experiences</span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
