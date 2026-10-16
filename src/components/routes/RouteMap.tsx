import React, { useState } from 'react';
import { RouteItineraryDay } from '../../types/routes';
import { DEMO_EXPERIENCES } from '../../data/experiences';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  MapPin,
  Navigation,
  Compass,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Calendar,
  Layers,
} from 'lucide-react';

interface RouteMapProps {
  stops: RouteItineraryDay[];
  title: string;
}

export const RouteMap: React.FC<RouteMapProps> = ({ stops, title }) => {
  const { navigate } = useRouter();
  const { language } = useLanguage();
  const [activeStopIdx, setActiveStopIdx] = useState(0);

  const activeStop = stops[activeStopIdx] || stops[0];

  // Resolve associated experience if available
  const associatedExpId = activeStop.experienceIds && activeStop.experienceIds[0];
  const matchedExperience = DEMO_EXPERIENCES.find(
    (e) => e.id === associatedExpId || e.slug === associatedExpId
  );

  const expTitle = matchedExperience
    ? language === 'es'
      ? matchedExperience.titleEs
      : matchedExperience.titleEn
    : activeStop.titleEs;

  const stopTitle = language === 'es' ? activeStop.titleEs : activeStop.titleEn;
  const stopDesc = language === 'es' ? activeStop.descriptionEs : activeStop.descriptionEn;

  const lat = activeStop.coordinates.lat;
  const lng = activeStop.coordinates.lng;
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=${language}&z=13&output=embed`;
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/90 overflow-hidden shadow-xs space-y-0">
      {/* 1. Header of the Route Map */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-[#063A5B] to-[#04283f] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#FDBA2D] font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Recorrido en El Salvador' : 'El Salvador Tour Route'}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-display mt-1">
            {title}
          </h3>
        </div>

        {/* Total days badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-mono font-bold text-white border border-white/15">
            {stops.length} {language === 'es' ? 'Destinos conectados' : 'Connected stops'}
          </span>
        </div>
      </div>

      {/* 2. Sequence Navigation Pills (1. San Salvador ↓ 2. Santa Ana ↓ 3. Ruta de las Flores...) */}
      <div className="p-4 bg-neutral-50/90 border-b border-neutral-200/80 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {stops.map((stop, idx) => {
            const isSelected = activeStopIdx === idx;
            return (
              <React.Fragment key={stop.day}>
                <button
                  type="button"
                  onClick={() => setActiveStopIdx(idx)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00A6A6] text-white shadow-md scale-102 ring-2 ring-[#00A6A6]/30'
                      : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-mono font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-[#063A5B]'
                    }`}
                  >
                    {stop.day}
                  </span>
                  <span>{stop.destination}</span>
                </button>
                {idx < stops.length - 1 && (
                  <span className="text-neutral-400 text-xs font-bold px-0.5">↓</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 3. Interactive Map View */}
      <div className="relative h-72 sm:h-96 w-full bg-slate-900 overflow-hidden">
        <iframe
          title={`Google Map - ${activeStop.destination}`}
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          className="w-full h-full"
        />

        {/* Overlay Badge for active stop */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-neutral-200 shadow-lg text-neutral-900 pointer-events-none max-w-xs">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#00A6A6] uppercase tracking-wider font-mono">
            <MapPin className="w-3.5 h-3.5" />
            <span>Día {activeStop.day} · {activeStop.department}</span>
          </div>
          <p className="text-xs font-bold text-[#063A5B] truncate mt-0.5">
            {activeStop.destination}
          </p>
        </div>
      </div>

      {/* 4. Selected Stop Detail Card & Ver Experiencia CTA */}
      <div className="p-5 sm:p-6 bg-white border-t border-neutral-200/80 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-[#00A6A6] text-xs font-bold font-mono">
                {language === 'es' ? `Día ${activeStop.day}` : `Day ${activeStop.day}`}
              </span>
              <span className="text-xs font-semibold text-neutral-500">
                {activeStop.department}, El Salvador
              </span>
            </div>

            <h4 className="text-base font-extrabold text-[#063A5B] font-display">
              {activeStop.destination}
            </h4>

            <p className="text-xs text-neutral-600 leading-relaxed max-w-2xl">
              {stopDesc}
            </p>

            {/* Experiencia destacada del día */}
            <div className="pt-2 flex items-center gap-2 text-xs">
              <span className="font-bold text-neutral-500">
                {language === 'es' ? 'Experiencia:' : 'Experience:'}
              </span>
              <span className="font-semibold text-[#00A6A6] truncate">
                {expTitle}
              </span>
            </div>
          </div>

          {/* Action Buttons: Ver Experiencia + Google Maps */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            {matchedExperience ? (
              <button
                type="button"
                onClick={() => navigate(`/experiencias/${matchedExperience.slug}`)}
                className="px-5 py-2.5 bg-[#00A6A6] hover:bg-[#009191] text-white text-xs font-extrabold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FDBA2D]" />
                <span>{language === 'es' ? 'Ver experiencia' : 'View experience'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate('/experiencias')}
                className="px-5 py-2.5 bg-[#00A6A6] hover:bg-[#009191] text-white text-xs font-extrabold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:shadow-md"
              >
                <span>{language === 'es' ? 'Ver experiencias' : 'View experiences'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-[#063A5B] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Abrir en Google Maps"
            >
              <Compass className="w-3.5 h-3.5 text-[#00A6A6]" />
              <span className="hidden sm:inline">{language === 'es' ? 'Google Maps' : 'Google Maps'}</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>

            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-[#063A5B] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Cómo llegar"
            >
              <Navigation className="w-3.5 h-3.5 text-[#00A6A6]" />
              <span className="hidden sm:inline">{language === 'es' ? 'Cómo llegar' : 'Directions'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
