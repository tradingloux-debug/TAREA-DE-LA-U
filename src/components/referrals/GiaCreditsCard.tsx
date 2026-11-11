import React from 'react';
import { CreditTransaction } from '../../types/referral';
import {
  Coins,
  ArrowDownLeft,
  ArrowUpRight,
  History,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface GiaCreditsCardProps {
  balance: number;
  pendingBalance?: number;
  transactions: CreditTransaction[];
}

export const GiaCreditsCard: React.FC<GiaCreditsCardProps> = ({ balance, pendingBalance = 0, transactions }) => {
  const { language } = useLanguage();

  const copy = language === 'es' ? {
    title: 'Crédito GIA y Recompensas Acumuladas',
    available: 'Saldo disponible para redimir',
    pending: 'Recompensas en validación (pendientes)',
    howToRedeem: 'Puedes redimir tu saldo disponible como descuento directo al momento de pagar cualquier paquete o experiencia turística.',
    historyTitle: 'Historial de movimientos y recompensas',
    emptyHistory: 'Aún no tienes recompensas o movimientos registrados. Comparte tu código personal para comenzar a acumular saldo.',
    statusPending: 'Pendiente de viaje',
    statusApproved: 'Aprobado y disponible',
    statusRedeemed: 'Redimido en reserva',
    durationNote: 'Las recompensas por duración ($0.50 a $5.00 USD) se acreditan cuando el viajero completa la experiencia reservada.',
  } : {
    title: 'GIA Credit and Accumulated Rewards',
    available: 'Available balance to redeem',
    pending: 'Pending validation rewards',
    howToRedeem: 'You can redeem your available balance as an instant discount at checkout on any tour package or tourist experience.',
    historyTitle: 'Transaction and rewards history',
    emptyHistory: 'No transactions or rewards recorded yet. Share your personal code to start earning credits.',
    statusPending: 'Trip pending',
    statusApproved: 'Approved & available',
    statusRedeemed: 'Redeemed in booking',
    durationNote: 'Duration rewards ($0.50 to $5.00 USD) credit once your referred traveler completes their tour.',
  };

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
      {/* Balances header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-50">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FFC857]/20 text-[#173B59] flex items-center justify-center border border-[#FFC857]/40 shadow-xs">
            <Coins className="w-7 h-7 text-[#FFC857]" />
          </div>
          <div>
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
              {copy.available}
            </span>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl sm:text-4xl font-black font-mono text-[#173B59]">
                ${balance.toFixed(2)}
              </h3>
              <span className="text-xs font-bold text-[#00B8C8]">USD Crédito GIA</span>
            </div>
            {pendingBalance > 0 && (
              <span className="text-xs text-amber-700 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#FFC857]" />
                <span>+${pendingBalance.toFixed(2)} USD {copy.pending}</span>
              </span>
            )}
          </div>
        </div>

        <div className="text-xs text-neutral-600 max-w-sm leading-relaxed bg-[#00B8C8]/10 p-3.5 rounded-2xl border border-[#00B8C8]/30 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#00B8C8] shrink-0 mt-0.5" />
          <span>{copy.howToRedeem}</span>
        </div>
      </div>

      {/* Rewards Duration Notice */}
      <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/70 text-[11px] text-neutral-600 flex items-center gap-2">
        <Clock className="w-4 h-4 text-[#00A6A6] shrink-0" />
        <span>{copy.durationNote}</span>
      </div>

      {/* Transactions History */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <History className="w-3.5 h-3.5 text-neutral-400" />
          <span>{copy.historyTitle}</span>
        </h4>

        {transactions.length > 0 ? (
          <div className="divide-y divide-neutral-100">
            {transactions.map((tx) => (
              <div key={tx.id} className="py-3.5 flex items-center justify-between text-xs gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      tx.type === 'PENDING'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : tx.type === 'EARNED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {tx.type === 'PENDING' ? (
                      <Clock className="w-4 h-4" />
                    ) : tx.type === 'EARNED' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-900">{tx.source}</p>
                      {tx.type === 'PENDING' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          {copy.statusPending}
                        </span>
                      ) : tx.type === 'EARNED' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {copy.statusApproved}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {copy.statusRedeemed}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <span
                  className={`font-mono font-bold text-sm shrink-0 ${
                    tx.type === 'PENDING'
                      ? 'text-amber-600'
                      : tx.type === 'EARNED'
                      ? 'text-emerald-700'
                      : 'text-rose-600'
                  }`}
                >
                  {tx.type === 'REDEEMED' ? '-' : '+'}${tx.amount.toFixed(2)} USD
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-400 py-6 text-center bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
            {copy.emptyHistory}
          </p>
        )}
      </div>
    </div>
  );
};
