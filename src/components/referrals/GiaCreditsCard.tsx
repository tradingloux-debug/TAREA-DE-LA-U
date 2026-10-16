import React from 'react';
import { CreditTransaction } from '../../types/referral';
import { Coins, ArrowDownLeft, ArrowUpRight, History, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface GiaCreditsCardProps {
  balance: number;
  transactions: CreditTransaction[];
}

export const GiaCreditsCard: React.FC<GiaCreditsCardProps> = ({ balance, transactions }) => {
  const { language } = useLanguage();
  return (
    <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
              {language === 'es' ? 'Tu saldo disponible' : 'Your available balance'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
              ${balance} <span className="text-sm font-sans font-normal text-neutral-500">GIA Credits</span>
            </h3>
          </div>
        </div>

        <div className="text-xs text-neutral-500 max-w-xs leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-200/60 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{language === 'es' ? 'Puedes redimir tu saldo como descuento directo durante la reserva de cualquier experiencia.' : 'You can redeem your balance as a direct discount when booking any experience.'}</span>
        </div>
      </div>

      {/* Transactions History */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <History className="w-3.5 h-3.5 text-neutral-400" />
          <span>{language === 'es' ? 'Historial de movimientos' : 'Transaction history'}</span>
        </h4>

        {transactions.length > 0 ? (
          <div className="divide-y divide-neutral-100">
            {transactions.map(tx => (
              <div key={tx.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      tx.type === 'EARNED'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {tx.type === 'EARNED' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{tx.source}</p>
                    <p className="text-[11px] text-neutral-400">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <span
                  className={`font-mono font-bold ${
                    tx.type === 'EARNED' ? 'text-emerald-700' : 'text-slate-900'
                  }`}
                >
                  {tx.type === 'EARNED' ? '+' : '-'}${tx.amount} USD
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-400 py-3 text-center">
            {language === 'es' ? 'Aún no tienes transacciones registradas.' : 'You do not have any transactions yet.'}
          </p>
        )}
      </div>
    </div>
  );
};
