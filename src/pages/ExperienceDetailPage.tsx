import React, { useState, useEffect } from 'react';
import { DEMO_EXPERIENCES } from '../data/experiences';
import { ExperienceGallery } from '../components/experiences/ExperienceGallery';
import { ItineraryTimeline } from '../components/experiences/ItineraryTimeline';
import { BookingCard } from '../components/experiences/BookingCard';
import { MapPlaceholder } from '../components/common/MapPlaceholder';
import { Interactive360Viewer } from '../components/common/Interactive360Viewer';
import { VirtualTour360 } from '../components/common/VirtualTour360';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
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
} from 'lucide-react';

export const ExperienceDetailPage: React.FC = () => {
  const { slug, navigate } = useRouter();
  const { language, t } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);
  const [mobileBookingOpen, setMobileBookingOpen] = useState(false);
  const [tour360Open, setTour360Open] = useState(false);

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
    </div>
  );
};
