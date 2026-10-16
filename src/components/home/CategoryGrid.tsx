import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { trackEvent } from '../../services/analytics';
import { Category } from '../../types/experience';
import { Landmark, UtensilsCrossed, Mountain, Waves, ArrowUpRight } from 'lucide-react';

import expSuchitoto from '../../assets/images/exp_culture_suchitoto_1791258103725.jpg';
import expCoffee from '../../assets/images/exp_coffee_apaneca_1791258112096.jpg';
import expSantaAna from '../../assets/images/exp_nature_santa_ana_1791258129967.jpg';
import expSurf from '../../assets/images/exp_adventure_surf_tunco_1791258121258.jpg';

interface CategoryItem {
  key: Category;
  titleKey: 'culture' | 'gastronomy' | 'nature' | 'adventure';
  descKey: 'cultureDesc' | 'gastronomyDesc' | 'natureDesc' | 'adventureDesc';
  image: string;
  icon: React.ReactNode;
  count: number;
}

export const CategoryGrid: React.FC = () => {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  const categories: CategoryItem[] = [
    {
      key: 'cultura',
      titleKey: 'culture',
      descKey: 'cultureDesc',
      image: expSuchitoto,
      icon: <Landmark className="w-5 h-5 text-teal-300" />,
      count: 4,
    },
    {
      key: 'gastronomia',
      titleKey: 'gastronomy',
      descKey: 'gastronomyDesc',
      image: expCoffee,
      icon: <UtensilsCrossed className="w-5 h-5 text-amber-300" />,
      count: 2,
    },
    {
      key: 'naturaleza',
      titleKey: 'nature',
      descKey: 'natureDesc',
      image: expSantaAna,
      icon: <Mountain className="w-5 h-5 text-emerald-300" />,
      count: 3,
    },
    {
      key: 'aventura',
      titleKey: 'adventure',
      descKey: 'adventureDesc',
      image: expSurf,
      icon: <Waves className="w-5 h-5 text-cyan-300" />,
      count: 3,
    },
  ];

  const handleSelectCategory = (cat: Category) => {
    trackEvent('filter_used', { category: cat, source: 'home_category_cards' });
    navigate(`/experiencias?category=${cat}`);
  };

  return (
    <section id="categorias" className="py-20 bg-neutral-100/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-display">
              {t.categories.title}
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-xl">
              {t.categories.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/experiencias')}
            className="text-xs font-semibold text-teal-800 hover:text-teal-950 inline-flex items-center gap-1 group"
          >
            <span>{t.categories.viewAll}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(cat => (
            <button
              key={cat.key}
              type="button"
              onClick={() => handleSelectCategory(cat.key)}
              className="group relative h-80 rounded-2xl overflow-hidden text-left focus-visible:outline-teal-600 shadow-xs hover:shadow-md transition-all duration-200"
            >
              {/* Background photography */}
              <img
                src={cat.image}
                alt={t.categories[cat.titleKey]}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Measured scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-black/10 group-hover:via-slate-950/50 transition-colors" />

              {/* Content overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-medium text-slate-300 font-mono">
                    {cat.count} experiencias
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white mb-1.5 flex items-center justify-between">
                    <span>{t.categories[cat.titleKey]}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {t.categories[cat.descKey]}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
