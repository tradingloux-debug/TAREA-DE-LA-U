import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import heroImage from '../../assets/images/hero_coatepeque_el_salvador_1791258093926.jpg';
import { useLanguage } from '../../context/LanguageContext';

export const Hero: React.FC = () => {
  const { navigate } = useRouter();
  const { loc } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[560px] sm:min-h-[640px] flex items-center">
      {/* Background Photography with measured tropical scenic scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={loc(
            'El Salvador: Lago de Coatepeque, volcanes y naturaleza viva',
            'El Salvador: Lake Coatepeque, volcanoes and lush nature'
          )}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-102 filter brightness-90 saturate-110"
        />
        {/* Measured dark-teal to deep-navy scrim ensuring high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#063A5B]/95 via-[#063A5B]/65 to-black/40" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center space-y-6">
        {/* Brand Name Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-[#FDBA2D] text-xs font-bold font-mono tracking-wider border border-white/25 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FDBA2D]" />
          <span>GIA EXPERIENCES</span>
        </div>

        {/* Official Slogan as Main Hero Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-3xl mx-auto leading-[1.12] font-display drop-shadow-md">
          {loc('Descubre El Salvador a tu manera', 'Discover El Salvador your way')}
        </h1>

        {/* Short Explanatory Phrase */}
        <p className="text-base sm:text-lg text-slate-100 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-xs">
          {loc(
            'Somos la tour operadora salvadoreña que diseña, opera y personaliza experiencias turísticas completas con transporte 100% incluido.',
            'We are the Salvadoran tour operator designing, operating, and customizing complete travel experiences with 100% transport included.'
          )}
        </p>

        {/* Two Clear Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* Main Button: Explorar experiencias */}
          <button
            type="button"
            onClick={() => navigate('/experiencias')}
            className="w-full sm:w-auto px-8 py-4 bg-[#00A6A6] hover:bg-[#009191] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
          >
            <Compass className="w-4 h-4 text-[#FDBA2D]" />
            <span>{loc('Explorar experiencias', 'Explore experiences')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Second Button: Crear mi viaje / Diseña tu experiencia */}
          <button
            type="button"
            onClick={() => navigate('/planea-con-gia')}
            className="w-full sm:w-auto px-8 py-4 bg-white/15 hover:bg-white/25 text-white border-2 border-white/80 hover:border-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98 backdrop-blur-xs"
          >
            <Sparkles className="w-4 h-4 text-[#FDBA2D]" />
            <span>{loc('Crear mi viaje', 'Create my trip')}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
