import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { DEMO_EXPERIENCES } from '../../data/experiences';
import { LocalExperienceCard } from '../local/LocalExperienceCard';
import { Heart, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HomeLocalSection: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  // Experiences with isLocalExperience: true
  const localExperiences = DEMO_EXPERIENCES.filter((exp) => exp.isLocalExperience).slice(0, 3);

  return (
    <section className="py-20 bg-[#F7F4ED]/50 border-t border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#55A94B] text-xs font-bold font-mono uppercase">
              <Heart className="w-3.5 h-3.5 fill-[#55A94B]" />
              <span>{language === 'es' ? 'Turismo comunitario y saberes vivos' : 'Community tourism and living traditions'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#063A5B] tracking-tight font-display">
              {language === 'es' ? 'Conecta con El Salvador' : 'Connect with El Salvador'}
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 max-w-2xl">
              {language === 'es' ? 'Vive experiencias que te acercan a las personas, tradiciones y sabores que hacen único al país.' : 'Experience the people, traditions, and flavors that make the country unique.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/experiencias-locales')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063A5B] hover:text-[#55A94B] group cursor-pointer whitespace-nowrap"
          >
            <span>{language === 'es' ? 'Ver experiencias locales' : 'View local experiences'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localExperiences.map((exp) => (
            <LocalExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
};
