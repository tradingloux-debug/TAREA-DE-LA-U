import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { DEMO_ROUTES } from '../../data/routes';
import { Route, ArrowRight, Calendar, MapPin, Sparkles, BedDouble, Car, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HomeRoutesSection: React.FC = () => {
  const { navigate } = useRouter();
  const { loc } = useLanguage();

  // Find 2-day, 3-day, and 5-day routes
  const route2Days = DEMO_ROUTES.find((r) => r.days === 2) || DEMO_ROUTES[0];
  const route3Days = DEMO_ROUTES.find((r) => r.days === 3) || DEMO_ROUTES[1];
  const route5Days = DEMO_ROUTES.find((r) => r.days === 5) || DEMO_ROUTES[2];

  const routes = [
    {
      badge: loc('Ruta de 2 días', '2-Day Route'),
      route: route2Days,
      daysLabel: '2 Días / 1 Noche',
      color: 'border-teal-200 bg-teal-50/50',
    },
    {
      badge: loc('Ruta de 3 días', '3-Day Route'),
      route: route3Days,
      daysLabel: '3 Días / 2 Noches',
      color: 'border-amber-200 bg-amber-50/50',
    },
    {
      badge: loc('Ruta de 5 días', '5-Day Route'),
      route: route5Days,
      daysLabel: '5 Días / 4 Noches',
      color: 'border-sky-200 bg-sky-50/50',
    },
  ];

  return (
    <section id="rutas-salvador" className="py-20 sm:py-24 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00A6A6] text-xs font-bold font-mono uppercase shadow-2xs">
              <Route className="w-3.5 h-3.5" />
              <span>{loc('Circuitos Multidía', 'Multi-day Circuits')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#063A5B] tracking-tight font-display">
              {loc('Rutas por El Salvador', 'Routes through El Salvador')}
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
              {loc(
                'Paquetes completos organizados día por día con alojamiento, transporte privado, guías y actividades coordinadas.',
                'Complete multi-day packages organized day-by-day with lodging, private transport, certified guides, and curated activities.'
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/rutas')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063A5B] hover:text-[#00A6A6] transition-colors cursor-pointer whitespace-nowrap group self-start sm:self-auto"
          >
            <span>{loc('Ver todas las rutas', 'View all routes')} ({DEMO_ROUTES.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Structured Routes Cards (2 days, 3 days, 5 days) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {routes.map(({ badge, route, daysLabel }, idx) => {
            const title = loc(route.titleEs, route.titleEn);
            const desc = loc(route.descriptionEs, route.descriptionEn);

            return (
              <div
                key={route.id || idx}
                onClick={() => navigate(`/rutas/${route.slug}`)}
                className="bg-white rounded-3xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 relative"
              >
                {/* Media */}
                <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
                  <img
                    src={route.images[0]}
                    alt={title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#063A5B]/90 backdrop-blur-md text-[#FDBA2D] text-xs font-black font-mono shadow-xs">
                      {badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#063A5B] text-[11px] font-bold">
                      {daysLabel}
                    </span>
                  </div>

                  {/* Bottom Destinations string */}
                  <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-medium flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#FDBA2D] shrink-0" />
                    <span className="truncate">{route.destinations.join(' → ')}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#063A5B] group-hover:text-[#00A6A6] transition-colors font-display line-clamp-2 leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Visual Day-by-Day Outline */}
                  <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-neutral-200/80 space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                      {loc('Itinerario resumido', 'Itinerary summary')}
                    </span>
                    <div className="space-y-1.5 text-xs text-neutral-700">
                      {route.itinerary && route.itinerary.length > 0 ? (
                        route.itinerary.slice(0, 3).map((item) => (
                          <div key={item.day} className="flex items-start gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-[#063A5B] text-white font-mono text-[10px] font-bold shrink-0">
                              Día {item.day}
                            </span>
                            <span className="truncate font-medium">{loc(item.titleEs, item.titleEn)}</span>
                          </div>
                        ))
                      ) : (
                        route.destinations.slice(0, 3).map((dest, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-[#063A5B] text-white font-mono text-[10px] font-bold shrink-0">
                              Día {i + 1}
                            </span>
                            <span className="truncate font-medium">{dest}</span>
                          </div>
                        ))
                      )}
                      {route.days > 3 && (
                        <p className="text-[10px] text-teal-800 font-bold pt-1">
                          + {route.days - 3} {loc('días más de recorrido...', 'more days of exploration...')}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Highlights Bar: Lodging + Transport included */}
                  <div className="flex items-center gap-3 text-[11px] font-semibold text-neutral-600">
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5 text-[#00A6A6]" />
                      <span>{route.days - 1} {loc('noches hotel', 'hotel nights')}</span>
                    </div>
                    <span className="text-neutral-300">·</span>
                    <div className="flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-[#00A6A6]" />
                      <span>{loc('Transporte 100% incluido', '100% Transport included')}</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-neutral-400 block font-medium">
                        {loc('Precio desde', 'Price from')}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black font-mono text-[#063A5B]">
                          ${route.price}
                        </span>
                        <span className="text-[11px] text-neutral-400">USD</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/rutas/${route.slug}`);
                      }}
                      className="px-4 py-2.5 bg-[#00A6A6] hover:bg-[#009191] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md group-hover:shadow-lg flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <span>{loc('Ver ruta', 'View route')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
