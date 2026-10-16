import React, { useState } from 'react';
import { MyTrip, TripDayPlan } from '../../types/trip';
import { Experience } from '../../types/experience';
import { DEMO_EXPERIENCES } from '../../data/experiences';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Sparkles,
  BookmarkCheck,
  Check,
  Plus,
  Trash2,
  Coffee,
  RotateCw,
  ArrowRight,
  Share2,
  DollarSign,
  Send,
  CheckCircle2,
  Eye,
  RefreshCw,
  Compass,
} from 'lucide-react';

interface TripItineraryViewProps {
  trip: MyTrip;
  onModifyDay: (dayNumber: number, action: 'swap' | 'freeday' | 'remove', newExpId?: string) => void;
  onModifyTripInstruction?: (instruction: string) => void;
  onRegenerateTrip?: () => void;
  onSaveTrip: () => void;
  isSaved?: boolean;
}

export const TripItineraryView: React.FC<TripItineraryViewProps> = ({
  trip,
  onModifyDay,
  onModifyTripInstruction,
  onRegenerateTrip,
  onSaveTrip,
  isSaved = false,
}) => {
  const { navigate } = useRouter();
  const { language } = useLanguage();
  const [selectedDayToSwap, setSelectedDayToSwap] = useState<number | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedMapDest, setSelectedMapDest] = useState<string | null>(null);

  const promptSuggestions = [
    'Quiero más playa',
    'Agrega un volcán',
    'Quiero gastar menos',
    'Quiero más gastronomía',
    'Prefiero un ritmo más relajado',
    'Agrega un día libre',
  ];

  const handleSendPrompt = (textToSend?: string) => {
    const text = (textToSend || customPrompt).trim();
    if (!text || !onModifyTripInstruction) return;
    onModifyTripInstruction(text);
    setCustomPrompt('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Distinct destinations in trip
  const destinations = Array.from(new Set(trip.days.map((d) => d.destination)));
  const activeMapDestName = selectedMapDest || destinations[0] || 'San Salvador';

  // Find day associated with active destination
  const activeDay = trip.days.find((d) => d.destination === activeMapDestName);
  const activeDayExp = activeDay?.experiences?.find((e) => e.coordinates?.lat);

  const getDestinationCoords = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('santa ana') || lower.includes('volcán') || lower.includes('coatepeque')) return { lat: 13.8533, lng: -89.6306 };
    if (lower.includes('apaneca') || lower.includes('flores') || lower.includes('juayúa') || lower.includes('ataco')) return { lat: 13.8617, lng: -89.8039 };
    if (lower.includes('suchitoto') || lower.includes('suchitlán') || lower.includes('cuscatlán')) return { lat: 13.9383, lng: -89.0278 };
    if (lower.includes('tunco') || lower.includes('libertad') || lower.includes('zonte') || lower.includes('surf')) return { lat: 13.4939, lng: -89.3842 };
    if (lower.includes('conchagua') || lower.includes('unión') || lower.includes('fonseca')) return { lat: 13.3086, lng: -87.8631 };
    if (lower.includes('morazán') || lower.includes('perquín')) return { lat: 13.9567, lng: -88.1611 };
    return { lat: 13.6989, lng: -89.1914 };
  };

  const activeMapCoords = activeDayExp?.coordinates || getDestinationCoords(activeMapDestName);

  // Budget calculations
  const totalExperiencesPrice = trip.days.reduce(
    (acc, d) => acc + d.experiences.reduce((sum, e) => sum + e.price, 0),
    0
  );
  // Multiplied by travelers
  const experiencesSubtotal = totalExperiencesPrice * trip.travelersCount;
  // Estimated logistics/routes allocation
  const activitiesSubtotal = Math.round(experiencesSubtotal * 0.35);
  const totalEstimated = experiencesSubtotal + activitiesSubtotal;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 7. RESULTADO HEADER: Tu viaje GIA */}
      <div className="bg-gradient-to-br from-[#063A5B] to-[#04283f] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-900/40 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00A6A6]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A6A6]/30 text-teal-300 text-xs font-mono font-bold border border-teal-400/30">
              <Sparkles className="w-3.5 h-3.5 text-[#FDBA2D]" />
              <span>Tu viaje GIA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
              {trip.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Una ruta creada alrededor de tus preferencias.
            </p>
          </div>

          <div className="sm:text-right shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <span className="text-[11px] text-slate-300 block mb-0.5">
              Presupuesto total estimado
            </span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#FDBA2D]">
              ${totalEstimated} USD
            </span>
            <span className="text-[10px] text-slate-300 block mt-0.5">
              Para {trip.travelersCount} persona{trip.travelersCount > 1 ? 's' : ''} ({trip.daysCount} días)
            </span>
          </div>
        </div>

        {/* Key Metrics Strip */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 block">Duración</span>
            <span className="text-sm font-bold text-white font-mono">{trip.daysCount} Días</span>
          </div>

          <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 block">Personas</span>
            <span className="text-sm font-bold text-white font-mono">{trip.travelersCount} Viajeros</span>
          </div>

          <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 block">Presupuesto</span>
            <span className="text-sm font-bold text-white capitalize">{trip.budgetTier || 'Equilibrado'}</span>
          </div>

          <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 block">Estilo de viaje</span>
            <span className="text-sm font-bold text-white capitalize">{trip.pace || 'Equilibrado'}</span>
          </div>
        </div>

        {/* Small Visual Map / Stops strip & Interactive Google Maps */}
        <div className="relative z-10 bg-black/40 rounded-2xl p-4 border border-white/10 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider font-mono">
              <Compass className="w-3.5 h-3.5 text-[#FDBA2D]" />
              <span>{language === 'es' ? 'Destinos de tu ruta:' : 'Route destinations:'}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-neutral-300">
              <MapPin className="w-3 h-3 text-[#00A6A6]" />
              <span>{destinations.length} {language === 'es' ? 'zonas en El Salvador' : 'regions in El Salvador'}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {destinations.map((dest, idx) => {
              const isSelected = (selectedMapDest || destinations[0]) === dest;
              return (
                <React.Fragment key={idx}>
                  <button
                    type="button"
                    onClick={() => setSelectedMapDest(dest)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#00A6A6] text-white shadow-md border border-teal-300 ring-2 ring-teal-400/30'
                        : 'bg-white/15 hover:bg-white/25 text-white border border-white/15'
                    }`}
                  >
                    {dest}
                  </button>
                  {idx < destinations.length - 1 && (
                    <span className="text-teal-400 text-xs font-bold">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Embedded Google Map reflecting current active destination in the itinerary */}
          <div className="pt-2">
            <div className="rounded-xl overflow-hidden border border-white/15 shadow-inner bg-slate-900 h-56 sm:h-64 relative">
              <iframe
                title="Google Maps Itinerario GIA"
                src={`https://maps.google.com/maps?q=${activeMapCoords.lat},${activeMapCoords.lng}&hl=${language}&z=13&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                className="w-full h-full"
              />
              <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] text-white flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-[#00A6A6] animate-pulse" />
                <span>{activeMapDestName}</span>
                <span className="text-slate-400">·</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${activeMapCoords.lat},${activeMapCoords.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-300 hover:underline flex items-center gap-1"
                >
                  <span>Google Maps</span>
                  <Compass className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. DÍAS DEL ITINERARIO: Cards por día */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#063A5B] font-display">
            Itinerario Día por Día
          </h3>
          <span className="text-xs text-neutral-500 font-mono">
            {trip.days.length} días estructurados
          </span>
        </div>

        {trip.days.map((day) => (
          <div
            key={day.dayNumber}
            className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-5"
          >
            {/* Day Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-[#00A6A6] font-black font-mono text-sm flex items-center justify-center shrink-0">
                  DÍA {day.dayNumber}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#063A5B]">
                      {day.destination}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-neutral-800 font-display">
                    "{day.themeEs}"
                  </h4>
                </div>
              </div>

              {/* Day Modification buttons */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setSelectedDayToSwap(day.dayNumber)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#063A5B] bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cambiar
                </button>
                <button
                  type="button"
                  onClick={() => onModifyDay(day.dayNumber, 'freeday')}
                  className="px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
                >
                  {day.isFreeDay ? 'Restablecer día' : 'Día libre'}
                </button>
              </div>
            </div>

            {/* Day Content */}
            {day.isFreeDay ? (
              <div className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200/80 text-xs text-amber-950 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold block text-sm">Día libre de descanso y exploración autónoma</span>
                  <p className="text-amber-800 text-xs mt-0.5">
                    Disfruta a tu ritmo de las cafeterías, miradores o la playa sin horarios programados.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Visual Activities Breakdown with Hours */}
                {day.experiences.map((exp, expIdx) => {
                  const timeSchedule = expIdx === 0 ? '08:30' : expIdx === 1 ? '12:30' : '16:00';
                  const labelSchedule = expIdx === 0 ? 'Experiencia de Mañana' : expIdx === 1 ? 'Gastronomía & Sabores' : 'Actividad de Tarde';

                  return (
                    <div
                      key={exp.id}
                      className="p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/60 hover:border-[#00A6A6]/60 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                    >
                      <div className="flex gap-4 items-center flex-1 min-w-0">
                        {/* Time Pill */}
                        <div className="text-center shrink-0 bg-white p-2 rounded-xl border border-neutral-200 shadow-2xs w-16">
                          <span className="font-mono text-xs font-extrabold text-[#00A6A6] block">
                            {timeSchedule}
                          </span>
                          <span className="text-[9px] text-neutral-400 block uppercase">
                            Horario
                          </span>
                        </div>

                        {/* Image */}
                        <img
                          src={exp.images[0]}
                          alt={exp.titleEs}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 shadow-2xs"
                        />

                        {/* Details */}
                        <div className="min-w-0 space-y-1">
                          <span className="text-[10px] font-bold text-[#00A6A6] uppercase tracking-wider block">
                            {labelSchedule} · {exp.category}
                          </span>
                          <h5 className="text-xs sm:text-sm font-bold text-[#063A5B] truncate">
                            {exp.titleEs}
                          </h5>
                          <p className="text-xs text-neutral-500 flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-neutral-400" />
                              {exp.duration}
                            </span>
                            <span className="flex items-center gap-1 truncate">
                              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                              <span className="truncate">{exp.location}</span>
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Action buttons & Price */}
                      <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-200">
                        <span className="font-mono text-sm font-extrabold text-[#063A5B]">
                          ${exp.price} USD
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => navigate(`/experiencias/${exp.slug}`)}
                            className="px-2.5 py-1 text-xs font-semibold text-[#00A6A6] hover:bg-teal-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ver experiencia</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedDayToSwap(day.dayNumber)}
                            className="px-2.5 py-1 text-xs font-semibold text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                          >
                            Cambiar
                          </button>

                          <button
                            type="button"
                            onClick={() => onModifyDay(day.dayNumber, 'freeday')}
                            className="p-1 text-neutral-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                            title="Eliminar del día"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 9. EDICIÓN CONVERSACIONAL: ¿Quieres cambiar algo? */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#00A6A6] text-xs font-bold uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4 text-[#FDBA2D]" />
            <span>Personalización Asistida</span>
          </div>
          <h3 className="text-lg font-bold text-[#063A5B] font-display">
            ¿Quieres cambiar algo?
          </h3>
          <p className="text-xs text-neutral-500">
            Pide modificaciones en lenguaje natural o utiliza las sugerencias rápidas:
          </p>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2">
          {promptSuggestions.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSendPrompt(prompt)}
              className="px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-teal-50 hover:text-[#00A6A6] border border-neutral-200 text-xs font-semibold text-neutral-700 transition-all cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input & Send */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
            placeholder="Dile a GIA qué quieres modificar..."
            className="flex-1 py-3 px-4 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
          />
          <button
            type="button"
            onClick={() => handleSendPrompt()}
            className="px-5 py-3 bg-[#063A5B] hover:bg-[#04283f] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Aplicar</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 10. RESUMEN DE PRESUPUESTO */}
      <div className="bg-[#F7F4ED] rounded-3xl border border-neutral-200/80 p-6 sm:p-8 space-y-4">
        <h4 className="text-base font-black text-[#063A5B] font-display">
          Presupuesto estimado
        </h4>

        <div className="space-y-2 text-xs divide-y divide-neutral-200/60">
          <div className="flex items-center justify-between py-2">
            <span className="text-neutral-600">
              Experiencias y talleres guiados ({trip.travelersCount} persona{trip.travelersCount > 1 ? 's' : ''}):
            </span>
            <span className="font-mono font-bold text-[#063A5B]">
              ${experiencesSubtotal} USD
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-neutral-600">
              Coordinación de traslados interdepartamentales y actividades:
            </span>
            <span className="font-mono font-bold text-[#063A5B]">
              ${activitiesSubtotal} USD
            </span>
          </div>

          <div className="flex items-center justify-between py-3 pt-3">
            <span className="font-extrabold text-sm text-[#063A5B]">
              Total estimado:
            </span>
            <span className="font-mono font-black text-lg text-[#063A5B]">
              ${totalEstimated} USD
            </span>
          </div>
        </div>

        <p className="text-[11px] text-neutral-500 leading-relaxed">
          * Los precios están basados en las tarifas vigentes de los anfitriones y guías locales de GIA. Traslados sujetos a punto de recogida en San Salvador o aeropuerto.
        </p>
      </div>

      {/* 11. ACCIONES FINALES */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* CTA Principal */}
          <button
            type="button"
            onClick={onSaveTrip}
            className={`px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto ${
              isSaved
                ? 'bg-emerald-600 text-white'
                : 'bg-[#00A6A6] hover:bg-[#009191] text-white'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{isSaved ? '¡Viaje guardado en tu cuenta!' : 'Guardar mi viaje'}</span>
          </button>

          {/* CTA Secundario */}
          <button
            type="button"
            onClick={() => setInquiryModalOpen(true)}
            className="px-5 py-3.5 bg-[#FDBA2D] hover:bg-[#f5b124] text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer w-full sm:w-auto text-center"
          >
            Consultar disponibilidad
          </button>

          {/* CTA Terciario */}
          <button
            type="button"
            onClick={handleShare}
            className="px-4 py-3.5 bg-white hover:bg-neutral-100 text-[#063A5B] border border-neutral-300 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
          >
            <Share2 className="w-4 h-4" />
            <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir'}</span>
          </button>
        </div>

        {/* Regenerar Itinerario */}
        {onRegenerateTrip && (
          <button
            type="button"
            onClick={onRegenerateTrip}
            className="text-xs text-neutral-500 hover:text-[#063A5B] font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerar itinerario</span>
          </button>
        )}
      </div>

      {/* Swap Modal */}
      {selectedDayToSwap !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full max-h-[80vh] flex flex-col space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <h4 className="text-base font-bold text-[#063A5B]">
              Seleccionar experiencia alternativa para el Día {selectedDayToSwap}
            </h4>
            <div className="overflow-y-auto space-y-2 flex-1">
              {DEMO_EXPERIENCES.map((exp) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => {
                    onModifyDay(selectedDayToSwap, 'swap', exp.id);
                    setSelectedDayToSwap(null);
                  }}
                  className="w-full text-left p-3 rounded-2xl border border-neutral-200 hover:border-[#00A6A6] hover:bg-teal-50/40 transition-colors flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="truncate">
                    <p className="text-xs font-bold text-[#063A5B] truncate">{exp.titleEs}</p>
                    <p className="text-[11px] text-neutral-500">{exp.location} · {exp.duration}</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#00A6A6] shrink-0">
                    ${exp.price} USD
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSelectedDayToSwap(null)}
              className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Inquiry Availability Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 text-center">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00A6A6] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-[#063A5B] font-display">
              Consultar disponibilidad con anfitriones
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Tu ruta personalizada incluye {trip.daysCount} días de actividades. Para confirmar las fechas exactas con los guías y transportistas de El Salvador, continuaremos en el flujo de reserva directa.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setInquiryModalOpen(false)}
                className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  setInquiryModalOpen(false);
                  navigate('/checkout');
                }}
                className="flex-1 py-2.5 bg-[#00A6A6] hover:bg-[#009191] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Continuar reserva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
