import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { DEMO_ROUTES } from '../../data/routes';
import { RouteCard } from '../routes/RouteCard';
import { Route, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HomeRoutesSection: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  // Highlight 3 multi-day routes
  const routes = DEMO_ROUTES.filter(route => ['route-6', 'route-7', 'route-8'].includes(route.id));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00A6A6] text-xs font-bold font-mono uppercase">
              <Route className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Tours completos GIA' : 'Complete GIA tours'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#063A5B] tracking-tight font-display">
              {language === 'es' ? 'Alojamiento, movilidad y experiencias en un solo viaje.' : 'Lodging, transportation, and experiences in one journey.'}
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 max-w-2xl">
              {language === 'es' ? 'Viaja por El Salvador con hospedaje seleccionado, transporte privado, guías y actividades coordinadas por nuestra tour operadora.' : 'Travel across El Salvador with selected lodging, private transportation, guides, and activities coordinated by our tour operator.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/rutas')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063A5B] hover:text-[#00A6A6] group cursor-pointer whitespace-nowrap"
          >
            <span>{language === 'es' ? 'Ver todas las rutas' : 'View all routes'} ({DEMO_ROUTES.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </div>
    </section>
  );
};
