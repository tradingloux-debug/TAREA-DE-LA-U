import React, { useState } from 'react';
import { DEMO_EXPERIENCES } from '../data/experiences';
import { LocalExperienceCard } from '../components/local/LocalExperienceCard';
import { LocalCategory } from '../types/experience';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Users, Sparkles, Coffee, Utensils, Scissors, BookOpen, Trees } from 'lucide-react';
import { BackButton } from '../components/common/BackButton';

export const LocalExperiencesPage: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<LocalCategory | 'all'>('all');

  // Filter local experiences
  const localExperiences = DEMO_EXPERIENCES.filter(exp => exp.isLocalExperience);

  const filtered = localExperiences.filter(exp => {
    if (selectedCategory === 'all') return true;
    return exp.localCategory === selectedCategory;
  });

  const categories: { id: LocalCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Todas las experiencias' },
    { id: 'gastronomia_local', label: 'Gastronomía local' },
    { id: 'cocina_tradicional', label: 'Cocina tradicional' },
    { id: 'cafe', label: 'Café' },
    { id: 'cacao', label: 'Cacao' },
    { id: 'agricultura', label: 'Agricultura' },
    { id: 'artesanias', label: 'Artesanías' },
    { id: 'arte', label: 'Arte' },
    { id: 'tradiciones', label: 'Tradiciones' },
    { id: 'historia_local', label: 'Historia local' },
    { id: 'experiencias_rurales', label: 'Experiencias rurales' },
  ];

  return (
    <div className="bg-neutral-50/60 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Back navigation */}
        <div>
          <BackButton
            fallbackPath="/experiencias"
            label={language === 'es' ? 'Volver al catálogo' : 'Back to catalog'}
          />
        </div>

        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#55A94B] text-xs font-bold font-mono">
            <Heart className="w-3.5 h-3.5 text-[#55A94B] fill-[#55A94B]" />
            <span>Turismo Comunitario y Tradición</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#063A5B] tracking-tight font-display">
            Conecta con El Salvador
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Vive experiencias que te acercan a las personas, tradiciones y sabores que hacen único al país.
          </p>
        </div>

        {/* Ethical Travel Principles Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-600">
          <div className="space-y-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <Users className="w-4 h-4 text-emerald-700" />
              Ingreso directo a familias
            </span>
            <p className="text-neutral-500 leading-relaxed">
              La mayor parte de tu inversión apoya directamente a los talleres familiares y asociaciones productivas locales.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              Preservación de saberes vivos
            </span>
            <p className="text-neutral-500 leading-relaxed">
              Fomentamos la transmisión de técnicas ancestrales como el añil maya xiquilite y el tostado tradicional.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <Heart className="w-4 h-4 text-emerald-700" />
              Encuentros horizontales y respetuosos
            </span>
            <p className="text-neutral-500 leading-relaxed">
              Promovemos la convivencia humana genuina sin tratar a las comunidades como atracciones turísticas.
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-neutral-400 font-semibold mr-1 shrink-0">Categoría:</span>
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl border transition-all font-semibold whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(exp => (
            <LocalExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </div>
    </div>
  );
};
