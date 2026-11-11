import React, { useState, useEffect } from 'react';
import { DEMO_EXPERIENCES } from '../data/experiences';
import { ExperienceGallery } from '../components/experiences/ExperienceGallery';
import { ItineraryTimeline } from '../components/experiences/ItineraryTimeline';
import { BookingCard } from '../components/experiences/BookingCard';
import { MapPlaceholder } from '../components/common/MapPlaceholder';
import { Interactive360Viewer } from '../components/common/Interactive360Viewer';
import { VirtualTour360 } from '../components/common/VirtualTour360';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { QuoteRequestModal } from '../components/booking/QuoteRequestModal';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../services/analytics';
import { localizeDuration } from '../utils/localize';
import {
  MapPin,
  Clock,
  Users,
  Globe,
  Check,
  X,
  AlertTriangle,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Shield,
  Sparkles,
  Heart,
  Compass,
  Move,
  Camera,
  Hotel,
  Car,
  Utensils,
  Route,
  Layers,
  Calendar,
  Send,
} from 'lucide-react';

export const ExperienceDetailPage: React.FC = () => {
  const { slug, navigate } = useRouter();
  const { language, t, loc } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);
  const [mobileBookingOpen, setMobileBookingOpen] = useState(false);
  const [tour360Open, setTour360Open] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const experience = DEMO_EXPERIENCES.find(exp => exp.slug === slug) || DEMO_EXPERIENCES[0];

  useEffect(() => {
    if (experience) {
      trackEvent('experience_view', {
        id: experience.id,
        slug: experience.slug,
        title: language === 'es' ? experience.titleEs : experience.titleEn,
      });
    }
  }, [experience, language]);

  if (!experience) {
    return (
      <div className="py-24 text-center max-w-md mx-auto">
        <h2 className="text-xl font-bold">{t.detail.notFoundTitle}</h2>
        <button
          onClick={() => navigate('/experiencias')}
          className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs"
        >
          {t.detail.backToCatalog}
        </button>
      </div>
    );
  }

  const title = language === 'es' ? experience.titleEs : experience.titleEn;
  const description = language === 'es' ? experience.descriptionEs : experience.descriptionEn;
  const meetingPoint = language === 'es' ? experience.meetingPointEs : experience.meetingPointEn;
  const includedList = language === 'es' ? experience.includedEs : experience.includedEn;
  const notIncludedList = language === 'es' ? experience.notIncludedEs : experience.notIncludedEn;
  const requirementsList = language === 'es' ? experience.requirementsEs : experience.requirementsEn;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24 lg:pb-16">
      {/* Top breadcrumb & navigation bar */}
      <div className="border-b border-neutral-200/80 bg-neutral-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <Breadcrumbs
            items={[
              { label: t.detail.experiencesLabel, path: '/experiencias' },
              { label: title },
            ]}
            backAction={{
              label: t.detail.backToExperiences,
              path: '/experiencias',
            }}
            className="flex-1 min-w-0"
          />

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-[#00A6A6] transition-colors cursor-pointer shrink-0"
          >
            {copiedLink ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-teal-700 font-medium">{t.detail.linkCopied}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>{t.detail.share}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Gallery */}
        <ExperienceGallery
          images={experience.images}
          title={title}
          credits={experience.imageCredits}
          destinationName={experience.location}
        />

        {/* 2-Column Layout: Left Details + Right Sticky Booking */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Title & Key Spec Badges */}
            <div className="border-b border-neutral-200 pb-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 flex-wrap">
                <span className="uppercase tracking-wider font-bold">
                  {experience.category.toUpperCase()}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-neutral-500 font-normal">{experience.department}</span>
                {experience.region && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-teal-700 font-semibold">{experience.region}</span>
                  </>
                )}
                {experience.difficulty && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-neutral-700 font-medium capitalize">
                      {language === 'es' ? `Dificultad: ${experience.difficulty}` : `Difficulty: ${experience.difficulty}`}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display leading-tight">
                {title}
              </h1>

              {/* Availability Status Notification */}
              {experience.availabilityStatus === 'disponible_inmediato' ? (
                <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">
                      {language === 'es' ? 'Disponible para reservación directa' : 'Available for immediate booking'}
                    </strong>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      {language === 'es'
                        ? 'Salidas programadas y guías locales verificados por GIA Experiences.'
                        : 'Scheduled departures with verified tour guides.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 bg-amber-50/90 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-950">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">
                      {language === 'es' ? 'Propuesta de paquete personalizada' : 'Custom travel package proposal'}
                    </strong>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      {experience.proposalNoteEs && language === 'es'
                        ? experience.proposalNoteEs
                        : experience.proposalNoteEn && language === 'en'
                        ? experience.proposalNoteEn
                        : language === 'es'
                        ? 'Propuesta de catálogo de GIA Experiences. Se confirma fecha y tarifa según tu grupo y proveedores locales asociados.'
                        : 'Catalog travel proposal. Date and final arrangements confirmed with local operators.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Key Specs Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/60">
                  <span className="text-[11px] text-neutral-400 block mb-0.5">{t.card.duration}</span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900">
                    <Clock className="w-3.5 h-3.5 text-teal-700" />
                    <span>{localizeDuration(experience.duration, language)}</span>
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/60">
                  <span className="text-[11px] text-neutral-400 block mb-0.5">{t.detail.approxGroupSize}</span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900">
                    <Users className="w-3.5 h-3.5 text-teal-700" />
                    <span>{experience.minPeople} - {experience.maxPeople} {t.detail.people}</span>
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/60">
                  <span className="text-[11px] text-neutral-400 block mb-0.5">{t.detail.languagesOffered}</span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900">
                    <Globe className="w-3.5 h-3.5 text-teal-700" />
                    <span>{experience.languages.join(' / ')}</span>
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/60">
                  <span className="text-[11px] text-neutral-400 block mb-0.5">{t.detail.location}</span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 truncate">
                    <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span className="truncate">{experience.location}</span>
                  </div>
                </div>
              </div>

              {/* Transport Included Guarantee Banner */}
              <div className="flex items-center gap-3 p-3.5 bg-gradient-to-r from-teal-50 via-sky-50 to-emerald-50 rounded-2xl border border-teal-200/90 text-xs shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-[#00A6A6] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Car className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-[#063A5B] flex items-center gap-1.5">
                    <span>{loc('Transporte privado ida y vuelta 100% incluido', '100% Round-trip private transport included')}</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {loc('En todos los tours', 'On all tours')}
                    </span>
                  </p>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    {loc(
                      'Recogida y retorno cómodo en tu hotel o alojamiento con chofer profesional y aire acondicionado. Sin costos ocultos.',
                      'Comfortable pickup and drop-off at your hotel or lodging with professional driver and A/C. No hidden costs.'
                    )}
                  </p>
                </div>
              </div>

              {/* Traveler Profiles & Duration Tier Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {experience.durationBadgeEs && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#063A5B] text-white text-xs font-bold font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#FDBA2D]" />
                    <span>{loc(experience.durationBadgeEs, experience.durationBadgeEn || experience.durationBadgeEs)}</span>
                  </span>
                )}
                {experience.comfortLevel && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold capitalize">
                    <Hotel className="w-3.5 h-3.5 text-teal-600" />
                    <span>Nivel {experience.comfortLevel}</span>
                  </span>
                )}
                {experience.travelerProfiles && experience.travelerProfiles.map((p) => {
                  const labels: Record<string, { es: string; en: string }> = {
                    individual: { es: 'Solo Traveler', en: 'Solo Traveler' },
                    parejas: { es: 'Ideal Parejas', en: 'Couples / Romance' },
                    familias: { es: 'Familiar con Niños', en: 'Family Friendly' },
                    grupos: { es: 'Grupos de Amigos', en: 'Friends Groups' },
                    adultos_mayores: { es: 'Slow Travel / Accesible', en: 'Slow Travel / Seniors' },
                    aventura: { es: 'Aventureros', en: 'Adventurers' },
                    gastronomia: { es: 'Gastronomía & Cultura', en: 'Culinary & Culture' },
                    premium: { es: 'Viajeros Premium', en: 'Premium Luxury' },
                  };
                  return (
                    <span
                      key={p}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-medium"
                    >
                      {labels[p] ? loc(labels[p].es, labels[p].en) : p}
                    </span>
                  );
                })}
              </div>

              {/* Destinations Sequence Ribbon */}
              {experience.destinationsCovered && experience.destinationsCovered.length > 0 && (
                <div className="p-4 bg-gradient-to-r from-teal-50/60 to-sky-50/40 rounded-2xl border border-teal-200/80 space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#063A5B] flex items-center gap-1.5">
                    <Route className="w-4 h-4 text-[#00A6A6]" />
                    <span>{loc('Ruta Geográfica y Destinos Visitados:', 'Geographic Route & Destinations:')}</span>
                  </span>
                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    {experience.destinationsCovered.map((dest, i) => (
                      <React.Fragment key={i}>
                        <span className="px-2.5 py-1 bg-white rounded-lg border border-teal-200 text-xs font-semibold text-teal-950 shadow-2xs">
                          {dest}
                        </span>
                        {i < experience.destinationsCovered!.length - 1 && (
                          <span className="text-teal-400 font-bold text-xs">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* If isPackage: Package Services Breakdown */}
              {experience.isPackage && experience.packageServices && (
                <div className="pt-3 border-t border-neutral-100">
                  <span className="text-xs font-bold text-[#063A5B] block mb-2">
                    {language === 'es' ? 'Componentes organizados en este paquete:' : 'Package components included:'}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg border border-neutral-200/60">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{language === 'es' ? 'Transporte turístico' : 'Touring transport'}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg border border-neutral-200/60">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{language === 'es' ? 'Hospedaje coordinado' : 'Coordinated lodging'}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg border border-neutral-200/60">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{language === 'es' ? 'Alimentación típica' : 'Local meals'}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg border border-neutral-200/60">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{language === 'es' ? 'Guías certificados' : 'Certified guides'}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg border border-neutral-200/60">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{language === 'es' ? 'Entradas a parques' : 'Park admissions'}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg border border-neutral-200/60">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{language === 'es' ? 'Talleres y comunidades' : 'Workshops & community'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 1. Description */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-900 font-display">
                  {t.detail.overviewTitle}
                </h2>

                {/* 360° Tour Button if available */}
                {(experience.virtualTour360Url || experience.has360) && (
                  <button
                    type="button"
                    onClick={() => setTour360Open(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FDBA2D] hover:bg-[#f5b124] text-slate-950 font-bold text-xs transition-all shadow-xs cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 text-slate-950" />
                    <span>{t.detail.explore360}</span>
                  </button>
                )}
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed font-normal">
                {description}
              </p>
            </section>

            {/* Interactive 360 Panorama Section */}
            {(experience.virtualTour360Url || experience.has360) && (
              <section className="space-y-3 pt-4 border-t border-neutral-100">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="text-xl font-bold text-[#063A5B] font-display flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#00A6A6]" />
                    <span>{t.detail.panoramaTitle}</span>
                  </h2>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-[#00A6A6] border border-teal-200 flex items-center gap-1">
                    <Move className="w-3 h-3" />
                    <span>{t.detail.panoramaDrag}</span>
                  </span>
                </div>
                <p className="text-xs text-neutral-500">
                  {t.detail.panoramaHelp}
                </p>
                <div className="pt-2">
                  <Interactive360Viewer
                    imageSrc={experience.virtualTour360Url || experience.images[0]}
                    title={title}
                    locationName={experience.location}
                    className="h-[360px] sm:h-[420px] w-full rounded-2xl"
                    onExpand={() => setTour360Open(true)}
                  />
                </div>
              </section>
            )}

            {/* Local Host Story Section if available */}
            {experience.hostStory && (
              <section className="space-y-4 pt-4 border-t border-neutral-100 bg-[#F7F4ED]/80 rounded-3xl p-6 sm:p-7 border border-neutral-200/80">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#55A94B] text-xs font-bold font-mono">
                  <Heart className="w-3.5 h-3.5 fill-[#55A94B]" />
                  <span>{t.detail.localHosts}</span>
                </div>
                <h2 className="text-xl font-bold text-[#063A5B] font-display">
                  {t.detail.meetHosts}
                </h2>
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-emerald-900 shrink-0 border-2 border-white shadow-md">
                    <img
                      src={experience.hostStory.photoUrl || experience.images[0]}
                      alt={experience.hostStory.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-base font-bold text-[#063A5B]">
                      {experience.hostStory.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#00A6A6]">
                      {experience.hostStory.community}
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed pt-1">
                      {language === 'es' ? experience.hostStory.storyEs : experience.hostStory.storyEn}
                    </p>
                  </div>
                </div>

                {/* Community Contribution Impact */}
                <div className="pt-4 border-t border-neutral-200/60 mt-4 space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#063A5B]">
                    {t.detail.visitImpact}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {experience.hostStory.impactEs
                      ? (language === 'es' ? experience.hostStory.impactEs : experience.hostStory.impactEn)
                      : t.detail.infoToConfirm}
                  </p>
                </div>
              </section>
            )}

            {/* 2. Itinerary Timeline */}
            <section className="space-y-6 pt-4 border-t border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-900 font-display">
                {t.detail.itineraryTitle}
              </h2>
              <ItineraryTimeline items={experience.itinerary} />
            </section>

            {/* Lodging & Comfort Details (if available) */}
            {experience.accommodationDetails && (
              <section className="space-y-4 pt-4 border-t border-neutral-100">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-lg font-bold text-[#063A5B] font-display flex items-center gap-2">
                    <Hotel className="w-5 h-5 text-[#00A6A6]" />
                    <span>{loc('Alojamiento & Nivel de Confort', 'Lodging & Comfort Tier')}</span>
                  </h3>
                  {experience.accommodationDetails.comfortTier && (
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                      Nivel {experience.accommodationDetails.comfortTier}
                    </span>
                  )}
                </div>
                <div className="p-5 bg-gradient-to-br from-neutral-50 to-teal-50/20 rounded-2xl border border-neutral-200 space-y-2">
                  <h4 className="text-sm font-bold text-neutral-900">
                    {loc(experience.accommodationDetails.typeEs, experience.accommodationDetails.typeEn)}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {loc(experience.accommodationDetails.detailsEs, experience.accommodationDetails.detailsEn)}
                  </p>
                </div>
              </section>
            )}

            {/* Transport & Transfers Logistics (if available) */}
            {experience.transportDetails && (
              <section className="space-y-4 pt-4 border-t border-neutral-100">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-lg font-bold text-[#063A5B] font-display flex items-center gap-2">
                    <Car className="w-5 h-5 text-[#00A6A6]" />
                    <span>{loc('Transporte & Logística de Traslados', 'Transportation & Transfer Logistics')}</span>
                  </h3>
                  {experience.transportDetails.airportTransfer && (
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>{loc('Traslado Aeropuerto Incluido', 'Airport Transfer Included')}</span>
                    </span>
                  )}
                </div>
                <div className="p-5 bg-gradient-to-br from-neutral-50 to-sky-50/20 rounded-2xl border border-neutral-200 space-y-2">
                  <h4 className="text-sm font-bold text-neutral-900">
                    {loc(experience.transportDetails.modeEs, experience.transportDetails.modeEn)}
                  </h4>
                  {experience.transportDetails.pickupNotesEs && (
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      <strong className="text-neutral-800">{loc('Punto de recogida: ', 'Pickup point: ')}</strong>
                      {loc(experience.transportDetails.pickupNotesEs, experience.transportDetails.pickupNotesEn || experience.transportDetails.pickupNotesEs)}
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Meal Plan Details (if available) */}
            {experience.mealPlan && (
              <section className="space-y-4 pt-4 border-t border-neutral-100">
                <h3 className="text-lg font-bold text-[#063A5B] font-display flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#00A6A6]" />
                  <span>{loc('Plan de Alimentación Incluido', 'Included Meal Plan')}</span>
                </h3>
                <div className="p-5 bg-gradient-to-br from-neutral-50 to-amber-50/20 rounded-2xl border border-neutral-200 space-y-3">
                  <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                    {loc(experience.mealPlan.summaryEs, experience.mealPlan.summaryEn)}
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-neutral-200/60 text-center">
                    <div className="p-2 bg-white rounded-xl border border-neutral-200/80">
                      <span className="text-[10px] text-neutral-400 block">{loc('Desayunos', 'Breakfasts')}</span>
                      <span className="font-mono text-sm font-bold text-neutral-800">{experience.mealPlan.breakfastCount}</span>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-neutral-200/80">
                      <span className="text-[10px] text-neutral-400 block">{loc('Almuerzos', 'Lunches')}</span>
                      <span className="font-mono text-sm font-bold text-neutral-800">{experience.mealPlan.lunchCount}</span>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-neutral-200/80">
                      <span className="text-[10px] text-neutral-400 block">{loc('Cenas', 'Dinners')}</span>
                      <span className="font-mono text-sm font-bold text-neutral-800">{experience.mealPlan.dinnerCount}</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Customization Options & Add-ons (if available) */}
            {experience.customizationOptions && experience.customizationOptions.length > 0 && (
              <section className="space-y-4 pt-4 border-t border-neutral-100">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-lg font-bold text-[#063A5B] font-display flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FDBA2D]" />
                    <span>{loc('Opciones de Personalización & Extras', 'Customization Add-ons & Upgrades')}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setQuoteModalOpen(true)}
                    className="text-xs text-[#00A6A6] hover:text-[#063A5B] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>{loc('Solicitar en cotización', 'Request in quote')}</span>
                    <span>→</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {experience.customizationOptions.map((addon) => (
                    <div
                      key={addon.id}
                      className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-[#00A6A6] transition-all space-y-1.5 shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-neutral-900 leading-snug">
                          {loc(addon.labelEs, addon.labelEn)}
                        </h4>
                        {addon.priceDiff ? (
                          <span className="font-mono text-xs font-extrabold text-[#00A6A6] shrink-0">
                            +${addon.priceDiff} USD
                          </span>
                        ) : (
                          <span className="text-[10px] text-neutral-400 font-semibold shrink-0">
                            {loc('A cotizar', 'Custom')}
                          </span>
                        )}
                      </div>
                      {addon.descriptionEs && (
                        <p className="text-[11px] text-neutral-500 leading-relaxed">
                          {loc(addon.descriptionEs, addon.descriptionEn || addon.descriptionEs)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. Included & Not Included */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-neutral-100">
              {/* Included */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 font-display flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>{t.detail.includedTitle}</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-neutral-700">
                  {includedList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not Included */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 font-display flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center text-xs">
                    ×
                  </span>
                  <span>{t.detail.notIncludedTitle}</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-neutral-600">
                  {notIncludedList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <X className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 4. Requirements / Before you book */}
            <section className="space-y-4 pt-4 border-t border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-900 font-display flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>{t.detail.beforeYouGoTitle}</span>
              </h2>
              <div className="bg-amber-50/60 rounded-2xl border border-amber-200/70 p-5">
                <ul className="space-y-2 text-xs text-amber-950">
                  {requirementsList.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 5. Meeting Point with Map */}
            <section className="space-y-4 pt-4 border-t border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-900 font-display">
                {t.detail.meetingPointTitle}
              </h2>
              <MapPlaceholder
                coordinates={experience.coordinates}
                meetingPoint={meetingPoint}
                locationName={experience.location}
              />
            </section>
          </div>

          {/* Right Sticky Booking Column (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24 space-y-4">
            <BookingCard experience={experience} />

            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-2 text-center">
              <span className="text-xs font-bold text-emerald-950 block">
                {language === 'es' ? '¿Deseas personalizar esta experiencia?' : 'Want to customize this trip?'}
              </span>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                {language === 'es'
                  ? 'Habla directamente con un asesor de GIA Experiences en El Salvador para coordinar fechas o transporte privado.'
                  : 'Chat directly with a GIA Experiences specialist in El Salvador.'}
              </p>
              <a
                href={`https://wa.me/50370119564?text=${encodeURIComponent(
                  language === 'es'
                    ? `Hola GIA Experiences, me gustaría consultar detalles sobre la experiencia: "${title}"`
                    : `Hello GIA Experiences, I would like to inquire about: "${title}"`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer"
              >
                <span>{language === 'es' ? 'Consultar por WhatsApp (+503 7011-9564)' : 'Chat on WhatsApp (+503 7011-9564)'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom CTA (Max 15% height discipline) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div>
            <span className="text-[10px] text-neutral-400 block">{t.card.from}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-neutral-900 font-mono">
                ${experience.price}
              </span>
              <span className="text-[11px] text-neutral-500">{t.detail.perPersonSmall}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileBookingOpen(true)}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs"
          >
            {t.detail.reserveCta}
          </button>
        </div>
      </div>

      {/* Mobile Booking Drawer / Modal */}
      {mobileBookingOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileBookingOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl z-10 max-h-[90vh] overflow-y-auto p-5 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <h3 className="text-base font-bold text-neutral-900">{t.detail.reserveCta}</h3>
              <button
                type="button"
                onClick={() => setMobileBookingOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <BookingCard experience={experience} />
          </div>
        </div>
      )}

      {/* 360 Virtual Tour Modal */}
      <VirtualTour360
        isOpen={tour360Open}
        onClose={() => setTour360Open(false)}
        title={title}
        locationName={experience.location}
        imageSrc={experience.images[0]}
      />

      {/* QuoteRequestModal instance */}
      <QuoteRequestModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        experience={experience}
      />
    </div>
  );
};
