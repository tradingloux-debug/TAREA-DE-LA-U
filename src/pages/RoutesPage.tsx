import React, { useState } from 'react';
import { DEMO_ROUTES } from '../data/routes';
import { RouteCard } from '../components/routes/RouteCard';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../services/analytics';
import { Compass, Sparkles, BedDouble, CarFront, MapPinned, Headphones } from 'lucide-react';
import { BackButton } from '../components/common/BackButton';

export const RoutesPage: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();
  const [selectedDuration, setSelectedDuration] = useState<number | 'all'>('all');

  const filteredRoutes = DEMO_ROUTES.filter(route => {
    if (selectedDuration === 'all') return true;
    return route.days === selectedDuration;
  });

  return (
    <div className="bg-neutral-50/60 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Back navigation */}
        <div>
          <BackButton
            fallbackPath="/"
            label={language === 'es' ? 'Volver al inicio' : 'Back to Home'}
          />
        </div>

        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00A6A6] text-xs font-bold font-mono">
            <Compass className="w-3.5 h-3.5 text-[#00A6A6]" />
            <span>{language === 'es' ? 'Tours completos por El Salvador' : 'Complete tours across El Salvador'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#063A5B] tracking-tight font-display">
            {language === 'es' ? 'Tu viaje completo, coordinado de principio a fin.' : 'Your complete trip, coordinated from start to finish.'}
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            {language === 'es' ? 'Explora varios destinos sin preocuparte por la logística. Cada paquete integra alojamiento seleccionado, movilidad terrestre, actividades guiadas y acompañamiento de GIA.' : 'Explore multiple destinations without worrying about logistics. Every package combines selected lodging, ground transportation, guided activities, and GIA support.'}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: BedDouble, es: 'Alojamiento seleccionado', en: 'Selected lodging' },
            { icon: CarFront, es: 'Movilidad coordinada', en: 'Coordinated transport' },
            { icon: MapPinned, es: 'Experiencias y entradas', en: 'Experiences & tickets' },
            { icon: Headphones, es: 'Asistencia de GIA', en: 'GIA travel support' },
          ].map(item => <div key={item.es} className="bg-white rounded-2xl border border-neutral-200 p-4 flex items-center gap-3 text-xs font-bold text-slate-800"><item.icon className="w-5 h-5 text-teal-700 shrink-0" /><span>{language === 'es' ? item.es : item.en}</span></div>)}
        </div>

        {/* Duration Filter Segmented Control */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-neutral-400 font-semibold mr-1 shrink-0">{language === 'es' ? 'Duración:' : 'Duration:'}</span>
          {[
            { id: 'all', label: language === 'es' ? 'Todos los tours' : 'All tours' },
            ...Array.from(new Set(DEMO_ROUTES.map(route => route.days))).sort((a, b) => a - b).map(days => ({ id: days, label: `${days} ${language === 'es' ? 'días' : 'days'}` })),
          ].map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedDuration(opt.id as any)}
              className={`px-4 py-2 rounded-xl border transition-all font-semibold whitespace-nowrap cursor-pointer ${
                selectedDuration === opt.id
                  ? 'bg-[#063A5B] text-white border-[#063A5B] shadow-xs'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-[#00A6A6]/40'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoutes.map(route => (
            <RouteCard
              key={route.id}
              route={route}
              onCustomize={() => {
                trackEvent('route_personalization_started', { slug: route.slug });
                navigate(`/planea-con-gia?route=${route.slug}`);
              }}
            />
          ))}
        </div>

        {/* Personalized Banner */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-950 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-slate-800">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              {language === 'es' ? '¿Quieres una ruta exclusiva?' : 'Would you like a private route?'}
            </span>
            <h3 className="text-2xl font-bold font-display">
              {language === 'es' ? 'Diseña un viaje único con Planea con GIA' : 'Design a unique trip with Plan with GIA'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'es' ? 'Dinos cuántos días tienes, quiénes viajan y qué deseas vivir. GIA preparará una propuesta personalizada de alojamiento, movilidad y experiencias.' : 'Tell us your dates, travelers, and interests. GIA will prepare a customized lodging, transportation, and experience proposal.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/planea-con-gia')}
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'es' ? 'Crear mi viaje personalizado' : 'Create my custom trip'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
