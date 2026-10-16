import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

interface Countdown24hProps {
  expiresAt: string;
  className?: string;
  compact?: boolean;
}

export const Countdown24h: React.FC<Countdown24hProps> = ({
  expiresAt,
  className = '',
  compact = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    formatted: string;
  }>({
    hours: 24,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    formatted: '24h 00m 00s',
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(expiresAt).getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
          formatted: '00h 00m 00s (Expirado)',
        });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = (n: number) => n.toString().padStart(2, '0');
      setTimeLeft({
        hours,
        minutes,
        seconds,
        isExpired: false,
        formatted: `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const formattedExpiryDate = new Date(expiresAt).toLocaleDateString('es-SV', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
          timeLeft.isExpired
            ? 'bg-rose-100 text-rose-800 border border-rose-300'
            : timeLeft.hours < 4
            ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
            : 'bg-teal-50 text-teal-900 border border-teal-200'
        } ${className}`}
      >
        <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
        <span>{timeLeft.formatted}</span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border p-4 transition-all ${
        timeLeft.isExpired
          ? 'bg-rose-50/90 border-rose-200 text-rose-950'
          : timeLeft.hours < 4
          ? 'bg-amber-50/90 border-amber-200 text-amber-950'
          : 'bg-gradient-to-r from-teal-50/90 via-sky-50/80 to-emerald-50/80 border-teal-200 text-teal-950'
      } ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              timeLeft.isExpired
                ? 'bg-rose-100 text-rose-700'
                : 'bg-teal-100 text-teal-800'
            }`}
          >
            {timeLeft.isExpired ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <Clock className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                Rango de tiempo de pago: 24 horas
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-800 text-white">
                100% de la reserva
              </span>
            </div>
            <p className="text-xs text-neutral-700 mt-0.5">
              {timeLeft.isExpired
                ? 'El plazo de 24 horas para completar el pago ha vencido.'
                : 'Tienes hasta 24 horas después de tu reservación para pagar el 100% y asegurar definitivamente tus cupos.'}
            </p>
          </div>
        </div>

        <div className="text-right sm:border-l sm:border-teal-200/80 sm:pl-4 shrink-0">
          <span className="text-[10px] font-semibold text-neutral-500 uppercase block">
            Tiempo restante
          </span>
          <span
            className={`font-mono text-lg font-black tracking-wider ${
              timeLeft.isExpired
                ? 'text-rose-700'
                : timeLeft.hours < 4
                ? 'text-amber-800'
                : 'text-teal-900'
            }`}
          >
            {timeLeft.formatted}
          </span>
          <span className="text-[10px] text-neutral-400 block mt-0.5">
            Vence: {formattedExpiryDate}
          </span>
        </div>
      </div>
    </div>
  );
};
