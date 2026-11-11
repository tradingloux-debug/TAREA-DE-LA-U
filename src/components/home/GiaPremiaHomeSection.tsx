import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { Gift, Sparkles, ArrowRight, Percent, Share2, Coins } from 'lucide-react';

export const GiaPremiaHomeSection: React.FC = () => {
  const { navigate } = useRouter();
  const { loc } = useLanguage();

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold font-mono uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FDBA2D]" />
            <span>GIA PREMIA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#063A5B] tracking-tight font-display">
            {loc('¡Con GIA, viajar tiene recompensa!', 'With GIA, traveling has its rewards!')}
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            {loc(
              'Descubre El Salvador a tu manera, disfruta experiencias inolvidables y recibe beneficios por seguir viajando con nosotros.',
              'Discover El Salvador your way, enjoy unforgettable experiences, and earn benefits for continuing to explore with us.'
            )}
          </p>
        </div>

        {/* 3 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {/* Card 1: 10% de descuento */}
          <div className="bg-[#F7F4ED] rounded-3xl p-8 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all duration-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#00A6A6]">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#063A5B] font-display">
                {loc('10 % de descuento', '10% Discount')}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {loc(
                  'Por regresar y reservar tu segunda experiencia elegible con GIA.',
                  'For returning and booking your second eligible experience with GIA.'
                )}
              </p>
            </div>
            <span className="text-[11px] font-mono font-bold text-teal-800 uppercase tracking-wider block pt-2 border-t border-neutral-200/60">
              {loc('Beneficio de fidelización', 'Loyalty perk')}
            </span>
          </div>

          {/* Card 2: 5% para tus amigos */}
          <div className="bg-[#F7F4ED] rounded-3xl p-8 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all duration-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#063A5B] font-display">
                {loc('5 % para tus amigos', '5% for your friends')}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {loc(
                  'Comparte tu código personal y permite que nuevos viajeros disfruten un descuento en su primera experiencia elegible.',
                  'Share your personal code and allow new travelers to enjoy a discount on their first eligible tour.'
                )}
              </p>
            </div>
            <span className="text-[11px] font-mono font-bold text-amber-800 uppercase tracking-wider block pt-2 border-t border-neutral-200/60">
              {loc('Recomendación directa', 'Direct recommendation')}
            </span>
          </div>

          {/* Card 3: Gana recompensas */}
          <div className="bg-[#F7F4ED] rounded-3xl p-8 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all duration-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#063A5B] font-display">
                {loc('Gana recompensas', 'Earn rewards')}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {loc(
                  'Acumula crédito GIA cuando otras personas completen experiencias utilizando tu código.',
                  'Accumulate GIA credit whenever other people complete experiences using your code.'
                )}
              </p>
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wider block pt-2 border-t border-neutral-200/60">
              {loc('Crédito en reservas', 'Booking credits')}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => navigate('/gia-premia')}
            className="px-8 py-3.5 bg-[#00A6A6] hover:bg-[#009191] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>{loc('Descubre GIA Premia', 'Discover GIA Premia')}</span>
            <ArrowRight className="w-4 h-4 text-[#FDBA2D]" />
          </button>
        </div>
      </div>
    </section>
  );
};
