import React, { useState } from 'react';
import { DEMO_ROUTES } from '../data/routes';
import { DEMO_EXPERIENCES } from '../data/experiences';
import { RouteMap } from '../components/routes/RouteMap';
import { Interactive360Viewer } from '../components/common/Interactive360Viewer';
import { VirtualTour360 } from '../components/common/VirtualTour360';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { useBookingDraft } from '../context/BookingDraftContext';
import { trackEvent } from '../services/analytics';
import { tripStorage } from '../services/tripStorage';
import { plannerEngine } from '../services/plannerEngine';
import { AutoReserveModal } from '../components/booking/AutoReserveModal';
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Sparkles,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Compass,
  Move,
  BookmarkCheck,
  Plus,
  BedDouble,
  CarFront,
  UtensilsCrossed,
  Headphones,
} from 'lucide-react';

export const RouteDetailPage: React.FC = () => {
  const { slug, navigate, goBack } = useRouter();
  const { language } = useLanguage();
  const { setDraft } = useBookingDraft();
  const [activeTab, setActiveTab] = useState<'itinerary' | 'map' | 'included'>('itinerary');
  const [addedToTrip, setAddedToTrip] = useState(false);
  const [tour360Open, setTour360Open] = useState(false);
  const [showAutoReserve, setShowAutoReserve] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => new Date(Date.now() + 86400000).toISOString().split('T')[0]);

  const route = DEMO_ROUTES.find(r => r.slug === slug) || DEMO_ROUTES[0];

  const title = language === 'es' ? route.titleEs : route.titleEn;
  const description = language === 'es' ? route.descriptionEs : route.descriptionEn;

  const handleCustomize = () => {
    trackEvent('route_personalization_started', { slug: route.slug });
    navigate(`/planea-con-gia?route=${route.slug}`);
  };

  const handleBookRoute = () => {
    setDraft({
      experienceId: route.id,
      experienceTitle: title,
      experienceSlug: route.slug,
      experienceLocation: route.destinations.join(' · '),
      experienceImage: route.images[0],
      pricePerPerson: route.price,
      date: selectedDate,
      adults: 2,
      children: 0,
    });
    navigate('/checkout');
  };

  const handleAddToTrip = () => {
    const generatedTrip = plannerEngine.generateTrip(
      {
        daysCount: route.days,
        travelersCount: 2,
        travelerType: 'pareja',
        budgetTier: 'equilibrado',
        pace: 'equilibrado',
        interests: ['cultura', 'volcanes', 'gastronomia'],
      },
      route
    );
    tripStorage.saveTrip(generatedTrip);
    trackEvent('trip_saved', { tripId: generatedTrip.id, routeSlug: route.slug });
    setAddedToTrip(true);
    setTimeout(() => setAddedToTrip(false), 3000);
  };

  return (
    <div className="bg-neutral-50/60 min-h-screen pb-20">
      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => goBack('/rutas')}
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-700 hover:text-[#063A5B] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00A6A6] group-hover:-translate-x-0.5 transition-transform" />
            <span>{language === 'es' ? 'Volver a todos los tours GIA' : 'Back to all GIA tours'}</span>
          </button>

          <span className="text-xs font-mono font-bold text-teal-800">
            {route.days} {language === 'es' ? 'días de exploración' : 'days of exploration'}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Hero Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Media & Gallery */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative h-80 sm:h-[420px] rounded-3xl overflow-hidden bg-slate-900 shadow-md">
              <img
                src={route.images[0]}
                alt={title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider block mb-1">
                  {language === 'es' ? 'Tour completo coordinado' : 'Coordinated complete tour'}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
                  {title}
                </h1>
              </div>
            </div>

            {/* Interactive 360 viewer for route */}
            {(route.virtualTour360Url || route.has360) && (
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 font-mono">
                    <Compass className="w-4 h-4 text-teal-600" />
                    <span>{language === 'es' ? 'Vista 360° interactiva del tour' : 'Interactive 360° tour view'}</span>
                  </h3>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-[#00A6A6] border border-teal-200 flex items-center gap-1">
                    <Move className="w-3 h-3" />
                    <span>{language === 'es' ? 'Arrastra para mover en 360°' : 'Drag to move in 360°'}</span>
                  </span>
                </div>
                <Interactive360Viewer
                  imageSrc={route.virtualTour360Url || route.images[0]}
                  title={title}
                  locationName={route.destinations.join(' • ')}
                  className="h-[340px] w-full rounded-2xl"
                  onExpand={() => setTour360Open(true)}
                />
              </div>
            )}
          </div>

          {/* Sticky Booking & Customization Card */}
          <div className="lg:col-span-1 bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-md space-y-6 sticky top-24">
            <div className="border-b border-neutral-100 pb-5">
              <span className="text-xs text-neutral-400 block mb-0.5">{language === 'es' ? 'Precio estimado desde' : 'Estimated price from'}</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black font-mono text-slate-900">
                  ${route.price}
                </span>
                <span className="text-xs text-neutral-500 font-medium">USD / {language === 'es' ? 'persona' : 'person'}</span>
              </div>
              <p className="text-[11px] text-teal-800 font-medium mt-1">
                {language === 'es' ? `Incluye ${route.days} días de movilidad, hospedaje y actividades coordinadas.` : `Includes ${route.days} days of transportation, lodging, and coordinated activities.`}
              </p>
            </div>

            <label className="block">
              <span className="text-xs font-bold text-slate-800 block mb-1.5">{language === 'es' ? 'Fecha de inicio del tour' : 'Tour start date'}</span>
              <input type="date" value={selectedDate} min={new Date().toISOString().split('T')[0]} onChange={event => setSelectedDate(event.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold focus:ring-2 focus:ring-teal-700 outline-hidden" />
            </label>

            {/* Route Facts */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">{language === 'es' ? 'Duración total:' : 'Total duration:'}</span>
                <span className="font-bold text-slate-900 font-mono">{route.days} {language === 'es' ? 'días' : 'days'} / {route.days - 1} {language === 'es' ? 'noches' : 'nights'}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">{language === 'es' ? 'Destinos visitados:' : 'Destinations:'}</span>
                <span className="font-bold text-slate-900">{route.destinations.length} {language === 'es' ? 'regiones' : 'regions'}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">{language === 'es' ? 'Tipo de viaje:' : 'Trip type:'}</span>
                <span className="font-bold text-slate-900">{language === 'es' ? (route.packageStyleEs || 'Tour completo') : (route.packageStyleEn || 'Complete tour')}</span>
              </div>
            </div>

            {/* 24-Hour Payment Policy notice */}
            <div className="p-3 bg-teal-50/80 rounded-2xl border border-teal-200/80 text-[11px] text-teal-950 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <p className="font-bold">Reserva inmediata con 24h para pagar</p>
                <p className="text-teal-800 text-[10px] mt-0.5">
                  Tus cupos se bloquean automáticamente. Tienes un rango de 24 horas para pagar el 100% de la reservación.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-1">
              {/* Primary: Reservar Recorrido Automáticamente */}
              <button
                type="button"
                onClick={() => setShowAutoReserve(true)}
                className="w-full py-3.5 bg-[#00A6A6] hover:bg-[#009191] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reservar este recorrido (Automático)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleBookRoute}
                className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-[11px] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Reservar con código promocional o créditos</span>
              </button>

              <button
                type="button"
                onClick={handleCustomize}
                className="w-full py-3 bg-[#FDBA2D] hover:bg-[#f5b124] text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{language === 'es' ? 'Personalizar este tour' : 'Customize this tour'}</span>
              </button>

              <button
                type="button"
                onClick={handleAddToTrip}
                className={`w-full py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  addedToTrip
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-white hover:bg-neutral-50 text-[#063A5B] border-neutral-300'
                }`}
              >
                {addedToTrip ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                    <span>¡Agregada a mi viaje!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Agregar a mi viaje</span>
                  </>
                )}
              </button>

              {/* Contextual WhatsApp CTA */}
              <a
                href={`https://wa.me/50370119564?text=${encodeURIComponent(
                  language === 'es'
                    ? `Hola, me gustaría recibir información sobre la ruta ${title}.`
                    : `Hello, I would like more information about the route ${title}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl border border-emerald-300 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span>{language === 'es' ? 'Consultar esta ruta por WhatsApp' : 'Inquire route on WhatsApp'}</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-500 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'es' ? 'Coordinación oficial con tour operadora GIA' : 'Official coordination by GIA tour operator'}</span>
            </div>
          </div>
        </div>

        {/* AutoReserveModal instance */}
        <AutoReserveModal
          isOpen={showAutoReserve}
          onClose={() => setShowAutoReserve(false)}
          experienceId={route.id}
          experienceTitle={title}
          experienceSlug={route.slug}
          experienceLocation={route.destinations.join(' · ')}
          experienceImage={route.images[0]}
          pricePerPerson={route.price}
          initialDate={selectedDate}
          initialAdults={2}
          initialChildren={0}
          isRoute={true}
        />

        {/* Route Overview & Map */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              {language === 'es' ? 'Sobre este tour completo' : 'About this complete tour'}
            </h2>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: BedDouble, titleEs: 'Alojamiento', titleEn: 'Lodging', valueEs: route.accommodationEs || `${route.days - 1} noches en alojamientos seleccionados`, valueEn: route.accommodationEn || `${route.days - 1} nights in selected accommodations` },
              { icon: CarFront, titleEs: 'Movilidad', titleEn: 'Transportation', valueEs: route.mobilityEs || 'Traslados terrestres coordinados entre destinos', valueEn: route.mobilityEn || 'Coordinated ground transportation between destinations' },
              { icon: UtensilsCrossed, titleEs: 'Alimentación', titleEn: 'Meals', valueEs: route.mealsEs || 'Alimentos y degustaciones indicados en el programa', valueEn: route.mealsEn || 'Meals and tastings listed in the itinerary' },
              { icon: Headphones, titleEs: 'Asistencia', titleEn: 'Support', valueEs: 'Coordinación de GIA antes y durante el recorrido', valueEn: 'GIA coordination before and throughout the journey' },
            ].map(item => <div key={item.titleEs} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200"><item.icon className="w-5 h-5 text-teal-700 mb-2" /><h3 className="text-xs font-black text-slate-900">{language === 'es' ? item.titleEs : item.titleEn}</h3><p className="text-[11px] text-neutral-600 leading-relaxed mt-1">{language === 'es' ? item.valueEs : item.valueEn}</p></div>)}
          </div>

          {/* Interactive Route Map */}
          <div className="space-y-3 pt-4 border-t border-neutral-100">
            <h3 className="text-base font-bold text-slate-900 font-display">
              {language === 'es' ? 'Mapa del recorrido y paradas' : 'Route map and stops'}
            </h3>
            <RouteMap stops={route.itinerary} title={title} />
          </div>
        </div>

        {/* Day by Day Itinerary */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
          <h2 className="text-xl font-bold text-slate-900 font-display">
            {language === 'es' ? 'Itinerario día a día' : 'Day-by-day itinerary'}
          </h2>

          <div className="space-y-6">
            {route.itinerary.map(item => (
              <div
                key={item.day}
                className="p-5 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-teal-800 text-white font-mono font-bold text-xs flex items-center justify-center">
                      D{item.day}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {language === 'es' ? item.titleEs : item.titleEn}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    {item.department}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {language === 'es' ? item.descriptionEs : item.descriptionEn}
                </p>

                {/* Linked experiences */}
                {item.experienceIds.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {item.experienceIds.map(expId => {
                      const exp = DEMO_EXPERIENCES.find(e => e.id === expId);
                      if (!exp) return null;
                      return (
                        <button
                          key={expId}
                          type="button"
                          onClick={() => navigate(`/experiencias/${exp.slug}`)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-neutral-200 hover:border-teal-700 text-[11px] font-semibold text-slate-800 hover:text-teal-900 flex items-center gap-1.5 transition-colors"
                        >
                          <span>{language === 'es' ? exp.titleEs : exp.titleEn}</span>
                          <span className="text-teal-700 font-mono">(${exp.price})</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Included & Not Included */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-2xs">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                ✓
              </span>
              <span>{language === 'es' ? 'Qué incluye este tour' : 'What this tour includes'}</span>
            </h3>
            <ul className="space-y-2 text-xs text-neutral-700">
              {(language === 'es' ? route.includedEs : route.includedEn).map((inc, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center text-xs">
                ×
              </span>
              <span>{language === 'es' ? 'No incluye' : 'Not included'}</span>
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600">
              {(language === 'es' ? route.notIncludedEs : route.notIncludedEn).map((notInc, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <X className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                  <span>{notInc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 360 Fullscreen Modal */}
      <VirtualTour360
        isOpen={tour360Open}
        onClose={() => setTour360Open(false)}
        title={title}
        locationName={route.destinations.join(' • ')}
        imageSrc={route.virtualTour360Url || route.images[0]}
      />
    </div>
  );
};
