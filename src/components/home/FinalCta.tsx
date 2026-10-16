import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FinalCta: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-r from-[#063A5B] via-[#04283f] to-[#063A5B] text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,166,166,0.18),transparent_65%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FDBA2D] text-xs font-bold border border-white/15">
          <Sparkles className="w-3.5 h-3.5 text-[#FDBA2D]" />
          <span>{language === 'es' ? 'El Salvador diseñado para ti' : 'El Salvador, designed for you'}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display leading-tight text-balance">
          {language === 'es' ? '¿Cómo quieres vivir El Salvador?' : 'How do you want to experience El Salvador?'}
        </h2>

        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed text-balance">
          {language === 'es' ? 'Desde caminatas a calderas volcánicas y playas de olas legendarias, hasta catas de café en pueblos coloniales. Diseña una experiencia inolvidable.' : 'From volcanic caldera hikes and legendary surf beaches to coffee tastings in colonial towns. Design an unforgettable experience.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/planea-con-gia')}
            className="w-full sm:w-auto px-8 py-4 bg-[#FDBA2D] hover:bg-[#f5b124] text-slate-950 font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{language === 'es' ? 'Crear mi viaje' : 'Create my trip'}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/experiencias')}
            className="w-full sm:w-auto px-8 py-4 bg-[#00A6A6] hover:bg-[#009191] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
          >
            <Compass className="w-4 h-4" />
            <span>{language === 'es' ? 'Explorar experiencias' : 'Explore experiences'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
