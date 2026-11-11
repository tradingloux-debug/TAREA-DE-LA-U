import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { trackEvent } from '../../services/analytics';
import { Category } from '../../types/experience';
import {
  Landmark,
  UtensilsCrossed,
  Mountain,
  Waves,
  Compass,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

import expSuchitoto from '../../assets/images/exp_culture_suchitoto_1791258103725.jpg';
import expCoffee from '../../assets/images/exp_coffee_apaneca_1791258112096.jpg';
import expSantaAna from '../../assets/images/exp_nature_santa_ana_1791258129967.jpg';
import expSurf from '../../assets/images/exp_adventure_surf_tunco_1791258121258.jpg';
import heroCoatepeque from '../../assets/images/hero_coatepeque_el_salvador_1791258093926.jpg';
import routeEsencial from '../../assets/images/route_esencial_elsalvador_1791259912258.jpg';

interface VisualCategory {
  key: Category;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  image: string;
  icon: React.ReactNode;
}

export const CategoryGrid: React.FC = () => {
  const { navigate } = useRouter();
  const { loc } = useLanguage();

  const visualCategories: VisualCategory[] = [
    {
      key: 'gastronomia',
      titleEs: 'Gastronomía',
      titleEn: 'Gastronomy',
      descEs: 'Rutas de pupusas artesanales, talleres de café de altura y cocina tradicional.',
      descEn: 'Artisanal pupusa trails, highland coffee workshops, and authentic Salvadoran flavors.',
      image: expCoffee,
      icon: <UtensilsCrossed className="w-5 h-5 text-amber-300" />,
    },
    {
      key: 'cultura',
      titleEs: 'Cultura e Historia',
      titleEn: 'Culture & History',
      descEs: 'Pueblos coloniales, centros históricos, sitios mayas y talleres de añil.',
      descEn: 'Colonial towns, historic centers, Mayan archaeological gems, and indigo workshops.',
      image: expSuchitoto,
      icon: <Landmark className="w-5 h-5 text-teal-300" />,
    },
    {
      key: 'naturaleza',
      titleEs: 'Naturaleza',
      titleEn: 'Nature',
      descEs: 'Cráteres volcánicos, lagos de aguas termales y senderos en bosques nubosos.',
      descEn: 'Volcanic craters, crater thermal lakes, and cloud forest mountain hiking paths.',
      image: expSantaAna,
      icon: <Mountain className="w-5 h-5 text-emerald-300" />,
    },
    {
      key: 'aventura',
      titleEs: 'Aventura',
      titleEn: 'Adventure',
      descEs: 'Surf de clase mundial en el Pacífico, senderismo y cascadas.',
      descEn: 'World-class Pacific point breaks, volcano treks, and waterfall exploration.',
      image: expSurf,
      icon: <Waves className="w-5 h-5 text-cyan-300" />,
    },
    {
      key: 'playa',
      titleEs: 'Playas & Costa',
      titleEn: 'Beaches & Coast',
      descEs: 'Atardeceres dorados en El Tunco, El Zonte, El Cuco y Los Cóbanos.',
      descEn: 'Golden Pacific sunsets across El Tunco, El Zonte, El Cuco, and Los Cóbanos reef.',
      image: heroCoatepeque,
      icon: <Waves className="w-5 h-5 text-teal-300" />,
    },
    {
      key: 'especial',
      titleEs: 'Experiencias Especiales',
      titleEn: 'Special & VIP',
      descEs: 'Vuelos panorámicos en helicóptero, turismo comunitario y veladas privadas.',
      descEn: 'Scenic helicopter volcano flights, community initiatives, and private romantic evenings.',
      image: routeEsencial,
      icon: <Sparkles className="w-5 h-5 text-[#FDBA2D]" />,
    },
  ];

  const handleSelectCategory = (cat: Category) => {
    trackEvent('category_selected', { category: cat, source: 'home_visual_menu' });
    navigate(`/experiencias?category=${cat}`);
  };

  return (
    <section id="menu-experiencias" className="py-20 sm:py-24 bg-white border-b border-neutral-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00A6A6] text-xs font-bold font-mono uppercase shadow-2xs">
              <Compass className="w-3.5 h-3.5" />
              <span>{loc('Menú de Experiencias', 'Experience Menu')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#063A5B] tracking-tight font-display">
              {loc('Elige qué tipo de experiencia deseas explorar', 'Choose what type of experience you wish to explore')}
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
              {loc(
                'Cada categoría reúne actividades diseñadas y operadas directamente en El Salvador con transporte 100% incluido.',
                'Each category brings together activities designed and operated in El Salvador with 100% transport included.'
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/experiencias')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063A5B] hover:text-[#00A6A6] transition-colors cursor-pointer whitespace-nowrap group self-start sm:self-auto"
          >
            <span>{loc('Ver todo el catálogo', 'View full catalog')}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 6 Visual Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {visualCategories.map((cat) => (
            <div
              key={cat.key}
              onClick={() => handleSelectCategory(cat.key)}
              className="group bg-[#F7F4ED] rounded-3xl overflow-hidden border border-neutral-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5"
            >
              {/* Media with Scrim */}
              <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
                <img
                  src={cat.image}
                  alt={loc(cat.titleEs, cat.titleEn)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                <div className="absolute top-3.5 left-3.5 p-2 rounded-xl bg-black/50 backdrop-blur-md text-white border border-white/20">
                  {cat.icon}
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold tracking-tight font-display text-white">
                    {loc(cat.titleEs, cat.titleEn)}
                  </h3>
                </div>
              </div>

              {/* Card Footer: Short phrase + Explicit "Explorar" Button */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {loc(cat.descEs, cat.descEn)}
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCategory(cat.key);
                    }}
                    className="w-full py-2.5 px-4 bg-white hover:bg-[#00A6A6] text-[#063A5B] hover:text-white border border-neutral-300 hover:border-[#00A6A6] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs group-hover:bg-[#00A6A6] group-hover:text-white group-hover:border-[#00A6A6]"
                  >
                    <span>{loc('Explorar', 'Explore')}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
