import React, { useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { DiscoveryOptions } from '../components/home/DiscoveryOptions';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { ExperienceCard } from '../components/experiences/ExperienceCard';
import { HomeTripPlannerSection } from '../components/home/HomeTripPlannerSection';
import { HomeRoutesSection } from '../components/home/HomeRoutesSection';
import { HomeLocalSection } from '../components/home/HomeLocalSection';
import { ImmersiveSection } from '../components/home/ImmersiveSection';
import { UpcomingExperiencesSection } from '../components/home/UpcomingExperiencesSection';
import { WhyGia } from '../components/home/WhyGia';
import { ShareGiaSection } from '../components/home/ShareGiaSection';
import { FinalCta } from '../components/home/FinalCta';
import { DEMO_EXPERIENCES } from '../data/experiences';
import { useRouter } from '../context/RouterContext';
import { trackEvent } from '../services/analytics';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  useEffect(() => {
    trackEvent('home_view');
  }, []);

  // Featured experiences (6 diverse top-rated experiences)
  const featuredExperiences = DEMO_EXPERIENCES.filter((exp) => exp.featured).slice(0, 6);

  return (
    <div className="space-y-0 selection:bg-teal-500/20 selection:text-teal-950">
      {/* 1. Hero con Buscador integrado */}
      <Hero />

      {/* 2. Tres caminos principales: "¿Cómo quieres viajar?" */}
      <DiscoveryOptions />

      {/* 3. Categorías principales */}
      <CategoryGrid />

      {/* 4. Experiencias destacadas recomendadas */}
      <section className="py-20 sm:py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00A6A6] text-xs font-bold font-mono uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Selección Destacada' : 'Curated Selection'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#063A5B] tracking-tight font-display">
                {language === 'es' ? 'Experiencias imprescindibles de El Salvador' : 'Must-Do Experiences in El Salvador'}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 max-w-xl">
                {language === 'es'
                  ? 'Salidas con verificación de operadores locales, fotografías reales y protocolos de calidad GIA Experiences.'
                  : 'Vetted local operator departures, authentic photography, and GIA Experiences quality standards.'}
              </p>
            </div>

            {/* TERTIARY CTA: "Ver todas" */}
            <button
              type="button"
              onClick={() => navigate('/experiencias')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063A5B] hover:text-[#00A6A6] transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto group"
            >
              <span>{language === 'es' ? 'Ver todas las experiencias' : 'View all experiences'} ({DEMO_EXPERIENCES.length})</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Planea con GIA */}
      <HomeTripPlannerSection />

      {/* 6. Rutas GIA */}
      <HomeRoutesSection />

      {/* 7. Experiencias locales (comunidades y tradición) */}
      <HomeLocalSection />

      {/* 8. Explora antes de viajar con imágenes 360° interactivas */}
      <ImmersiveSection />

      {/* 9. Próximas experiencias */}
      <UpcomingExperiencesSection />

      {/* 10. Por qué GIA */}
      <WhyGia />

      {/* 11. Comparte GIA (programa de invitación) */}
      <ShareGiaSection />

      {/* 12. Final Call to Action */}
      <FinalCta />
    </div>
  );
};
