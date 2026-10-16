import React, { useState } from 'react';
import { ReferralProgramState } from '../../types/referral';
import { Copy, Check, Share2, Users, Gift, Sparkles, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '../../services/analytics';
import { useLanguage } from '../../context/LanguageContext';

interface ReferralCardProps {
  state: ReferralProgramState;
}

export const ReferralCard: React.FC<ReferralCardProps> = ({ state }) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  if (!state.currentCode) return null;
  const code = state.currentCode.code;
  const copy = language === 'es' ? {
    badge: 'Programa Comparte GIA', title: 'Invita a tus amigos a descubrir El Salvador',
    description: <>Tus invitados obtienen un <strong>5% de descuento</strong> en su primera reserva, y tú acumulas <strong>${state.currentCode.rewardValue} USD en Créditos GIA</strong> por cada experiencia completada.</>,
    code: 'Tu código de recomendación', copied: '¡Copiado!', copy: 'Copiar código', share: 'Compartir', invited: 'Personas invitadas', completed: 'Reservas completadas', credits: 'Crédito GIA acumulado',
  } : {
    badge: 'Share GIA Program', title: 'Invite friends to discover El Salvador',
    description: <>Your guests receive <strong>5% off</strong> their first booking, and you earn <strong>${state.currentCode.rewardValue} USD in GIA Credits</strong> for each completed experience.</>,
    code: 'Your referral code', copied: 'Copied!', copy: 'Copy code', share: 'Share', invited: 'People invited', completed: 'Completed bookings', credits: 'GIA credit earned',
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      trackEvent('referral_code_copied', { code });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    trackEvent('referral_page_viewed', { action: 'share' });
    if (navigator.share) {
      navigator.share({
        title: 'GIA Experiences - El Salvador',
        text: language === 'es' ? `Usa mi código ${code} en GIA Experiences para obtener 5% de descuento en tu primera reserva.` : `Use my code ${code} at GIA Experiences to get 5% off your first booking.`,
        url: window.location.origin,
      }).catch(() => {});
    } else {
      handleCopy();
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-800 space-y-6">
      <div className="max-w-xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold font-mono">
          <Gift className="w-3.5 h-3.5 text-amber-400" />
          <span>{copy.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
          {copy.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {copy.description}
        </p>
      </div>

      {/* Code Share Box */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono text-slate-300 block mb-1">
            {copy.code}
          </span>
          <span className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-amber-400">
            {code}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-2.5 bg-white text-slate-950 font-bold text-xs rounded-xl shadow-xs hover:bg-neutral-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? copy.copied : copy.copy}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{copy.share}</span>
          </button>
        </div>
      </div>

      {/* Metrics Counters */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
          <span className="text-[11px] text-slate-400 block">{copy.invited}</span>
          <span className="text-xl sm:text-2xl font-black font-mono text-white mt-1 block">
            {state.invitedCount}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
          <span className="text-[11px] text-slate-400 block">{copy.completed}</span>
          <span className="text-xl sm:text-2xl font-black font-mono text-white mt-1 block">
            {state.completedBookingsCount}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
          <span className="text-[11px] text-slate-400 block">{copy.credits}</span>
          <span className="text-xl sm:text-2xl font-black font-mono text-amber-400 mt-1 block">
            ${state.creditsBalance} USD
          </span>
        </div>
      </div>
    </div>
  );
};
