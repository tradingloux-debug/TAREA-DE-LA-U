import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, MapPin, Compass } from 'lucide-react';
import { BackButton } from '../components/common/BackButton';

import heroCoatepeque from '../assets/images/hero_coatepeque_el_salvador_1791258093926.jpg';
import expSuchitoto from '../assets/images/exp_culture_suchitoto_1791258103725.jpg';
import expCoffee from '../assets/images/exp_coffee_apaneca_1791258112096.jpg';
import expSurf from '../assets/images/exp_adventure_surf_tunco_1791258121258.jpg';

export const ExploreElSalvadorPage: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  const regions = [
    {
      id: 'santa-ana',
      title: 'Santa Ana y Complejo Los Volcanes',
      subtitle: 'Volcanes activos, lagunas sulfurosas y lagos de cráter turquesa',
      description: 'El occidente salvadoreño alberga el imponente Parque Nacional Los Volcanes con el Ilamatepec (Santa Ana) y el Izalco, custodiando las aguas termales y vistas panorámicas del Lago de Coatepeque.',
      image: heroCoatepeque,
      department: 'Santa Ana',
    },
    {
      id: 'ruta-flores',
      title: 'Ruta de las Flores y Cafetales de Altura',
      subtitle: 'Pueblos coloniales de montaña, cascadas de manantial y café Pacamara',
      description: 'Un corredor de clima templado a lo largo de la cordillera Apaneca-Ilamatepec. Disfruta de la arquitectura colonial, murales vivos, mercadillos gastronómicos y beneficios de café tradicional.',
      image: expCoffee,
      department: 'Ahuachapán',
    },
    {
      id: 'surf-city',
      title: 'Surf City y Costa del Bálsamo',
      subtitle: 'Olas de clase mundial, atardeceres en arenas volcánicas y vida costera',
      description: 'Rompientes consistentes de derecha reconocidas por la WSL mundial en El Tunco, El Sunzal y Punta Roca. Ideal tanto para aprender a surfear como para disfrutar de mariscos frescos.',
      image: expSurf,
      department: 'La Libertad',
    },
    {
      id: 'suchitoto-cultura',
      title: 'Suchitoto y Joyas Arqueológicas',
      subtitle: 'Herencia colonial sobre el Lago Suchitlán y la "Pompeya de América"',
      description: 'El corazón cultural del país. Desde las calles empedradas y talleres de añil orgánico en Suchitoto, hasta la aldea maya preservada bajo ceniza volcánica en Joya de Cerén.',
      image: expSuchitoto,
      department: 'Cuscatlán',
    },
  ];

  return (
    <div className="bg-neutral-50/60 min-h-screen py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Back navigation */}
        <div>
          <BackButton
            fallbackPath="/"
            label={language === 'es' ? 'Volver al inicio' : 'Back to Home'}
          />
        </div>

        {/* Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            <span>Guía de Destinos</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
            Explora El Salvador por Regiones
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
            Descubre las principales zonas turísticas del país. Cada región ofrece una combinación única de naturaleza, tradiciones locales, microclimas y aventuras inolvidables.
          </p>
        </div>

        {/* Region Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regions.map(r => (
            <div
              key={r.id}
              className="bg-white rounded-3xl border border-neutral-200/90 overflow-hidden shadow-2xs flex flex-col justify-between group hover:shadow-md transition-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={r.image}
                  alt={r.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-semibold text-teal-300 font-mono block">
                    {r.department}
                  </span>
                  <h3 className="text-xl font-bold font-display">{r.title}</h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-neutral-800">{r.subtitle}</p>
                  <p className="text-xs text-neutral-600 leading-relaxed">{r.description}</p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigate(`/experiencias?department=${encodeURIComponent(r.department)}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-950 group/btn"
                  >
                    <span>Ver experiencias en {r.department}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
