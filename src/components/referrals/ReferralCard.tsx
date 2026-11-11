import React, { useState } from 'react';
import { ReferralProgramState } from '../../types/referral';
import {
  Copy,
  Check,
  Share2,
  Users,
  Gift,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
  Sliders,
  DollarSign,
  Info
} from 'lucide-react';
import { trackEvent } from '../../services/analytics';
import { useLanguage } from '../../context/LanguageContext';
import { referralService } from '../../services/referralService';
import { DEMO_EXPERIENCES } from '../../data/experiences';
import { Experience } from '../../types/experience';

interface ReferralCardProps {
  state: ReferralProgramState;
}

export const ReferralCard: React.FC<ReferralCardProps> = ({ state }) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [auditSummary, setAuditSummary] = useState(() => referralService.getAdminAuditSummary());

  if (!state.currentCode) return null;
  const code = state.currentCode.code;
  const benefitStatus = state.secondTripDiscountStatus || 'pending_first_trip';

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/experiencias?ref=${code}` : `https://giaexperiences.com/experiencias?ref=${code}`;

  const copy = language === 'es' ? {
    badge: 'GIA Premia',
    slogan: 'Viaja, comparte y gana',
    title: 'Tu programa de fidelización y recompensas',
    description: (
      <>
        Comparte tu código personal para que tus amigos obtengan un <strong>5% de descuento</strong> en su primera experiencia elegible, y acumula hasta <strong>$5.00 USD en crédito GIA</strong> según la duración del viaje completado.
      </>
    ),
    codeLabel: 'Tu código personal GIA Premia',
    copied: '¡Copiado!',
    copy: 'Copiar código',
    shareWhatsApp: 'Compartir por WhatsApp',
    shareNative: 'Compartir',
    invitedCount: 'Amigos invitados',
    completedCount: 'Viajes completados',
    creditsBalance: 'Crédito disponible',
    pendingCredits: 'Crédito pendiente',
    benefit10Title: 'Beneficio 10% para tu 2ª experiencia:',
    statusAvailable: '10% de descuento DISPONIBLE para tu 2ª experiencia',
    statusUsed: '10% de descuento ya aplicado en tu 2ª experiencia',
    statusPending: 'Se desbloquea al completar tu 1ª experiencia con GIA',
    adminButton: 'Auditoría y Margen GIA Premia (Admin)',
  } : {
    badge: 'GIA Premia',
    slogan: 'Travel, share and earn',
    title: 'Your loyalty and rewards program',
    description: (
      <>
        Share your personal code so your friends get a <strong>5% discount</strong> on their first eligible experience, and earn up to <strong>$5.00 USD in GIA credits</strong> based on the completed trip duration.
      </>
    ),
    codeLabel: 'Your personal GIA Premia code',
    copied: 'Copied!',
    copy: 'Copy code',
    shareWhatsApp: 'Share on WhatsApp',
    shareNative: 'Share',
    invitedCount: 'Friends invited',
    completedCount: 'Trips completed',
    creditsBalance: 'Available credit',
    pendingCredits: 'Pending credit',
    benefit10Title: '10% benefit for your 2nd experience:',
    statusAvailable: '10% discount AVAILABLE for your 2nd experience',
    statusUsed: '10% discount already redeemed for your 2nd experience',
    statusPending: 'Unlocks upon completing your 1st GIA experience',
    adminButton: 'GIA Premia Audit & Margins (Admin)',
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      trackEvent('referral_code_copied', { code });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    language === 'es'
      ? `¡Hola! Te comparto mi código GIA Premia: ${code} para que obtengas un 5% de descuento en tu primer viaje con GIA Experiences en El Salvador: ${shareUrl}`
      : `Hello! Here is my GIA Premia code: ${code} to get a 5% discount on your first tour with GIA Experiences in El Salvador: ${shareUrl}`
  );

  const handleWhatsAppShare = () => {
    trackEvent('referral_whatsapp_share', { code });
    window.open(`https://api.whatsapp.com/send?text=${whatsappMessage}`, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = () => {
    trackEvent('referral_page_viewed', { action: 'share' });
    if (navigator.share) {
      navigator.share({
        title: 'GIA Experiences - El Salvador',
        text: language === 'es'
          ? `¡Hola! Usa mi código GIA Premia ${code} para obtener 5% de descuento en tu primer viaje por El Salvador con GIA Experiences.`
          : `Hello! Use my GIA Premia code ${code} to get 5% off your first trip in El Salvador with GIA Experiences.`,
        url: shareUrl,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const toggleExperience = (id: string, current: boolean) => {
    referralService.toggleExperienceParticipation(id, !current);
    setAuditSummary(referralService.getAdminAuditSummary());
  };

  return (
    <div className="bg-gradient-to-br from-[#173B59] via-[#12314d] to-[#0c2438] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-800/40 space-y-6">
      {/* Header with slogan */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC857]/20 text-[#FFC857] text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
            <span>{copy.badge} · {copy.slogan}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            {copy.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {copy.description}
          </p>
        </div>

        {/* 10% 2nd Trip Benefit Status Badge */}
        <div className="sm:self-start bg-white/10 backdrop-blur-xs rounded-2xl p-3.5 border border-white/15 max-w-xs">
          <span className="text-[11px] font-bold text-slate-200 block mb-1">
            {copy.benefit10Title}
          </span>
          {benefitStatus === 'available' && (
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs bg-emerald-950/60 p-2 rounded-xl border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#39B98A]" />
              <span>{copy.statusAvailable}</span>
            </div>
          )}
          {benefitStatus === 'used' && (
            <div className="flex items-center gap-2 text-slate-300 text-xs bg-slate-800/60 p-2 rounded-xl">
              <Check className="w-4 h-4 shrink-0" />
              <span>{copy.statusUsed}</span>
            </div>
          )}
          {benefitStatus === 'pending_first_trip' && (
            <div className="flex items-center gap-2 text-[#FFC857] text-xs bg-amber-950/40 p-2 rounded-xl border border-amber-500/20">
              <Clock className="w-4 h-4 shrink-0 text-[#FFC857]" />
              <span>{copy.statusPending}</span>
            </div>
          )}
        </div>
      </div>

      {/* Code Share Box */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#00B8C8] block mb-1">
            {copy.codeLabel}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-[#FFC857] drop-shadow-xs">
              {code}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00B8C8]/30 text-teal-200 border border-[#00B8C8]/40">
              5% Amigos
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-2.5 bg-white text-[#173B59] font-bold text-xs rounded-xl shadow-xs hover:bg-neutral-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#39B98A]" /> : <Copy className="w-4 h-4 text-[#173B59]" />}
            <span>{copied ? copy.copied : copy.copy}</span>
          </button>

          {/* WhatsApp Button */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{copy.shareWhatsApp}</span>
          </button>

          {/* Native Share Button */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="px-3.5 py-2.5 bg-[#00B8C8] hover:bg-[#009FAE] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            title={copy.shareNative}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
          <span className="text-[11px] text-slate-300 block">{copy.invitedCount}</span>
          <span className="text-xl sm:text-2xl font-black font-mono text-white mt-1 block">
            {state.invitedCount}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
          <span className="text-[11px] text-slate-300 block">{copy.completedCount}</span>
          <span className="text-xl sm:text-2xl font-black font-mono text-white mt-1 block">
            {state.completedBookingsCount}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
          <span className="text-[11px] text-slate-300 block">{copy.pendingCredits}</span>
          <span className="text-xl sm:text-2xl font-black font-mono text-[#FFC857] mt-1 block">
            ${state.pendingCredits || 0} USD
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#00B8C8]/20 border border-[#00B8C8]/40 text-center">
          <span className="text-[11px] text-teal-200 block">{copy.creditsBalance}</span>
          <span className="text-xl sm:text-2xl font-black font-mono text-[#FFC857] mt-1 block">
            ${state.creditsBalance} USD
          </span>
        </div>
      </div>

      {/* Link to Dedicated Info Page & Admin Controls */}
      <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <a
          href="/gia-premia"
          className="text-teal-300 hover:text-white flex items-center gap-1.5 font-semibold transition-colors"
        >
          <span>{language === 'es' ? 'Ver tabla oficial de recompensas y términos →' : 'View official rewards table & terms →'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <button
          type="button"
          onClick={() => {
            setAuditSummary(referralService.getAdminAuditSummary());
            setShowAdminModal(true);
          }}
          className="text-slate-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer text-[11px]"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{copy.adminButton}</span>
        </button>
      </div>

      {/* Admin Audit & Margins Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#FDBA2D]" />
                <h3 className="text-base font-bold font-display text-white">
                  {language === 'es' ? 'Control de Rentabilidad y Auditoría GIA Premia' : 'GIA Premia Profitability & Audit'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Audit Summary Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase block">{language === 'es' ? 'Costo Total' : 'Total Cost'}</span>
                <span className="text-lg font-bold font-mono text-[#FDBA2D]">${auditSummary.totalPromotionalCostUSD} USD</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase block">{language === 'es' ? 'Aprobados' : 'Approved'}</span>
                <span className="text-lg font-bold font-mono text-emerald-400">{auditSummary.approvedReferralsCount} viajes</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase block">{language === 'es' ? 'Pendientes' : 'Pending'}</span>
                <span className="text-lg font-bold font-mono text-amber-300">{auditSummary.pendingReferralsCount} viajes</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase block">{language === 'es' ? 'Saldo Activo' : 'Active Balance'}</span>
                <span className="text-lg font-bold font-mono text-teal-300">${auditSummary.currentAvailableCreditsUSD} USD</span>
              </div>
            </div>

            {/* Safeguard explanation */}
            <div className="p-4 rounded-xl bg-teal-950/50 border border-teal-800/40 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-teal-300">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'es' ? 'Protección de Margen Operativo' : 'Operating Margin Protection'}</span>
              </div>
              <p className="leading-relaxed">
                {language === 'es'
                  ? 'GIA Premia nunca opera a pérdida: Cada experiencia cuenta con un margen de contribución auditado (~30% a 40%). Si una experiencia tiene un margen inferior al 20%, el sistema bloquea automáticamente descuentos excesivos para garantizar rentabilidad positiva.'
                  : 'GIA Premia never operates at a loss: Each experience has an audited contribution margin (~30% to 40%). If margin falls below 20%, excessive discounts are blocked automatically.'}
              </p>
            </div>

            {/* Experience Eligibility Toggles */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {language === 'es' ? 'Elegibilidad por Experiencia' : 'Experience Eligibility'}
              </h4>
              <div className="divide-y divide-slate-800 max-h-56 overflow-y-auto pr-1">
                {DEMO_EXPERIENCES.map((exp: Experience) => {
                  const isEligible = exp.participatesInGiaPremia !== false;
                  return (
                    <div key={exp.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-slate-200 block">{exp.titleEs}</span>
                        <span className="text-[11px] text-slate-400">
                          {exp.duration} · Margen est: {exp.marginPercent || 35}%
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleExperience(exp.id, isEligible)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                          isEligible
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        {isEligible ? (language === 'es' ? 'Elegible' : 'Eligible') : (language === 'es' ? 'Excluido' : 'Excluded')}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                className="px-5 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-xs hover:bg-slate-200 cursor-pointer"
              >
                {language === 'es' ? 'Cerrar panel' : 'Close panel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
