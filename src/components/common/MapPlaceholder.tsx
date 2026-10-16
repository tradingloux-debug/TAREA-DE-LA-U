import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Compass, AlertCircle } from 'lucide-react';
import { Coordinates } from '../../types/experience';
import { useLanguage } from '../../context/LanguageContext';

interface MapPlaceholderProps {
  coordinates?: Coordinates;
  meetingPoint?: string;
  locationName: string;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  coordinates,
  meetingPoint,
  locationName,
}) => {
  const { language } = useLanguage();
  const [mapLoaded, setMapLoaded] = useState(false);

  const hasValidCoordinates =
    coordinates &&
    typeof coordinates.lat === 'number' &&
    typeof coordinates.lng === 'number' &&
    coordinates.lat !== 0 &&
    coordinates.lng !== 0;

  const isConfirmed = hasValidCoordinates && Boolean(meetingPoint && meetingPoint.trim().length > 0);

  if (!isConfirmed) {
    return (
      <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50/60 p-6 sm:p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6 text-amber-600" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-amber-950 font-display">
            {language === 'es' ? 'Ubicación por confirmar' : 'Location to be confirmed'}
          </h4>
          <p className="text-xs text-amber-800 max-w-md mx-auto leading-relaxed">
            {language === 'es'
              ? 'El punto de encuentro exacto para esta experiencia está en proceso de validación operativa o será coordinado directamente con tu anfitrión de GIA al confirmar tu reserva.'
              : 'The exact meeting point for this experience is undergoing operational verification or will be arranged directly with your GIA host upon booking confirmation.'}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[11px] font-semibold text-neutral-600 border border-amber-200">
          <MapPin className="w-3.5 h-3.5 text-amber-600" />
          <span>{locationName || (language === 'es' ? 'El Salvador' : 'El Salvador')}</span>
        </div>
      </div>
    );
  }

  const { lat, lng } = coordinates!;
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=${language}&z=14&output=embed`;

  return (
    <div className="rounded-2xl border border-neutral-200/90 overflow-hidden bg-white shadow-xs">
      {/* Interactive Google Maps Frame */}
      <div className="relative h-72 sm:h-80 w-full bg-neutral-100 overflow-hidden">
        <iframe
          title={`Mapa de ${locationName}`}
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          onLoad={() => setMapLoaded(true)}
          className="w-full h-full"
        />

        {/* Coords & verified location badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#063A5B] text-[11px] font-mono px-3 py-1.5 rounded-xl border border-neutral-200 shadow-md flex items-center gap-2 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#00A6A6] animate-pulse" />
          <span className="font-bold">{locationName}</span>
          <span className="text-neutral-400">·</span>
          <span className="text-neutral-500">{lat.toFixed(4)}, {lng.toFixed(4)}</span>
        </div>
      </div>

      {/* Point of Meeting Info & Dual Google Maps CTAs */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-50/80 border-t border-neutral-200/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#00A6A6] shrink-0" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#063A5B] font-mono">
              {language === 'es' ? 'Punto de Encuentro Verificado' : 'Verified Meeting Point'}
            </h4>
          </div>
          <p className="text-xs text-neutral-700 font-medium pl-6">
            {meetingPoint}
          </p>
          <p className="text-[11px] text-neutral-500 pl-6">
            {locationName}
          </p>
        </div>

        {/* Dual Actions: Ver en Google Maps & Cómo llegar */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
          <a
            href={mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-white hover:bg-neutral-100 text-[#063A5B] text-xs font-bold rounded-xl border border-neutral-200 shadow-2xs transition-colors cursor-pointer"
            title="Abrir mapa en Google Maps"
          >
            <Compass className="w-3.5 h-3.5 text-[#00A6A6]" />
            <span>{language === 'es' ? 'Ver en Google Maps' : 'View on Google Maps'}</span>
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </a>

          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-[#00A6A6] hover:bg-[#009191] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            title="Calcular ruta hacia el punto de encuentro"
          >
            <Navigation className="w-3.5 h-3.5 text-white" />
            <span>{language === 'es' ? 'Cómo llegar' : 'Get Directions'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
