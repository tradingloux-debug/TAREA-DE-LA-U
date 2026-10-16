import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { SearchBar } from './SearchBar';
import { ArrowRight, Sparkles, Route, Compass } from 'lucide-react';
import heroImage from '../../assets/images/hero_coatepeque_el_salvador_1791258093926.jpg';
import { useLanguage } from '../../context/LanguageContext';

export const Hero: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[600px] sm:min-h-[680px] flex items-center">
      {/* Background Photography with measured tropical scenic scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={language === 'es' ? 'El Salvador: volcanes, Lago de Coatepeque y paisajes tropicales' : 'El Salvador: volcanoes, Lake Coatepeque and tropical landscapes'}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-102 filter brightness-90 saturate-110"
        />
        {/* Measured dark-teal to deep-navy scrim ensuring high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#063A5B]/95 via-[#063A5B]/65 to-black/40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-18 sm:py-24 text-center">
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-[#FDBA2D] text-xs font-bold mb-6 border border-white/20 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FDBA2D]" />
          <span>GIA EXPERIENCES</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-3xl mx-auto leading-[1.12] text-balance font-display mb-5 drop-shadow-md">
          {language === 'es' ? 'El Salvador diseñado para ti.' : 'El Salvador, designed for you.'}
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-slate-100 max-w-2xl mx-auto font-normal leading-relaxed text-balance mb-9 drop-shadow-xs">
          {language === 'es' ? 'Descubre experiencias, recorre el país o crea un viaje hecho alrededor de ti.' : 'Discover experiences, travel the country, or create a trip designed around you.'}
        </p>

        {/* 3 Clear Action Levels: Primary, Secondary, and Discrete Tertiary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
          {/* PRIMARY: Turquesa */}
          <button
            type="button"
            onClick={() => navigate('/planea-con-gia')}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#00A6A6] hover:bg-[#009191] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-[#FDBA2D]" />
            <span>{language === 'es' ? 'Crear mi viaje' : 'Create my trip'}</span>
          </button>

          {/* SECONDARY: Outline */}
          <button
            type="button"
            onClick={() => navigate('/experiencias')}
            className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border-2 border-white/80 hover:border-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98 backdrop-blur-xs"
          >
            <span>{language === 'es' ? 'Explorar experiencias' : 'Explore experiences'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* TERTIARY: Enlaces directos */}
        <div className="mb-9 flex items-center justify-center gap-3.5 flex-wrap">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('un-viaje-por-el-salvador');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs text-[#FDBA2D] hover:text-amber-300 font-bold transition-colors cursor-pointer group bg-black/40 px-3.5 py-1.5 rounded-full border border-amber-400/30 backdrop-blur-md"
          >
            <Compass className="w-3.5 h-3.5 text-[#FDBA2D]" />
            <span>{language === 'es' ? 'Recorrido interactivo: Un Viaje por El Salvador' : 'Interactive Trail: A Journey Through El Salvador'}</span>
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/rutas')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-200 hover:text-[#20C5C7] font-semibold transition-colors cursor-pointer group"
          >
            <Route className="w-3.5 h-3.5 text-[#20C5C7]" />
            <span>{language === 'es' ? 'Ver Rutas GIA (multidía)' : 'View GIA Routes (multi-day)'}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* Integrated Search Bar */}
        <div className="max-w-2xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};
