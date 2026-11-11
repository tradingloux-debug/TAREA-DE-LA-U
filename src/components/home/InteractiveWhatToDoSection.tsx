import React, { useState, useMemo } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { DEMO_EXPERIENCES } from '../../data/experiences';
import { ExperienceCard } from '../experiences/ExperienceCard';
import {
  Compass,
  Landmark,
  UtensilsCrossed,
  Waves,
  Mountain,
  Sparkles,
  ArrowRight,
  Flame,
} from 'lucide-react';

interface IntentOption {
  id: string;
  labelEs: string;
  labelEn: string;
  icon: React.ReactNode;
  categoryFilter?: string;
  packageFilter?: boolean;
  filterFn: (exp: typeof DEMO_EXPERIENCES[0]) => boolean;
}

export const InteractiveWhatToDoSection: React.FC = () => {
  const { navigate } = useRouter();
  const { loc } = useLanguage();
  const [selectedIntentId, setSelectedIntentId] = useState<string>('cultura');

  const options: IntentOption[] = [
    {
      id: 'cultura',
      labelEs: 'Quiero conocer la cultura salvadoreña',
      labelEn: 'I want to experience Salvadoran culture',
      icon: <Landmark className="w-4 h-4 text-teal-600" />,
      categoryFilter: 'cultura',
      filterFn: (exp) => exp.category === 'cultura' || exp.slug.includes('suchitoto') || exp.slug.includes('ceren'),
    },
    {
      id: 'comida',
      labelEs: 'Quiero probar comida típica',
      labelEn: 'I want to taste traditional food',
      icon: <UtensilsCrossed className="w-4 h-4 text-amber-600" />,
      categoryFilter: 'gastronomia',
      filterFn: (exp) => exp.category === 'gastronomia' || exp.slug.includes('pupusas') || exp.slug.includes('cafe'),
    },
    {
      id: 'aventura',
      labelEs: 'Quiero aventura',
      labelEn: 'I want adventure',
      icon: <Flame className="w-4 h-4 text-rose-500" />,
      categoryFilter: 'aventura',
      filterFn: (exp) => exp.category === 'aventura' || exp.difficulty === 'exigente' || exp.slug.includes('santa-ana'),
    },
    {
      id: 'playas',
      labelEs: 'Quiero conocer playas',
      labelEn: 'I want to discover beaches',
      icon: <Waves className="w-4 h-4 text-cyan-600" />,
      categoryFilter: 'playa',
      filterFn: (exp) => exp.category === 'playa' || exp.department === 'La Libertad' && exp.slug.includes('surf'),
    },
    {
      id: 'naturaleza',
      labelEs: 'Quiero naturaleza',
      labelEn: 'I want nature',
      icon: <Mountain className="w-4 h-4 text-emerald-600" />,
      categoryFilter: 'naturaleza',
      filterFn: (exp) => exp.category === 'naturaleza' || exp.slug.includes('coatepeque') || exp.slug.includes('boqueron'),
    },
    {
      id: 'viaje-completo',
      labelEs: 'Quiero un viaje completo',
      labelEn: 'I want a complete multi-day journey',
      icon: <Sparkles className="w-4 h-4 text-[#FDBA2D]" />,
      packageFilter: true,
      filterFn: (exp) => Boolean(exp.isPackage || exp.packageDays),
    },
  ];

  const currentOption = options.find((opt) => opt.id === selectedIntentId) || options[0];

  const matchedExperiences = useMemo(() => {
    return DEMO_EXPERIENCES.filter(currentOption.filterFn).slice(0, 3);
  }, [currentOption]);

  const handleExploreMore = () => {
    if (currentOption.categoryFilter) {
      navigate(`/experiencias?category=${currentOption.categoryFilter}`);
    } else if (currentOption.packageFilter) {
      navigate('/experiencias?category=paquetes');
    } else {
      navigate('/experiencias');
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#F7F4ED] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 text-[#063A5B] text-xs font-bold font-mono uppercase shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-[#00A6A6]" />
            <span>{loc('Exploración a tu manera', 'Exploration your way')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#063A5B] tracking-tight font-display">
            {loc('¿Qué quieres hacer?', 'What do you want to do?')}
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            {loc(
              'Selecciona tu interés y encuentra al instante las mejores experiencias seleccionadas para ti.',
              'Choose your travel interest and instantly find the best curated experiences for you.'
            )}
          </p>
        </div>

        {/* Interactive Option Selectors (Pills) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
          {options.map((opt) => {
            const isSelected = selectedIntentId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedIntentId(opt.id)}
                className={`py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-2xs ${
                  isSelected
                    ? 'bg-[#063A5B] text-white shadow-md scale-102 ring-2 ring-[#00A6A6]'
                    : 'bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200/90'
                }`}
              >
                <span>{opt.icon}</span>
                <span>{loc(opt.labelEs, opt.labelEn)}</span>
              </button>
            );
          })}
        </div>

        {/* Live Filtered Experiences (Clean 3 Cards) */}
        <div className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {matchedExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </div>

        {/* Bottom CTA to see full catalog for this intent */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={handleExploreMore}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#00A6A6] hover:text-[#063A5B] transition-colors cursor-pointer"
          >
            <span>
              {loc(
                `Ver todas las opciones de "${loc(currentOption.labelEs, currentOption.labelEn)}"`,
                `View all options for "${loc(currentOption.labelEs, currentOption.labelEn)}"`
              )}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
